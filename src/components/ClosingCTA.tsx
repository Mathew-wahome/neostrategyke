import { ActionLink } from "@/components/ActionButton";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import { photos } from "@/lib/photos";

/** The closing block that appears at the foot of every page. */
export function ClosingCTA() {
  return (
    <section className="gradient-deep grain relative overflow-hidden text-offwhite">
      <img
        src={photos.texture.src}
        alt=""
        aria-hidden
        loading="lazy"
        className="drift pointer-events-none absolute inset-0 size-full object-cover opacity-10"
      />
      <div className="container-page section-y relative">
        <SplitHeading
          text="If the business stops when you do, that is the thing to fix first."
          className="font-display max-w-3xl text-3xl leading-tight md:text-5xl"
        />
        <Reveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ActionLink to="/contact" variant="onDark" size="lg">
            Book a call
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
    </section>
  );
}
