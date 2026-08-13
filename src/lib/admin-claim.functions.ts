import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;
    if (!userId) return { claimed: false };

    const { count } = await supabaseAdmin
      .from("staff_users")
      .select("id", { count: "exact", head: true });

    if ((count ?? 0) > 0) return { claimed: false };

    const { error } = await supabaseAdmin
      .from("staff_users")
      .insert({ id: userId, role: "admin" });

    if (error) return { claimed: false };
    return { claimed: true };
  });
