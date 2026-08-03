import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Empty,
  PageHeader,
  Panel,
  Select,
  Table,
  formatDate,
  useRows,
} from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/journal")({
  component: Journal,
});

const statuses = ["draft", "published", "archived"] as const;

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  status: string;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
};

const blank = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Systems",
  seo_title: "",
  seo_description: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function Journal() {
  const { data: posts, isLoading } = useRows<Post>("blog_posts");
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState(blank);
  const [open, setOpen] = useState(false);

  function startNew() {
    setEditing(null);
    setForm(blank);
    setOpen(true);
  }

  function startEdit(post: Post) {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      category: post.category ?? "Systems",
      seo_title: post.seo_title ?? "",
      seo_description: post.seo_description ?? "",
    });
    setOpen(true);
  }

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        excerpt: form.excerpt || null,
        content: form.content || null,
        category: form.category || null,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
      };
      if (editing) {
        const { error } = await supabase
          .from("blog_posts")
          .update(payload as never)
          .eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(payload as never);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "blog_posts"] });
      setOpen(false);
      setEditing(null);
      setForm(blank);
      toast.success("Post saved.");
    },
    onError: () => toast.error("Could not save that post."),
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const patch: Record<string, unknown> = { status };
      if (status === "published") patch["published_at"] = new Date().toISOString();
      const { error } = await supabase
        .from("blog_posts")
        .update(patch as never)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "blog_posts"] }),
    onError: () => toast.error("Could not update that post."),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "blog_posts"] });
      toast.success("Post deleted.");
    },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Journal"
        description="Write and publish to the public journal. Published posts appear on the site immediately."
        action={
          <button
            onClick={startNew}
            className="font-ui h-10 rounded-sm bg-primary px-4 text-sm text-primary-foreground"
          >
            New post
          </button>
        }
      />

      {open && (
        <Panel className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate();
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Title"
                value={form.title}
                onChange={(v) => setForm((f) => ({ ...f, title: v, slug: f.slug || slugify(v) }))}
                required
              />
              <Field
                label="Slug"
                value={form.slug}
                onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
              />
              <Field
                label="Category"
                value={form.category}
                onChange={(v) => setForm((f) => ({ ...f, category: v }))}
              />
              <Field
                label="Excerpt"
                value={form.excerpt}
                onChange={(v) => setForm((f) => ({ ...f, excerpt: v }))}
              />
            </div>
            <label className="block">
              <span className="font-ui text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Body — leave a blank line between paragraphs
              </span>
              <textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={12}
                className="font-ui mt-2 w-full rounded-sm border border-input bg-background p-4 text-sm leading-relaxed outline-none focus:border-primary"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="SEO title"
                value={form.seo_title}
                onChange={(v) => setForm((f) => ({ ...f, seo_title: v }))}
              />
              <Field
                label="SEO description"
                value={form.seo_description}
                onChange={(v) => setForm((f) => ({ ...f, seo_description: v }))}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="font-ui h-10 rounded-sm bg-primary px-5 text-sm text-primary-foreground"
              >
                {editing ? "Update post" : "Create post"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-ui h-10 rounded-sm border border-input px-5 text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </Panel>
      )}

      <Panel>
        {isLoading ? (
          <Empty label="Loading posts…" />
        ) : (posts ?? []).length === 0 ? (
          <Empty label="No posts yet." />
        ) : (
          <Table head={["Title", "Category", "Created", "Status", "Actions"]}>
            {(posts ?? []).map((p) => (
              <tr key={p.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="text-foreground">{p.title}</p>
                  <p className="text-xs text-muted-foreground">/blog/{p.slug}</p>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{p.category ?? "—"}</td>
                <td className="px-4 py-4 text-muted-foreground">{formatDate(p.created_at)}</td>
                <td className="px-4 py-4">
                  <Select
                    value={p.status}
                    options={statuses}
                    onChange={(status) => setStatus.mutate({ id: p.id, status })}
                  />
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-xs text-primary underline underline-offset-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove.mutate(p.id)}
                    className="ml-4 text-xs text-muted-foreground underline underline-offset-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Panel>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-ui text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-ui mt-2 h-10 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
