import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { ActionAnchor, ActionButton } from "@/components/ActionButton";
import { BookingCalendar } from "@/components/BookingCalendar";
import { ImageFrame } from "@/components/ImageFrame";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/photos";

import { createBooking } from "@/lib/site-api";
import {
  openWhatsAppWindow,
  sendToWhatsApp,
  useSiteSettings,
  waLink,
} from "@/lib/site-settings";
import { toast } from "sonner";

type StageKey = "audit" | "install" | "partnership";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { stage?: StageKey } => {
    const stage = search["stage"] as StageKey | undefined;
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const stageLabels: Record<StageKey, string> = {
  audit: "The Founder Operating Systems Audit",
  install: "The Calm Execution Install",
  partnership: "The Founder Operations Partnership",
};

const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

type ScreenKey = "stage" | "team" | "bottleneck" | "urgency";

const screening: {
  key: ScreenKey;
  eyebrow: string;
  question: string;
  options: { value: string; label: string; hint: string }[];
}[] = [
  {
    key: "stage",
    eyebrow: "Where you are",
    question: "How would you describe the business today?",
    options: [
      { value: "Early — under 2 years", label: "Early", hint: "Under two years, still finding rhythm" },
      { value: "Growing — 2 to 5 years", label: "Growing", hint: "Two to five years, demand is real" },
      { value: "Established — 5 years+", label: "Established", hint: "Five years or more, scale is the question" },
    ],
  },
  {
    key: "team",
    eyebrow: "Your team",
    question: "Who else is delivering the work right now?",
    options: [
      { value: "Just me", label: "Just me", hint: "Everything runs through the founder" },
      { value: "2 to 5 people", label: "2 – 5 people", hint: "A small team, loosely defined roles" },
      { value: "6 to 20 people", label: "6 – 20 people", hint: "Departments forming, handovers messy" },
      { value: "20+ people", label: "20+ people", hint: "Structure exists, consistency does not" },
    ],
  },
  {
    key: "bottleneck",
    eyebrow: "The pinch",
    question: "What breaks first when things get busy?",
    options: [
      { value: "Delivery quality", label: "Delivery", hint: "Output slips when volume rises" },
      { value: "Delegation", label: "Delegation", hint: "Nothing moves without your approval" },
      { value: "Visibility", label: "Visibility", hint: "You cannot see status without asking" },
      { value: "Follow-through", label: "Follow-through", hint: "Good decisions quietly go missing" },
    ],
  },
  {
    key: "urgency",
    eyebrow: "Timing",
    question: "How soon do you want this fixed?",
    options: [
      { value: "Immediately", label: "Immediately", hint: "It is costing money now" },
      { value: "Next quarter", label: "This quarter", hint: "Planning the next 90 days" },
      { value: "Exploring", label: "Exploring", hint: "Curious, gathering perspective" },
    ],
  },
];

function StepDots({ step }: { step: number }) {
  const labels = ["Pre-screen", "Choose a time", "Your details"];
  return (
    <div className="font-ui flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.18em]">
      {labels.map((label, i) => {
        const done = step > i;
        const active = step === i;
        return (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`grid size-6 place-items-center rounded-full border text-[0.6rem] transition-colors duration-500 ${
                done
                  ? "border-primary bg-primary text-primary-foreground"
                  : active
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
              }`}
            >
              {done ? <Check className="size-3" /> : i + 1}
            </span>
            <span className={active ? "text-primary" : "text-muted-foreground"}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function Contact() {
  const { stage } = Route.useSearch();
  const settings = useSiteSettings();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<ScreenKey, string>>>({});
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", notes: "" });
  const [booked, setBooked] = useState(false);
  const [pending, setPending] = useState(false);

  const screeningDone = screening.every((s) => answers[s.key]);

  const dateLabel = date
    ? date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
    : "";

  const screenSummary = screening
    .map((s) => `${s.eyebrow}: ${answers[s.key] ?? "—"}`)
    .join(" · ");

  const message = `Hi NeoStrategy, I just booked a free call for ${dateLabel} at ${time} (EAT). My name is ${form.name}${
    form.business ? ` from ${form.business}` : ""
  }${stage ? ` — interested in ${stageLabels[stage as StageKey]}` : ""}.

Pre-screen — ${screenSummary}${form.notes ? `

Context: ${form.notes}` : ""}`;

  const whatsappUrl = waLink(settings.whatsapp_number, message);

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !time) return;
    const parts = time.split(":");
    const scheduled = new Date(date);
    scheduled.setHours(Number(parts[0]), Number(parts[1]), 0, 0);
    // Opened synchronously so the browser treats it as a user gesture.
    const win = openWhatsAppWindow();
    setPending(true);
    try {
      await createBooking({
        client_name: form.name,
        email: form.email,
        phone: form.phone,
        business_name: form.business,
        notes: [screenSummary, form.notes].filter(Boolean).join("\n\n"),
        scheduled_at: scheduled.toISOString(),
        services_stage_interest: (stage as StageKey | undefined) ?? null,
      });
      setBooked(true);
      sendToWhatsApp(win, whatsappUrl);
    } catch {
      win?.close();
      toast.error("We could not save that request. Please try again in a moment.");
    } finally {
      setPending(false);
    }
  }

  const stepVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  return (
    <>
      <section className="gradient-page relative overflow-hidden">
        <div className="container-page grid items-center gap-12 pt-20 pb-16 md:pt-32 md:pb-20 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              Book a call
            </p>
            <h1 className="font-display mt-6 text-[2.5rem] leading-[1.06] md:text-6xl">
              Let us talk about <span className="text-gradient-teal">what you are building.</span>
            </h1>
            <div className="mt-9 max-w-xl space-y-5">
              <p className="text-lg leading-relaxed text-foreground/85">
                If delivery is inconsistent, or everything still runs through you, a short
                conversation is the fastest way to see where the dependency is sitting.
              </p>
              <p className="text-lg leading-relaxed text-foreground/85">
                Four quick questions, pick your slot, and the conversation continues on WhatsApp.
                Fifteen minutes. No pitch, just clarity.
              </p>
              {stage && (
                <p className="font-ui text-sm text-primary">
                  Enquiring about: {stageLabels[stage as StageKey]}
                </p>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ImageFrame
              src={photos.coaching.src}
              alt={photos.coaching.alt}
              ratio="aspect-[4/3]"
              priority
            />
          </Reveal>
        </div>
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
                Thank you, {form.name}. Your request is logged and WhatsApp should have opened
                automatically — send the message and we will lock the time in.
              </p>
              <ActionAnchor href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-8">
                Open WhatsApp again
              </ActionAnchor>
            </motion.div>
          ) : (
            <div className="space-y-10">
              <StepDots step={step} />

              <AnimatePresence mode="wait" initial={false}>
                {step === 0 && (
                  <motion.div
                    key="screen"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                    className="space-y-12"
                  >
                    {screening.map((s) => (
                      <div key={s.key}>
                        <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">
                          {s.eyebrow}
                        </p>
                        <h3 className="font-display mt-3 text-2xl leading-tight">{s.question}</h3>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {s.options.map((o) => {
                            const active = answers[s.key] === o.value;
                            return (
                              <button
                                key={o.value}
                                type="button"
                                onClick={() => setAnswers((a) => ({ ...a, [s.key]: o.value }))}
                                className={`group rounded-sm border px-5 py-4 text-left transition-all duration-300 ${
                                  active
                                    ? "border-primary bg-teal-wash shadow-[0_18px_40px_-30px_var(--primary)]"
                                    : "border-input hover:-translate-y-0.5 hover:border-primary/60 hover:bg-teal-wash/50"
                                }`}
                              >
                                <span
                                  className={`font-ui block text-sm ${active ? "text-primary" : "text-foreground"}`}
                                >
                                  {o.label}
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                                  {o.hint}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <ActionButton
                      type="button"
                      size="lg"
                      disabled={!screeningDone}
                      onClick={() => setStep(1)}
                    >
                      Continue to the calendar
                    </ActionButton>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="calendar"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                    className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
                  >
                    <BookingCalendar
                      value={date}
                      onChange={(d) => {
                        setDate(d);
                        setTime(null);
                      }}
                    />
                    <div>
                      <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">
                        Available slots
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {date ? dateLabel : "Choose a date to see open times."}
                      </p>
                      <div className="mt-5 grid grid-cols-2 gap-2">
                        {times.map((t) => (
                          <button
                            key={t}
                            type="button"
                            disabled={!date}
                            onClick={() => setTime(t)}
                            className={`font-ui rounded-sm border px-4 py-3 text-sm transition-all duration-300 ${
                              time === t
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-input hover:-translate-y-0.5 hover:border-primary hover:bg-teal-wash disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-input disabled:hover:bg-transparent"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <ActionButton type="button" variant="outline" onClick={() => setStep(0)}>
                          Back
                        </ActionButton>
                        <ActionButton
                          type="button"
                          disabled={!date || !time}
                          onClick={() => setStep(2)}
                        >
                          Continue
                        </ActionButton>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.form
                    key="details"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                    onSubmit={submitBooking}
                    className="space-y-8"
                  >
                    <div className="rounded-sm border border-primary/20 bg-teal-wash px-5 py-4">
                      <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">
                        Your slot
                      </p>
                      <p className="font-display mt-2 text-xl">
                        {dateLabel} at {time} EAT
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        { key: "name", label: "Name", type: "text", required: true },
                        { key: "email", label: "Email", type: "email", required: true },
                        { key: "phone", label: "WhatsApp number", type: "tel", required: false },
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
                    <label className="font-ui block text-sm">
                      <span className="text-muted-foreground">
                        Anything else we should know before the call?
                      </span>
                      <textarea
                        rows={4}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </label>

                    <div className="flex flex-wrap gap-3">
                      <ActionButton type="button" variant="outline" onClick={() => setStep(1)}>
                        Back
                      </ActionButton>
                      <ActionButton type="submit" size="lg" disabled={pending}>
                        {pending ? "Sending…" : "Request call & open WhatsApp"}
                      </ActionButton>
                    </div>
                    <p className="font-ui text-xs text-muted-foreground">
                      Submitting opens WhatsApp with your details pre-written so Mary can confirm
                      the time straight away.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
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
