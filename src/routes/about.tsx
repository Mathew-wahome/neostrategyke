import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ActionLink } from "@/components/ActionButton";
import { ImageFrame } from "@/components/ImageFrame";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/brand";
import { founderPhoto, photos } from "@/lib/photos";

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
  },
  {
    title: "Systems scale",
    body: "Effort has a ceiling. Design does not. A documented system compounds every week it stays alive.",
  },
  {
    title: "Freedom lasts",
    body: "The point is not a tidier business. The point is a founder who can step away and return to something still standing.",
  },
];

function About() {
  const reduced = useReducedMotion();

  return (
    <>
      <section className="gradient-page relative overflow-hidden">
        <div className="container-page pt-20 pb-16 md:pt-32 md:pb-24">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              About NeoStrategy
            </p>
            <h1 className="font-display mt-6 max-w-4xl text-[2.5rem] leading-[1.06] md:text-6xl">
              We build businesses that do not{" "}
              <span className="text-gradient-teal">depend on their founders.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <Marquee
        items={["Clarity attracts", "Systems scale", "Freedom lasts", "Nairobi, Kenya"]}
      />

      <section>
        <div className="container-page section-y grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
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
              transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative"
            >
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-lg bg-[radial-gradient(60%_60%_at_50%_20%,color-mix(in_oklab,var(--teal)_22%,transparent),transparent_70%)]" />
              <div className="overflow-hidden rounded-lg shadow-[0_50px_90px_-55px_rgba(10,90,97,0.6)]">
                <img
                  src={founderPhoto}
                  alt="Mary Njoroge, founder of NeoStrategy"
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="glass-card mt-[-2.5rem] ml-4 mr-8 rounded-lg px-6 py-5 backdrop-blur">
                <p className="font-display text-xl leading-snug">{brand.founder}</p>
                <p className="font-ui mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-primary">
                  Founder · Operations strategist
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

      <section className="gradient-wash border-y border-border/50">
        <div className="container-page section-y">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              What we believe
            </p>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <div className="hairline-top pt-6">
                  <h3 className="font-display text-2xl">{b.title}</h3>
                  <p className="mt-4 text-foreground/75">{b.body}</p>
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

      <section className="container-page section-y">
        <Reveal className="flex flex-col gap-3 sm:flex-row">
          <ActionLink to="/contact" size="lg">
            Book a call
          </ActionLink>
          <ActionLink to="/newsletter" variant="outline" size="lg">
            Send me the guide
          </ActionLink>
        </Reveal>
      </section>
    </>
  );
}
