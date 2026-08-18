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
  // The id is generated here because anonymous visitors can write leads but not read them back.
  const id = crypto.randomUUID();
  const { error } = await supabase.from("leads").insert({
    id,
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    business_name: input.business_name || null,
    source: input.source,
    services_stage_interest: input.services_stage_interest || null,
    notes: input.notes || null,
  });
  if (error) return null;
  return id;
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

/**
 * The discovery-call enquiry endpoint. Saves a lead and a matching booking
 * request so every enquiry lands in the CRM as something to follow up on.
 */
export async function requestDiscoveryCall(input: {
  name: string;
  email: string;
  phone?: string | undefined;
  business_name?: string | undefined;
  notes?: string | undefined;
  services_stage_interest?: string | null;
}) {
  const lead_id = await createLead({
    name: input.name,
    email: input.email,
    phone: input.phone,
    business_name: input.business_name,
    source: "discovery_call",
    services_stage_interest: input.services_stage_interest ?? null,
    notes: input.notes,
  });
  if (!lead_id) return null;

  // No calendar in the flow: the request is logged now and scheduled by hand.
  const { error } = await supabase.from("bookings").insert({
    client_name: input.name,
    email: input.email,
    phone: input.phone || null,
    business_name: input.business_name || null,
    notes: input.notes || null,
    scheduled_at: new Date().toISOString(),
    services_stage_interest: input.services_stage_interest ?? null,
    lead_id,
  });
  if (error) return null;
  return lead_id;
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
