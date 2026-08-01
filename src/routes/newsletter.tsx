import { createFileRoute } from "@tanstack/react-router";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "10 Systems Every Founder Needs — Free guide | NeoStrategy" },
      {
        name: "description",
        content:
          "The core systems that let a service business run without its founder, in one short, usable guide. Free with the weekly letter.",
      },
      { property: "og:title", content: "10 Systems Every Founder Needs. Free." },
      {
        property: "og:description",
        content:
          "One short, usable guide, plus one letter a week: no hustle, no noise, just the operational thinking that helps a business run without you.",
      },
    ],
  }),
  component: Newsletter,
});

function Newsletter() {
  return (
    <section className="bg-teal-deep text-offwhite">
      <div className="container-read py-24 md:py-40">
        <Reveal>
          <h1 className="font-display text-[2.6rem] leading-[1.08] md:text-6xl">
            10 Systems Every Founder Needs. Free.
          </h1>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 space-y-6">
          <p className="text-lg leading-relaxed text-offwhite/85">
            The core systems that let a service business run without its founder holding every piece
            of it, in one short, usable guide.
          </p>
          <p className="text-lg leading-relaxed text-offwhite/85">
            It is yours free when you join the weekly letter. You will get the guide straight away,
            and then one letter a week: no hustle, no noise, just the operational thinking that
            helps a business run without you in the middle of everything.
          </p>
          <p className="text-lg leading-relaxed text-offwhite/85">
            If your week is reactive and everything still runs through you, this is where to start.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <NewsletterForm tone="dark" className="mt-12 max-w-xl" source="newsletter page" />
        </Reveal>
      </div>
    </section>
  );
}
