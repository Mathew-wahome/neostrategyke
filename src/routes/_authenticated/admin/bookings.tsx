import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { brand, whatsappLink } from "@/lib/brand";
import {
  Empty,
  PageHeader,
  Panel,
  Select,
  Table,
  formatDateTime,
  useRows,
} from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/bookings")({
  component: Bookings,
});

const statuses = [
  "pending_whatsapp",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
] as const;


type Booking = {
  id: string;
  client_name: string;
  email: string;
  phone: string | null;
  business_name: string | null;
  notes: string | null;
  scheduled_at: string;
  status: string;
  whatsapp_confirmed: boolean;
  services_stage_interest: string | null;
};

function Bookings() {
  const { data: rows, isLoading } = useRows<Booking>("bookings", {
    orderBy: "scheduled_at",
    ascending: true,
  });
  const qc = useQueryClient();

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, unknown> }) => {
      const { error } = await supabase.from("bookings").update(patch as never).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "bookings"] });
      toast.success("Booking updated.");
    },
    onError: () => toast.error("Could not update that booking."),
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Bookings"
        description="Free 30-minute calls requested from the site. Confirm on WhatsApp, then mark the status here."
      />

      <Panel>
        {isLoading ? (
          <Empty label="Loading bookings…" />
        ) : (rows ?? []).length === 0 ? (
          <Empty label="No calls booked yet." />
        ) : (
          <Table head={["When", "Client", "Contact", "Interest", "Status", "WhatsApp"]}>
            {(rows ?? []).map((b) => (
              <tr key={b.id} className="align-top">
                <td className="px-4 py-4 text-foreground">{formatDateTime(b.scheduled_at)}</td>
                <td className="px-4 py-4">
                  <p className="text-foreground">{b.client_name}</p>
                  {b.business_name && (
                    <p className="text-xs text-muted-foreground">{b.business_name}</p>
                  )}
                  {b.notes && (
                    <p className="mt-1 max-w-xs text-xs text-muted-foreground">{b.notes}</p>
                  )}
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  <p>{b.email}</p>
                  {b.phone && <p className="text-xs">{b.phone}</p>}
                </td>
                <td className="px-4 py-4 capitalize text-muted-foreground">
                  {b.services_stage_interest ?? "—"}
                </td>
                <td className="px-4 py-4">
                  <Select
                    value={b.status}
                    options={statuses}
                    onChange={(status) => update.mutate({ id: b.id, patch: { status } })}
                  />
                </td>
                <td className="px-4 py-4">
                  <a
                    href={whatsappLink(
                      `Hi ${b.client_name}, this is ${brand.founder} from NeoStrategy confirming our call.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary underline underline-offset-4"
                  >
                    Message
                  </a>
                  <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={b.whatsapp_confirmed}
                      onChange={(e) =>
                        update.mutate({
                          id: b.id,
                          patch: { whatsapp_confirmed: e.target.checked },
                        })
                      }
                    />
                    Confirmed
                  </label>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Panel>
    </div>
  );
}
