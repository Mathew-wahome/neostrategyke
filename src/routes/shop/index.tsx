import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ProductGlyph, StickyWall, Whiteboard, glyphFor } from "@/components/Explainers";
import { Marquee } from "@/components/Marquee";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { fetchProducts } from "@/lib/shop.functions";
import { categoriesOf, money, productCover, typeLabels, type StoreProduct } from "@/lib/shop";

export const Route = createFileRoute("/shop/")({
  loader: async () => fetchProducts(),
  head: () => ({
    meta: [
      { title: "Products — Build it yourself | Neostrategy" },
      {
        name: "description",
        content:
          "The same frameworks we use with clients, packaged so you can use them on your own: the Founder's Flow Map, the practical guide to systems, and the Service Founder Systems Starter Kit.",
      },
      { property: "og:title", content: "Neostrategy Products — Build it yourself" },
      {
        property: "og:description",
        content:
          "Not every founder is ready to work with someone. These are the tools to build the systems yourself.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => (
    <div className="container-read py-32 text-center">
      <h1 className="font-display text-3xl">The products did not load</h1>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-read py-32 text-center">
      <h1 className="font-display text-3xl">Not found</h1>
    </div>
  ),
  component: Products,
});

/** The Starter Kit only shows when a live, purchasable product exists for it. */
function findStarterKit(products: StoreProduct[]) {
  return (
    products.find((p) => /starter kit/i.test(p.name)) ??
    products.find((p) => /starter-kit/i.test(p.slug)) ??
    null
  );
}

type SortKey = "popular" | "price-asc" | "price-desc" | "newest";

const sortLabels: Record<SortKey, string> = {
  popular: "Most popular",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  newest: "Curated order",
};

function Products() {
  const products = Route.useLoaderData() as StoreProduct[];
  const categories = useMemo(() => categoriesOf(products), [products]);
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");

  const priceCeiling = useMemo(
    () => Math.max(1000, ...products.map((p) => Math.ceil(Number(p.price) / 500) * 500)),
    [products],
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const cap = maxPrice ?? priceCeiling;

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (active !== "All" && p.category !== active) return false;
      if (Number(p.price) > cap) return false;
      if (!q) return true;
      return [p.name, p.short_description, p.description, p.category, typeLabels[p.product_type]]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q));
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === "price-desc") sorted.sort((a, b) => Number(b.price) - Number(a.price));
    else if (sort === "popular")
      sorted.sort(
        (a, b) =>
          (b.purchases ?? 0) - (a.purchases ?? 0) ||
          Number(b.featured) - Number(a.featured) ||
          a.sort_order - b.sort_order,
      );
    return sorted;
  }, [products, active, cap, query, sort]);

  const filtersOn = active !== "All" || query.trim() !== "" || maxPrice !== null;
  const starterKit = useMemo(() => findStarterKit(products), [products]);

  return (
    <>
      <section className="gradient-page relative overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.5]" />
        <div className="container-page relative grid items-center gap-14 pt-14 pb-10 md:pt-20 md:pb-14 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">Tools</p>
            <h1 className="font-display mt-6 text-[2.6rem] leading-[1.04] md:text-[4.2rem]">
              Build it <span className="text-gradient-teal">yourself.</span>
            </h1>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-foreground/85">
              Not every founder is ready to work with someone, and not every business needs to yet.
              These are the same frameworks we use with clients, packaged so you can use them on
              your own.
            </p>
            <div className="font-ui mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>Instant delivery</span>
              <span>Card, M-Pesa &amp; Airtel Money</span>
              <span>Built in Nairobi</span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Whiteboard kicker="The shelf" title="What you are actually buying">
              <StickyWall
                columns="grid-cols-1 xs:grid-cols-2"
                notes={[
                  { label: "Not", text: "A 200-page theory PDF" },
                  { label: "Yes", text: "SOP templates you can fill in today" },
                  { label: "Yes", text: "Delegation and onboarding maps" },
                  { label: "Yes", text: "A KPI tracker your team will use" },
                ]}
              />
            </Whiteboard>
          </Reveal>
        </div>
      </section>

      <Marquee
        items={[
          "The Founder's Flow Map",
          "SOP libraries",
          "Delegation maps",
          "Client onboarding",
          "Delivery checklists",
          "KPI trackers",
        ]}
      />

      {/* The three named tools */}
      <section>
        <div className="container-page section-y grid gap-8 lg:grid-cols-3">
          <Reveal>
            <article className="lift flex h-full flex-col rounded-2xl border border-primary/15 bg-teal-wash p-8">
              <div className="mb-5 h-28 overflow-hidden rounded-md">
                <ProductGlyph kind="map" />
              </div>
              <p className="font-ui text-[0.62rem] uppercase tracking-[0.28em] text-primary">Free</p>
              <h2 className="font-display mt-4 text-2xl leading-snug">
                The Founder&rsquo;s Flow Map
              </h2>
              <p className="mt-5 flex-1 leading-relaxed text-foreground/80">
                The one page we start every engagement with. It shows how work moves through your
                business, from the first message to the money landing, and which five things to
                write down first. It answers the question most founders are actually stuck on. Not
                how to write an SOP. Which ones to write.
              </p>
              <Link
                to="/newsletter"
                className="font-ui mt-8 inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-6 py-2.5 text-center text-sm leading-snug text-primary-foreground transition-colors hover:bg-teal-deep"
              >
                Send me the map
              </Link>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="lift flex h-full flex-col rounded-2xl border border-border/70 bg-card p-8">
              <div className="mb-5 h-28 overflow-hidden rounded-md">
                <ProductGlyph kind="book" />
              </div>
              <p className="font-ui inline-flex w-fit rounded-full bg-note-yellow px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-charcoal">
                Coming soon
              </p>
              <h2 className="font-display mt-4 text-2xl leading-snug">
                What Systems Actually Are: a practical guide
              </h2>
              <p className="mt-5 flex-1 leading-relaxed text-foreground/80">
                Three questions founders ask us constantly. What is a system. How do you write an
                SOP. How do you decide what to write SOPs about. This answers all three in one
                sitting, with worksheets so you can do it on your own business.
              </p>
              <p className="font-ui mt-8 text-sm text-muted-foreground">
                Coming soon. Join the list and we will tell you first.
              </p>
              <NewsletterForm
                className="mt-4 [&>div]:flex-col [&_button]:w-full"
                source="products_guide"
                cta="Tell me first"
              />
            </article>
          </Reveal>

          {starterKit && (
            <Reveal delay={0.2}>
              <article className="lift flex h-full flex-col rounded-2xl border border-border/70 bg-card p-8">
                <div className="mb-5 h-28 overflow-hidden rounded-md">
                  <ProductGlyph kind="grid" />
                </div>
                <p className="font-ui text-[0.62rem] uppercase tracking-[0.28em] text-primary">
                  Templates
                </p>
                <h2 className="font-display mt-4 text-2xl leading-snug">
                  The Service Founder Systems Starter Kit
                </h2>
                <p className="mt-5 flex-1 leading-relaxed text-foreground/80">
                  The templates for the systems every service business needs. SOPs, delegation maps,
                  client onboarding, delivery checklists, a KPI tracker and meeting rhythms. The
                  free map shows you what you need. This gives you the tools to build it.
                </p>
                <Link
                  to="/shop/$slug"
                  params={{ slug: starterKit.slug }}
                  className="font-ui mt-8 inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-6 py-2.5 text-center text-sm leading-snug text-primary-foreground transition-colors hover:bg-teal-deep"
                >
                  Get the Starter Kit
                </Link>
              </article>
            </Reveal>
          )}
        </div>
      </section>

      {products.length > 0 && (
        <section id="catalogue" className="border-t border-border/60">
          <div className="container-page py-12 md:py-16">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-3xl leading-tight md:text-[2.75rem]">
                Everything in the shelf
              </h2>
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {shown.length} {shown.length === 1 ? "tool" : "tools"}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="glass-card mt-10 rounded-2xl p-5 md:p-6">
                <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr] lg:items-center">
                  <label className="block">
                    <span className="sr-only">Search products</span>
                    <div className="relative">
                      <span
                        aria-hidden
                        className="font-ui pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                      >
                        ⌕
                      </span>
                      <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search SOPs, templates, guides…"
                        className="font-ui h-12 w-full rounded-sm border border-input bg-background/80 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      />
                    </div>
                  </label>

                  <label className="font-ui block text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    Up to {money(cap)}
                    <input
                      type="range"
                      min={0}
                      max={priceCeiling}
                      step={500}
                      value={cap}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-primary/20 accent-primary"
                    />
                  </label>

                  <label className="font-ui block text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    Sort by
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortKey)}
                      className="font-ui mt-2 h-12 w-full rounded-sm border border-input bg-background/80 px-3 text-sm normal-case tracking-normal text-foreground outline-none transition-colors focus:border-primary"
                    >
                      {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                        <option key={k} value={k}>
                          {sortLabels[k]}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="font-ui mt-5 flex flex-wrap items-center gap-2 border-t border-primary/10 pt-5">
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
                  {filtersOn && (
                    <button
                      onClick={() => {
                        setActive("All");
                        setQuery("");
                        setMaxPrice(null);
                      }}
                      className="link-sweep ml-auto text-xs uppercase tracking-[0.16em] text-primary"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
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
                {filtersOn
                  ? "Nothing matches those filters yet. Try a wider price or a different search."
                  : "Nothing in this shelf yet. New tools are added regularly."}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="gradient-deep relative overflow-hidden text-offwhite">
        <div className="grain pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-read relative py-12 md:py-16">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight md:text-[2.6rem]">
              Not ready to buy?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-offwhite/80">
              Start with the Founder&rsquo;s Flow Map, free, and the weekly letter on building a
              business that runs without you.
            </p>
            <NewsletterForm
              className="mt-9 max-w-lg"
              source="products"
              tone="dark"
              cta="Send me the map"
            />
          </Reveal>
        </div>
      </section>

      <ClosingCTA />
    </>
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
          {cover ? (
            <img
              src={cover.src}
              alt={cover.alt || product.name}
              loading="lazy"
              className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
            />
          ) : (
            <div className="size-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]">
              <ProductGlyph kind={glyphFor(product.slug)} label={product.category ?? undefined} />
            </div>
          )}
          <span className="font-ui absolute left-4 top-4 rounded-full bg-offwhite/90 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-teal-deep">
            {typeLabels[product.product_type] ?? "Resource"}
          </span>
          <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="font-ui text-xs uppercase tracking-[0.2em] text-offwhite">Open →</span>
          </div>
        </div>
        <div className="flex flex-col p-6">
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
