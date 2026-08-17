import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ActionAnchor } from "@/components/ActionButton";
import { Reveal } from "@/components/Reveal";
import { confirmOrder } from "@/lib/shop.functions";
import { money } from "@/lib/shop";

type Search = { reference?: string | undefined; trxref?: string | undefined };

export const Route = createFileRoute("/shop/success")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    reference: typeof search["reference"] === "string" ? search["reference"] : undefined,
    trxref: typeof search["trxref"] === "string" ? search["trxref"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Your order — Neostrategy Store" },
      { name: "description", content: "Your Neostrategy purchase and download link." },
      { property: "og:title", content: "Your Neostrategy order" },
      { property: "og:description", content: "Payment confirmation and instant download." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Success,
});

function Success() {
  const search = Route.useSearch();
  const reference = search.reference ?? search.trxref ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["order", reference],
    enabled: Boolean(reference),
    refetchInterval: (q) => (q.state.data?.status === "pending" ? 4000 : false),
    queryFn: async () => confirmOrder({ data: { reference } }),
  });

  return (
    <section className="gradient-page min-h-[70vh]">
      <div className="container-read py-24 md:py-32">
        <Reveal>
          {!reference ? (
            <>
              <h1 className="font-display text-3xl md:text-4xl">No order reference</h1>
              <p className="mt-5 text-foreground/80">
                We could not find a payment reference in this link.
              </p>
            </>
          ) : isLoading ? (
            <h1 className="font-display text-3xl md:text-4xl">Confirming your payment…</h1>
          ) : data?.status === "paid" ? (
            <>
              <p className="font-ui text-[0.68rem] uppercase tracking-[0.28em] text-primary">
                Payment received
              </p>
              <h1 className="font-display mt-6 text-[2.4rem] leading-tight md:text-5xl">
                Thank you{data.customer_name ? `, ${data.customer_name.split(" ")[0]}` : ""}.
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-foreground/85">
                {data.product_name} is yours — {money(data.amount, data.currency)} paid. A copy of
                this link has been recorded against your order.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                {data.file_url && (
                  <ActionAnchor href={data.file_url} target="_blank" rel="noreferrer" size="lg">
                    Download now
                  </ActionAnchor>
                )}
                {data.video_url && (
                  <ActionAnchor
                    href={data.video_url}
                    target="_blank"
                    rel="noreferrer"
                    variant="outline"
                    size="lg"
                  >
                    Watch the module
                  </ActionAnchor>
                )}
              </div>
              {!data.file_url && !data.video_url && (
                <p className="font-ui mt-8 text-sm text-muted-foreground">
                  We are sending your files to your email address now.
                </p>
              )}
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl md:text-4xl">Payment still processing</h1>
              <p className="mt-5 text-foreground/80">
                We have your order (ref {reference}). This page updates automatically the moment
                payment clears.
              </p>
            </>
          )}
          <Link to="/shop" className="font-ui mt-10 inline-block text-sm text-primary underline">
            Back to the store
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
