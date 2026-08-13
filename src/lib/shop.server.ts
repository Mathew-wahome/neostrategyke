import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  currency: string;
  product_type: string;
  category: string | null;
  cover_image: string | null;
  preview_url: string | null;
  video_url: string | null;
  featured: boolean;
  sort_order: number;
};

const COLUMNS =
  "id,name,slug,short_description,description,price,compare_at_price,currency,product_type,category,cover_image,preview_url,video_url,featured,sort_order";

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export async function listStoreProducts(): Promise<StoreProduct[]> {
  const { data } = await publicClient()
    .from("products")
    .select(COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return (data ?? []) as unknown as StoreProduct[];
}

export async function getStoreProduct(slug: string): Promise<StoreProduct | null> {
  const { data } = await publicClient()
    .from("products")
    .select(COLUMNS)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  return (data ?? null) as unknown as StoreProduct | null;
}

/* ------------------------------------------------------------------ */
/* Paystack                                                            */
/* ------------------------------------------------------------------ */

export function paystackSecret() {
  return process.env["PAYSTACK_SECRET_KEY"] ?? "";
}

export type CheckoutInput = {
  slug: string;
  name: string;
  email: string;
  phone?: string | undefined;
  business?: string | undefined;
  origin: string;
};

export type CheckoutResult =
  | { mode: "paystack"; authorization_url: string; reference: string }
  | { mode: "manual"; reference: string; reason: string };

export async function startCheckout(input: CheckoutInput): Promise<CheckoutResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const product = await getStoreProduct(input.slug);
  if (!product) throw new Error("That product is no longer available.");

  const reference = `neo_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;

  const { data: lead } = await supabaseAdmin
    .from("leads")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      business_name: input.business || null,
      source: "shop_order",
    })
    .select("id")
    .maybeSingle();

  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .insert({
      product_id: product.id,
      customer_name: input.name,
      email: input.email,
      phone: input.phone || null,
      business_name: input.business || null,
      amount: product.price,
      currency: product.currency,
      provider: "paystack",
      provider_reference: reference,
      status: "pending_payment",
      payment_status: "unpaid",
      lead_id: lead?.id ?? null,
    })
    .select("id")
    .maybeSingle();
  if (error) throw new Error("We could not start that order.");

  const secret = paystackSecret();
  if (!secret) {
    return { mode: "manual", reference, reason: "Paystack is not configured yet." };
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      amount: Math.round(Number(product.price) * 100),
      currency: product.currency,
      reference,
      callback_url: `${input.origin}/shop/success`,
      metadata: {
        order_id: order?.id ?? null,
        product: product.name,
        customer_name: input.name,
      },
    }),
  });

  const body = (await res.json()) as {
    status?: boolean;
    message?: string;
    data?: { authorization_url?: string };
  };

  if (!res.ok || !body.status || !body.data?.authorization_url) {
    return {
      mode: "manual",
      reference,
      reason: body.message ?? "Paystack could not start that payment.",
    };
  }

  return { mode: "paystack", authorization_url: body.data.authorization_url, reference };
}

export type OrderReceipt = {
  status: "paid" | "pending" | "unknown";
  customer_name: string | null;
  product_name: string | null;
  amount: number;
  currency: string;
  file_url: string | null;
  video_url: string | null;
};

/** Marks an order paid once Paystack confirms it, then returns the delivery details. */
export async function verifyOrder(reference: string): Promise<OrderReceipt> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const secret = paystackSecret();
  if (secret) {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${secret}` } },
    );
    const body = (await res.json()) as { data?: { status?: string } };
    if (body.data?.status === "success") {
      await markOrderPaid(reference);
    }
  }

  const { data } = await supabaseAdmin
    .from("orders")
    .select("customer_name,amount,currency,payment_status,products(name,file_url,video_url)")
    .eq("provider_reference", reference)
    .maybeSingle();

  if (!data) {
    return {
      status: "unknown",
      customer_name: null,
      product_name: null,
      amount: 0,
      currency: "KES",
      file_url: null,
      video_url: null,
    };
  }

  const row = data as unknown as {
    customer_name: string | null;
    amount: number;
    currency: string;
    payment_status: string;
    products: { name: string; file_url: string | null; video_url: string | null } | null;
  };
  const paid = row.payment_status === "paid";

  return {
    status: paid ? "paid" : "pending",
    customer_name: row.customer_name,
    product_name: row.products?.name ?? null,
    amount: Number(row.amount ?? 0),
    currency: row.currency ?? "KES",
    file_url: paid ? (row.products?.file_url ?? null) : null,
    video_url: paid ? (row.products?.video_url ?? null) : null,
  };
}

export async function markOrderPaid(reference: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin
    .from("orders")
    .update({
      payment_status: "paid",
      status: "fulfilled",
      paid_at: new Date().toISOString(),
    })
    .eq("provider_reference", reference)
    .neq("payment_status", "paid");
}
