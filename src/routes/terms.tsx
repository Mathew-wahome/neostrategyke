import { createFileRoute } from "@tanstack/react-router";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Neostrategy" },
      { name: "description", content: "The terms that govern the use of the Neostrategy website, guides, and digital products." },
      { property: "og:title", content: "Terms of Service — Neostrategy" },
      { property: "og:description", content: "Terms governing the use of the Neostrategy website and digital products." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <article className="container-read pt-24 pb-24 md:pt-36">
      <h1 className="font-display text-4xl md:text-5xl">Terms of Service</h1>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/85">
        <p>
          These terms govern your use of the {brand.name} website, our free guide, our weekly
          letter, and any digital products purchased through this site.
        </p>
        <h2 className="font-display pt-6 text-2xl">Digital products</h2>
        <p>
          Digital products, including the Service Founder Systems Starter Kit, are licensed for use
          within your own business. They may not be resold or redistributed. Because delivery is
          immediate on confirmation of payment, digital purchases are non-refundable.
        </p>
        <h2 className="font-display pt-6 text-2xl">Consulting engagements</h2>
        <p>
          Audits, installs, and partnerships are agreed in a separate written scope confirmed before
          work begins. Nothing on this website constitutes a binding quotation.
        </p>
        <h2 className="font-display pt-6 text-2xl">Contact</h2>
        <p>Questions about these terms can be sent to {brand.email}.</p>
      </div>
    </article>
  );
}
