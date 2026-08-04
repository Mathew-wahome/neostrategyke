import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Editorial image block with a gentle scroll parallax and a soft teal scrim. */
export function ImageFrame({
  src,
  alt,
  className,
  ratio = "aspect-[4/3]",
  scrim = true,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  scrim?: boolean;
  caption?: string;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <figure className={cn("group", className)}>
      <div ref={ref} className={cn("relative overflow-hidden rounded-lg bg-teal-wash", ratio)}>
        <motion.img
          src={src}
          alt={alt}
          {...(priority ? {} : { loading: "lazy" as const })}
          width={1600}
          height={1104}
          style={reduced ? undefined : { y, scale: 1.12 }}
          className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.16]"
        />
        {scrim && <div className="gradient-veil pointer-events-none absolute inset-0" />}
      </div>
      {caption && (
        <figcaption className="font-ui mt-3 text-xs tracking-wide text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
