import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideBox } from "@/components/GuideBox";
import { ImageFrame } from "@/components/ImageFrame";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/photos";
import { fetchPosts } from "@/lib/posts.functions";
import type { PublicPost } from "@/lib/posts.server";

const covers = [photos.systems, photos.calm, photos.workshop, photos.session, photos.team, photos.texture];


export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "The thinking behind calm execution — Neostrategy Journal" },
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
      <section className="gradient-page relative overflow-hidden">
        <div className="container-page pt-20 pb-16 md:pt-32 md:pb-20">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              The journal
            </p>
            <h1 className="font-display mt-6 max-w-3xl text-[2.5rem] leading-[1.06] md:text-6xl">
              The thinking behind <span className="text-gradient-teal">calm execution.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-9 max-w-2xl text-lg leading-relaxed text-foreground/85">
              Notes, lessons, and systems for founders who want to build a business that does not
              depend on them. Everything here starts as a question we could not stop thinking about.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {posts.map((post: PublicPost, i: number) => {
              const cover = covers[i % covers.length]!;
              return (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <article className="group">
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
                      <ImageFrame src={cover.src} alt={cover.alt} ratio="aspect-[16/10]" />
                    </Link>
                    <p className="font-ui mt-6 text-[0.65rem] uppercase tracking-[0.26em] text-primary">
                      {post.category}
                    </p>
                    <h2 className="font-display mt-3 text-2xl leading-tight md:text-3xl">
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
              );
            })}
          </div>


          <div className="mt-24">
            <GuideBox source="blog index" />
          </div>
        </div>
      </section>
    </>
  );
}
