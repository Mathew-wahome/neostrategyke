import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PageHeader, Panel } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: Settings,
});

type Settings = {
  whatsapp_number: string | null;
  contact_email: string | null;
  starter_kit_price: number | null;
  announcement: string | null;
};

function Settings() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").maybeSingle();
      if (error) throw error;
      return (data ?? null) as Settings | null;
    },
  });

  const [form, setForm] = useState<Settings>({
    whatsapp_number: "",
    contact_email: "",
    starter_kit_price: 4500,
    announcement: "",
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ id: true, ...form } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "site_settings"] });
      toast.success("Settings saved.");
    },
    onError: () => toast.error("Could not save settings."),
  });

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Contact details and pricing used across the site." />
      <Panel className="p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
          className="grid max-w-2xl gap-5"
        >
          <Field
            label="WhatsApp number"
            value={form.whatsapp_number ?? ""}
            onChange={(v) => setForm((f) => ({ ...f, whatsapp_number: v }))}
          />
          <Field
            label="Contact email"
            value={form.contact_email ?? ""}
            onChange={(v) => setForm((f) => ({ ...f, contact_email: v }))}
          />
          <Field
            label="Starter Kit price (KES)"
            value={String(form.starter_kit_price ?? "")}
            onChange={(v) => setForm((f) => ({ ...f, starter_kit_price: Number(v || 0) }))}
          />
          <Field
            label="Announcement"
            value={form.announcement ?? ""}
            onChange={(v) => setForm((f) => ({ ...f, announcement: v }))}
          />
          <button
            type="submit"
            className="font-ui h-10 w-fit rounded-sm bg-primary px-5 text-sm text-primary-foreground"
          >
            Save settings
          </button>
        </form>
      </Panel>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="font-ui text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-ui mt-2 h-10 w-full rounded-sm border border-input bg-background px-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
