import { ActionLink } from "@/components/ActionButton";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { ChalkChecklist } from "@/components/Explainers";

/** The closing block that appears at the foot of every page. */
export function ClosingCTA() {
  return (
    <section className="gradient-deep relative overflow-hidden text-offwhite">
      <div className="container-page section-y relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <SplitHeading
            text="If the business stops when you do, that is the thing to fix first."
            className="font-display max-w-3xl text-3xl leading-tight md:text-5xl"
          />
          <Reveal delay={0.25} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ActionLink to="/contact" variant="onDark" size="lg">
              Book a discovery call
            </ActionLink>
            <ActionLink
              to="/newsletter"
              variant="outline"
              size="lg"
              className="border-offwhite/40 text-offwhite hover:bg-offwhite/10"
            >
              Send me the guide
            </ActionLink>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="rounded-xl border border-offwhite/15 bg-[color-mix(in_oklab,var(--charcoal)_45%,transparent)] p-6">
            <p className="font-ui text-[0.58rem] uppercase tracking-[0.28em] text-offwhite/55">
              What the first call covers
            </p>
            <ChalkChecklist
              className="mt-4"
              items={[
                "What is breaking, in your words",
                "Where the business depends on you",
                "The one system to build first",
                "Whether we are the right fit, plainly",
              ]}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
