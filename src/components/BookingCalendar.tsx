import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function isSelectable(d: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = d.getDay();
  return d.getTime() > today.getTime() && day !== 0 && day !== 6;
}

export function BookingCalendar({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (d: Date) => void;
}) {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const [direction, setDirection] = useState(1);

  const cells = useMemo(() => {
    const first = startOfMonth(cursor);
    const offset = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const list: (Date | null)[] = Array.from({ length: offset }, () => null);
    for (let i = 1; i <= daysInMonth; i += 1) {
      list.push(new Date(cursor.getFullYear(), cursor.getMonth(), i));
    }
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [cursor]);

  const atFloor = startOfMonth(new Date()).getTime() >= cursor.getTime();

  function shift(delta: number) {
    setDirection(delta);
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
  }

  return (
    <div className="rounded-sm border border-border/70 bg-background/70 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          disabled={atFloor}
          onClick={() => shift(-1)}
          className="grid size-9 place-items-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border/70 disabled:hover:text-muted-foreground"
        >
          <ChevronLeft className="size-4" />
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={cursor.toISOString()}
            initial={{ opacity: 0, y: direction * 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction * -8 }}
            transition={{ duration: 0.25 }}
            className="font-display text-lg tracking-tight"
          >
            {cursor.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </motion.p>
        </AnimatePresence>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => shift(1)}
          className="grid size-9 place-items-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="font-ui mt-6 grid grid-cols-7 gap-1 text-center text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1">
            {d.slice(0, 2)}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <span key={`empty-${i}`} className="h-11" />;
          const selectable = isSelectable(d);
          const active = value ? sameDay(value, d) : false;
          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={!selectable}
              onClick={() => onChange(d)}
              className={`font-ui relative h-11 rounded-sm text-sm transition-all duration-300 ${
                active
                  ? "bg-primary text-primary-foreground shadow-[0_10px_25px_-12px_var(--primary)]"
                  : selectable
                    ? "text-foreground hover:-translate-y-0.5 hover:bg-teal-wash hover:text-primary"
                    : "cursor-not-allowed text-muted-foreground/35"
              }`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      <p className="font-ui mt-5 text-xs text-muted-foreground">
        Weekdays only. All times East Africa Time (GMT+3).
      </p>
    </div>
  );
}
