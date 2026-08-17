import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ActionLink } from "@/components/ActionButton";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ImageFrame } from "@/components/ImageFrame";
import { Marquee } from "@/components/Marquee";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { brand } from "@/lib/brand";
import { carouselSlides, photos } from "@/lib/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neostrategy — Clarity attracts. Systems scale. Freedom lasts." },
      {
        name: "description",
        content:
          "An operations consultancy in Nairobi, working across East Africa. We help founder-led service businesses build a business that runs without the founder in the middle of everything.",
      },
      { property: "og:title", content: "Neostrategy — Clarity attracts. Systems scale. Freedom lasts." },
      {
        property: "og:description",
        content:
          "Your business runs on you. We help you build one that runs without you in the middle of everything.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stages = [
  {
    label: "Start small",
    title: "The Clarity Session",
    body: "One hour on the thing that is stuck right now. You leave with a straight answer and a clear next step.",
    photo: photos.coaching,
  },
  {
    label: "Start here",
    title: "The Founder Operating Systems Audit",
    body: "We map how your business actually runs and find where it depends on you. You keep the diagnosis and the plan, whether we work together after that or not.",
    photo: photos.session,
  },
  {
    label: "Then build",
    title: "The Calm Execution Install",
    body: "Thirty days to build the systems the Audit found. Map, Define, Install, Embed.",
    photo: photos.team,
  },
  {
    label: "Then keep it alive",
    title: "The Founder Operations Partnership",
    body: "Monthly support so the systems grow with the business instead of quietly falling apart.",
    photo: photos.workshop,
  },
];

const principles = [
  {
    title: "Your client journey ends when you get paid, not when you deliver.",
    body: "Getting paid is part of the system. It is not the admin you deal with afterwards.",
  },
  {
    title: "We write things down for the next two people, not the one you have now.",
    body: "Your staff will move on. That is the reason to document, not the reason to skip it.",
  },
  {
    title: "You keep the relationship. The work moves behind you.",
    body: "Your clients still get you. You stop being the person doing everything.",
  },
  {
    title: "Moving fast is not the problem.",
    body: "Being quick and informal is an advantage here. The job is to keep the speed and take out the parts that break.",
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
            Operations consultancy · Nairobi, working across East Africa
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
              Your business runs on you. We help you build one that runs without you in the middle
              of everything.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ActionLink to="/newsletter" size="lg" className="group">
                Send me the free guide
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

      {/* The problem */}
      <section className="relative">
        <div className="container-page section-y grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              The problem
            </p>
            <p className="font-display mt-6 text-2xl leading-snug md:text-[2.1rem]">
              You already know something is wrong. You just have not had time to name it.
            </p>
            <p className="mt-8 text-lg leading-relaxed text-foreground/80">
              Your inbox decides your day. Your team waits for you before they can move. You answer
              the same questions every week and you are the only person who knows the answers. You
              start the week meaning to work on the business. By Wednesday you are back inside it.
              You have not taken a real holiday in a long time, and the honest reason is that you
              are not sure the business would hold.
            </p>
            <p className="font-display mt-8 text-xl leading-snug md:text-2xl">
              None of this means you are disorganised.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-foreground/80">
              It means the business was built around you, and it has never been redesigned. That is
              not a character flaw. It is a design problem, and design problems can be fixed.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ImageFrame
              src={photos.coaching.src}
              alt={photos.coaching.alt}
              ratio="aspect-[4/3]"
              caption="A design problem, not a discipline problem."
            />
          </Reveal>
        </div>
      </section>

      {/* Built for how business actually works here */}
      <section className="gradient-deep grain relative overflow-hidden text-offwhite">
        <img
          src={photos.texture.src}
          alt=""
          aria-hidden
          loading="lazy"
          className="drift pointer-events-none absolute inset-0 size-full object-cover opacity-10"
        />
        <div className="container-page section-y relative">
          <Reveal className="max-w-3xl">
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-offwhite/70">
              Why most systems advice does not work here
            </p>
          </Reveal>
          <SplitHeading
            text="Built for how business actually works here."
            className="font-display mt-5 max-w-3xl text-[2.1rem] leading-[1.08] md:text-5xl"
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <p className="font-display text-xl leading-snug text-offwhite md:text-2xl">
                Most systems advice assumes a market you are not in.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-offwhite/80">
                The books assume clients who pay on time. Plenty of good people to hire. Contracts
                that hold. Customers who are happy to be passed to someone else. You work somewhere
                else.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-offwhite/80">
                Your clients pay late, and that is normal, not unusual. Your staff turn over fast
                enough that you will train the same role three times in two years. A signed contract
                is a starting point, not a guarantee. And your best client expects to reach you,
                personally. Send them to someone else and they will simply call you anyway.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="font-display text-xl leading-snug text-offwhite md:text-2xl">
                That is East Africa. It is also most of the world. It is just not the market these
                frameworks were written for.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-offwhite/80">So we build differently.</p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-offwhite/12 bg-offwhite/12 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="group h-full bg-[color-mix(in_oklab,var(--charcoal)_55%,transparent)] p-8 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--teal)_18%,transparent)]">
                  <span className="font-ui text-[0.6rem] uppercase tracking-[0.3em] text-offwhite/45">
                    0{i + 1}
                  </span>
                  <h3 className="font-display mt-4 text-xl leading-snug text-offwhite md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-offwhite/75">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we install */}
      <Marquee
        items={[
          "Founder Operating Systems Audit",
          "Calm Execution Install",
          "Client flow to cash",
          "SOPs and delegation",
          "Team accountability",
          "Operations partnership",
        ]}
      />

      <section className="gradient-wash border-y border-border/50">
        <div className="container-page section-y">
          <Reveal className="max-w-3xl">
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              What we install
            </p>
            <h2 className="font-display mt-5 text-3xl leading-tight md:text-5xl">
              Not advice. Not a strategy deck. We build the thing.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <PhotoCarousel slides={carouselSlides} />
          </Reveal>
        </div>
      </section>

      {/* The path */}
      <section className="border-t border-border/60">
        <div className="container-page section-y">
          <Reveal className="max-w-2xl">
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              How we work together
            </p>
            <h2 className="font-display mt-5 text-3xl leading-tight md:text-4xl">
              Four ways in. Start wherever makes sense and stop whenever it does.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage, i) => (
              <Reveal key={stage.title} delay={i * 0.1}>
                <article className="lift group flex h-full flex-col rounded-lg border border-border/70 bg-background/60 p-5">
                  <ImageFrame src={stage.photo.src} alt={stage.photo.alt} ratio="aspect-[5/4]" />
                  <p className="font-ui mt-6 text-[0.65rem] uppercase tracking-[0.26em] text-primary">
                    {stage.label}
                  </p>
                  <h3 className="font-display mt-3 text-xl leading-tight">{stage.title}</h3>
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

      {/* Four clients at a time */}
      <section className="border-t border-border/60">
        <div className="container-page section-y grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <ImageFrame src={photos.calm.src} alt={photos.calm.alt} ratio="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              Four clients at a time
            </p>
            <h2 className="font-display mt-5 text-3xl leading-tight md:text-[2.6rem]">
              We work with four businesses at a time.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Doing this properly means being inside a business, not advising it from outside. Four
              is what one practice can do well. Sometimes that means we are booked. It also means
              that when we are working with you, you are not one of forty.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="relative overflow-hidden border-t border-border/60">
        <div className="container-page section-y grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <ImageFrame src={photos.kit.src} alt={photos.kit.alt} ratio="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              Products
            </p>
            <h2 className="font-display mt-5 text-3xl leading-tight md:text-4xl">
              Not ready to work together? Start with the tools.
            </h2>
            <p className="mt-6 text-lg text-foreground/75">
              The same frameworks we use with clients, packaged so you can use them yourself.
            </p>
            <ActionLink to="/shop" className="mt-10">
              See the tools
            </ActionLink>
          </Reveal>
        </div>
      </section>

      {/* The free guide */}
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
              The Founder&rsquo;s Flow Map. Free.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-offwhite/85">
              Most founders do not know which processes to write down. So they write nothing, or
              they write the wrong things and give up halfway.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-offwhite/85">
              This is the one page we start every engagement with. It shows you how work really
              moves through your business, from the first message to the money landing. Then it
              shows you which five things to write down first.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-offwhite/85">
              You get it straight away. After that, one letter a week. No hustle, no noise. Just the
              thinking that helps a business run without you holding every piece of it.
            </p>
            <NewsletterForm
              tone="dark"
              className="mt-10 max-w-xl"
              source="home"
              cta="Send me the guide"
            />
            <p className="font-ui mt-4 text-xs uppercase tracking-[0.2em] text-offwhite/55">
              Free. Leave any time.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
