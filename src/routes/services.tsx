import { createFileRoute } from "@tanstack/react-router";
import { ActionLink } from "@/components/ActionButton";
import { Reveal } from "@/components/Reveal";

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
      <section className="container-read pt-24 pb-16 md:pt-36 md:pb-24">
        <Reveal>
          <h1 className="font-display text-[2.4rem] leading-[1.1] md:text-6xl">
            The Founder Operating System
          </h1>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 space-y-6">
          <p className="text-lg leading-relaxed text-foreground/85">
            Most founders do not have a business problem. They have a dependency problem. The
            business runs on them, and it cannot move without them.
          </p>
          <p className="text-lg leading-relaxed text-foreground/85">
            The Founder Operating System is how that changes. A clear path from founder dependency
            to calm execution, in three stages. Start at the first and stop whenever it makes sense.
            Most founders move through all three, because each one makes the next obvious.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-border/60">
        <div className="container-page section-y space-y-24">
          {stages.map((stage, i) => (
            <Reveal key={stage.slug} delay={i * 0.05}>
              <div className="grid gap-8 md:grid-cols-[0.8fr_1.6fr]">
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">
                    {stage.label}
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-3xl leading-tight md:text-4xl">{stage.title}</h2>
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

      <section className="bg-teal-wash">
        <div className="container-page section-y">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              The next step is a conversation. Tell us which stage makes sense to begin with, and we
              will start there.
            </h2>
            <ActionLink to="/contact" className="mt-10">
              Book a call
            </ActionLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
