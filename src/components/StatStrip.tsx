import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix?: string; prefix?: string; label: string };

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? stat.value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, stat.value]);

  return (
    <span ref={ref} className="font-display text-4xl leading-none md:text-5xl">
      {stat.prefix}
      {n}
      {stat.suffix}
    </span>
  );
}

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="border-t border-primary/25 pt-5">
          <Counter stat={stat} />
          <p className="font-ui mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
