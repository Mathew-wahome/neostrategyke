import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ActionLink } from "@/components/ActionButton";
import { ImageFrame } from "@/components/ImageFrame";
import { Marquee } from "@/components/Marquee";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { Reveal } from "@/components/Reveal";
import { StatStrip } from "@/components/StatStrip";
import { brand } from "@/lib/brand";
import { carouselSlides, photos } from "@/lib/photos";

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
    photo: photos.coaching,
  },
  {
    label: "Then build",
    title: "The Calm Execution Install",
    body: "Six weeks to install the systems the audit surfaced.",
    photo: photos.team,
  },
  {
    label: "Then sustain",
    title: "The Founder Operations Partnership",
    body: "Ongoing support so the system grows with the business.",
    photo: photos.workshop,
  },
];

function Hero() {
  const reduced = useReducedMotion();
  const words = brand.tagline.split(" ");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  return (
    <section ref={ref} className="gradient-page relative overflow-hidden">
      <div className="container-page relative grid items-center gap-14 pt-20 pb-20 md:pt-32 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div style={reduced ? { opacity: 1 } : { opacity: fade }}>
          <motion.p
            className="font-ui text-[0.68rem] uppercase tracking-[0.3em] text-primary"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Operations consultancy · Nairobi
          </motion.p>

          <h1 className="font-display mt-6 text-[2.7rem] leading-[1.05] md:text-6xl lg:text-[4.2rem]">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className={`inline-block ${i >= words.length - 2 ? "text-gradient-teal" : ""}`}
                initial={reduced ? false : { opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.95, delay: 0.1 * i, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </h1>

          <Reveal delay={0.45} className="mt-9 max-w-xl">
            <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">
              NeoStrategy helps founder-led service businesses move from founder dependency to calm
              execution, so the business runs on systems, not on its founder.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ActionLink to="/newsletter" size="lg" className="group">
                Send me the guide
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ActionLink>
              <ActionLink to="/contact" variant="outline" size="lg">
                Book a call
              </ActionLink>
            </div>
          </Reveal>
        </motion.div>

        <motion.div
          className="relative"
          initial={reduced ? false : { opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-[0_50px_90px_-50px_rgba(10,90,97,0.55)]">
            <motion.img
              src={photos.session.src}
              alt={photos.session.alt}
              width={1600}
              height={1104}
              style={reduced ? { scale: 1.05 } : { y: imgY, scale: 1.12 }}
              className="size-full object-cover"
            />
            <div className="gradient-veil pointer-events-none absolute inset-0" />
          </div>

          <motion.div
            className="glass-card absolute -bottom-6 -left-4 max-w-[16rem] rounded-lg px-5 py-4 md:-left-10"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
          >
            <p className="font-ui text-[0.62rem] uppercase tracking-[0.24em] text-primary">
              What we install
            </p>
            <p className="font-display mt-2 text-lg leading-snug">
              Systems the team can stand on.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />

      <Marquee
        items={[
          "Founder Operating Systems Audit",
          "Calm Execution Install",
          "SOPs & delegation",
          "Client delivery systems",
          "KPIs & dashboards",
          "Operations partnership",
        ]}
      />

      <section className="relative">
        <div className="container-page section-y grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              The problem
            </p>
            <p className="font-display mt-6 text-2xl leading-snug md:text-[2.1rem]">
              The inbox runs the business. The team waits on the founder for answers. The week is
              reactive, and the work that would actually grow things never gets done.
            </p>
            <p className="mt-8 text-lg leading-relaxed text-foreground/80">
              This is not disorganisation. It is a business that was never built to run without its
              founder.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-foreground/80">
              That is founder dependency. And it is a design problem, which means it can be
              redesigned.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ImageFrame
              src={photos.coaching.src}
              alt={photos.coaching.alt}
              ratio="aspect-[4/3]"
              caption="Fifteen minutes of honest diagnosis usually beats a year of guessing."
            />
          </Reveal>
        </div>
      </section>

      <section className="gradient-wash border-y border-border/50">
        <div className="container-page section-y">
          <Reveal className="max-w-3xl">
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              How the work looks
            </p>
            <h2 className="font-display mt-5 text-3xl leading-tight md:text-5xl">
              Not advice. Not a strategy deck. The actual install.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <PhotoCarousel slides={carouselSlides} />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-page section-y">
          <Reveal>
            <StatStrip
              stats={[
                { value: 3, label: "Stages, start to steady" },
                { value: 6, suffix: " weeks", label: "To install the core systems" },
                { value: 10, label: "Systems in the free guide" },
                { value: 90, suffix: " days", label: "Roadmap you keep either way" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="container-page section-y">
          <Reveal className="max-w-2xl">
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              The path
            </p>
            <h2 className="font-display mt-5 text-3xl leading-tight md:text-4xl">
              Three stages from founder dependency to calm execution.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {stages.map((stage, i) => (
              <Reveal key={stage.title} delay={i * 0.12}>
                <article className="lift group flex h-full flex-col rounded-lg border border-border/70 bg-background/60 p-5">
                  <ImageFrame
                    src={stage.photo.src}
                    alt={stage.photo.alt}
                    ratio="aspect-[5/4]"
                  />
                  <p className="font-ui mt-6 text-[0.65rem] uppercase tracking-[0.26em] text-primary">
                    {stage.label}
                  </p>
                  <h3 className="font-display mt-3 text-2xl leading-tight">{stage.title}</h3>
                  <p className="mt-3 text-foreground/75">{stage.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-14">
            <ActionLink to="/services" variant="outline" className="group">
              See how we work
              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ActionLink>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border/60">
        <div className="container-page section-y grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <ImageFrame
              src={photos.kit.src}
              alt={photos.kit.alt}
              ratio="aspect-[4/3]"
              caption={`The Service Founder Systems Starter Kit · ${brand.starterKitPrice}`}
            />
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Ready to build? The Starter Kit gives you the templates to install the core systems
              yourself.
            </h2>
            <p className="mt-6 text-lg text-foreground/75">
              Where the free guide names what you need, the kit hands you the tools to build it.
            </p>
            <ActionLink to="/shop" className="mt-10">
              Get the Starter Kit
            </ActionLink>
          </Reveal>
        </div>
      </section>

      <section className="gradient-deep relative overflow-hidden text-offwhite">
        <img
          src={photos.texture.src}
          alt=""
          aria-hidden
          loading="lazy"
          className="drift pointer-events-none absolute inset-0 size-full object-cover opacity-15"
        />
        <div className="container-page section-y relative">
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
