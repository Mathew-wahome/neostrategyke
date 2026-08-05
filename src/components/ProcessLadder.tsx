import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export type Step = { n: string; title: string; lede: string; body: string };

/** Dark editorial ladder: oversized numerals, dashed rules, hover-lit rows. */
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
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
              className="group relative grid grid-cols-[3.5rem_1fr] items-start gap-5 border-b border-dashed border-offwhite/20 py-8 md:grid-cols-[10rem_1fr] md:gap-10 md:py-12"
            >
              <span className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 -z-10 origin-left scale-x-0 bg-offwhite/[0.04] transition-transform duration-700 ease-out group-hover:scale-x-100" />

              <span className="font-display text-4xl leading-none text-offwhite/35 transition-all duration-500 group-hover:text-primary md:text-7xl">
                {step.n}
              </span>

              <div className="md:flex md:items-start md:justify-between md:gap-10">
                <div className="max-w-3xl">
                  <h3 className="font-display text-2xl text-offwhite md:text-3xl">{step.title}</h3>
                  <p className="mt-2 text-offwhite/80">{step.lede}</p>
                  <p className="mt-1 text-offwhite/55">{step.body}</p>
                </div>
                <ArrowUpRight className="mt-2 hidden size-6 shrink-0 text-offwhite/30 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary md:block" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
