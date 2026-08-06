import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Editorial headline that reveals word by word from behind a mask.
 * Words wrapped in {curly braces} render in the teal gradient.
 */
export function SplitHeading({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  if (reduced) {
    return (
      <Tag className={className}>
        {words.map((w, i) => {
          const accent = w.startsWith("{") || w.endsWith("}");
          return (
            <span key={i} className={accent ? "text-gradient-teal" : undefined}>
              {w.replace(/[{}]/g, "")}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
      variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((word, i) => {
        const accent = word.startsWith("{") || word.endsWith("}");
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] pr-[0.26em]">
            <motion.span
              className={cn("inline-block", accent && "text-gradient-teal")}
              variants={{
                hidden: { y: "110%", opacity: 0, rotate: 2 },
                show: {
                  y: "0%",
                  opacity: 1,
                  rotate: 0,
                  transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {word.replace(/[{}]/g, "")}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
