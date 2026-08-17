/** Private storage bucket holding paid product deliverables. */
export const PRODUCT_BUCKET = "product-files";

/** Marker stored in products.file_url / video_url for privately hosted files. */
export const STORAGE_PREFIX = `sb://${PRODUCT_BUCKET}/`;

export function isStoredFile(value: string | null | undefined) {
  return Boolean(value && value.startsWith(STORAGE_PREFIX));
}

export function storedPath(value: string) {
  return value.slice(STORAGE_PREFIX.length);
}

export function storedFileName(value: string) {
  const path = isStoredFile(value) ? storedPath(value) : value;
  return decodeURIComponent(path.split("/").pop() ?? path);
}

/** Keeps object keys safe and predictable: slug/timestamp-name.ext */
export function objectKey(slug: string, fileName: string) {
  const clean = fileName
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
  return `${slug || "product"}/${Date.now()}-${clean}`;
}
