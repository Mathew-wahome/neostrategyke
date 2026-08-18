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

/**
 * Returns the uploaded cover when there is one. Otherwise null, and the UI
 * draws a unique hand-made infographic for that product instead of a photo.
 */
export function productCover(product: { cover_image: string | null; slug: string }) {
  return product.cover_image ? { src: product.cover_image, alt: "" } : null;
}

export function money(amount: number, currency = "KES") {
  return `${currency} ${Number(amount || 0).toLocaleString("en-KE")}`;
}

export function categoriesOf(products: StoreProduct[]) {
  const set = new Set<string>();
  for (const p of products) if (p.category) set.add(p.category);
  return ["All", ...Array.from(set)];
}

/**
 * Normalises any Kenyan mobile number to 2547XXXXXXXX / 2541XXXXXXXX.
 * Accepts +254…, 00254…, 254…, 07…, 01…, 7…, 1… with any separators.
 */
export function normaliseKePhone(raw: string) {
  let digits = (raw || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("254")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.replace(/^0+/, "");
  if (digits.length > 9) digits = digits.slice(-9);
  return `254${digits}`;
}

/** Safaricom (M-Pesa) and Airtel numbers alike: 254 + 9 digits starting 7 or 1. */
export function isKePhone(raw: string) {
  return /^254[71]\d{8}$/.test(normaliseKePhone(raw));
}
