import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ImageFrame } from "@/components/ImageFrame";
import { Marquee } from "@/components/Marquee";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/photos";
import { fetchProducts } from "@/lib/shop.functions";
import { categoriesOf, money, productCover, typeLabels, type StoreProduct } from "@/lib/shop";

export const Route = createFileRoute("/shop/")({
  loader: async () => fetchProducts(),
  head: () => ({
    meta: [
      { title: "The Store — Books, modules and systems | NeoStrategy" },
      {
        name: "description",
        content:
          "Books, video modules and template packs from Mary Njoroge. The systems we install with clients, built so a service founder can install them alone.",
      },
      { property: "og:title", content: "The NeoStrategy Store" },
      {
        property: "og:description",
        content: "Books, video modules and template packs for service founders who want calm.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => (
    <div className="container-read py-32 text-center">
      <h1 className="font-display text-3xl">The store did not load</h1>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-read py-32 text-center">
      <h1 className="font-display text-3xl">Not found</h1>
    </div>
  ),
  component: Store,
});

function Store() {
  const products = Route.useLoaderData() as StoreProduct[];
  const categories = useMemo(() => categoriesOf(products), [products]);
  const [active, setActive] = useState("All");

  const shown = active === "All" ? products : products.filter((p) => p.category === active);
  const featured = products.filter((p) => p.featured).slice(0, 1)[0];

  return (
    <>
      <section className="gradient-page relative overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.5]" />
        <div className="container-page relative grid items-center gap-14 pt-20 pb-16 md:pt-32 md:pb-24 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              The store
            </p>
            <h1 className="font-display mt-6 text-[2.6rem] leading-[1.04] md:text-[4.2rem]">
              Everything we install,
              <br />
              <span className="text-gradient-teal">in your hands.</span>
            </h1>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-foreground/85">
              Books, video modules and template packs drawn from the same operating system we build
              inside client businesses. Buy once, download instantly, install at your own pace.
            </p>
            <div className="font-ui mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>Instant delivery</span>
              <span>Secure card &amp; M-Pesa</span>
              <span>Built in Nairobi</span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ImageFrame
              src={photos.kit.src}
              alt={photos.kit.alt}
              ratio="aspect-[4/3]"
              priority
              caption="Resources built from ten years of operations work"
            />
          </Reveal>
        </div>
      </section>

      <Marquee
        items={[
          "Books",
          "Video modules",
          "SOP libraries",
          "Dashboards",
          "Onboarding kits",
          "Delegation maps",
        ]}
      />

      {featured && <FeaturedRow product={featured} />}

      <section id="catalogue">
        <div className="container-page py-16 md:py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-3xl leading-tight md:text-[2.75rem]">The catalogue</h2>
            <div className="font-ui flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors duration-300 ${
                    active === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {shown.length === 0 && (
            <p className="font-ui mt-16 text-center text-sm text-muted-foreground">
              Nothing in this shelf yet. New resources are added regularly.
            </p>
          )}
        </div>
      </section>

      <section className="gradient-deep relative overflow-hidden text-offwhite">
        <div className="grain pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-read relative py-20 md:py-28">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight md:text-[2.6rem]">
              Not ready to buy?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-offwhite/80">
              Start with the free guide, 10 Systems Every Founder Needs, and the weekly letter on
              building a business that runs without you.
            </p>
            <NewsletterForm className="mt-9 max-w-lg" source="shop" tone="dark" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function FeaturedRow({ product }: { product: StoreProduct }) {
  const cover = productCover(product);
  return (
    <section className="border-b border-border/60">
      <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <ImageFrame src={cover.src} alt={cover.alt || product.name} ratio="aspect-[5/4]" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
            Most reached for
          </p>
          <h2 className="font-display mt-5 text-[2.1rem] leading-[1.08] md:text-[3rem]">
            {product.name}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
            {product.short_description ?? product.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <span className="font-ui text-sm uppercase tracking-[0.2em] text-primary">
              {money(product.price, product.currency)}
            </span>
            <Link
              to="/shop/$slug"
              params={{ slug: product.slug }}
              className="font-ui group inline-flex h-11 items-center rounded-sm bg-primary px-6 text-sm text-primary-foreground transition-colors hover:bg-teal-deep"
            >
              View the resource
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: StoreProduct; index: number }) {
  const cover = productCover(product);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 0.61, 0.36, 1] }}
    >
      <Link
        to="/shop/$slug"
        params={{ slug: product.slug }}
        className="group lift block h-full overflow-hidden rounded-lg border border-border/70 bg-background"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-teal-wash">
          <img
            src={cover.src}
            alt={cover.alt || product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/5 to-transparent opacity-70" />
          <span className="font-ui absolute left-4 top-4 rounded-full bg-offwhite/90 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-teal-deep">
            {typeLabels[product.product_type] ?? "Resource"}
          </span>
          <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="font-ui text-xs uppercase tracking-[0.2em] text-offwhite">
              Open →
            </span>
          </div>
        </div>
        <div className="flex h-[calc(100%-0px)] flex-col p-6">
          <h3 className="font-display text-xl leading-snug">{product.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {product.short_description ?? ""}
          </p>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-ui text-sm tracking-wide text-primary">
              {money(product.price, product.currency)}
            </span>
            {product.compare_at_price ? (
              <span className="font-ui text-xs text-muted-foreground line-through">
                {money(product.compare_at_price, product.currency)}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
