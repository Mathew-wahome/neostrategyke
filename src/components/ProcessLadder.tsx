import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export type Step = { n: string; title: string; lede: string; body: string };

/**
 * Dark editorial ladder: oversized numerals, dashed rules, and rows whose detail
 * copy stays hidden behind the title until the row is hovered or focused.
 */
export function ProcessLadder({
  steps,
  heading,
  sub,
}: {
  steps: readonly Step[];
  heading: string;
  sub: string[];
}) {
  const reduced = useReducedMotion();

  return (
    <section className="gradient-deep relative overflow-hidden text-offwhite">
      <div className="container-page section-y relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display text-[2.1rem] leading-[1.08] md:text-6xl"
          >
            {heading}
          </motion.h2>
          {sub.map((s) => (
            <p key={s} className="mt-3 text-[1.02rem] text-offwhite/65 md:text-lg">
              {s}
            </p>
          ))}
        </div>

        <div className="mt-14 border-t border-dashed border-offwhite/20 md:mt-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              tabIndex={0}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
              className="group relative grid cursor-default grid-cols-[3.5rem_1fr] items-start gap-5 border-b border-dashed border-offwhite/20 py-7 outline-none transition-[padding] duration-500 focus-visible:ring-1 focus-visible:ring-primary/50 hover:md:pl-4 md:grid-cols-[10rem_1fr] md:gap-10 md:py-10"
            >
              {/* wash + teal edge that slide in on hover */}
              <span className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 -z-10 origin-left scale-x-0 bg-offwhite/[0.05] transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              <span className="pointer-events-none absolute inset-y-3 left-[-1.5rem] w-px origin-top scale-y-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100" />

              <span className="font-display text-4xl leading-none text-offwhite/35 transition-all duration-500 group-hover:text-primary group-focus-visible:text-primary md:text-7xl">
                {step.n}
              </span>

              <div className="md:flex md:items-start md:justify-between md:gap-10">
                <div className="max-w-3xl">
                  <h3 className="font-display text-2xl text-offwhite transition-transform duration-500 group-hover:translate-x-1 group-focus-visible:translate-x-1 md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-offwhite/80">{step.lede}</p>

                  {/* revealed detail — hidden behind the title until hover */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-600 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
                    <div className="overflow-hidden">
                      <p className="mt-3 max-w-xl border-l border-primary/50 pl-4 text-offwhite/60">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>

                <span className="mt-2 hidden shrink-0 items-center gap-2 md:flex">
                  <span className="font-ui max-w-0 overflow-hidden whitespace-nowrap text-[0.68rem] uppercase tracking-[0.22em] text-primary opacity-0 transition-all duration-500 group-hover:max-w-[10rem] group-hover:opacity-100 group-focus-visible:max-w-[10rem] group-focus-visible:opacity-100">
                    Step {step.n}
                  </span>
                  <ArrowUpRight className="size-6 text-offwhite/30 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary group-focus-visible:text-primary" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
