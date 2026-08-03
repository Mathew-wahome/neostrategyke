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

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: Leads,
});

const statuses = ["new", "contacted", "qualified", "proposal", "won", "lost"] as const;

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string | null;
  source: string;
  services_stage_interest: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

function Leads() {
  const { data: leads, isLoading } = useRows<Lead>("leads");
  const qc = useQueryClient();

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "leads"] });
      toast.success("Lead updated.");
    },
    onError: () => toast.error("Could not update that lead."),
  });

  const byStatus = (s: string) => (leads ?? []).filter((l) => l.status === s).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Leads"
        description="Every enquiry the site captures, from the free guide to Starter Kit orders."
      />

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {statuses.map((s) => (
          <Panel key={s} className="px-4 py-3">
            <p className="font-ui text-xs capitalize text-muted-foreground">{s}</p>
            <p className="font-display mt-1 text-2xl text-deepteal">{byStatus(s)}</p>
          </Panel>
        ))}
      </div>

      <Panel>
        {isLoading ? (
          <Empty label="Loading leads…" />
        ) : (leads ?? []).length === 0 ? (
          <Empty label="No leads yet. They will appear here the moment someone fills in a form." />
        ) : (
          <Table head={["Name", "Contact", "Source", "Interest", "Added", "Status"]}>
            {(leads ?? []).map((lead) => (
              <tr key={lead.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="text-foreground">{lead.name}</p>
                  {lead.business_name && (
                    <p className="text-xs text-muted-foreground">{lead.business_name}</p>
                  )}
                  {lead.notes && (
                    <p className="mt-1 max-w-xs text-xs text-muted-foreground">{lead.notes}</p>
                  )}
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  <p>{lead.email}</p>
                  {lead.phone && <p className="text-xs">{lead.phone}</p>}
                </td>
                <td className="px-4 py-4 capitalize text-muted-foreground">
                  {lead.source?.replace(/_/g, " ")}
                </td>
                <td className="px-4 py-4 capitalize text-muted-foreground">
                  {lead.services_stage_interest ?? "—"}
                </td>
                <td className="px-4 py-4 text-muted-foreground">{formatDate(lead.created_at)}</td>
                <td className="px-4 py-4">
                  <Select
                    value={lead.status}
                    options={statuses}
                    onChange={(status) => update.mutate({ id: lead.id, status })}
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
