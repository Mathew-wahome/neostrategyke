import { createFileRoute } from "@tanstack/react-router";
import { ImageFrame } from "@/components/ImageFrame";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "10 Systems Every Founder Needs — Free guide | Neostrategy" },
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
    <>
      <section className="gradient-deep relative overflow-hidden text-offwhite">
        <img
          src={photos.texture.src}
          alt=""
          aria-hidden
          className="drift pointer-events-none absolute inset-0 size-full object-cover opacity-20"
        />
        <div className="container-page relative grid items-center gap-14 py-20 md:py-32 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-offwhite/70">
                Free guide
              </p>
              <h1 className="font-display mt-6 text-[2.6rem] leading-[1.06] md:text-6xl">
                10 Systems Every Founder Needs. Free.
              </h1>
            </Reveal>
            <Reveal delay={0.1} className="mt-9 space-y-6">
              <p className="text-lg leading-relaxed text-offwhite/85">
                The core systems that let a service business run without its founder holding every
                piece of it, in one short, usable guide.
              </p>
              <p className="text-lg leading-relaxed text-offwhite/85">
                It is yours free when you join the weekly letter. You will get the guide straight
                away, and then one letter a week: no hustle, no noise, just the operational thinking
                that helps a business run without you in the middle of everything.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <NewsletterForm tone="dark" className="mt-10 max-w-xl" source="newsletter page" />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-lg shadow-[0_50px_90px_-45px_rgba(0,0,0,0.7)]">
              <img
                src={photos.kit.src}
                alt="The free guide laid out as printed pages and tabbed dividers"
                width={1600}
                height={1104}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-page section-y grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <ImageFrame src={photos.systems.src} alt={photos.systems.alt} ratio="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              If your week is reactive and everything still runs through you, this is where to
              start.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Each system in the guide is one you can install without hiring anyone, buying software
              or rebuilding the business. Read it in twenty minutes. Use it the same week.
            </p>
            <NewsletterForm className="mt-8 max-w-lg" source="newsletter page lower" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
