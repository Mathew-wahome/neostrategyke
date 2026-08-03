import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideBox } from "@/components/GuideBox";
import { Reveal } from "@/components/Reveal";
import { fetchPosts } from "@/lib/posts.functions";
import type { PublicPost } from "@/lib/posts.server";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "The thinking behind calm execution — NeoStrategy Journal" },
      {
        name: "description",
        content:
          "Notes, lessons, and systems for founders who want to build a business that does not depend on them.",
      },
      { property: "og:title", content: "The thinking behind calm execution" },
      {
        property: "og:description",
        content:
          "Notes, lessons, and systems for founders building businesses that do not depend on them.",
      },
    ],
  }),
  loader: () => fetchPosts(),
  errorComponent: () => (
    <div className="container-read py-32">
      <h1 className="font-display text-3xl">The journal did not load</h1>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-read py-32">
      <h1 className="font-display text-3xl">Nothing here yet</h1>
    </div>
  ),
  component: Blog,
});

function Blog() {
  const posts = Route.useLoaderData();

  return (
    <>
      <section className="container-page pt-24 pb-12 md:pt-36 md:pb-16">
        <Reveal>
          <h1 className="font-display max-w-3xl text-[2.4rem] leading-[1.1] md:text-6xl">
            The thinking behind calm execution.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/85">
            Notes, lessons, and systems for founders who want to build a business that does not
            depend on them. Everything here starts as a question we could not stop thinking about.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-border/60">
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {posts.map((post: PublicPost, i: number) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <article>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">
                    {post.category}
                  </p>
                  <h2 className="font-display mt-4 text-2xl leading-tight md:text-3xl">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="transition-colors hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-foreground/75">{post.excerpt}</p>
                  <p className="font-ui mt-4 text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {post.readingTime}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-24">
            <GuideBox source="blog index" />
          </div>
        </div>
      </section>
    </>
  );
}
