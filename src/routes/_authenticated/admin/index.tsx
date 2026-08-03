import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, Panel, formatDateTime } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Overview,
});

async function count(table: string, filter?: (q: any) => any) {
  let q = (supabase.from as (t: string) => any)(table).select("*", {
    count: "exact",
    head: true,
  });
  if (filter) q = filter(q);
  const { count: c } = await q;
  return c ?? 0;
}

function Overview() {
  const { data } = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: async () => {
      const [leads, newLeads, bookings, upcoming, subscribers, orders, pendingOrders] =
        await Promise.all([
          count("leads"),
          count("leads", (q) => q.eq("status", "new")),
          count("bookings"),
          count("bookings", (q) => q.gte("scheduled_at", new Date().toISOString())),
          count("subscribers"),
          count("orders"),
          count("orders", (q) => q.eq("payment_status", "unpaid")),
        ]);

      const { data: recentLeads } = await supabase
        .from("leads")
        .select("id,name,email,source,status,created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      const { data: nextBookings } = await supabase
        .from("bookings")
        .select("id,client_name,scheduled_at,status")
        .gte("scheduled_at", new Date().toISOString())
        .order("scheduled_at", { ascending: true })
        .limit(5);

      return {
        leads,
        newLeads,
        bookings,
        upcoming,
        subscribers,
        orders,
        pendingOrders,
        recentLeads: recentLeads ?? [],
        nextBookings: nextBookings ?? [],
      };
    },
  });

  const kpis = [
    { label: "Total leads", value: data?.leads, sub: `${data?.newLeads ?? 0} new` },
    { label: "Calls booked", value: data?.bookings, sub: `${data?.upcoming ?? 0} upcoming` },
    { label: "Subscribers", value: data?.subscribers, sub: "guide + newsletter" },
    { label: "Starter Kit orders", value: data?.orders, sub: `${data?.pendingOrders ?? 0} unpaid` },
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        title="Overview"
        description="The state of the business at a glance — leads in, calls booked, and the funnel behind them."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Panel key={k.label} className="p-6">
            <p className="font-ui text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {k.label}
            </p>
            <p className="font-display mt-4 text-4xl text-deepteal">{k.value ?? "—"}</p>
            <p className="font-ui mt-2 text-xs text-muted-foreground">{k.sub}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Latest leads</h2>
            <Link to="/admin/leads" className="font-ui text-xs text-primary underline">
              View all
            </Link>
          </div>
          <ul className="font-ui mt-5 space-y-4 text-sm">
            {(data?.recentLeads ?? []).map((l) => (
              <li key={l.id} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-foreground">{l.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {l.email} · {l.source?.replace(/_/g, " ")}
                  </p>
                </div>
                <span className="text-xs capitalize text-primary">{l.status}</span>
              </li>
            ))}
            {data?.recentLeads.length === 0 && (
              <li className="text-sm text-muted-foreground">No leads yet.</li>
            )}
          </ul>
        </Panel>

        <Panel className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Upcoming calls</h2>
            <Link to="/admin/bookings" className="font-ui text-xs text-primary underline">
              View all
            </Link>
          </div>
          <ul className="font-ui mt-5 space-y-4 text-sm">
            {(data?.nextBookings ?? []).map((b) => (
              <li key={b.id} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-foreground">{b.client_name}</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(b.scheduled_at)}</p>
                </div>
                <span className="text-xs capitalize text-primary">{b.status}</span>
              </li>
            ))}
            {data?.nextBookings.length === 0 && (
              <li className="text-sm text-muted-foreground">Nothing on the calendar yet.</li>
            )}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
