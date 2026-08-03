import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ActionAnchor, ActionButton } from "@/components/ActionButton";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { brand, whatsappLink } from "@/lib/brand";
import { createOrder } from "@/lib/site-api";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — The Service Founder Systems Starter Kit | NeoStrategy" },
      {
        name: "description",
        content:
          "The Service Founder Systems Starter Kit: templates to build the core systems every service-based founder needs. KES 4,500.",
      },
      { property: "og:title", content: "Install it yourself — NeoStrategy Starter Kit" },
      {
        property: "og:description",
        content:
          "The templates to build the core systems every service-based founder needs, in one place you can actually use.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [open, setOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", business: "" });
  const [pending, setPending] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("products")
      .select("id")
      .eq("slug", "service-founder-systems-starter-kit")
      .maybeSingle()
      .then(({ data }) => setProductId(data?.id ?? null));
  }, []);

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      await createOrder({
        customer_name: form.name,
        email: form.email,
        business_name: form.business,
        product_id: productId,
      });
      setOrdered(true);
    } catch {
      toast.error("We could not save that order. Please try again in a moment.");
    } finally {
      setPending(false);
    }
  }

  const message = `Hi NeoStrategy, I'd like to get the Service Founder Systems Starter Kit (${brand.starterKitPrice}). My name is ${form.name}.`;

  return (
    <>
      <section className="container-read pt-24 pb-12 md:pt-36 md:pb-16">
        <Reveal>
          <h1 className="font-display text-[2.4rem] leading-[1.1] md:text-6xl">
            Install it yourself.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 text-lg leading-relaxed text-foreground/85">
            Not every founder is ready for a full engagement, and not every business needs one yet.
            These are the tools to start building calm on your own.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-border/60">
        <div className="container-read py-16 md:py-24">
          <Reveal className="border border-primary/15 bg-teal-wash px-6 py-12 md:px-12 md:py-16">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              The Service Founder Systems Starter Kit
            </h2>
            <p className="font-ui mt-4 text-sm uppercase tracking-[0.2em] text-primary">
              {brand.starterKitPrice}
            </p>
            <p className="mt-8 text-lg leading-relaxed text-foreground/80">
              The templates to build the core systems every service-based founder needs. Where the
              free guide names what you need, the kit hands you the tools to build it. The paid,
              done-for-you version, in one place you can actually use.
            </p>

            {ordered ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                className="mt-10 border-t border-primary/20 pt-8"
              >
                <p className="text-foreground/85">
                  Thank you, {form.name}. Your order is saved. Confirm on WhatsApp to arrange
                  payment, and the kit will be sent to {form.email} once payment is received.
                </p>
                <ActionAnchor
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6"
                >
                  Confirm on WhatsApp
                </ActionAnchor>
              </motion.div>
            ) : open ? (
              <form
                onSubmit={submitOrder}
                className="mt-10 space-y-4 border-t border-primary/20 pt-8"
              >
                {[
                  { key: "name", label: "Name", type: "text", required: true },
                  { key: "email", label: "Email", type: "email", required: true },
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
                <ActionButton type="submit" disabled={pending}>
                  {pending ? "Saving…" : "Continue"}
                </ActionButton>
              </form>
            ) : (
              <ActionButton className="mt-10" onClick={() => setOpen(true)}>
                Get the Starter Kit
              </ActionButton>
            )}
          </Reveal>

          <Reveal delay={0.1} className="mt-16">
            <p className="text-lg text-foreground/85">
              Not there yet? Start with the free guide, 10 Systems Every Founder Needs, and join the
              weekly letter.
            </p>
            <NewsletterForm className="mt-8 max-w-lg" source="shop" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
