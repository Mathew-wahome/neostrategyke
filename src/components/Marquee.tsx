export function Marquee({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const row = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden border-y py-5 ${
        tone === "dark" ? "border-offwhite/15 bg-teal-deep" : "border-border/60 bg-teal-wash/60"
      }`}
    >
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`font-ui flex items-center gap-12 text-[0.7rem] uppercase tracking-[0.3em] ${
              tone === "dark" ? "text-offwhite/70" : "text-foreground/55"
            }`}
          >
            {item}
            <span className={tone === "dark" ? "text-offwhite/30" : "text-primary/50"}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
