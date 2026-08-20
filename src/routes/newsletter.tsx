import { createFileRoute } from "@tanstack/react-router";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Chalkboard, ChalkChecklist, FlowBoard, Whiteboard } from "@/components/Explainers";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "The Founder's Flow Map — Free guide | Neostrategy" },
      {
        name: "description",
        content:
          "The one page we start every engagement with. It shows how work moves through your business, from the first message to the money landing, and which five things to write down first.",
      },
      { property: "og:title", content: "The Founder's Flow Map. Free." },
      {
        property: "og:description",
        content:
          "Free, straight away. After that, one letter a week. No hustle, no noise. Just the thinking that helps a business run without you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Newsletter,
});

function Newsletter() {
  return (
    <>
      <section className="gradient-deep relative overflow-hidden text-offwhite">
        <div className="container-page relative grid items-center gap-14 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-offwhite/70">
                Free guide
              </p>
              <h1 className="font-display mt-6 text-[2.4rem] leading-[1.06] md:text-[3.4rem]">
                Before you write another SOP, work out which ones you actually need.
              </h1>
              <div className="mt-9 max-w-xl space-y-5">
                <p className="text-lg leading-relaxed text-offwhite/85">
                  Most founders know they need systems. They just do not know which ones to build
                  first. So they start documenting everything. Then they get overwhelmed. Then they
                  stop.
                </p>
                <p className="text-lg leading-relaxed text-offwhite/85">
                  The Founder&rsquo;s Flow Map is the one page we use to see how work really moves
                  through a business, from the first message to the payment landing. It shows you the
                  five things worth documenting first.
                </p>
                <p className="text-lg leading-relaxed text-offwhite/85">
                  Get it free. No funnel. No endless emails. One useful tool that shows you where
                  your business depends on you.
                </p>
              </div>
              <NewsletterForm
                tone="dark"
                className="mt-10 max-w-xl"
                source="newsletter"
                cta="Send me the free Flow Map"
              />
            </Reveal>
          </div>
          <Reveal delay={0.15} className="space-y-4">
            <Whiteboard kicker="Page one" title="How work really moves">
              <FlowBoard
                steps={[
                  { label: "First message" },
                  { label: "Yes, please" },
                  { label: "Delivered" },
                  { label: "Money landed" },
                ]}
              />
            </Whiteboard>
            <Chalkboard kicker="Page two" title="The five to write down first">
              <ChalkChecklist
                items={[
                  "The one you explain every week",
                  "The one that breaks when you are away",
                  "The one that decides whether you get paid",
                  "The one a new hire needs on day one",
                  "The one that keeps a client, or loses one",
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
