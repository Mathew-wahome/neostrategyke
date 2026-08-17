import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GuideBox } from "@/components/GuideBox";
import { Reveal } from "@/components/Reveal";
import { fetchPost } from "@/lib/posts.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Neostrategy` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  errorComponent: () => (
    <div className="container-read py-32">
      <h1 className="font-display text-3xl">This post did not load</h1>
      <Link to="/blog" className="font-ui mt-6 inline-block text-primary underline">
        Back to the journal
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-read py-32">
      <h1 className="font-display text-3xl">We could not find that post</h1>
      <Link to="/blog" className="font-ui mt-6 inline-block text-primary underline">
        Back to the journal
      </Link>
    </div>
  ),
  component: Post,
});

function Post() {
  const post = Route.useLoaderData();

  return (
    <article className="container-read pt-24 pb-24 md:pt-36">
      <Reveal>
        <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">{post.category}</p>
        <h1 className="font-display mt-5 text-[2.2rem] leading-[1.12] md:text-5xl">{post.title}</h1>
        <p className="font-ui mt-6 text-xs text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          · {post.readingTime}
        </p>
      </Reveal>

      <div className="mt-12 space-y-7">
        {post.body.map((p: string, i: number) => (
          <Reveal key={i} delay={i * 0.04}>
            <p className="text-lg leading-relaxed text-foreground/85">{p}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <GuideBox source={`blog post: ${post.slug}`} />
      </div>

      <Link to="/blog" className="font-ui mt-12 inline-block text-sm text-primary underline underline-offset-4">
        Back to the journal
      </Link>
    </article>
  );
}
