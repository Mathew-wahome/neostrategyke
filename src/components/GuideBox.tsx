import { NewsletterForm } from "./NewsletterForm";
import { Reveal } from "./Reveal";

export function GuideBox({ source }: { source: string }) {
  return (
    <Reveal className="border border-primary/15 bg-teal-wash px-6 py-10 md:px-12 md:py-14">
      <h3 className="font-display text-2xl md:text-3xl">The Founder&rsquo;s Flow Map. Free.</h3>
      <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-foreground/80">
        The one page we start every engagement with, plus one letter a week.
      </p>
      <NewsletterForm className="mt-6 max-w-lg" source={source} />
    </Reveal>
  );
}
