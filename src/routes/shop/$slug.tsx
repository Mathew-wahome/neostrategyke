import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ActionAnchor, ActionButton } from "@/components/ActionButton";
import { ImageFrame } from "@/components/ImageFrame";
import { ProductGlyph, glyphFor } from "@/components/Explainers";
import { Reveal } from "@/components/Reveal";
import { fetchProduct, fetchProducts } from "@/lib/shop.functions";
import { CheckoutPanel } from "@/components/CheckoutPanel";
import { money, productCover, typeLabels, type StoreProduct } from "@/lib/shop";
import { useSiteSettings, waLink } from "@/lib/site-settings";

export const Route = createFileRoute("/shop/$slug")({
  loader: async ({ params }) => {
    const product = await fetchProduct({ data: { slug: params.slug } });
    if (!product) throw notFound();
    const all = await fetchProducts();
    return { product, related: all.filter((p) => p.slug !== product.slug).slice(0, 3) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Neostrategy Products` },
          {
            name: "description",
            content:
              loaderData.product.short_description ??
              `${loaderData.product.name} from Neostrategy — instant digital delivery.`,
          },
          { property: "og:title", content: loaderData.product.name },
          {
            property: "og:description",
            content: loaderData.product.short_description ?? "A Neostrategy resource.",
          },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [],
  }),
  errorComponent: () => (
    <div className="container-read py-32 text-center">
      <h1 className="font-display text-3xl">This resource did not load</h1>
      <Link to="/shop" className="font-ui mt-6 inline-block text-primary underline">
        Back to the tools
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-read py-32 text-center">
      <h1 className="font-display text-3xl">We could not find that resource</h1>
      <Link to="/shop" className="font-ui mt-6 inline-block text-primary underline">
        Back to the tools
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData() as {
    product: StoreProduct;
    related: StoreProduct[];
  };
  const cover = productCover(product);
  const settings = useSiteSettings();
  const [open, setOpen] = useState(false);

  const whatsappUrl = waLink(
    settings.whatsapp_number,
    `Hi Neostrategy, I'd like to buy ${product.name} (${money(product.price, product.currency)}).`,
  );

  return (
    <>
      <section className="gradient-page relative overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-50" />
        <div className="container-page relative grid gap-14 pt-14 pb-10 md:pt-20 md:pb-14 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            {cover ? (
              <ImageFrame
                src={cover.src}
                alt={cover.alt || product.name}
                ratio="aspect-[4/3]"
                priority
              />
            ) : (
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <ProductGlyph kind={glyphFor(product.slug)} label={product.category ?? undefined} />
              </div>
            )}
            {product.preview_url && (
              <a
                href={product.preview_url}
                target="_blank"
                rel="noreferrer"
                className="font-ui link-sweep mt-5 inline-block text-sm text-primary"
              >
                Look inside first →
              </a>
            )}
          </Reveal>

          <Reveal delay={0.12}>
            <div className="font-ui flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.22em]">
              <Link to="/shop" className="text-muted-foreground hover:text-primary">
                Products
              </Link>
              <span className="text-border">/</span>
              <span className="text-primary">
                {typeLabels[product.product_type] ?? "Resource"}
              </span>
            </div>
            <h1 className="font-display mt-6 text-[2.3rem] leading-[1.06] md:text-[3.4rem]">
              {product.name}
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-foreground/85">
              {product.short_description}
            </p>
            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-display text-3xl text-primary">
                {money(product.price, product.currency)}
              </span>
              {product.compare_at_price ? (
                <span className="font-ui text-sm text-muted-foreground line-through">
                  {money(product.compare_at_price, product.currency)}
                </span>
              ) : null}
            </div>

            {open ? (
              <CheckoutPanel product={product} whatsappUrl={whatsappUrl} />
            ) : (
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ActionButton size="lg" onClick={() => setOpen(true)}>
                  Buy now
                </ActionButton>
                <ActionAnchor
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                  size="lg"
                >
                  Ask a question
                </ActionAnchor>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-read py-16 md:py-24">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl">What this is</h2>
            <div className="mt-7 space-y-6 text-lg leading-relaxed text-foreground/80">
              {(product.description ?? "").split(/\n{2,}/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Instant delivery", d: "The download link lands the moment payment clears." },
              { t: "Yours to keep", d: "Editable files you can adapt to how your business works." },
              { t: "Built from practice", d: "Drawn from live installs, not theory." },
            ].map((b) => (
              <div
                key={b.t}
                className="group rounded-lg border border-border/70 bg-background p-6 transition-colors hover:border-primary/40"
              >
                <p className="font-ui text-xs uppercase tracking-[0.18em] text-primary">{b.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border/60">
          <div className="container-page py-16 md:py-20">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl">Also in the tools</h2>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {related.map((p) => {
                const c = productCover(p);
                return (
                  <Reveal key={p.id}>
                    <Link
                      to="/shop/$slug"
                      params={{ slug: p.slug }}
                      className="group lift block overflow-hidden rounded-lg border border-border/70 bg-background"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-teal-wash">
                        {c ? (
                          <img
                            src={c.src}
                            alt={c.alt || p.name}
                            loading="lazy"
                            className="size-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : (
                          <ProductGlyph kind={glyphFor(p.slug)} />
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg leading-snug">{p.name}</h3>
                        <p className="font-ui mt-2 text-xs uppercase tracking-[0.16em] text-primary">
                          {money(p.price, p.currency)}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
