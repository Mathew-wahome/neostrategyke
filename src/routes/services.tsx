import { createFileRoute } from "@tanstack/react-router";
import { ActionLink } from "@/components/ActionButton";
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
    lede: "Before systems, a straight answer about how the business runs.",
    body: "We map decisions, delivery and dependencies until the real bottleneck is visible. No frameworks borrowed from someone else's company — just the truth about yours.",
  },
  {
    index: "02",
    title: "Delegation",
    lede: "Work leaves the founder's head and stays gone.",
    body: "Roles, ownership and decision rights written down so the team can move without waiting on you to unlock the next step.",
  },
  {
    index: "03",
    title: "Delivery",
    lede: "The same promise, kept the same way, every time.",
    body: "Client onboarding, delivery rhythms and SOPs that make quality a property of the system rather than a property of whoever showed up that day.",
  },
  {
    index: "04",
    title: "Visibility",
    lede: "You see the business without sitting inside it.",
    body: "KPIs, dashboards and a weekly review rhythm so you can tell whether the week worked in ten minutes, not ten meetings.",
  },
  {
    index: "05",
    title: "Continuity",
    lede: "Systems that survive growth, hiring and bad weeks.",
    body: "Monthly coaching and process reviews so the operating system evolves with the business instead of quietly rotting in a folder.",
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
      { title: "The Founder Operating System — NeoStrategy Services" },
      {
        name: "description",
        content:
          "A clear path from founder dependency to calm execution in three stages: the Audit, the Calm Execution Install, and the Founder Operations Partnership.",
      },
      { property: "og:title", content: "The Founder Operating System" },
      {
        property: "og:description",
        content:
          "Three stages from founder dependency to calm execution. Start at the first and stop whenever it makes sense.",
      },
    ],
  }),
  component: Services,
});

const stages = [
  {
    label: "Stage one",
    slug: "audit",
    title: "The Founder Operating Systems Audit",
    photo: photos.coaching,
    body: [
      "Before anything gets built, we find exactly where the business depends on its founder and where it leaks. No guessing, no generic checklist. A real diagnostic of how the business actually runs.",
      "You walk away with a clear diagnosis and a prioritised 30 to 90 day roadmap, yours to keep and act on, whether or not we work together further.",
    ],
    timeline: "Timeline: about one week. Investment shared on a call.",
  },
  {
    label: "Stage two",
    slug: "install",
    title: "The Calm Execution Install",
    photo: photos.team,
    body: [
      "A six-week engagement where we install the highest-priority systems the audit identified. The framework is the same for every founder. What gets built is entirely yours.",
      "Prioritise. Design. Build. Implement. Train. Optimise. Depending on the audit, we install SOPs, delegation systems, onboarding, client delivery, meeting rhythms, KPIs, dashboards, reporting, or CRM processes — the ones the business actually needs.",
      "You walk away with a business that no longer runs entirely out of the founder's head.",
    ],
    timeline: "Timeline: six weeks. Investment shared on a call.",
  },
  {
    label: "Stage three",
    slug: "partnership",
    title: "The Founder Operations Partnership",
    photo: photos.systems,
    body: [
      "Installing systems is one thing. Keeping them alive as the business grows is another. The Partnership is a monthly relationship where we stay close to the operations, so the system evolves with the business instead of quietly falling apart.",
      "Monthly strategy sessions, operational coaching, KPI reviews, accountability, and process improvements. You walk away with an operating system that keeps working as you scale.",
    ],
    timeline: "Timeline: monthly, three-month minimum. Investment shared on a call.",
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
                Most founders do not have a business problem. They have a dependency problem. The
                business runs on them, and it cannot move without them.
              </p>
              <p className="text-lg leading-relaxed text-foreground/85">
                The Founder Operating System is how that changes. A clear path from founder
                dependency to calm execution, in three stages. Start at the first and stop whenever
                it makes sense.
              </p>
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

      <Marquee
        items={["Prioritise", "Design", "Build", "Implement", "Train", "Optimise"]}
      />

      {/* Five layers of the operating system — animated stack slider */}
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
              Five layers
            </p>
            <h2 className="font-display mt-5 text-[2.1rem] leading-[1.08] md:text-5xl">
              One system, built in layers. Each one holds the next.
            </h2>
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
                <ImageFrame
                  src={stage.photo.src}
                  alt={stage.photo.alt}
                  ratio="aspect-[4/3]"
                />
                <div>
                  <p className="font-ui text-[0.65rem] uppercase tracking-[0.28em] text-primary">
                    {stage.label}
                  </p>
                  <h2 className="font-display mt-4 text-3xl leading-tight md:text-[2.6rem]">
                    {stage.title}
                  </h2>
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
                    Book a call
                  </ActionLink>
                </div>
              </div>
            </Reveal>
          ))}
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
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              The next step is a conversation. Tell us which stage makes sense to begin with, and we
              will start there.
            </h2>
            <ActionLink to="/contact" variant="onDark" size="lg" className="mt-10">
              Book a call
            </ActionLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
