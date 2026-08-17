import { createFileRoute } from "@tanstack/react-router";
import { ActionLink } from "@/components/ActionButton";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ImageFrame } from "@/components/ImageFrame";
import { LayerStack } from "@/components/LayerStack";
import { Marquee } from "@/components/Marquee";
import { ProcessLadder } from "@/components/ProcessLadder";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/photos";

const layers = [
  {
    index: "01",
    title: "Clarity",
    lede: "How your business actually runs, not how it is meant to run.",
    body: "We follow the decisions, the work and the waiting until the real bottleneck is obvious. Nothing gets built until this part is honest.",
  },
  {
    index: "02",
    title: "Delivery",
    lede: "How the work gets done the same way every time, at the same standard, without you checking each one.",
    body: "This is where you make your money and where you lose your reputation.",
  },
  {
    index: "03",
    title: "Delegation",
    lede: "How work leaves you. People, contractors, automation.",
    body: "Who owns what. What each person can decide without asking you. This is where most founders get stuck, and it is rarely about the work itself.",
  },
  {
    index: "04",
    title: "Visibility",
    lede: "How you know it is working without asking anyone.",
    body: "And how it stays alive after we leave. A system nobody owns quietly stops being used.",
  },
] as const;

const ladder = [
  {
    n: "01",
    title: "Prioritise",
    lede: "We decide what actually gets fixed first.",
    body: "Everything is urgent until it is ranked. We sequence by leverage, not by noise.",
  },
  {
    n: "02",
    title: "Design",
    lede: "The system is drawn before it is built.",
    body: "Simple enough to explain in one page, specific enough for the team to follow on a Monday.",
  },
  {
    n: "03",
    title: "Build",
    lede: "SOPs, templates, trackers, rhythms.",
    body: "Built with your people, in your language, for the way the business actually works.",
  },
  {
    n: "04",
    title: "Implement",
    lede: "Live in the business, not in a document.",
    body: "We roll it into real weeks and real clients, and adjust where reality disagrees.",
  },
  {
    n: "05",
    title: "Train",
    lede: "The team owns it, not the consultant.",
    body: "We walk everyone through it until the system becomes how the business behaves.",
  },
  {
    n: "06",
    title: "Optimise",
    lede: "Then we tighten it.",
    body: "Review, measure, remove friction. A system is only finished when it stops needing you.",
  },
] as const;

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "The Founder Operating System — Neostrategy Services" },
      {
        name: "description",
        content:
          "Four ways in: the Clarity Session, the Founder Operating Systems Audit, the Calm Execution Install and the Founder Operations Partnership.",
      },
      { property: "og:title", content: "The Founder Operating System" },
      {
        property: "og:description",
        content:
          "You probably do not have a business problem. You have a dependency problem. This is how that changes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const stages = [
  {
    label: "Start small",
    slug: "clarity",
    title: "The Clarity Session",
    heading: "One hour. One problem. A straight answer.",
    photo: photos.coaching,
    body: [
      "Not everyone needs an audit, and not every problem needs one. This is one focused hour on whatever is stuck right now. A process that keeps breaking. A team that waits on you for everything. A decision you have been going round in circles on for a month.",
      "You leave knowing what is actually happening and what to do next. If you go on to book the Audit or the Install, this fee comes off the price.",
    ],
    timeline: "One hour. We share the fee when you enquire.",
    cta: "Book the Clarity Session",
  },
  {
    label: "Start here",
    slug: "audit",
    title: "The Founder Operating Systems Audit",
    heading: "Before we build anything, we find where the business depends on you.",
    photo: photos.session,
    body: [
      "Before we build anything, we find out where your business depends on you and where it leaks. No guessing. No generic checklist.",
      "We map your client journey from first contact to money in the bank. Then we follow three of your recent clients through what actually happened, rather than what was supposed to happen. Then we show you the difference.",
      "That difference is usually the most useful thing you will see all year.",
      "You keep the diagnosis and a clear 30 to 90 day plan, whether we work together after that or not.",
    ],
    timeline:
      "About a week. Same fee for every business, because it is the same work. We share it when you enquire.",
    cta: "Book a call about the Audit",
  },
  {
    label: "Then build",
    slug: "install",
    title: "The Calm Execution Install",
    heading: "Thirty days to build the systems the Audit found.",
    photo: photos.team,
    body: [
      "Thirty days to build the systems the Audit found. The shape is the same for every founder. What gets built is yours alone.",
      "Map, days 1 to 5. Where your time, money and decisions leak.",
      "Define, days 6 to 10. What the business should look like when it works, and what gets fixed first.",
      "Install, days 11 to 25. SOPs, delegation, onboarding, delivery, meeting rhythms, dashboards. Built with your people, in your words.",
      "Embed, days 26 to 30. We train your team until the system is simply how things are done. You get a handover pack and a plan for the next thirty days.",
      "You end up with a business that no longer runs out of your head.",
    ],
    timeline:
      "Thirty days. We agree the scope and the fee in writing before anything starts, so nothing drifts and no invoice surprises you. The Audit fee comes off the price.",
    cta: "Book a call about the Install",
  },
  {
    label: "Then keep it alive",
    slug: "partnership",
    title: "The Founder Operations Partnership",
    heading: "Keeping the systems alive as the business grows.",
    photo: photos.systems,
    body: [
      "Building systems is one thing. Keeping them alive as the business grows is another. This is a monthly relationship. We stay close to your operations so the systems change as the business changes, instead of quietly falling apart.",
      "You get: a working session every week, access between sessions during business hours with a reply inside 48 hours, ongoing maintenance as things change, and a planning session every quarter.",
      "You do not get: us on demand. This is designed so your business needs you less. Not so it needs us more.",
    ],
    timeline:
      "Monthly, with a three month minimum. Three months because that is roughly how long it takes for a new way of working to become the normal way of working.",
    cta: "Book a call about the Partnership",
  },
];

function Services() {
  return (
    <>
      <section className="gradient-page relative overflow-hidden">
        <div className="container-page grid items-end gap-12 pt-20 pb-16 md:pt-32 md:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              Services
            </p>
            <h1 className="font-display mt-6 text-[2.5rem] leading-[1.06] md:text-6xl">
              The Founder <span className="text-gradient-teal">Operating System</span>
            </h1>
            <div className="mt-9 max-w-xl space-y-6">
              <p className="text-lg leading-relaxed text-foreground/85">
                You probably do not have a business problem. You have a dependency problem. The
                business runs on you, and it cannot move without you.
              </p>
              <p className="text-lg leading-relaxed text-foreground/85">This is how that changes.</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ImageFrame
              src={photos.workshop.src}
              alt={photos.workshop.alt}
              ratio="aspect-[4/3]"
              priority
            />
          </Reveal>
        </div>
      </section>

      <Marquee items={["Clarity", "Delivery", "Delegation", "Visibility"]} />

      {/* The method — four layers, built in order */}
      <section className="gradient-deep relative overflow-hidden text-offwhite">
        <img
          src={photos.texture.src}
          alt=""
          aria-hidden
          loading="lazy"
          className="drift pointer-events-none absolute inset-0 size-full object-cover opacity-10"
        />
        <div className="container-page section-y relative">
          <Reveal className="max-w-2xl">
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              How it is built
            </p>
            <h2 className="font-display mt-5 text-[2.1rem] leading-[1.08] md:text-5xl">
              Four layers, built in order.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-offwhite/80">
              Each one holds up the next. Building them out of order is why most systems work fails.
            </p>
          </Reveal>
          <LayerStack layers={layers} className="mt-16 md:mt-20" />
        </div>
      </section>

      <section>
        <div className="container-page section-y space-y-24 md:space-y-32">
          {stages.map((stage, i) => (
            <Reveal key={stage.slug} delay={0.05}>
              <div
                className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <ImageFrame src={stage.photo.src} alt={stage.photo.alt} ratio="aspect-[4/3]" />
                <div>
                  <p className="font-ui text-[0.65rem] uppercase tracking-[0.28em] text-primary">
                    {stage.label}
                  </p>
                  <h2 className="font-display mt-4 text-3xl leading-tight md:text-[2.6rem]">
                    {stage.title}
                  </h2>
                  <p className="font-display mt-4 text-xl leading-snug text-foreground/90">
                    {stage.heading}
                  </p>
                  <div className="mt-6 space-y-5">
                    {stage.body.map((p, j) => (
                      <p key={j} className="text-lg leading-relaxed text-foreground/80">
                        {p}
                      </p>
                    ))}
                  </div>
                  <p className="font-ui mt-6 text-sm text-muted-foreground">{stage.timeline}</p>
                  <ActionLink
                    to="/contact"
                    search={{ stage: stage.slug } as never}
                    variant="outline"
                    className="mt-8"
                  >
                    {stage.cta}
                  </ActionLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ProcessLadder
        heading="How the work moves, week to week"
        sub={[
          "No jargon. No chaos. A calm, repeatable way to install systems that hold.",
          "Here is how the work moves, step by step, side by side with your team.",
        ]}
        steps={ladder}
      />

      <ClosingCTA />
    </>
  );
}
