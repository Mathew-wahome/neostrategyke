import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useStaff() {
  return useQuery({
    queryKey: ["staff-me"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return null;
      let { data } = await supabase
        .from("staff_users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (!data) {
        // First person in becomes the admin.
        await supabase.rpc("claim_first_admin");
        const retry = await supabase
          .from("staff_users")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        data = retry.data;
      }
      return data ? { ...data, email: user.email ?? null } : null;
    },
  });
}

export function useRows<T = Record<string, unknown>>(
  table: string,
  opts?: { orderBy?: string; ascending?: boolean; select?: string },
) {
  return useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const query = (supabase.from as (t: string) => any)(table)
        .select(opts?.select ?? "*")
        .order(opts?.orderBy ?? "created_at", { ascending: opts?.ascending ?? false });
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/70 pb-6">
      <div>
        <h1 className="font-display text-3xl leading-tight">{title}</h1>
        {description && (
          <p className="font-ui mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-sm border border-border/70 bg-background", className)}>
      {children}
    </div>
  );
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="font-ui w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border/70 bg-wash/60">
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">{children}</tbody>
      </table>
    </div>
  );
}

export function Empty({ label }: { label: string }) {
  return <p className="font-ui px-4 py-10 text-center text-sm text-muted-foreground">{label}</p>;
}

export function StatusPill({ value }: { value: string | null }) {
  return (
    <span className="font-ui inline-flex rounded-full bg-wash px-3 py-1 text-xs capitalize text-deepteal">
      {(value ?? "—").replace(/_/g, " ")}
    </span>
  );
}

export function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="font-ui h-9 rounded-sm border border-input bg-background px-2 text-xs capitalize outline-none focus:border-primary"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}

export function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value?: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
