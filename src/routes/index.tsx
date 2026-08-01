import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ActionLink } from "@/components/ActionButton";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeoStrategy — Clarity attracts. Systems scale. Freedom lasts." },
      {
        name: "description",
        content:
          "NeoStrategy helps founder-led service businesses move from founder dependency to calm execution, so the business runs on systems, not on its founder.",
      },
      { property: "og:title", content: "NeoStrategy — Clarity attracts. Systems scale." },
      {
        property: "og:description",
        content:
          "Operations systems that let founder-led service businesses run without their founder in the middle of everything.",
      },
    ],
  }),
  component: Index,
});

const stages = [
  {
    label: "Start here",
    title: "The Founder Operating Systems Audit",
    body: "We find exactly where the business depends on its founder, and you leave with a prioritised roadmap.",
  },
  {
    label: "Then build",
    title: "The Calm Execution Install",
    body: "Six weeks to install the systems the audit surfaced.",
  },
  {
    label: "Then sustain",
    title: "The Founder Operations Partnership",
    body: "Ongoing support so the system grows with the business.",
  },
];

function Hero() {
  const reduced = useReducedMotion();
  const words = brand.tagline.split(" ");

  return (
    <section className="container-page pt-24 pb-20 md:pt-40 md:pb-36">
      <h1 className="font-display max-w-4xl text-[2.6rem] leading-[1.08] md:text-7xl">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12 * i, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </h1>

      <Reveal delay={0.5} className="mt-10 max-w-2xl">
        <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">
          NeoStrategy helps founder-led service businesses move from founder dependency to calm
          execution, so the business runs on systems, not on its founder.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ActionLink to="/newsletter" size="lg">
            Send me the guide
          </ActionLink>
          <ActionLink to="/contact" variant="outline" size="lg">
            Book a call
          </ActionLink>
        </div>
      </Reveal>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />

      <section className="border-t border-border/60">
        <div className="container-read section-y">
          <Reveal>
            <p className="font-display text-2xl leading-snug md:text-4xl">
              The inbox runs the business. The team waits on the founder for answers. The week is
              reactive, and the work that would actually grow things never gets done.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-foreground/80">
              This is not disorganisation. It is a business that was never built to run without its
              founder.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-foreground/80">
              That is founder dependency. And it is a design problem, which means it can be
              redesigned.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60 bg-teal-wash/50">
        <div className="container-page section-y grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">What we do</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-2xl leading-snug md:text-3xl">
              NeoStrategy installs the operating systems that let a founder step back: consistent
              delivery, a team that knows what to do, and a business that keeps moving even on the
              hardest days.
            </p>
            <p className="mt-6 text-lg text-foreground/75">Not advice. Not a strategy deck. The actual install.</p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="container-page section-y">
          <div className="grid gap-12 md:grid-cols-3">
            {stages.map((stage, i) => (
              <Reveal key={stage.title} delay={i * 0.12}>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">
                  {stage.label}
                </p>
                <h3 className="font-display mt-4 text-2xl leading-tight">{stage.title}</h3>
                <p className="mt-4 text-foreground/75">{stage.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-16">
            <ActionLink to="/services" variant="outline">
              See how we work
            </ActionLink>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60 bg-teal-wash">
        <div className="container-page section-y">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Ready to build? The Service Founder Systems Starter Kit gives you the templates to
              install the core systems yourself.
            </h2>
            <ActionLink to="/shop" className="mt-10">
              Get the Starter Kit
            </ActionLink>
          </Reveal>
        </div>
      </section>

      <section className="bg-teal-deep text-offwhite">
        <div className="container-page section-y">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              10 Systems Every Founder Needs. Free.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-offwhite/85">
              The core systems that let a service business run without its founder holding every
              piece of it. We put them in one short, usable guide, and it is yours free when you
              join the weekly letter.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-offwhite/85">
              You will get the guide straight away, and then one letter a week: no hustle, no noise,
              just the operational thinking that helps a business run without you in the middle of
              everything.
            </p>
            <NewsletterForm tone="dark" className="mt-10 max-w-xl" source="home" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
