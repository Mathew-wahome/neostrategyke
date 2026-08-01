import { createFileRoute } from "@tanstack/react-router";
import { ActionLink } from "@/components/ActionButton";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NeoStrategy — Businesses that do not depend on founders" },
      {
        name: "description",
        content:
          "NeoStrategy is a Nairobi operations consultancy founded by Mary Njoroge, installing the systems that free founder-led service businesses from dependency.",
      },
      { property: "og:title", content: "About NeoStrategy" },
      {
        property: "og:description",
        content:
          "We build businesses that do not depend on their founders. Not advice. Not a strategy deck. The actual install.",
      },
    ],
  }),
  component: About,
});

const paragraphs = [
  "Most founders do not have a business problem. They have a dependency problem. The business runs on them, their memory, their decisions, their presence, and it cannot move without them.",
  "NeoStrategy exists to change that.",
  "We believe a business should support a founder's life, not consume it. That the answer to founder overwhelm is not more hustle, but better design. And that the difference between a business that traps its founder and one that frees them is not effort. It is systems.",
  "A hustler pushes activity. A founder builds something that keeps working beyond their mood, their memory, and their daily intensity. Our entire practice is built to help founders become the second kind.",
  "We work with founder-led service businesses, coaches, consultants, agencies, and professional service firms, to install the operating systems that let them step back: systems the team can stand on, delivery that stays consistent, and operations that hold on the hardest days.",
  "Not advice. Not a strategy deck. The actual install.",
];

function About() {
  return (
    <article className="container-read pt-24 pb-24 md:pt-36 md:pb-36">
      <Reveal>
        <h1 className="font-display text-[2.4rem] leading-[1.1] md:text-6xl">
          We build businesses that do not depend on their founders.
        </h1>
      </Reveal>

      <div className="mt-14 space-y-7">
        {paragraphs.map((text, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <p className="text-lg leading-relaxed text-foreground/85">{text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-16 border-t border-border pt-8">
        <p className="text-base text-muted-foreground">
          NeoStrategy was founded by {brand.founder}, an operations strategist working with founders
          to build calm, systems-led businesses.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-12 flex flex-col gap-3 sm:flex-row">
        <ActionLink to="/contact">Book a call</ActionLink>
        <ActionLink to="/newsletter" variant="outline">
          Send me the guide
        </ActionLink>
      </Reveal>
    </article>
  );
}
