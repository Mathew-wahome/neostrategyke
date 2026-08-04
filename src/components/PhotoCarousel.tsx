import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Slide = {
  photo: { src: string; alt: string };
  kicker: string;
  title: string;
  body: string;
};

export function PhotoCarousel({
  slides,
  className,
  interval = 6000,
}: {
  slides: readonly Slide[];
  className?: string;
  interval?: number;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1);
      setIndex((next + slides.length) % slides.length);
    },
    [index, slides.length],
  );

  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(() => go(index + 1), interval);
    return () => clearTimeout(id);
  }, [index, paused, reduced, interval, go]);

  const slide = slides[index]!;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-teal-deep sm:aspect-[16/10] lg:aspect-[16/9]">
        <AnimatePresence initial={false} custom={dir} mode="sync">
          <motion.div
            key={index}
            custom={dir}
            className="absolute inset-0"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06, x: dir * 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02, x: dir * -30 }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <img
              src={slide.photo.src}
              alt={slide.photo.alt}
              loading="lazy"
              width={1600}
              height={1104}
              className="size-full object-cover"
            />
            <div className="gradient-scrim absolute inset-0" />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${index}`}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="font-ui text-[0.65rem] uppercase tracking-[0.28em] text-offwhite/70">
                {slide.kicker}
              </p>
              <h3 className="font-display mt-3 text-2xl leading-tight text-offwhite md:text-4xl">
                {slide.title}
              </h3>
              <p className="mt-3 hidden text-sm leading-relaxed text-offwhite/80 sm:block md:text-base">
                {slide.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              aria-label={`Show ${s.title}`}
              onClick={() => go(i)}
              className="group relative h-[3px] flex-1 overflow-hidden rounded-full bg-foreground/12"
            >
              <span
                className={cn(
                  "absolute inset-y-0 left-0 bg-primary transition-all duration-500",
                  i === index ? "w-full" : "w-0 group-hover:w-1/3",
                )}
              />
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="grid size-9 place-items-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="grid size-9 place-items-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
