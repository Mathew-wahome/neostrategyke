import { createFileRoute } from "@tanstack/react-router";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Neostrategy" },
      { name: "description", content: "How Neostrategy collects, uses, and protects the personal information you share with us." },
      { property: "og:title", content: "Privacy Policy — Neostrategy" },
      { property: "og:description", content: "How Neostrategy handles the personal information you share with us." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <article className="container-read pt-24 pb-24 md:pt-36">
      <h1 className="font-display text-4xl md:text-5xl">Privacy Policy</h1>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/85">
        <p>
          {brand.name} collects only what it needs to work with you: the details you submit when you
          book a call, request the free guide, send a message, or order a digital product.
        </p>
        <h2 className="font-display pt-6 text-2xl">How we use it</h2>
        <p>
          We use your details to deliver the guide, send the weekly letter, respond to enquiries,
          arrange calls, and fulfil orders. We do not sell your information, and we do not share it
          except with the service providers required to deliver email and store files securely.
        </p>
        <h2 className="font-display pt-6 text-2xl">Your choices</h2>
        <p>
          Every letter includes an unsubscribe link, and you can ask us to delete your details at
          any time by writing to {brand.email}.
        </p>
      </div>
    </article>
  );
}
