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
 * layers on the right. Hovering a layer promotes it — the disc lifts, its hairline
 * connector draws out to a label, and the copy on the left swaps to match.
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
      className={cn("grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-10", className)}
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
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
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
                onMouseEnter={() => go(i)}
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
        <div className="relative mx-auto flex aspect-square w-full max-w-[26rem] flex-col items-center justify-center gap-1 pr-24 sm:max-w-[30rem] sm:pr-32 lg:pr-36">
          {layers.map((l, i) => {
            // 01 sits at the narrow top of the stack, the last layer is the wide base
            const isActive = i === index;
            const width = 46 + i * 13;
            return (
              <motion.button
                key={l.title}
                onClick={() => go(i)}
                onMouseEnter={() => go(i)}
                onFocus={() => go(i)}
                aria-label={`Show ${l.title}`}
                style={{ width: `${width}%` }}
                animate={
                  reduced
                    ? {}
                    : {
                        y: isActive ? -14 : 0,
                        x: isActive ? -10 : 0,
                        scale: isActive ? 1.05 : 1,
                      }
                }
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="group relative block outline-none"
              >
                <span
                  className={cn(
                    "block h-9 rounded-[50%] transition-colors duration-500 md:h-11",
                    isActive
                      ? "bg-primary shadow-[0_14px_0_-2px_var(--teal-deep)]"
                      : "bg-offwhite/92 shadow-[0_12px_0_-2px_rgba(0,0,0,0.28)] group-hover:bg-offwhite",
                  )}
                />

                {/* travelling pointer — slides to whichever layer is active */}
                {isActive && !reduced && (
                  <motion.span
                    layoutId="layer-pointer"
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 -left-6 hidden size-2 -translate-y-1/2 rotate-45 border-t-2 border-r-2 border-primary sm:block"
                    transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                  />
                )}

                {/* number sits inside the disc, revealed as it lifts */}
                <span
                  className={cn(
                    "font-ui absolute inset-y-0 left-4 flex items-center text-[0.68rem] tracking-[0.24em] transition-all duration-500 md:left-6",
                    isActive
                      ? "text-primary-foreground/90 opacity-100"
                      : "text-charcoal/45 opacity-0 group-hover:opacity-100",
                  )}
                >
                  {l.index}
                </span>

                {/* explainer arrow: hairline draws out to the label */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-full flex -translate-y-1/2 items-center"
                >
                  <motion.span
                    className={cn(
                      "block h-px origin-left",
                      isActive ? "bg-primary" : "bg-offwhite/25",
                    )}
                    animate={{ width: isActive ? 34 : 14 }}
                    transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                  />
                  <span
                    className={cn(
                      "-ml-px size-1.5 rotate-45 border-t border-r transition-colors duration-500",
                      isActive ? "border-primary" : "border-offwhite/30",
                    )}
                  />
                  <span
                    className={cn(
                      "font-ui ml-2 whitespace-nowrap text-[0.66rem] tracking-wide transition-all duration-500 md:text-[0.72rem]",
                      isActive
                        ? "translate-x-0 text-primary opacity-100"
                        : "-translate-x-1 text-offwhite/45 opacity-70",
                    )}
                  >
                    {l.title}
                  </span>
                </span>
              </motion.button>
            );
          })}

          {/* halo */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--teal)_35%,transparent),transparent)] blur-2xl" />
        </div>

        <p className="font-ui mt-8 text-center text-[0.68rem] uppercase tracking-[0.26em] text-offwhite/35">
          Hover a layer to explore it
        </p>
      </div>

    </div>
  );
}
