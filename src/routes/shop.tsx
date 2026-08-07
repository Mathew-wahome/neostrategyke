import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ActionAnchor, ActionButton } from "@/components/ActionButton";
import { ImageFrame } from "@/components/ImageFrame";
import { Marquee } from "@/components/Marquee";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/photos";
import { createOrder } from "@/lib/site-api";
import {
  formatKes,
  openWhatsAppWindow,
  sendToWhatsApp,
  useSiteSettings,
  waLink,
} from "@/lib/site-settings";

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
  const settings = useSiteSettings();
  const price = formatKes(settings.starter_kit_price);

  useEffect(() => {
    supabase
      .from("products")
      .select("id")
      .eq("slug", "service-founder-systems-starter-kit")
      .maybeSingle()
      .then(({ data }) => setProductId(data?.id ?? null));
  }, []);

  const message = `Hi NeoStrategy, I'd like to get the Service Founder Systems Starter Kit (${price}). My name is ${form.name}${
    form.business ? ` from ${form.business}` : ""
  }.`;
  const whatsappUrl = waLink(settings.whatsapp_number, message);

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    const win = openWhatsAppWindow();
    setPending(true);
    try {
      await createOrder({
        customer_name: form.name,
        email: form.email,
        business_name: form.business,
        product_id: productId,
      });
      setOrdered(true);
      sendToWhatsApp(win, whatsappUrl);
    } catch {
      win?.close();
      toast.error("We could not save that order. Please try again in a moment.");
    } finally {
      setPending(false);
    }
  }


  return (
    <>
      <section className="gradient-page relative overflow-hidden">
        <div className="container-page grid items-center gap-12 pt-20 pb-16 md:pt-32 md:pb-20 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">Shop</p>
            <h1 className="font-display mt-6 text-[2.5rem] leading-[1.06] md:text-6xl">
              Install it <span className="text-gradient-teal">yourself.</span>
            </h1>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-foreground/85">
              Not every founder is ready for a full engagement, and not every business needs one
              yet. These are the tools to start building calm on your own.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ImageFrame
              src={photos.kit.src}
              alt={photos.kit.alt}
              ratio="aspect-[4/3]"
              priority
              caption={`The Service Founder Systems Starter Kit · ${price}`}
            />
          </Reveal>
        </div>
      </section>

      <Marquee
        items={["SOPs", "Delegation maps", "Client onboarding", "Delivery checklists", "KPI tracker", "Meeting rhythms"]}
      />

      <section>
        <div className="container-read py-16 md:py-24">
          <Reveal className="lift rounded-lg border border-primary/15 bg-teal-wash px-6 py-12 md:px-12 md:py-16">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              The Service Founder Systems Starter Kit
            </h2>
            <p className="font-ui mt-4 text-sm uppercase tracking-[0.2em] text-primary">
              {price}
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
                  href={whatsappUrl}
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
