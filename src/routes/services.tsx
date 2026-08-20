import { createFileRoute } from "@tanstack/react-router";
import { ActionLink } from "@/components/ActionButton";
import { ClosingCTA } from "@/components/ClosingCTA";
import {
  ChalkChecklist,
  Chalkboard,
  DependencyDial,
  FlowBoard,
  LayerDiagram,
  StickyWall,
  Whiteboard,
} from "@/components/Explainers";
import { LayerStack } from "@/components/LayerStack";
import { Marquee } from "@/components/Marquee";
import { ProcessLadder } from "@/components/ProcessLadder";
import { Reveal } from "@/components/Reveal";

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
    body: [
      "Sometimes you do not need a full overhaul. You need someone experienced to look at the thing that keeps breaking and tell you what is actually wrong.",
      "We spend one focused hour working out what is happening. You leave knowing what is wrong and what to do next.",
    ],
    timeline: "One hour. If you move into an Audit or an Install, this fee comes off the price.",
    cta: "Book a Clarity Session",
  },
  {
    label: "Start here",
    slug: "audit",
    title: "The Founder Operating Systems Audit",
    heading: "Find out exactly where your business depends on you.",
    body: [
      "Before we build anything, we diagnose. No generic checklist. No assumptions. No strategy deck that sits in a folder.",
      "We map your client journey from first contact to money in the bank. Then we follow real recent clients through what actually happened, and show you the gap between how the business is supposed to work and how it actually works.",
      "That gap is where the work is. You leave with a clear diagnosis, the systems that need to change, and a prioritised 30 to 90 day plan. You keep all of it, whether we work together afterwards or not.",
    ],
    timeline: "About a week. Same fee for every business, because it is the same work.",
    cta: "Find out where your business depends on you",
  },
  {
    label: "Then build",
    slug: "install",
    title: "The Calm Execution Install",
    heading: "We found the problem. Now we build the fix.",
    body: [
      "The Audit tells us what is broken. The Install fixes it. Over thirty days we build the systems your business actually needs, with your team, in your language.",
      "This can include SOPs, client onboarding, delivery systems, delegation structures, team accountability, meeting rhythms, dashboards, knowledge management and handover systems.",
      "The result: your business no longer runs out of your head.",
    ],
    timeline:
      "Thirty days. Scope and fee agreed in writing before anything starts. The Audit fee comes off the price.",
    cta: "Talk to us about the Install",
  },

  {
    label: "Then keep it alive",
    slug: "partnership",
    title: "The Founder Operations Partnership",
    heading: "Build the systems. Then keep them alive.",
    body: [
      "A business does not stop changing because you installed a few SOPs. Your team changes. Your offers change. Your clients change. Your revenue changes. Your systems have to change with them.",
      "The Partnership gives you ongoing operational support without creating a new dependency. The goal is for your business to need us less over time, not more.",
    ],

    timeline:
      "Monthly, with a three month minimum. Three months because that is roughly how long a new way of working takes to become the normal way of working.",
    cta: "Talk to us about the Partnership",
  },
  {
    label: "Then earn beyond your time",
    slug: "wealth",
    title: "The Wealth Arc",
    heading:
      "Once the business runs without you, your knowledge can start working without you too.",
    body: [
      "You have spent years learning how to do what you do. That knowledge lives in client conversations, proposals, voice notes, workshops, documents and your head. Right now it only earns when you are in the room.",
      "The Wealth Arc turns that expertise into assets that earn beyond your time. This is not a marketing exercise. It is the same systems thinking, pointed at your expertise instead of your operations.",
      "First free yourself from the business. Then make your knowledge work harder than your calendar.",
    ],
    timeline: "Scoped to what you know and what you want it to become.",
    cta: "Talk to us about the Wealth Arc",
  },
];


function stageVisual(slug: string) {
  if (slug === "clarity") {
    return (
      <Whiteboard kicker="One hour" title="Bring us the thing that keeps breaking">
        <StickyWall
          columns="grid-cols-1 xs:grid-cols-2"
          notes={[
            { label: "Bring", text: "A process that keeps breaking" },
            { label: "Bring", text: "A team that waits on you for everything" },
            { label: "Bring", text: "A decision you have circled for weeks" },
            { label: "Leave with", text: "What is wrong, and what to do next" },
          ]}
        />
      </Whiteboard>
    );
  }

  if (slug === "audit") {
    return (
      <Whiteboard kicker="The audit" title="Supposed to happen vs what happened">
        <FlowBoard
          steps={[
            { label: "First contact", leak: "3 day reply" },
            { label: "Proposal", leak: "founder writes it" },
            { label: "Delivery", leak: "no handover" },
            { label: "Money in", leak: "invoice sent late" },
          ]}
        />
        <div className="mt-5 border-t border-dashed border-primary/25 pt-4">
          <DependencyDial value={64} label="of the journey ran differently to how it was designed." />
        </div>
      </Whiteboard>
    );
  }
  if (slug === "install") {
    return (
      <Chalkboard kicker="Thirty days" title="Map · Define · Install · Embed">
        <LayerDiagram
          layers={[
            { title: "Days 1–5 · Map", note: "Where time, money and decisions leak." },
            { title: "Days 6–10 · Define", note: "What good looks like, and what gets fixed first." },
            { title: "Days 11–25 · Install", note: "SOPs, delegation, onboarding, delivery, dashboards." },
            { title: "Days 26–30 · Embed", note: "Train the team until it is simply how things are done." },
          ]}
        />
      </Chalkboard>
    );
  }
  if (slug === "wealth") {
    return (
      <Whiteboard kicker="Beyond your calendar" title="What your expertise can become">
        <StickyWall
          columns="grid-cols-1 xs:grid-cols-2"
          notes={[
            { label: "Becomes", text: "A course people can buy without you" },
            { label: "Becomes", text: "A workshop you run once, sell often" },
            { label: "Becomes", text: "A digital product with a price" },
            { label: "Becomes", text: "A book, and the content that leads to it" },
          ]}
        />
      </Whiteboard>
    );
  }
  return (
    <Chalkboard kicker="Monthly" title="What the partnership gives you">
      <ChalkChecklist
        items={[
          "A weekly working session",
          "Support between sessions during business hours",
          "Ongoing system maintenance",
          "Quarterly planning",
          "Help as the business grows and changes",
        ]}
      />
      <p className="font-chalk mt-6 text-lg leading-snug text-offwhite/80">
        Designed so your business needs us less over time. Not more.
      </p>
    </Chalkboard>
  );
}



function Services() {
  return (
    <>
      <section className="gradient-page relative overflow-hidden">
        <div className="container-page grid items-end gap-12 pt-14 pb-10 md:pt-20 md:pb-14 lg:grid-cols-[1.05fr_0.95fr]">
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
            <Whiteboard
              kicker="The operating system"
              title="Four layers, built in order"
              caption="Skip a layer and the one above it collapses."
            >
              <div className="space-y-2">
                {[
                  ["Clarity", "What we sell, promise and refuse"],
                  ["Delivery", "The same result whoever runs it"],
                  ["Delegation", "Decisions that do not need you"],
                  ["Visibility", "You can see the week without living it"],
                ].map(([t, n], i) => (
                  <div
                    key={t}
                    className="flex items-center gap-3 rounded-md border-2 border-charcoal/70 bg-offwhite px-4 py-3"
                    style={{ marginInline: `${(3 - i) * 12}px 0` }}
                  >
                    <span className="font-hand text-lg text-primary">0{i + 1}</span>
                    <div>
                      <p className="font-hand text-xl leading-tight text-charcoal">{t}</p>
                      <p className="font-ui text-xs text-muted-foreground">{n}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Whiteboard>
          </Reveal>
        </div>
      </section>

      <Marquee items={["Clarity", "Delivery", "Delegation", "Visibility"]} />

      {/* The method — four layers, built in order */}
      <section className="gradient-deep relative overflow-hidden text-offwhite">
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
          <LayerStack layers={layers} className="mt-10 md:mt-14" />
        </div>
      </section>

      <section>
        <div className="container-page section-y space-y-14 md:space-y-20">
          {stages.map((stage, i) => (
            <Reveal key={stage.slug} delay={0.05}>
              <div
                className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure>{stageVisual(stage.slug)}</figure>
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
