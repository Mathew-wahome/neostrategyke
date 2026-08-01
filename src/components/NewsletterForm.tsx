import { useState } from "react";
import { toast } from "sonner";
import { ActionButton } from "./ActionButton";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark" | "wash";

export function NewsletterForm({
  tone = "light",
  className,
  source = "site",
}: {
  tone?: Tone;
  className?: string;
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setDone(true);
    toast.success("Check your inbox — the guide is on its way.", {
      description: `Signed up from ${source}.`,
    });
  }

  if (done) {
    return (
      <p
        className={cn(
          "font-ui text-sm",
          tone === "dark" ? "text-offwhite/85" : "text-muted-foreground",
          className,
        )}
      >
        Thank you. The guide is on its way to {email}.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Your email address"
          className={cn(
            "font-ui h-11 w-full rounded-sm border px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary",
            tone === "dark"
              ? "border-offwhite/30 bg-transparent text-offwhite placeholder:text-offwhite/50 focus:border-offwhite"
              : "border-input bg-background text-foreground",
          )}
        />
        <ActionButton type="submit" variant={tone === "dark" ? "onDark" : "primary"}>
          Send me the guide
        </ActionButton>
      </div>
      <p
        className={cn(
          "font-ui mt-3 text-xs",
          tone === "dark" ? "text-offwhite/60" : "text-muted-foreground",
        )}
      >
        Free. Unsubscribe anytime.
      </p>
    </form>
  );
}
