import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ActionLink } from "@/components/ActionButton";
import { ImageFrame } from "@/components/ImageFrame";
import { Journey } from "@/components/Journey";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { StatStrip } from "@/components/StatStrip";
import { brand } from "@/lib/brand";
import { photos } from "@/lib/photos";
import portraitAsset from "@/assets/mary-njoroge-portrait.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NeoStrategy — Businesses that do not depend on founders" },
      {
        name: "description",
        content:
          "NeoStrategy is a Nairobi operations consultancy founded by Mary Njoroge, installing the systems that free founder-led service businesses from dependency.",
      },
      { property: "og:title", content: "About NeoStrategy" },
      {
        property: "og:description",
        content:
          "We build businesses that do not depend on their founders. Not advice. Not a strategy deck. The actual install.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const paragraphs = [
  "Most founders do not have a business problem. They have a dependency problem. The business runs on them, their memory, their decisions, their presence, and it cannot move without them.",
  "NeoStrategy exists to change that.",
  "We believe a business should support a founder's life, not consume it. That the answer to founder overwhelm is not more hustle, but better design. And that the difference between a business that traps its founder and one that frees them is not effort. It is systems.",
  "A hustler pushes activity. A founder builds something that keeps working beyond their mood, their memory, and their daily intensity. Our entire practice is built to help founders become the second kind.",
  "We work with founder-led service businesses, coaches, consultants, agencies, and professional service firms, to install the operating systems that let them step back: systems the team can stand on, delivery that stays consistent, and operations that hold on the hardest days.",
  "Not advice. Not a strategy deck. The actual install.",
];

const beliefs = [
  {
    title: "Clarity attracts",
    body: "When the offer, the promise and the process are clear, the right clients recognise themselves in it.",
    detail: "We start every engagement by making the business legible — to the team, then to the market.",
  },
  {
    title: "Systems scale",
    body: "Effort has a ceiling. Design does not. A documented system compounds every week it stays alive.",
    detail: "One well-built delivery rhythm outperforms a year of heroics, every quarter.",
  },
  {
    title: "Freedom lasts",
    body: "The point is not a tidier business. The point is a founder who can step away and return to something still standing.",
    detail: "We measure our work by what keeps running on the weeks you are not in the room.",
  },
];

const journey = [
  {
    year: "The pattern",
    title: "Every business ran on one exhausted person",
    body: "Across dozens of Nairobi service firms the same shape kept appearing: brilliant founders, capable teams, and a business that stalled the moment the founder stepped out of the room.",
  },
  {
    year: "The practice",
    title: "NeoStrategy was built as an install, not advice",
    body: "Strategy decks do not change a Monday. So the work became operational: sit inside the business, map how it actually runs, and build the system with the people who will run it.",
  },
  {
    year: "The method",
    title: "The Founder Operating System",
    body: "Audit, install, partnership. Five layers — clarity, delegation, delivery, visibility, continuity — sequenced so each one holds the next.",
  },
  {
    year: "Today",
    title: "Calm execution as the standard",
    body: "Founders who take a real holiday. Teams who know what good looks like without asking. Businesses that keep their promises on the hardest weeks.",
  },
] as const;

const stats = [
  { value: 40, suffix: "+", label: "Founder-led businesses guided" },
  { value: 6, suffix: " weeks", label: "From audit to installed system" },
  { value: 5, label: "Layers in the operating system" },
  { value: 12, suffix: " yrs", label: "Operations practice" },
];

function FounderPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);

  return (
    <div ref={ref} className="relative">
      <div className="halo-pulse pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(55%_55%_at_50%_35%,color-mix(in_oklab,var(--teal)_30%,transparent),transparent_72%)]" />
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.94, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="sheen relative overflow-hidden rounded-[1.75rem] border border-primary/15 shadow-[0_70px_120px_-60px_rgba(10,90,97,0.75)]"
      >
        <motion.img
          src={portraitAsset.url}
          alt="Mary Njoroge, founder of NeoStrategy"
          width={1200}
          height={1200}
          style={reduced ? {} : { y }}
          className="aspect-[4/5] w-full scale-105 object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--charcoal)_78%,transparent)_0%,transparent_45%)]" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="font-display text-2xl text-offwhite md:text-3xl">{brand.founder}</p>
          <p className="font-ui mt-1 text-[0.62rem] uppercase tracking-[0.3em] text-offwhite/75">
            Founder · Operations strategist
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card float-slow absolute -bottom-12 left-2 hidden max-w-[15rem] rounded-2xl px-5 py-4 md:block lg:-left-14"
      >
        <p className="font-display text-lg leading-snug">Nairobi, Kenya</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/75">
          Working with founders across East Africa and beyond.
        </p>
      </motion.div>
    </div>
  );
}

function About() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="gradient-page relative overflow-hidden">
        <div className="container-page grid items-center gap-16 pt-20 pb-28 md:pt-32 md:pb-36 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
                About NeoStrategy
              </p>
            </Reveal>
            <SplitHeading
              as="h1"
              text="We build businesses that do not {depend} on their {founders.}"
              delay={0.1}
              className="font-display mt-6 max-w-3xl text-[2.5rem] leading-[1.06] md:text-6xl"
            />
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground/80">
                A Nairobi operations consultancy for founder-led service businesses — installing the
                systems that turn intensity into calm, repeatable execution.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ActionLink to="/contact" size="lg">
                  Book a call
                </ActionLink>
                <ActionLink to="/services" variant="outline" size="lg">
                  See the system
                </ActionLink>
              </div>
            </Reveal>
          </div>

          <FounderPortrait />
        </div>
      </section>

      <Marquee
        items={["Clarity attracts", "Systems scale", "Freedom lasts", "Nairobi, Kenya"]}
      />

      {/* Story */}
      <section>
        <div className="container-page section-y grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="space-y-7">
            {paragraphs.map((text, i) => (
              <Reveal key={i} delay={0.04 * i}>
                <p className="text-lg leading-relaxed text-foreground/85">{text}</p>
              </Reveal>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 26, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-lg bg-[radial-gradient(60%_60%_at_50%_20%,color-mix(in_oklab,var(--teal)_20%,transparent),transparent_70%)]" />
              <div className="overflow-hidden rounded-lg shadow-[0_50px_90px_-55px_rgba(10,90,97,0.6)]">
                <img
                  src={photos.session.src}
                  alt={photos.session.alt}
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className="aspect-square w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                />
              </div>
              <div className="glass-card mt-[-2.5rem] ml-4 mr-8 rounded-2xl px-6 py-5">
                <p className="font-display text-xl leading-snug">A different kind of consultant</p>
                <p className="font-ui mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-primary">
                  In the business, not above it
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/75">
                  Mary works with founders across Nairobi and beyond to build calm, systems-led
                  businesses that keep their promises without their founder in the middle of
                  everything.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="gradient-wash border-y border-border/50">
        <div className="container-page py-20 md:py-28">
          <StatStrip stats={stats} />
        </div>
      </section>

      {/* Journey */}
      <section className="gradient-deep grain relative overflow-hidden text-offwhite">
        <img
          src={photos.texture.src}
          alt=""
          aria-hidden
          loading="lazy"
          className="drift pointer-events-none absolute inset-0 size-full object-cover opacity-10"
        />
        <div className="container-page section-y relative">
          <Reveal className="max-w-2xl">
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-offwhite/70">
              How we got here
            </p>
          </Reveal>
          <SplitHeading
            text="A practice built from one repeating pattern."
            className="font-display mt-5 max-w-3xl text-[2.1rem] leading-[1.08] md:text-5xl"
          />
          <div className="mt-16 text-offwhite/90 [&_h3]:text-offwhite [&_p]:text-offwhite/75">
            <Journey steps={journey} />
          </div>
        </div>
      </section>

      {/* Beliefs — hover reveals the detail behind the title */}
      <section>
        <div className="container-page section-y">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              What we believe
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <div className="lift group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card p-7">
                  <div className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--teal-wash)_90%,transparent),transparent)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                  <div className="relative">
                    <span className="font-ui text-[0.6rem] uppercase tracking-[0.3em] text-primary/70">
                      0{i + 1}
                    </span>
                    <h3 className="font-display mt-4 text-2xl transition-colors duration-500 group-hover:text-primary">
                      {b.title}
                    </h3>
                    <p className="mt-4 text-foreground/75">{b.body}</p>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-4 border-l-2 border-primary/40 pl-4 text-sm italic text-foreground/70">
                          {b.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-16 grid gap-6 md:grid-cols-2">
            <ImageFrame src={photos.team.src} alt={photos.team.alt} ratio="aspect-[4/3]" />
            <ImageFrame src={photos.calm.src} alt={photos.calm.alt} ratio="aspect-[4/3]" />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-deep grain relative overflow-hidden text-offwhite">
        <div className="container-page section-y relative">
          <SplitHeading
            text="If the business stops when you do, that is the thing to fix first."
            className="font-display max-w-3xl text-3xl leading-tight md:text-5xl"
          />
          <Reveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ActionLink to="/contact" variant="onDark" size="lg">
              Book a call
            </ActionLink>
            <ActionLink to="/newsletter" variant="outline" size="lg" className="border-offwhite/40 text-offwhite hover:bg-offwhite/10">
              Send me the guide
            </ActionLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
