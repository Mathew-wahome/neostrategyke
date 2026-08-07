import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/lib/brand";

export type SiteSettings = {
  whatsapp_number: string;
  contact_email: string;
  starter_kit_price: number;
  announcement: string | null;
};

const fallback: SiteSettings = {
  whatsapp_number: brand.whatsappNumber,
  contact_email: brand.email,
  starter_kit_price: 4500,
  announcement: null,
};

/** Live site settings, editable from the dashboard. Falls back to brand defaults. */
export function useSiteSettings() {
  const query = useQuery({
    queryKey: ["site-settings"],
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<SiteSettings> => {
      const { data } = await supabase
        .from("site_settings")
        .select("whatsapp_number,contact_email,starter_kit_price,announcement")
        .maybeSingle();
      if (!data) return fallback;
      const row = data as Partial<SiteSettings>;
      return {
        whatsapp_number: row.whatsapp_number || fallback.whatsapp_number,
        contact_email: row.contact_email || fallback.contact_email,
        starter_kit_price: Number(row.starter_kit_price ?? fallback.starter_kit_price),
        announcement: row.announcement ?? null,
      };
    },
  });

  return query.data ?? fallback;
}

export function formatKes(amount: number) {
  return `KES ${amount.toLocaleString("en-KE")}`;
}

export function waLink(number: string, message: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens a tab synchronously (before any await) so the browser does not block it,
 * then points it at WhatsApp once the record is saved.
 */
export function openWhatsAppWindow() {
  if (typeof window === "undefined") return null;
  return window.open("about:blank", "_blank", "noopener,noreferrer");
}

export function sendToWhatsApp(win: Window | null, url: string) {
  if (win && !win.closed) {
    win.location.href = url;
  } else if (typeof window !== "undefined") {
    window.location.href = url;
  }
}
