import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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

export const Route = createFileRoute("/_authenticated/admin/clients")({
  component: Clients,
});

const clientStatuses = ["active", "paused", "past"] as const;
const engagementStages = ["audit", "install", "partnership"] as const;
const engagementStatuses = ["proposed", "in_progress", "delivered", "closed"] as const;
const paymentStatuses = ["unpaid", "deposit", "paid"] as const;

type Client = {
  id: string;
  business_name: string;
  contact_name: string | null;
  email: string | null;
  status: string;
  created_at: string;
};

type Engagement = {
  id: string;
  client_id: string;
  stage: string;
  agreed_value: number | null;
  status: string;
  payment_status: string;
  notes: string | null;
  created_at: string;
};

function Clients() {
  const { data: clients, isLoading } = useRows<Client>("clients");
  const qc = useQueryClient();
  const [form, setForm] = useState({ business_name: "", contact_name: "", email: "" });
  const [open, setOpen] = useState(false);

  const { data: engagements } = useQuery({
    queryKey: ["admin", "engagements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("engagements")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Engagement[];
    },
  });

  const addClient = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("clients").insert({
        business_name: form.business_name,
        contact_name: form.contact_name || null,
        email: form.email || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setForm({ business_name: "", contact_name: "", email: "" });
      setOpen(false);
      qc.invalidateQueries({ queryKey: ["admin", "clients"] });
      toast.success("Client added.");
    },
    onError: () => toast.error("Could not add that client."),
  });

  const updateClient = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("clients").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "clients"] }),
  });

  const addEngagement = useMutation({
    mutationFn: async (client_id: string) => {
      const { error } = await supabase.from("engagements").insert({ client_id, stage: "audit" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "engagements"] });
      toast.success("Engagement added.");
    },
    onError: () => toast.error("Could not add that engagement."),
  });

  const updateEngagement = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, string | number> }) => {
      const { error } = await supabase.from("engagements").update(patch as never).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "engagements"] }),
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Clients"
        description="Signed work, by stage of the Founder Operating System."
        action={
          <button
            onClick={() => setOpen((v) => !v)}
            className="font-ui h-10 rounded-sm border border-input px-4 text-sm transition-colors hover:bg-wash"
          >
            {open ? "Cancel" : "Add client"}
          </button>
        }
      />

      {open && (
        <Panel className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addClient.mutate();
            }}
            className="grid gap-4 sm:grid-cols-4"
          >
            <input
              required
              placeholder="Business name"
              value={form.business_name}
              onChange={(e) => setForm({ ...form, business_name: e.target.value })}
              className="font-ui h-10 rounded-sm border border-input px-3 text-sm outline-none focus:border-primary"
            />
            <input
              placeholder="Contact name"
              value={form.contact_name}
              onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
              className="font-ui h-10 rounded-sm border border-input px-3 text-sm outline-none focus:border-primary"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="font-ui h-10 rounded-sm border border-input px-3 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="font-ui h-10 rounded-sm bg-primary px-4 text-sm text-primary-foreground"
            >
              Save client
            </button>
          </form>
        </Panel>
      )}

      <Panel>
        {isLoading ? (
          <Empty label="Loading clients…" />
        ) : (clients ?? []).length === 0 ? (
          <Empty label="No clients yet." />
        ) : (
          <Table head={["Client", "Contact", "Since", "Status", "Engagements"]}>
            {(clients ?? []).map((c) => (
              <tr key={c.id} className="align-top">
                <td className="px-4 py-4 text-foreground">{c.business_name}</td>
                <td className="px-4 py-4 text-muted-foreground">
                  <p>{c.contact_name ?? "—"}</p>
                  {c.email && <p className="text-xs">{c.email}</p>}
                </td>
                <td className="px-4 py-4 text-muted-foreground">{formatDate(c.created_at)}</td>
                <td className="px-4 py-4">
                  <Select
                    value={c.status}
                    options={clientStatuses}
                    onChange={(status) => updateClient.mutate({ id: c.id, status })}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-3">
                    {(engagements ?? [])
                      .filter((e) => e.client_id === c.id)
                      .map((e) => (
                        <div key={e.id} className="flex flex-wrap items-center gap-2">
                          <Select
                            value={e.stage}
                            options={engagementStages}
                            onChange={(stage) =>
                              updateEngagement.mutate({ id: e.id, patch: { stage } })
                            }
                          />
                          <Select
                            value={e.status}
                            options={engagementStatuses}
                            onChange={(status) =>
                              updateEngagement.mutate({ id: e.id, patch: { status } })
                            }
                          />
                          <Select
                            value={e.payment_status}
                            options={paymentStatuses}
                            onChange={(payment_status) =>
                              updateEngagement.mutate({ id: e.id, patch: { payment_status } })
                            }
                          />
                          <input
                            type="number"
                            defaultValue={e.agreed_value ?? ""}
                            placeholder="KES"
                            onBlur={(ev) =>
                              updateEngagement.mutate({
                                id: e.id,
                                patch: { agreed_value: Number(ev.target.value || 0) },
                              })
                            }
                            className="font-ui h-9 w-28 rounded-sm border border-input px-2 text-xs outline-none focus:border-primary"
                          />
                        </div>
                      ))}
                    <button
                      onClick={() => addEngagement.mutate(c.id)}
                      className="font-ui text-xs text-primary underline underline-offset-4"
                    >
                      Add engagement
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Panel>
    </div>
  );
}
