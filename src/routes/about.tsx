import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ActionLink } from "@/components/ActionButton";
import { ClosingCTA } from "@/components/ClosingCTA";
import { BeforeAfter, ChalkChecklist, Chalkboard, StickyWall, Whiteboard } from "@/components/Explainers";
import { Journey } from "@/components/Journey";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { brand } from "@/lib/brand";
import portraitPhoto from "@/assets/mary-njoroge-portrait.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Neostrategy — We build businesses that do not depend on their founders" },
      {
        name: "description",
        content:
          "An operations practice for founder-led service businesses across East Africa, led by Nduta Njoroge. We build the systems that let you step back.",
      },
      { property: "og:title", content: "About Neostrategy" },
      {
        property: "og:description",
        content:
          "We build businesses that do not depend on their founders. Not advice. Not a strategy deck. We build the thing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const paragraphs = [
  "You do not have a business problem. You have a dependency problem. The business was built around your memory, your decisions and your presence, and it cannot move without you.",
  "Most founders try to solve this by hiring another person. Then buying another tool. Then adding another meeting. Then writing another SOP.",
  "But if the architecture underneath is broken, all you have done is add more moving parts around the same dependency.",
  "We look at it differently. We find where work, decisions, information and money get stuck. Then we build the systems, the ownership and the operating rhythms that let the business move without everything passing through you.",
  "The goal is not a tidier business. The goal is a business that does not need you in the middle of it.",
  "We do not advise from the sidelines. Most consultants hand you recommendations. We build the systems with you, using the real work, the real clients, the real team and the real bottlenecks.",
  "Because a process document is worthless if nobody follows it, a dashboard is worthless if nobody looks at it, and a system is worthless if it only works when you are there. We build the thing.",
];

const note = [
  "I know what it is like to be the person holding everything together.",
  "For years I did the work that keeps a business standing while nobody notices it is happening. In other people's businesses, and in my own.",
  "That shaped how I think about operations.",
  "Being overwhelmed is almost never a discipline problem. It is a design problem.",
  "Your business produces exactly what it was built to produce. If you do not like what it is producing, the design is where you look.",
  "I built Neostrategy for founders who have made something real and are now paying for its growth with their time, their attention and their freedom.",
  "I work with founder-led service businesses. Coaches, consultants, agencies and professional firms. We build the systems that let you step back. Systems your team can stand on. Delivery that stays the same whoever does it. Operations that hold on the hard days.",
  "If you are the person your business cannot run without, let us fix that.",
];


const beliefs = [
  {
    title: "Clarity attracts.",
    body: "When your offer, your promise and your process are clear, the right clients recognise themselves in it.",
    detail: "We start every engagement by making the business legible — to the team, then to the market.",
  },
  {
    title: "Systems scale.",
    body: "Effort has a ceiling. Design does not. A system that stays alive compounds every week.",
    detail: "One well-built delivery rhythm outperforms a year of heroics, every quarter.",
  },
  {
    title: "Freedom lasts.",
    body: "The point is not a tidier business. It is being able to step away and come back to something still standing.",
    detail: "We measure our work by what keeps running on the weeks you are not in the room.",
  },
];

const journey = [
  {
    year: "The pattern",
    title: "Every business ran on one person",
    body: "The same shape kept appearing: capable founders, willing teams, and a business that stalled the moment the founder stepped out of the room.",
  },
  {
    year: "The practice",
    title: "Built as an install, not advice",
    body: "Strategy decks do not change a Monday. So the work became operational: sit inside the business, map how it actually runs, and build the system with the people who will run it.",
  },
  {
    year: "The method",
    title: "The Founder Operating System",
    body: "Clarity, delivery, delegation, visibility. Four layers, built in order, because each one holds up the next.",
  },
  {
    year: "Today",
    title: "Four businesses at a time",
    body: "Founders who can take a real holiday. Teams who know what good looks like without asking. Businesses that keep their promises on the hardest weeks.",
  },
] as const;

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
          src={portraitPhoto}
          alt={`${brand.founder}, founder of ${brand.name}`}
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
          Working with founders across East Africa.
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
        <div className="container-page grid items-center gap-16 pt-14 pb-16 md:pt-20 md:pb-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
                About {brand.name}
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
                An operations practice for founder-led service businesses across East Africa.
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

      <Marquee items={["Clarity attracts", "Systems scale", "Freedom lasts", "Nairobi, Kenya"]} />

      {/* What we believe */}
      <section>
        <div className="container-page section-y grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Reveal>
              <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
                What we believe
              </p>
            </Reveal>
            <div className="mt-8 space-y-7">
              {paragraphs.map((text, i) => (
                <Reveal key={i} delay={0.04 * i}>
                  <p className="text-lg leading-relaxed text-foreground/85">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <Whiteboard kicker="The diagnosis" title="Dependency, not effort">
                <BeforeAfter
                  before={{
                    title: "Runs on the founder",
                    items: [
                      "Every decision routes through one person",
                      "Quality changes with who is available",
                      "Knowledge lives in memory and WhatsApp",
                    ],
                  }}
                  after={{
                    title: "Runs on a system",
                    items: [
                      "Decisions have owners and limits",
                      "Delivery holds whoever runs it",
                      "Knowledge lives where the team works",
                    ],
                  }}
                />
              </Whiteboard>
              <StickyWall
                columns="grid-cols-1 xs:grid-cols-2"
                notes={[
                  { label: "We build", text: "Systems your team can stand on" },
                  { label: "Not", text: "A strategy deck nobody opens" },
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* A note from Nduta */}
      <section className="gradient-wash border-y border-border/50">
        <div className="container-page section-y grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <div className="sheen overflow-hidden rounded-2xl border border-primary/12 shadow-[0_60px_110px_-70px_rgba(10,90,97,0.8)] lg:sticky lg:top-28">
              <img
                src={portraitPhoto}
                alt={`${brand.founder}, founder of ${brand.name}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
                A note from Nduta
              </p>
            </Reveal>
            <div className="mt-8 space-y-6">
              {note.map((text, i) => (
                <Reveal key={i} delay={0.04 * i}>
                  <p
                    className={
                      i === 0
                        ? "font-display text-2xl leading-snug md:text-[2rem]"
                        : "text-lg leading-relaxed text-foreground/85"
                    }
                  >
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <p className="font-ui mt-8 text-sm uppercase tracking-[0.22em] text-primary">
                {brand.founder} · Founder
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="gradient-deep grain relative overflow-hidden text-offwhite">
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
          <div className="mt-10 text-offwhite/90 [&_h3]:text-offwhite [&_p]:text-offwhite/75">
            <Journey steps={journey} />
          </div>
        </div>
      </section>

      {/* Three beliefs */}
      <section>
        <div className="container-page section-y">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              Three beliefs
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
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

          <Reveal delay={0.2} className="mt-10">
            <Chalkboard kicker="How we measure the work" title="What is still standing on the weeks you are away">
              <ChalkChecklist
                items={[
                  "Clients served to the same standard",
                  "Invoices raised and followed up",
                  "New enquiries answered inside a day",
                  "Decisions made without a phone call to you",
                ]}
              />
            </Chalkboard>
          </Reveal>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
