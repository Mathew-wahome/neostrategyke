import { createFileRoute } from "@tanstack/react-router";
import { ActionLink } from "@/components/ActionButton";
import { ImageFrame } from "@/components/ImageFrame";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/photos";

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
