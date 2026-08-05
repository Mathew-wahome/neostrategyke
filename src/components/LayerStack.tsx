import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Layer = {
  index: string;
  title: string;
  lede: string;
  body: string;
};

/**
 * Split slider: editorial copy on the left, an animated stack of operating-system
 * layers on the right. The active layer lifts out of the stack and its label pill
 * connects back to it with a hairline.
 */
export function LayerStack({
  layers,
  className,
  interval = 6500,
}: {
  layers: readonly Layer[];
  className?: string;
  interval?: number;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => setIndex((next + layers.length) % layers.length),
    [layers.length],
  );

  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(() => go(index + 1), interval);
    return () => clearTimeout(id);
  }, [index, paused, reduced, interval, go]);

  const active = layers[index]!;

  return (
    <div
      className={cn("grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-8", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ---------- copy ---------- */}
      <div className="relative lg:pr-14">
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -top-10 right-2 text-6xl text-offwhite/12 md:text-8xl lg:right-10"
        >
          {active.index}.
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative"
          >
            <h3 className="font-display text-4xl leading-[1.05] text-offwhite md:text-6xl">
              {active.title}
            </h3>
            <p className="font-display mt-4 text-xl text-offwhite/85 md:text-2xl">{active.lede}</p>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-offwhite/65">
              {active.body}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center gap-5">
          <div className="flex gap-2">
            <button
              aria-label="Previous layer"
              onClick={() => go(index - 1)}
              className="grid size-10 place-items-center rounded-full border border-primary/60 text-offwhite/80 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              aria-label="Next layer"
              onClick={() => go(index + 1)}
              className="grid size-10 place-items-center rounded-full border border-primary/60 text-offwhite/80 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {layers.map((l, i) => (
              <button
                key={l.title}
                aria-label={`Show ${l.title}`}
                onClick={() => go(i)}
                className={cn(
                  "h-[6px] rounded-full transition-all duration-500",
                  i === index ? "w-8 bg-primary" : "w-[6px] bg-offwhite/25 hover:bg-offwhite/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- stack ---------- */}
      <div className="relative lg:border-l lg:border-offwhite/12 lg:pl-10">
        <div className="relative mx-auto flex aspect-square w-full max-w-[26rem] flex-col-reverse items-center justify-center gap-1">
          {layers.map((l, i) => {
            // bottom of the stack is the last layer
            const depth = layers.length - 1 - i;
            const isActive = i === index;
            const width = 46 + depth * 13;
            return (
              <motion.button
                key={l.title}
                onClick={() => go(i)}
                aria-label={`Show ${l.title}`}
                style={{ width: `${width}%` }}
                animate={
                  reduced
                    ? {}
                    : {
                        y: isActive ? -12 : 0,
                        scale: isActive ? 1.04 : 1,
                      }
                }
                transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                className="relative block"
              >
                <span
                  className={cn(
                    "block h-9 rounded-[50%] transition-colors duration-500 md:h-11",
                    isActive
                      ? "bg-primary shadow-[0_14px_0_-2px_var(--teal-deep)]"
                      : "bg-offwhite/92 shadow-[0_12px_0_-2px_rgba(0,0,0,0.28)]",
                  )}
                />
              </motion.button>
            );
          })}

          {/* halo */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--teal)_35%,transparent),transparent)] blur-2xl" />
        </div>

        {/* label pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {layers.map((l, i) => (
            <button
              key={`pill-${l.title}`}
              onClick={() => go(i)}
              className={cn(
                "font-ui rounded-md px-3 py-2 text-[0.72rem] tracking-wide transition-all duration-500",
                i === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-offwhite/92 text-charcoal/80 hover:bg-offwhite",
              )}
            >
              {l.index}. {l.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
