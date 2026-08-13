import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { ActionAnchor, ActionButton } from "@/components/ActionButton";
import { beginCheckout, confirmOrder } from "@/lib/shop.functions";
import { isKePhone, money, normaliseKePhone, type StoreProduct } from "@/lib/shop";

type Method = "mpesa" | "airtel" | "card";

type Receipt = Awaited<ReturnType<typeof confirmOrder>>;

const methods: { id: Method; label: string; hint: string; glyph: string }[] = [
  { id: "mpesa", label: "M-Pesa", hint: "Prompt sent to your phone", glyph: "M" },
  { id: "airtel", label: "Airtel Money", hint: "Prompt sent to your phone", glyph: "A" },
  { id: "card", label: "Card", hint: "Visa, Mastercard — on this page", glyph: "C" },
];

declare global {
  interface Window {
    PaystackPop?: new () => { resumeTransaction: (accessCode: string) => void };
  }
}

function loadPaystack(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.PaystackPop) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-paystack]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("script")));
      return;
    }
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v2/inline.js";
    s.async = true;
    s.dataset["paystack"] = "true";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("script"));
    document.head.appendChild(s);
  });
}

export function CheckoutPanel({
  product,
  whatsappUrl,
}: {
  product: StoreProduct;
  whatsappUrl: string;
}) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [method, setMethod] = useState<Method>("mpesa");
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "" });
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [note, setNote] = useState<string>("");
  const [manual, setManual] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => () => stop(), [stop]);

  const poll = useCallback(
    (ref: string) => {
      stop();
      setElapsed(0);
      timer.current = setInterval(async () => {
        setElapsed((e) => e + 4);
        try {
          const r = await confirmOrder({ data: { reference: ref } });
          if (r.status === "paid") {
            setReceipt(r);
            stop();
          }
        } catch {
          /* keep polling */
        }
      }, 4000);
    },
    [stop],
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (method !== "card" && form.phone.replace(/\D/g, "").length < 9) {
      toast.error("Add the phone number that should receive the payment prompt.");
      return;
    }
    setPending(true);
    setManual(null);
    try {
      const result = await beginCheckout({
        data: {
          slug: product.slug,
          name: form.name,
          email: form.email,
          phone: form.phone,
          business: form.business,
          method,
          origin: window.location.origin,
        },
      });

      if (result.mode === "manual") {
        setManual(result.reason);
        setReference(result.reference);
        setStep(2);
        return;
      }

      setReference(result.reference);

      if (result.mode === "mobile_money") {
        setNote(result.display_text);
        setStep(2);
        poll(result.reference);
        return;
      }

      // Card — finish inside a popup layered over this page.
      setStep(2);
      setNote("Complete your card details in the secure window.");
      try {
        await loadPaystack();
        const popup = new window.PaystackPop!();
        popup.resumeTransaction(result.access_code);
        poll(result.reference);
      } catch {
        window.location.href = result.authorization_url;
      }
    } catch {
      toast.error("We could not start that checkout. Please try again in a moment.");
    } finally {
      setPending(false);
    }
  }

  const fields = [
    { key: "name", label: "Full name", type: "text", required: true },
    { key: "email", label: "Email (where we send it)", type: "email", required: true },
    {
      key: "phone",
      label: method === "card" ? "Phone (optional)" : "Phone for the payment prompt",
      type: "tel",
      required: method !== "card",
    },
    { key: "business", label: "Business name (optional)", type: "text", required: false },
  ] as const;

  return (
    <div className="mt-10 overflow-hidden rounded-xl border border-border/70 bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
        <p className="font-ui text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
          Secure checkout
        </p>
        <p className="font-ui text-[0.62rem] uppercase tracking-[0.28em] text-primary">
          {money(product.price, product.currency)}
        </p>
      </div>

      <div className="flex gap-2 px-6 pt-5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
              i <= step ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="method"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="p-6"
          >
            <p className="font-display text-xl">How would you like to pay?</p>
            <div className="mt-5 space-y-3">
              {methods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`flex w-full items-center gap-4 rounded-lg border px-5 py-4 text-left transition-all ${
                    method === m.id
                      ? "border-primary bg-teal-wash shadow-[0_10px_30px_-20px_hsl(var(--primary))]"
                      : "border-border/70 hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`font-ui grid size-9 shrink-0 place-items-center rounded-full text-xs ${
                      method === m.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {m.glyph}
                  </span>
                  <span className="min-w-0">
                    <span className="font-ui block text-sm">{m.label}</span>
                    <span className="block text-xs text-muted-foreground">{m.hint}</span>
                  </span>
                </button>
              ))}
            </div>
            <ActionButton size="lg" className="mt-6" onClick={() => setStep(1)}>
              Continue
            </ActionButton>
          </motion.div>
        )}

        {step === 1 && (
          <motion.form
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            onSubmit={submit}
            className="space-y-4 p-6"
          >
            <div className="font-ui flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Paying with{" "}
                <span className="text-primary">
                  {methods.find((m) => m.id === method)?.label}
                </span>
              </span>
              <button type="button" onClick={() => setStep(0)} className="link-sweep text-primary">
                Change
              </button>
            </div>
            {fields.map((f) => (
              <label key={f.key} className="font-ui block text-sm">
                <span className="text-muted-foreground">{f.label}</span>
                <input
                  type={f.type}
                  required={f.required}
                  inputMode={f.type === "tel" ? "tel" : undefined}
                  placeholder={f.type === "tel" ? "07XX XXX XXX" : undefined}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                />
              </label>
            ))}
            <ActionButton type="submit" size="lg" disabled={pending}>
              {pending
                ? "Starting…"
                : method === "card"
                  ? `Pay ${money(product.price, product.currency)}`
                  : "Send payment prompt"}
            </ActionButton>
            <p className="font-ui text-xs text-muted-foreground">
              Processed by Paystack. Delivery is instant once payment clears.
            </p>
          </motion.form>
        )}

        {step === 2 && (
          <motion.div
            key="status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="p-6"
          >
            {receipt?.status === "paid" ? (
              <>
                <p className="font-ui text-[0.62rem] uppercase tracking-[0.28em] text-primary">
                  Payment received
                </p>
                <p className="font-display mt-3 text-2xl">
                  Thank you{receipt.customer_name ? `, ${receipt.customer_name.split(" ")[0]}` : ""}.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {product.name} is yours. A copy has also gone to {form.email}.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {receipt.file_url && (
                    <ActionAnchor href={receipt.file_url} target="_blank" rel="noreferrer">
                      Download now
                    </ActionAnchor>
                  )}
                  {receipt.video_url && (
                    <ActionAnchor
                      href={receipt.video_url}
                      target="_blank"
                      rel="noreferrer"
                      variant="outline"
                    >
                      Watch the module
                    </ActionAnchor>
                  )}
                </div>
              </>
            ) : manual ? (
              <>
                <p className="font-display text-xl">Your order is saved</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {manual} Reference {reference}. Confirm on WhatsApp and we will send it straight
                  to {form.email}.
                </p>
                <ActionAnchor
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6"
                >
                  Confirm on WhatsApp
                </ActionAnchor>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span className="halo-pulse inline-block size-2.5 rounded-full bg-primary" />
                  <p className="font-display text-xl">
                    {method === "card" ? "Completing your payment" : "Check your phone"}
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{note}</p>
                <p className="font-ui mt-5 text-xs text-muted-foreground">
                  Waiting for confirmation… {elapsed}s · Ref {reference}
                </p>
                {elapsed >= 90 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <ActionButton
                      variant="outline"
                      onClick={() => {
                        stop();
                        setStep(1);
                      }}
                    >
                      Try again
                    </ActionButton>
                    <ActionAnchor
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="outline"
                    >
                      Get help on WhatsApp
                    </ActionAnchor>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
