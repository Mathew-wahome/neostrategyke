import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const actionVariants = cva(
  "font-ui inline-flex items-center justify-center rounded-sm text-sm tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-teal-deep",
        outline: "border border-primary text-primary hover:bg-teal-wash",
        onDark: "bg-offwhite text-teal-deep hover:bg-teal-wash",
        onDarkOutline:
          "border border-offwhite/50 text-offwhite hover:border-offwhite hover:bg-offwhite/10",
        quiet: "text-primary hover:text-teal-deep underline underline-offset-4 decoration-1",
      },
      size: {
        md: "h-11 px-6",
        lg: "h-12 px-8",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof actionVariants>;

export function ActionButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & Variants) {
  return <button className={cn(actionVariants({ variant, size }), className)} {...props} />;
}

export function ActionLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(actionVariants({ variant, size }), className)} {...props} />;
}

export function ActionAnchor({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"a"> & Variants) {
  return <a className={cn(actionVariants({ variant, size }), className)} {...props} />;
}
