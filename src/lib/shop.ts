import { photos } from "@/lib/photos";
import type { StoreProduct } from "@/lib/shop.server";

export type { StoreProduct };

export const typeLabels: Record<string, string> = {
  ebook: "Book",
  template: "Template pack",
  course: "Video module",
  video: "Video",
  bundle: "Bundle",
  other: "Resource",
};

export const typeOptions = ["ebook", "template", "course", "video", "bundle", "other"] as const;

const fallbackCovers = [photos.kit, photos.systems, photos.workshop, photos.session, photos.calm];

export function productCover(product: { cover_image: string | null; slug: string }) {
  if (product.cover_image) return { src: product.cover_image, alt: "" };
  let sum = 0;
  for (const ch of product.slug) sum += ch.charCodeAt(0);
  return fallbackCovers[sum % fallbackCovers.length]!;
}

export function money(amount: number, currency = "KES") {
  return `${currency} ${Number(amount || 0).toLocaleString("en-KE")}`;
}

export function categoriesOf(products: StoreProduct[]) {
  const set = new Set<string>();
  for (const p of products) if (p.category) set.add(p.category);
  return ["All", ...Array.from(set)];
}
