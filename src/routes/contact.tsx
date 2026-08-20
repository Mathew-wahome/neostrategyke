import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ActionButton } from "@/components/ActionButton";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Whiteboard, FlowBoard, StickyWall } from "@/components/Explainers";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { requestDiscoveryCall } from "@/lib/site-api";
import { toast } from "sonner";

type StageKey = "clarity" | "audit" | "install" | "partnership" | "wealth";

const stageLabels: Record<StageKey, string> = {
  clarity: "The Clarity Session",
  audit: "The Founder Operating Systems Audit",
  install: "The Calm Execution Install",
  partnership: "The Founder Operations Partnership",
  wealth: "The Wealth Arc",
};

const interests = [
  "Clarity Session",
  "Founder Operating Systems Audit",
  "Calm Execution Install",
  "Founder Operations Partnership",
  "The Wealth Arc",
  "Not sure yet",
] as const;


export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { stage?: StageKey } => {
    const stage = search["stage"] as StageKey | undefined;
    return stage && stage in stageLabels ? { stage } : {};
  },

  head: () => ({
    meta: [
      { title: "Tell us about your business — Neostrategy" },
      {
        name: "description",
        content:
          "A few questions so our first conversation is useful instead of introductory. About three minutes. We reply within two working days with the next step and the fee for the stage that fits.",
      },
      { property: "og:title", content: "Tell us about your business" },
      {
        property: "og:description",
        content:
          "The enquiry form for Neostrategy. About three minutes, and we reply within two working days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Enquiry,
});

const stageToInterest: Record<StageKey, string> = {
  clarity: "Clarity Session",
  audit: "Audit",
  install: "Install",
  partnership: "Partnership",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="font-ui block text-sm">
      <span className="text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "mt-2 h-11 w-full rounded-sm border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary";
const areaClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function Enquiry() {
  const { stage } = Route.useSearch();

  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    doing: "",
    breaking: "",
    tried: "",
  });
  const [interest, setInterest] = useState<string>(
    stage ? stageToInterest[stage] : "",
  );
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const ready =
    form.name.trim() &&
    form.email.trim() &&
    form.doing.trim() &&
    form.breaking.trim() &&
    interest;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    setPending(true);
    const notes = [
      `What the business does, and how many people: ${form.doing}`,
      `What is breaking right now: ${form.breaking}`,
      form.tried ? `What they have already tried: ${form.tried}` : "",
      `Interested in: ${interest}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const id = await requestDiscoveryCall({
        name: form.name,
        email: form.email,
        phone: form.phone,
        business_name: form.business,
        services_stage_interest: interest,
        notes,
      });
      if (!id) throw new Error("not saved");
      setSent(true);
    } catch {
      toast.error("We could not send that just now. Please try again in a moment.");
    } finally {
      setPending(false);
    }
  }




  return (
    <>
      <section className="gradient-page relative overflow-hidden">
        <div className="container-page grid items-center gap-12 pt-14 pb-10 md:pt-20 md:pb-14 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
              The enquiry form
            </p>
            <h1 className="font-display mt-6 text-[2.5rem] leading-[1.06] md:text-6xl">
              Tell us about <span className="text-gradient-teal">your business.</span>
            </h1>
            <div className="mt-9 max-w-xl space-y-5">
              <p className="text-lg leading-relaxed text-foreground/85">
                A few questions so our first conversation is useful instead of introductory. About
                three minutes.
              </p>
              {stage && (
                <p className="font-ui text-sm text-primary">
                  Enquiring about: {stageLabels[stage]}
                </p>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Whiteboard
              kicker="Before the call"
              title="What we do with your answers"
              caption="No pitch deck. A read of your operation."
            >
              <FlowBoard
                steps={[
                  { label: "You write it down", note: "Three minutes, plain language." },
                  { label: "We read it properly", note: "We look for the dependency, not the symptom." },
                  { label: "We reply with a next step", note: "Within two working days." },
                ]}
              />
              <div className="mt-5">
                <StickyWall
                  columns="grid-cols-1 xs:grid-cols-2"
                  notes={[
                    { label: "We ask", text: "Where does work stop and wait for you?" },
                    { label: "We ask", text: "Which promise breaks first when it is busy?" },
                  ]}
                />
              </div>
            </Whiteboard>
          </Reveal>

        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="container-read py-12 md:py-16">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="rounded-2xl border border-primary/15 bg-teal-wash px-6 py-12 md:px-12"
            >
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">Received</p>
              <h2 className="font-display mt-4 text-3xl leading-tight">
                Thank you for reaching out{form.name ? `, ${form.name}` : ""}.
              </h2>
              <p className="mt-5 text-lg text-foreground/80">
                We will respond as soon as possible.
              </p>
              <p className="mt-5 text-foreground/75">
                While you wait, the Founder&rsquo;s Flow Map is the fastest useful thing you can
                read.{" "}
                <Link to="/newsletter" className="text-primary underline">
                  Send me the map
                </Link>
                .
              </p>

            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name">
                  <input required value={form.name} onChange={set("name")} className={inputClass} />
                </Field>
                <Field label="Your business name">
                  <input value={form.business} onChange={set("business")} className={inputClass} />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone or WhatsApp (optional)">
                  <input type="tel" value={form.phone} onChange={set("phone")} className={inputClass} />
                </Field>
              </div>

              <Field label="What does the business do, and how many people are in it?">
                <textarea
                  required
                  rows={3}
                  value={form.doing}
                  onChange={set("doing")}
                  className={areaClass}
                />
              </Field>

              <Field label="What is breaking right now?">
                <textarea
                  required
                  rows={3}
                  value={form.breaking}
                  onChange={set("breaking")}
                  className={areaClass}
                />
              </Field>

              <Field label="What have you already tried?">
                <textarea rows={3} value={form.tried} onChange={set("tried")} className={areaClass} />
              </Field>

              <div>
                <p className="font-ui text-sm text-muted-foreground">
                  Which of these are you interested in?
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {interests.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setInterest(o)}
                      className={`font-ui rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                        interest === o
                          ? "border-primary bg-primary text-primary-foreground shadow-[0_18px_40px_-30px_var(--primary)]"
                          : "border-input hover:-translate-y-0.5 hover:border-primary/60 hover:bg-teal-wash/60"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <ActionButton type="submit" size="lg" disabled={pending || !ready}>
                  {pending ? "Sending…" : "Book a discovery call"}
                </ActionButton>
                <p className="font-ui text-xs text-muted-foreground">
                  We will respond as soon as possible with a time for your discovery call.
                </p>
              </div>

            </form>
          )}
        </div>
      </section>

      <section className="border-t border-border/60 bg-teal-wash">
        <div className="container-read py-12 md:py-16">
          <Reveal>
            <p className="text-lg text-foreground/85">
              Not ready to talk? Get the Founder&rsquo;s Flow Map, free, and start there.
            </p>
            <NewsletterForm className="mt-8 max-w-lg" source="contact" cta="Send me the map" />
          </Reveal>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
