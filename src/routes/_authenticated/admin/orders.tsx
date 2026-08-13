import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Empty,
  PageHeader,
  Panel,
  Select,
  Table,
  formatDate,
  useRows,
} from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: Orders,
});

const orderStatuses = ["pending_payment", "pending_whatsapp", "fulfilled", "cancelled"] as const;
const paymentStatuses = ["unpaid", "paid", "refunded"] as const;

type Order = {
  id: string;
  customer_name: string;
  email: string;
  business_name: string | null;
  status: string;
  payment_status: string;
  payment_note: string | null;
  amount: number | null;
  currency: string | null;
  provider: string | null;
  provider_reference: string | null;
  created_at: string;
};

function Orders() {
  const { data: rows, isLoading } = useRows<Order>("orders");
  const qc = useQueryClient();

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, string> }) => {
      const { error } = await supabase.from("orders").update(patch as never).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "orders"] });
      toast.success("Order updated.");
    },
    onError: () => toast.error("Could not update that order."),
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Shop orders"
        description="Starter Kit requests. Payment is arranged over WhatsApp until a gateway is added — record the outcome here."
      />

      <Panel>
        {isLoading ? (
          <Empty label="Loading orders…" />
        ) : (rows ?? []).length === 0 ? (
          <Empty label="No orders yet." />
        ) : (
          <Table head={["Customer", "Email", "Placed", "Fulfilment", "Payment"]}>
            {(rows ?? []).map((o) => (
              <tr key={o.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="text-foreground">{o.customer_name}</p>
                  {o.business_name && (
                    <p className="text-xs text-muted-foreground">{o.business_name}</p>
                  )}
                </td>
                <td className="px-4 py-4 text-muted-foreground">{o.email}</td>
                <td className="px-4 py-4 text-muted-foreground">{formatDate(o.created_at)}</td>
                <td className="px-4 py-4">
                  <Select
                    value={o.status}
                    options={orderStatuses}
                    onChange={(status) => update.mutate({ id: o.id, patch: { status } })}
                  />
                </td>
                <td className="px-4 py-4">
                  <Select
                    value={o.payment_status}
                    options={paymentStatuses}
                    onChange={(payment_status) =>
                      update.mutate({ id: o.id, patch: { payment_status } })
                    }
                  />
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Panel>
    </div>
  );
}
