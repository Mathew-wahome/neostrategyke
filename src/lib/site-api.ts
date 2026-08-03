import { supabase } from "@/integrations/supabase/client";

export async function subscribe(email: string, source: string, name?: string) {
  const { error } = await supabase.from("subscribers").insert({ email, source, name: name ?? null });
  if (error) {
    // unique violation = already on the list; treat as success
    if (error.code === "23505") return { alreadySubscribed: true };
    throw error;
  }
  return { alreadySubscribed: false };
}

export async function createLead(input: {
  name: string;
  email: string;
  phone?: string | undefined;
  business_name?: string | undefined;
  source: string;
  services_stage_interest?: string | null;
  notes?: string | undefined;
}) {
  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      business_name: input.business_name || null,
      source: input.source,
      services_stage_interest: input.services_stage_interest || null,
      notes: input.notes || null,
    })
    .select("id")
    .single();
  if (error) return null;
  return data?.id ?? null;
}

export async function createBooking(input: {
  client_name: string;
  email: string;
  phone?: string | undefined;
  business_name?: string | undefined;
  notes?: string | undefined;
  scheduled_at: string;
  services_stage_interest?: string | null;
}) {
  const lead_id = await createLead({
    name: input.client_name,
    email: input.email,
    phone: input.phone,
    business_name: input.business_name,
    source: "booking",
    services_stage_interest: input.services_stage_interest ?? null,
    notes: input.notes,
  });

  const { error } = await supabase.from("bookings").insert({
    client_name: input.client_name,
    email: input.email,
    phone: input.phone || null,
    business_name: input.business_name || null,
    notes: input.notes || null,
    scheduled_at: input.scheduled_at,
    services_stage_interest: input.services_stage_interest ?? null,
    lead_id,
  });
  if (error) throw error;
}

export async function createOrder(input: {
  customer_name: string;
  email: string;
  business_name?: string | undefined;
  product_id?: string | null;
}) {
  const lead_id = await createLead({
    name: input.customer_name,
    email: input.email,
    business_name: input.business_name,
    source: "shop_order",
  });

  const { error } = await supabase.from("orders").insert({
    customer_name: input.customer_name,
    email: input.email,
    business_name: input.business_name || null,
    product_id: input.product_id ?? null,
    lead_id,
  });
  if (error) throw error;
}
