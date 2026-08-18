import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ActionButton, ActionLink } from "@/components/ActionButton";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ImageFrame } from "@/components/ImageFrame";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/photos";
import { createLead } from "@/lib/site-api";
import { toast } from "sonner";

type StageKey = "clarity" | "audit" | "install" | "partnership";

const stageLabels: Record<StageKey, string> = {
  clarity: "The Clarity Session",
  audit: "The Founder Operating Systems Audit",
  install: "The Calm Execution Install",
  partnership: "The Founder Operations Partnership",
};

const interests = [
  "Clarity Session",
  "Audit",
  "Install",
  "Partnership",
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
      const id = await createLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        business_name: form.business,
        source: "enquiry_form",
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

  if (sent && budget === LOW_BUDGET) {
    return (
      <>
        <section className="gradient-page">
          <div className="container-read py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-primary/15 bg-teal-wash px-6 py-12 md:px-12"
            >
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">
                Where to start
              </p>
              <h1 className="font-display mt-4 text-3xl leading-tight md:text-4xl">
                Thank you for telling us about {form.business || "your business"}.
              </h1>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
                <p>
                  Our engagements start higher than the range you have set aside. Rather than take
                  an hour of your time to tell you that, here is where we would actually start you.
                </p>
                <p>
                  The Founder&rsquo;s Flow Map, free. It shows how work moves through your business
                  and which five things to write down first. Most founders find it answers the
                  question they were actually stuck on.
                </p>
                <p>The Starter Kit, if you want the templates to build from.</p>
                <p>
                  If the business grows into something bigger later, we would be glad to hear from
                  you. This is not a no. It is a not yet, and the free map is the right first step
                  either way.
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ActionLink to="/newsletter" size="lg">
                  Send me the map
                </ActionLink>
                <ActionLink to="/shop" variant="outline" size="lg">
                  See the tools
                </ActionLink>
              </div>
            </motion.div>
          </div>
        </section>
        <ClosingCTA />
      </>
    );
  }

  return (
    <>
      <section className="gradient-page relative overflow-hidden">
        <div className="container-page grid items-center gap-12 pt-20 pb-16 md:pt-32 md:pb-20 lg:grid-cols-[1.05fr_0.95fr]">
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
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="rounded-2xl border border-primary/15 bg-teal-wash px-6 py-12 md:px-12"
            >
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-primary">Received</p>
              <h2 className="font-display mt-4 text-3xl leading-tight">
                Thank you, {form.name}.
              </h2>
              <p className="mt-5 text-lg text-foreground/80">
                We reply within two working days with the next step and the fee for the stage that
                fits.
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

              <div>
                <p className="font-ui text-sm text-muted-foreground">
                  What have you set aside to solve this?
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {budgets.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setBudget(o)}
                      className={`font-ui rounded-sm border px-5 py-4 text-left text-sm transition-all duration-300 ${
                        budget === o
                          ? "border-primary bg-teal-wash text-primary shadow-[0_18px_40px_-30px_var(--primary)]"
                          : "border-input hover:-translate-y-0.5 hover:border-primary/60 hover:bg-teal-wash/50"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <ActionButton type="submit" size="lg" disabled={pending || !ready}>
                  {pending ? "Sending…" : "Send my enquiry"}
                </ActionButton>
                <p className="font-ui text-xs text-muted-foreground">
                  We reply within two working days with the next step and the fee for the stage that
                  fits.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="border-t border-border/60 bg-teal-wash">
        <div className="container-read py-20">
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
