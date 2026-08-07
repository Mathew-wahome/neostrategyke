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
  formatDateTime,
  useRows,
} from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: Messages,
});

const statuses = ["new", "read", "replied", "archived"] as const;

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
};

function Messages() {
  const { data: rows, isLoading } = useRows<Message>("contact_messages");
  const qc = useQueryClient();

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("contact_messages")
        .update({ status } as never)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "contact_messages"] });
      toast.success("Message updated.");
    },
    onError: () => toast.error("Could not update that message."),
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Messages"
        description="Anything sent through the site that is not a booking or an order."
      />
      <Panel>
        {isLoading ? (
          <Empty label="Loading messages…" />
        ) : (rows ?? []).length === 0 ? (
          <Empty label="No messages yet." />
        ) : (
          <Table head={["Received", "From", "Message", "Status"]}>
            {(rows ?? []).map((m) => (
              <tr key={m.id} className="align-top">
                <td className="px-4 py-4 text-muted-foreground">{formatDateTime(m.created_at)}</td>
                <td className="px-4 py-4">
                  <p className="text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </td>
                <td className="px-4 py-4">
                  {m.subject && <p className="text-foreground">{m.subject}</p>}
                  <p className="max-w-md text-xs text-muted-foreground">{m.message}</p>
                </td>
                <td className="px-4 py-4">
                  <Select
                    value={m.status}
                    options={statuses}
                    onChange={(status) => update.mutate({ id: m.id, status })}
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
