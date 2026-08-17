import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Empty, PageHeader, Panel, Table, useRows } from "@/components/admin/AdminUI";
import { money, typeLabels, typeOptions } from "@/lib/shop";
import {
  PRODUCT_BUCKET,
  STORAGE_PREFIX,
  isStoredFile,
  objectKey,
  storedFileName,
} from "@/lib/product-files";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: Products,
});

type Product = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  currency: string;
  product_type: string;
  category: string | null;
  cover_image: string | null;
  file_url: string | null;
  preview_url: string | null;
  video_url: string | null;
  featured: boolean;
  sort_order: number;
  is_active: boolean;
};

const blank = {
  name: "",
  slug: "",
  short_description: "",
  description: "",
  price: 0,
  compare_at_price: "",
  currency: "KES",
  product_type: "template",
  category: "Templates",
  cover_image: "",
  file_url: "",
  preview_url: "",
  video_url: "",
  featured: false,
  sort_order: 0,
  is_active: true,
};

type Form = typeof blank;

function slugify(v: string) {
  return v
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function Products() {
  const { data: rows, isLoading } = useRows<Product>("products", {
    orderBy: "sort_order",
    ascending: true,
  });
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Form>(blank);
  const [open, setOpen] = useState(false);

  function startNew() {
    setEditing(null);
    setForm(blank);
    setOpen(true);
  }

  function startEdit(p: Product) {
    setEditing(p);
    setForm({
      name: p.name,
      slug: p.slug,
      short_description: p.short_description ?? "",
      description: p.description ?? "",
      price: Number(p.price ?? 0),
      compare_at_price: p.compare_at_price ? String(p.compare_at_price) : "",
      currency: p.currency ?? "KES",
      product_type: p.product_type ?? "template",
      category: p.category ?? "",
      cover_image: p.cover_image ?? "",
      file_url: p.file_url ?? "",
      preview_url: p.preview_url ?? "",
      video_url: p.video_url ?? "",
      featured: p.featured,
      sort_order: p.sort_order ?? 0,
      is_active: p.is_active,
    });
    setOpen(true);
  }

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        name: form.name,
        slug: form.slug || slugify(form.name),
        short_description: form.short_description || null,
        description: form.description || null,
        price: Number(form.price || 0),
        compare_at_price: form.compare_at_price ? Number(form.compare_at_price) : null,
        currency: form.currency || "KES",
        product_type: form.product_type,
        category: form.category || null,
        cover_image: form.cover_image || null,
        file_url: form.file_url || null,
        preview_url: form.preview_url || null,
        video_url: form.video_url || null,
        featured: form.featured,
        sort_order: Number(form.sort_order || 0),
        is_active: form.is_active,
      };
      const query = editing
        ? supabase.from("products").update(payload as never).eq("id", editing.id)
        : supabase.from("products").insert(payload as never);
      const { error } = await query;
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success(editing ? "Product updated." : "Product added.");
      setOpen(false);
      setEditing(null);
    },
    onError: () => toast.error("Could not save that product."),
  });

  const toggle = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, boolean> }) => {
      const { error } = await supabase.from("products").update(patch as never).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "products"] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product removed.");
    },
    onError: () => toast.error("Could not remove it — it may have orders attached."),
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Products"
        description="Everything on sale in the store: books, video modules, template packs and bundles."
        action={
          <button
            onClick={startNew}
            className="font-ui h-10 rounded-sm bg-primary px-5 text-sm text-primary-foreground"
          >
            New product
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
            className="grid gap-5 md:grid-cols-2"
          >
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v, slug: f.slug || slugify(v) }))}
            />
            <Field
              label="Slug"
              value={form.slug}
              onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
            />
            <label className="block">
              <Label>Type</Label>
              <select
                value={form.product_type}
                onChange={(e) => setForm((f) => ({ ...f, product_type: e.target.value }))}
                className="font-ui mt-2 h-10 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-primary"
              >
                {typeOptions.map((t) => (
                  <option key={t} value={t}>
                    {typeLabels[t]}
                  </option>
                ))}
              </select>
            </label>
            <Field
              label="Category (shelf on the store)"
              value={form.category}
              onChange={(v) => setForm((f) => ({ ...f, category: v }))}
            />
            <Field
              label="Price"
              value={String(form.price)}
              onChange={(v) => setForm((f) => ({ ...f, price: Number(v || 0) }))}
            />
            <Field
              label="Compare-at price (optional)"
              value={form.compare_at_price}
              onChange={(v) => setForm((f) => ({ ...f, compare_at_price: v }))}
            />
            <Field
              label="Short description"
              value={form.short_description}
              onChange={(v) => setForm((f) => ({ ...f, short_description: v }))}
              className="md:col-span-2"
            />
            <label className="block md:col-span-2">
              <Label>Full description</Label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={6}
                className="font-ui mt-2 w-full rounded-sm border border-input bg-background p-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <Field
              label="Cover image URL"
              value={form.cover_image}
              onChange={(v) => setForm((f) => ({ ...f, cover_image: v }))}
            />
            <FileField
              label="Download file (delivered after payment)"
              slug={form.slug || slugify(form.name)}
              value={form.file_url}
              onChange={(v) => setForm((f) => ({ ...f, file_url: v }))}
              accept=".pdf,.zip,.docx,.xlsx,.pptx,.epub,.csv"
              className="md:col-span-2"
            />
            <Field
              label="Video URL (for modules)"
              value={form.video_url}
              onChange={(v) => setForm((f) => ({ ...f, video_url: v }))}
            />
            <Field
              label="Free preview URL"
              value={form.preview_url}
              onChange={(v) => setForm((f) => ({ ...f, preview_url: v }))}
            />
            <Field
              label="Sort order"
              value={String(form.sort_order)}
              onChange={(v) => setForm((f) => ({ ...f, sort_order: Number(v || 0) }))}
            />
            <div className="font-ui flex items-end gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                />
                Featured
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                />
                Live
              </label>
            </div>
            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={save.isPending}
                className="font-ui h-10 rounded-sm bg-primary px-5 text-sm text-primary-foreground"
              >
                {save.isPending ? "Saving…" : editing ? "Save changes" : "Add product"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-ui h-10 rounded-sm border border-border px-5 text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </Panel>
      )}

      <Panel>
        {isLoading ? (
          <Empty label="Loading products…" />
        ) : (rows ?? []).length === 0 ? (
          <Empty label="No products yet." />
        ) : (
          <Table head={["Product", "Type", "Price", "State", ""]}>
            {(rows ?? []).map((p) => (
              <tr key={p.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">/{p.slug}</p>
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  {typeLabels[p.product_type] ?? p.product_type}
                  {p.category ? ` · ${p.category}` : ""}
                </td>
                <td className="px-4 py-4 text-muted-foreground">{money(p.price, p.currency)}</td>
                <td className="px-4 py-4">
                  <div className="font-ui flex flex-col gap-1 text-xs">
                    <button
                      onClick={() => toggle.mutate({ id: p.id, patch: { is_active: !p.is_active } })}
                      className={p.is_active ? "text-primary" : "text-muted-foreground"}
                    >
                      {p.is_active ? "Live" : "Hidden"}
                    </button>
                    <button
                      onClick={() => toggle.mutate({ id: p.id, patch: { featured: !p.featured } })}
                      className={p.featured ? "text-primary" : "text-muted-foreground"}
                    >
                      {p.featured ? "Featured" : "Not featured"}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => startEdit(p)}
                    className="font-ui text-xs text-primary underline underline-offset-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${p.name}?`)) remove.mutate(p.id);
                    }}
                    className="font-ui ml-4 text-xs text-muted-foreground underline underline-offset-4"
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-ui text-xs uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </span>
  );
}

function Field({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-ui mt-2 h-10 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

function FileField({
  label,
  slug,
  value,
  onChange,
  accept,
  className,
}: {
  label: string;
  slug: string;
  value: string;
  onChange: (v: string) => void;
  accept?: string;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const stored = isStoredFile(value);

  async function upload(file: File) {
    setBusy(true);
    const key = objectKey(slug, file.name);
    const { error } = await supabase.storage
      .from(PRODUCT_BUCKET)
      .upload(key, file, { upsert: true, contentType: file.type || "application/octet-stream" });
    setBusy(false);
    if (error) {
      toast.error("Upload failed — check the file and try again.");
      return;
    }
    onChange(`${STORAGE_PREFIX}${key}`);
    toast.success("File uploaded. Save the product to publish it.");
  }

  return (
    <div className={`block ${className ?? ""}`}>
      <Label>{label}</Label>
      <div className="mt-2 space-y-3">
        <div className="font-ui flex flex-wrap items-center gap-3 text-sm">
          <label className="cursor-pointer rounded-sm border border-border px-4 py-2 text-xs uppercase tracking-[0.16em] hover:border-primary hover:text-primary">
            {busy ? "Uploading…" : stored ? "Replace file" : "Upload file"}
            <input
              type="file"
              accept={accept}
              disabled={busy}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void upload(file);
                e.target.value = "";
              }}
            />
          </label>
          {value ? (
            <span className="text-xs text-muted-foreground">
              {stored ? `Private file · ${storedFileName(value)}` : "External link"}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              No file yet — buyers will not see a download link.
            </span>
          )}
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-muted-foreground underline underline-offset-4"
            >
              Remove
            </button>
          )}
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an external download URL"
          className="font-ui h-10 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}
