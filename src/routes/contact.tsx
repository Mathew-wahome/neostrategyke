import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ActionAnchor, ActionButton } from "@/components/ActionButton";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { whatsappLink } from "@/lib/brand";

type StageKey = "audit" | "install" | "partnership";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { stage?: StageKey } => {
    const stage = search["stage"];
    return stage === "audit" || stage === "install" || stage === "partnership" ? { stage } : {};
  },
  head: () => ({
    meta: [
      { title: "Book a free call — NeoStrategy" },
      {
        name: "description",
        content:
          "Fifteen minutes, no pitch, just clarity. Book a free call with NeoStrategy to see where founder dependency is sitting in your business.",
      },
      { property: "og:title", content: "Let us talk about what you are building" },
      {
        property: "og:description",
        content: "Book a free fifteen-minute call with NeoStrategy. No pitch, just clarity.",
      },
    ],
  }),
  component: Contact,
});

const stageLabels: Record<StageKey, string> = {
  audit: "The Founder Operating Systems Audit",
  install: "The Calm Execution Install",
  partnership: "The Founder Operations Partnership",
};

function nextDays(count: number) {
  const days: Date[] = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) days.push(new Date(d));
  }
  return days;
}

const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function Contact() {
  const { stage } = Route.useSearch();
  const days = nextDays(10);

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", notes: "" });
  const [booked, setBooked] = useState(false);

  const dateLabel = date
    ? date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
    : "";

  const message = `Hi NeoStrategy, I just booked a free call for ${dateLabel} at ${time}. My name is ${form.name} — looking forward to it!`;

  return (
    <>
      <section className="container-read pt-24 pb-12 md:pt-36 md:pb-16">
        <Reveal>
          <h1 className="font-display text-[2.4rem] leading-[1.1] md:text-6xl">
            Let us talk about what you are building.
          </h1>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 space-y-5">
          <p className="text-lg leading-relaxed text-foreground/85">
            If delivery is inconsistent, or everything still runs through you, a short conversation
            is the fastest way to see where the dependency is sitting.
          </p>
          <p className="text-lg leading-relaxed text-foreground/85">
            Book a free call below. Fifteen minutes. No pitch, just clarity.
          </p>
          {stage && (
            <p className="font-ui text-sm text-primary">
              Enquiring about: {stageLabels[stage]}
            </p>
          )}
        </Reveal>
      </section>

      <section className="border-t border-border/60">
        <div className="container-read py-16 md:py-24">
          {booked ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="border border-primary/15 bg-teal-wash px-6 py-12 md:px-12"
            >
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">
                Call requested
              </p>
              <h2 className="font-display mt-4 text-3xl leading-tight">
                {dateLabel} at {time}
              </h2>
              <p className="mt-5 text-foreground/80">
                Thank you, {form.name}. Confirm on WhatsApp and we will lock the time in. A
                confirmation email is on its way as a backup record.
              </p>
              <ActionAnchor
                href={whatsappLink(message)}
                target="_blank"
                rel="noreferrer"
                className="mt-8"
              >
                Confirm on WhatsApp
              </ActionAnchor>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (date && time) setBooked(true);
              }}
              className="space-y-12"
            >
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">
                  1 — Choose a time
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {days.map((d) => {
                    const active = date?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={d.toISOString()}
                        type="button"
                        onClick={() => setDate(d)}
                        className={`font-ui rounded-sm border px-4 py-3 text-sm transition-colors ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input hover:border-primary hover:bg-teal-wash"
                        }`}
                      >
                        {d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                      </button>
                    );
                  })}
                </div>
                {date && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`font-ui rounded-sm border px-4 py-2 text-sm transition-colors ${
                          time === t
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input hover:border-primary hover:bg-teal-wash"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">
                  2 — Your details
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { key: "name", label: "Name", type: "text", required: true },
                    { key: "email", label: "Email", type: "email", required: true },
                    { key: "phone", label: "Phone", type: "tel", required: false },
                    { key: "business", label: "Business name", type: "text", required: false },
                  ].map((f) => (
                    <label key={f.key} className="font-ui block text-sm">
                      <span className="text-muted-foreground">{f.label}</span>
                      <input
                        type={f.type}
                        required={f.required}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </label>
                  ))}
                </div>
                <label className="font-ui mt-4 block text-sm">
                  <span className="text-muted-foreground">What is going on right now?</span>
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                </label>
              </div>

              <ActionButton type="submit" size="lg" disabled={!date || !time}>
                Request this call
              </ActionButton>
            </form>
          )}
        </div>
      </section>

      <section className="border-t border-border/60 bg-teal-wash">
        <div className="container-read py-20">
          <Reveal>
            <p className="text-lg text-foreground/85">
              Not ready to talk? Get the free guide, 10 Systems Every Founder Needs, and start
              there.
            </p>
            <NewsletterForm className="mt-8 max-w-lg" source="contact" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
