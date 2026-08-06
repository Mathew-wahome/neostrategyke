import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export type JourneyStep = { year: string; title: string; body: string };

/** Vertical editorial timeline with a teal line that draws itself as you scroll. */
export function Journey({ steps }: { steps: readonly JourneyStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 90,
    damping: 26,
  });

  return (
    <div ref={ref} className="relative pl-10 md:pl-16">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-primary/15 md:left-[11px]" />
      <motion.div
        style={reduced ? { height: "100%" } : { height }}
        className="absolute left-[7px] top-2 w-px bg-[linear-gradient(180deg,var(--teal-deep),var(--teal))] md:left-[11px]"
      />

      <ol className="space-y-14 md:space-y-20">
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.85, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            <span className="absolute -left-10 top-[0.55rem] grid size-[15px] place-items-center rounded-full border border-primary/40 bg-background transition-all duration-500 group-hover:scale-125 group-hover:border-primary md:-left-16 md:size-[23px]">
              <span className="size-[5px] rounded-full bg-primary transition-transform duration-500 group-hover:scale-150" />
            </span>
            <p className="font-ui text-[0.65rem] uppercase tracking-[0.28em] text-primary">
              {step.year}
            </p>
            <h3 className="font-display mt-3 text-2xl transition-colors duration-500 group-hover:text-primary md:text-[2rem]">
              {step.title}
            </h3>
            <p className="mt-3 max-w-xl text-foreground/75">{step.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
