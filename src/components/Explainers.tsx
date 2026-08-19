import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Hand-made visual explainers: whiteboards, chalkboards, sticky walls,
 * flowcharts and small infographics. No stock photography anywhere.
 * ------------------------------------------------------------------ */

function Rise({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** A dry-erase whiteboard panel with a marker tray. */
export function Whiteboard({
  kicker,
  title,
  caption,
  children,
  className,
}: {
  kicker?: string;
  title?: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      <div className="board-white relative rounded-xl px-5 pb-6 pt-5 md:px-7 md:pb-8 md:pt-6">
        {(kicker || title) && (
          <header className="mb-5 border-b border-dashed border-primary/25 pb-4">
            {kicker && (
              <p className="font-ui text-[0.6rem] uppercase tracking-[0.28em] text-primary">
                {kicker}
              </p>
            )}
            {title && (
              <p className="font-hand mt-1 text-2xl leading-tight text-charcoal md:text-3xl">
                {title}
              </p>
            )}
          </header>
        )}
        {children}
        {/* marker tray */}
        <div className="pointer-events-none absolute inset-x-6 -bottom-[6px] h-[6px] rounded-b-md bg-[color-mix(in_oklab,var(--charcoal)_18%,transparent)]" />
      </div>
      {caption && (
        <figcaption className="font-ui mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** A chalkboard panel: chalk headline, dusty rules, white-on-slate diagrams. */
export function Chalkboard({
  kicker,
  title,
  children,
  className,
}: {
  kicker?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("board-chalk grain relative rounded-xl p-5 md:p-8", className)}>
      {kicker && (
        <p className="font-ui text-[0.6rem] uppercase tracking-[0.3em] text-offwhite/55">{kicker}</p>
      )}
      {title && (
        <p className="font-chalk mt-2 text-2xl leading-snug text-offwhite md:text-3xl">{title}</p>
      )}
      <div className={cn(kicker || title ? "mt-6" : "")}>{children}</div>
    </div>
  );
}

const noteTones = {
  yellow: "bg-note-yellow",
  teal: "bg-note-teal",
  clay: "bg-note-clay",
  sky: "bg-note-sky",
} as const;

export type Note = {
  text: string;
  label?: string;
  tone?: keyof typeof noteTones;
};

/** A wall of sticky notes, slightly rotated, in the brand's paper palette. */
export function StickyWall({
  notes,
  className,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  notes: readonly Note[];
  className?: string;
  columns?: string;
}) {
  const tones = ["yellow", "teal", "clay", "sky"] as const;
  return (
    <div className={cn("grid gap-4", columns, className)}>
      {notes.map((n, i) => {
        const tone = n.tone ?? tones[i % tones.length]!;
        const tilt = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2][i % 6]!;
        return (
          <Rise key={n.text} delay={i * 0.06}>
            <div
              style={{ rotate: `${tilt}deg` }}
              className={cn(
                "note-paper h-full px-5 py-5 transition-transform duration-500 hover:rotate-0 hover:-translate-y-1",
                noteTones[tone],
              )}
            >
              {n.label && (
                <p className="font-ui text-[0.58rem] uppercase tracking-[0.24em] text-charcoal/55">
                  {n.label}
                </p>
              )}
              <p className="font-hand mt-1 text-xl leading-snug text-charcoal md:text-[1.4rem]">
                {n.text}
              </p>
            </div>
          </Rise>
        );
      })}
    </div>
  );
}

export type FlowStep = { label: string; note?: string; leak?: string };

/** A left-to-right process flow, drawn like marker boxes with leak flags. */
export function FlowBoard({ steps, className }: { steps: readonly FlowStep[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:items-stretch", className)}>
      {steps.map((s, i) => (
        <div key={s.label} className="flex flex-1 items-stretch gap-3">
          <Rise delay={i * 0.08} className="flex-1">
            <div className="relative h-full rounded-lg border-2 border-charcoal/80 bg-offwhite px-4 py-4">
              <p className="font-ui text-[0.55rem] uppercase tracking-[0.24em] text-primary">
                Step {i + 1}
              </p>
              <p className="font-hand mt-1 text-xl leading-tight text-charcoal">{s.label}</p>
              {s.note && (
                <p className="font-ui mt-2 text-xs leading-relaxed text-muted-foreground">{s.note}</p>
              )}
              {s.leak && (
                <p className="font-hand mt-3 inline-block -rotate-2 rounded-sm bg-note-clay px-2 py-0.5 text-base leading-tight text-charcoal">
                  leak: {s.leak}
                </p>
              )}
            </div>
          </Rise>
          {i < steps.length - 1 && (
            <div className="hidden shrink-0 items-center text-primary md:flex">
              <ArrowRight className="size-5" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Icon-led symptom list — replaces heavy paragraphs with scannable signals. */
export function SymptomGrid({
  items,
  className,
}: {
  items: readonly { icon: LucideIcon; text: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {items.map((s, i) => (
        <Rise key={s.text} delay={i * 0.05}>
          <div className="flex h-full items-start gap-3 rounded-lg border border-border/70 bg-background/70 px-4 py-3.5 transition-colors hover:border-primary/40 hover:bg-teal-wash/50">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-teal-wash text-primary">
              <s.icon className="size-4" />
            </span>
            <p className="font-ui text-sm leading-snug text-foreground/85">{s.text}</p>
          </div>
        </Rise>
      ))}
    </div>
  );
}

/** Four stacked layers, drawn as a section diagram. */
export function LayerDiagram({
  layers,
  className,
}: {
  layers: readonly { title: string; note: string }[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {layers.map((l, i) => (
        <Rise key={l.title} delay={i * 0.07}>
          <div
            className="flex items-center gap-4 rounded-md border border-offwhite/25 px-4 py-3"
            style={{
              background: `color-mix(in oklab, var(--teal) ${10 + i * 9}%, transparent)`,
              marginInline: `${(layers.length - 1 - i) * 10}px 0`,
            }}
          >
            <span className="font-chalk shrink-0 text-lg text-offwhite/60">0{i + 1}</span>
            <div className="min-w-0">
              <p className="font-chalk text-xl leading-tight text-offwhite">{l.title}</p>
              <p className="font-ui mt-0.5 text-xs leading-relaxed text-offwhite/70">{l.note}</p>
            </div>
          </div>
        </Rise>
      ))}
    </div>
  );
}

/** Chalk checklist. */
export function ChalkChecklist({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((t, i) => (
        <Rise key={t} delay={i * 0.05}>
          <li className="flex items-start gap-3">
            <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-[3px] border border-offwhite/50 text-offwhite">
              <Check className="size-3.5" />
            </span>
            <span className="font-chalk text-lg leading-snug text-offwhite/90">{t}</span>
          </li>
        </Rise>
      ))}
    </ul>
  );
}

/** Two-column before / after board. */
export function BeforeAfter({
  before,
  after,
  className,
}: {
  before: { title: string; items: readonly string[] };
  after: { title: string; items: readonly string[] };
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {[before, after].map((col, ci) => (
        <div
          key={col.title}
          className={cn(
            "rounded-lg border-2 px-5 py-5",
            ci === 0
              ? "border-dashed border-charcoal/35 bg-offwhite"
              : "border-primary/60 bg-teal-wash",
          )}
        >
          <p className="font-hand text-2xl leading-tight text-charcoal">{col.title}</p>
          <ul className="mt-4 space-y-2">
            {col.items.map((t) => (
              <li key={t} className="font-ui flex gap-2 text-sm leading-snug text-foreground/80">
                <span className={ci === 0 ? "text-muted-foreground" : "text-primary"}>
                  {ci === 0 ? "✕" : "✓"}
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** A simple hand-drawn dial showing how much of the business sits on the founder. */
export function DependencyDial({
  value,
  label,
  caption,
  className,
}: {
  value: number;
  label: string;
  caption?: string;
  className?: string;
}) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("flex items-center gap-5", className)}>
      <svg viewBox="0 0 128 128" className="size-28 shrink-0 -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="currentColor" strokeWidth="10" className="text-teal-wash" />
        <motion.circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          className="text-primary"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div>
        <p className="font-hand text-3xl leading-none text-charcoal">{value}%</p>
        <p className="font-ui mt-2 text-sm leading-snug text-foreground/80">{label}</p>
        {caption && <p className="font-ui mt-1 text-xs text-muted-foreground">{caption}</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Product covers: unique generated infographics, never repeated art.
 * ------------------------------------------------------------------ */

export type GlyphKind = "flow" | "grid" | "stack" | "checklist" | "dial" | "book" | "map";

const glyphKinds: GlyphKind[] = ["flow", "grid", "stack", "checklist", "dial", "book", "map"];

export function glyphFor(seed: string): GlyphKind {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return glyphKinds[h % glyphKinds.length]!;
}

const glyphWords: Record<GlyphKind, readonly string[]> = {
  flow: ["Enquire", "Deliver", "Get paid"],
  grid: ["Sell", "Promise", "Refuse", "Price", "Deliver", "Handover", "Review", "Report"],
  stack: ["Clarity", "Delivery", "Delegation", "Visibility"],
  checklist: ["Map the leaks", "Write the SOP", "Hand it over", "Check the week"],
  dial: ["Founder load"],
  book: ["Diagnose", "Decide", "Install"],
  map: ["First message", "Scope", "Delivery", "Money in"],
};

/** A flat, board-style infographic used in place of product photography. */
export function ProductGlyph({
  kind,
  label,
  className,
}: {
  kind: GlyphKind;
  label?: string | undefined;
  className?: string | undefined;
}) {
  const stroke = "var(--teal-deep)";
  const accent = "var(--teal)";
  const w = glyphWords[kind];
  const txt = {
    fill: "var(--charcoal)",
    fontSize: 8,
    fontFamily: "var(--font-ui, ui-sans-serif)",
  } as const;

  const art: Record<GlyphKind, ReactNode> = {
    flow: (
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={14 + i * 62} y={54} width={48} height={34} rx="4" fill="none" stroke={stroke} strokeWidth="2.5" />
            <text x={38 + i * 62} y={74} textAnchor="middle" {...txt}>
              {w[i]}
            </text>
            {i < 2 && <path d={`M${66 + i * 62} 71 h10`} stroke={accent} strokeWidth="2.5" />}
          </g>
        ))}
        <path d="M38 88 v18 h100 v-18" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="6 5" />
        <text x="88" y="118" textAnchor="middle" {...txt} fill={stroke} opacity="0.8">
          repeatable loop
        </text>
      </g>
    ),
    grid: (
      <g>
        {[0, 1].map((r) =>
          [0, 1, 2, 3].map((c) => {
            const i = r * 4 + c;
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={12 + c * 42}
                  y={38 + r * 38}
                  width={38}
                  height={28}
                  rx="3"
                  fill={i % 3 === 0 ? accent : "none"}
                  opacity={i % 3 === 0 ? 0.18 : 1}
                  stroke={stroke}
                  strokeWidth="2"
                />
                <text x={31 + c * 42} y={56 + r * 38} textAnchor="middle" {...txt}>
                  {w[i]}
                </text>
              </g>
            );
          }),
        )}
      </g>
    ),
    stack: (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x={22 + i * 8}
              y={26 + i * 26}
              width={136 - i * 16}
              height={22}
              rx="3"
              fill={accent}
              opacity={0.12 + i * 0.12}
              stroke={stroke}
              strokeWidth="2"
            />
            <text x={32 + i * 8} y={41 + i * 26} {...txt}>
              {w[i]}
            </text>
          </g>
        ))}
      </g>
    ),
    checklist: (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={20} y={26 + i * 27} width={16} height={16} rx="3" fill="none" stroke={stroke} strokeWidth="2.4" />
            <path d={`M23 ${34 + i * 27} l4 4 l7 -9`} fill="none" stroke={accent} strokeWidth="2.6" strokeLinecap="round" />
            <text x={46} y={39 + i * 27} {...txt}>
              {w[i]}
            </text>
          </g>
        ))}
      </g>
    ),
    dial: (
      <g>
        <circle cx="90" cy="66" r="40" fill="none" stroke={stroke} strokeWidth="3" opacity="0.3" />
        <path d="M90 26 a40 40 0 0 1 30 65" fill="none" stroke={accent} strokeWidth="7" strokeLinecap="round" />
        <text x="90" y="64" textAnchor="middle" {...txt} fontSize="16">
          64%
        </text>
        <text x="90" y="78" textAnchor="middle" {...txt} opacity="0.75">
          {w[0]}
        </text>
        <text x="90" y="124" textAnchor="middle" {...txt} opacity="0.7">
          decisions still waiting on you
        </text>
      </g>
    ),
    book: (
      <g>
        <path d="M30 32 h52 a8 8 0 0 1 8 8 v72 h-52 a8 8 0 0 1 -8 -8 z" fill="none" stroke={stroke} strokeWidth="2.6" />
        <path d="M150 32 h-52 a8 8 0 0 0 -8 8 v72 h52 a8 8 0 0 0 8 -8 z" fill={accent} opacity="0.14" stroke={stroke} strokeWidth="2.6" />
        {w.map((t, i) => (
          <text key={t} x={100} y={54 + i * 18} {...txt}>
            {t}
          </text>
        ))}
        <text x={40} y={54} {...txt} opacity="0.7">
          Read
        </text>
        <text x={40} y={72} {...txt} opacity="0.7">
          Apply
        </text>
      </g>
    ),
    map: (
      <g>
        <path d="M20 100 C60 40, 110 130, 160 46" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="7 6" />
        {(
          [
            [20, 100],
            [72, 74],
            [118, 92],
            [160, 46],
          ] as const
        ).map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i === 3 ? 8 : 5} fill={i === 3 ? accent : "none"} stroke={stroke} strokeWidth="2.5" />
            <text x={x} y={y - 12} textAnchor="middle" {...txt}>
              {w[i]}
            </text>
          </g>
        ))}
      </g>
    ),
  };

  return (
    <div className={cn("board-white relative flex h-full w-full items-center justify-center", className)}>
      <svg viewBox="0 0 180 140" className="h-full w-full p-2" role="img" aria-label={label ?? "Infographic"}>
        {art[kind]}
      </svg>
      {label && (
        <span className="font-hand absolute bottom-2 left-4 text-lg text-charcoal/70">{label}</span>
      )}
    </div>
  );
}

