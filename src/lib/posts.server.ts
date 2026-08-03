import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type PublicPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingTime: string;
  body: string[];
};

function client() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

type Row = {
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  content: string | null;
  published_at: string | null;
  created_at: string;
};

function toPost(row: Row): PublicPost {
  const content = row.content ?? "";
  return {
    slug: row.slug,
    title: row.title,
    category: row.category ?? "Notes",
    excerpt: row.excerpt ?? content.slice(0, 160),
    date: row.published_at ?? row.created_at,
    readingTime: readingTime(content),
    body: content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
  };
}

export async function listPublishedPosts(): Promise<PublicPost[]> {
  const { data, error } = await client()
    .from("blog_posts")
    .select("slug,title,category,excerpt,content,published_at,created_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => toPost(r as Row));
}

export async function getPublishedPost(slug: string): Promise<PublicPost | null> {
  const { data, error } = await client()
    .from("blog_posts")
    .select("slug,title,category,excerpt,content,published_at,created_at,seo_title,seo_description")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? toPost(data as Row) : null;
}
