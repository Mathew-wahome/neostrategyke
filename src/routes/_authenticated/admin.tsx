import mark from "@/assets/ns-mark.png.asset.json";
import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useStaff } from "@/components/admin/AdminUI";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminShell,
  errorComponent: () => (
    <div className="p-16 text-center">
      <h1 className="font-display text-2xl">The dashboard did not load</h1>
    </div>
  ),
  notFoundComponent: () => (
    <div className="p-16 text-center">
      <h1 className="font-display text-2xl">Not found</h1>
    </div>
  ),
});

const nav: { to: string; label: string; exact?: boolean }[] = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/leads", label: "Leads" },
  { to: "/admin/bookings", label: "Bookings" },
  { to: "/admin/messages", label: "Messages" },
  { to: "/admin/subscribers", label: "Subscribers" },

  { to: "/admin/products", label: "Products" },
  { to: "/admin/orders", label: "Shop orders" },
  { to: "/admin/clients", label: "Clients" },
  { to: "/admin/journal", label: "Journal" },
  { to: "/admin/settings", label: "Settings" },
];

function AdminShell() {
  const { data: staff, isLoading } = useStaff();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-wash">
        <p className="font-ui text-sm text-muted-foreground">Loading the dashboard…</p>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-wash px-6">
        <div className="max-w-md rounded-sm border border-border/70 bg-background p-10 text-center">
          <h1 className="font-display text-2xl">No dashboard access</h1>
          <p className="font-ui mt-3 text-sm text-muted-foreground">
            This account is signed in but is not on the NeoStrategy staff list. Ask an admin to add
            you.
          </p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="font-ui mt-6 text-sm text-primary underline underline-offset-4"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-wash/50">
      <aside className="hidden w-60 shrink-0 border-r border-border/70 bg-background md:block">
        <div className="flex h-20 items-center px-6">
          <Link to="/" className="font-display text-lg tracking-tight">
            Neo<span className="text-primary">Strategy</span>
          </Link>
        </div>
        <nav className="font-ui flex flex-col gap-1 px-3 pb-6 text-sm">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to as never}
                className={cn(
                  "rounded-sm px-3 py-2 transition-colors",
                  active
                    ? "bg-wash font-medium text-deepteal"
                    : "text-muted-foreground hover:bg-wash/70 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/70 px-6 py-5">
          <p className="font-ui text-xs text-muted-foreground">{staff.email}</p>
          <p className="font-ui mt-1 text-xs capitalize text-primary">{staff.role}</p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="font-ui mt-3 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex gap-1 overflow-x-auto border-b border-border/70 bg-background px-4 py-3 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to as never}
              className="font-ui whitespace-nowrap rounded-sm px-3 py-1.5 text-xs text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
