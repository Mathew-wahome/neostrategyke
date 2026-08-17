import { createFileRoute } from "@tanstack/react-router";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ImageFrame } from "@/components/ImageFrame";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/photos";

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
                The Founder&rsquo;s Flow Map. Free.
              </h1>
              <div className="mt-9 max-w-xl space-y-5">
                <p className="text-lg leading-relaxed text-offwhite/85">
                  Most founders do not know which processes to write down. So they write nothing, or
                  they write the wrong things and give up halfway.
                </p>
                <p className="text-lg leading-relaxed text-offwhite/85">
                  This is the one page we start every engagement with. It shows you how work really
                  moves through your business, from the first message to the money landing. Then it
                  shows you which five things to write down first.
                </p>
                <p className="text-lg leading-relaxed text-offwhite/85">
                  You get it straight away. After that, one letter a week. No hustle, no noise. Just
                  the thinking that helps a business run without you holding every piece of it.
                </p>
              </div>
              <NewsletterForm
                tone="dark"
                className="mt-10 max-w-xl"
                source="newsletter"
                cta="Send me the guide"
              />
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <ImageFrame src={photos.systems.src} alt={photos.systems.alt} ratio="aspect-[4/5]" priority />
          </Reveal>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
