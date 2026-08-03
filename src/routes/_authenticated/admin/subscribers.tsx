import { createFileRoute } from "@tanstack/react-router";
import { Empty, PageHeader, Panel, Table, formatDate, useRows } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/subscribers")({
  component: Subscribers,
});

type Subscriber = {
  id: string;
  email: string;
  name: string | null;
  source: string;
  welcome_email_sent: boolean;
  subscribed_at: string;
};

function toCsv(rows: Subscriber[]) {
  const head = "email,name,source,subscribed_at";
  const body = rows
    .map((r) => [r.email, r.name ?? "", r.source, r.subscribed_at].join(","))
    .join("\n");
  return `${head}\n${body}`;
}

function Subscribers() {
  const { data: rows, isLoading } = useRows<Subscriber>("subscribers", {
    orderBy: "subscribed_at",
  });

  function download() {
    const blob = new Blob([toCsv(rows ?? [])], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "neostrategy-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Subscribers"
        description="Everyone who asked for the free guide, ready to export into your email tool."
        action={
          <button
            onClick={download}
            className="font-ui h-10 rounded-sm border border-input px-4 text-sm transition-colors hover:bg-wash"
          >
            Export CSV
          </button>
        }
      />

      <Panel>
        {isLoading ? (
          <Empty label="Loading subscribers…" />
        ) : (rows ?? []).length === 0 ? (
          <Empty label="No subscribers yet." />
        ) : (
          <Table head={["Email", "Name", "Source", "Joined"]}>
            {(rows ?? []).map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-4 text-foreground">{s.email}</td>
                <td className="px-4 py-4 text-muted-foreground">{s.name ?? "—"}</td>
                <td className="px-4 py-4 capitalize text-muted-foreground">
                  {s.source?.replace(/_/g, " ")}
                </td>
                <td className="px-4 py-4 text-muted-foreground">{formatDate(s.subscribed_at)}</td>
              </tr>
            ))}
          </Table>
        )}
      </Panel>
    </div>
  );
}
