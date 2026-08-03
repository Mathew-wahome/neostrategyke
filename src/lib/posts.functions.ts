import { createServerFn } from "@tanstack/react-start";
import { listPublishedPosts, getPublishedPost } from "./posts.server";

export const fetchPosts = createServerFn({ method: "GET" }).handler(async () =>
  listPublishedPosts(),
);

export const fetchPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug) }))
  .handler(async ({ data }) => getPublishedPost(data.slug));
