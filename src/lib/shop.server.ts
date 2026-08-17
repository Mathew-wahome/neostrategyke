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
  featured: boolean;
  sort_order: number;
  /** Number of paid orders — used for the "most popular" sort in the shop. */
  purchases?: number;
};

const COLUMNS =
  "id,name,slug,short_description,description,price,compare_at_price,currency,product_type,category,cover_image,preview_url,featured,sort_order";

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

  const products = (data ?? []) as unknown as StoreProduct[];
  if (products.length === 0) return products;

  // Purchase counts drive the "most popular" sort. Orders are admin-only, and we
  // only ever expose the aggregate count, never any order detail.
  const counts = new Map<string, number>();
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: orders } = await supabaseAdmin
      .from("orders")
      .select("product_id")
      .eq("payment_status", "paid");
    for (const row of (orders ?? []) as { product_id: string | null }[]) {
      if (row.product_id) counts.set(row.product_id, (counts.get(row.product_id) ?? 0) + 1);
    }
  } catch {
    /* popularity is a nice-to-have; never block the catalogue on it */
  }

  return products.map((p) => ({ ...p, purchases: counts.get(p.id) ?? 0 }));
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

export type PaymentMethod = "card" | "mpesa" | "airtel";

export type CheckoutInput = {
  slug: string;
  name: string;
  email: string;
  phone?: string | undefined;
  business?: string | undefined;
  method: PaymentMethod;
  origin: string;
};

export type CheckoutResult =
  | { mode: "card"; access_code: string; authorization_url: string; reference: string }
  | { mode: "mobile_money"; reference: string; display_text: string }
  | { mode: "manual"; reference: string; reason: string };

/**
 * Normalises any Kenyan mobile number to the 2547XXXXXXXX / 2541XXXXXXXX form
 * Paystack expects. Accepts +254…, 00254…, 254…, 07…, 01…, 7…, 1… with any
 * spaces, dashes, brackets or dots in between.
 */
export function normalisePhone(raw: string) {
  let digits = (raw || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("254")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.replace(/^0+/, "");
  // At this point we should hold the 9-digit national number (7XXXXXXXX / 1XXXXXXXX).
  if (digits.length > 9) digits = digits.slice(-9);
  return `254${digits}`;
}

/** Kenyan mobile numbers are 254 followed by 9 digits starting with 7 or 1. */
export function isKenyanMobile(msisdn: string) {
  return /^254[71]\d{8}$/.test(msisdn);
}


export async function startCheckout(input: CheckoutInput): Promise<CheckoutResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const product = await getStoreProduct(input.slug);
  if (!product) throw new Error("That product is no longer available.");

  const reference = `neo_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;
  const amount = Math.round(Number(product.price) * 100);

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
    return { mode: "manual", reference, reason: "Card and mobile money are not switched on yet." };
  }

  const headers = {
    Authorization: `Bearer ${secret}`,
    "Content-Type": "application/json",
  };
  const metadata = {
    order_id: order?.id ?? null,
    product: product.name,
    customer_name: input.name,
    method: input.method,
  };

  /* ---- Mobile money: STK prompt straight to the buyer's handset ---- */
  if (input.method === "mpesa" || input.method === "airtel") {
    const phone = normalisePhone(input.phone ?? "");
    if (!isKenyanMobile(phone)) {
      return {
        mode: "manual",
        reference,
        reason:
          "That phone number does not look like a Kenyan mobile number. Use 07XX XXX XXX, 01XX XXX XXX or +2547XX XXX XXX.",
      };
    }


    const res = await fetch("https://api.paystack.co/charge", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: input.email,
        amount,
        currency: product.currency,
        reference,
        metadata,
        mobile_money: {
          // Paystack only accepts E.164 (leading +) for Kenyan mobile money.
          phone: `+${phone}`,

          provider: input.method === "mpesa" ? "mpesa" : "airtel",
        },
      }),
    });
    const body = (await res.json()) as {
      status?: boolean;
      message?: string;
      data?: { status?: string; display_text?: string; reference?: string };
    };

    if (!res.ok || !body.status) {
      return {
        mode: "manual",
        reference,
        reason: body.message ?? "We could not send the payment prompt.",
      };
    }

    return {
      mode: "mobile_money",
      reference,
      display_text:
        body.data?.display_text ??
        "Check your phone and enter your PIN to approve the payment.",
    };
  }

  /* ---- Card: initialise and finish in an on-page Paystack popup ---- */
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers,
    body: JSON.stringify({
      email: input.email,
      amount,
      currency: product.currency,
      reference,
      channels: ["card"],
      callback_url: `${input.origin}/shop/success`,
      metadata,
    }),
  });

  const body = (await res.json()) as {
    status?: boolean;
    message?: string;
    data?: { authorization_url?: string; access_code?: string };
  };

  if (!res.ok || !body.status || !body.data?.access_code || !body.data.authorization_url) {
    return {
      mode: "manual",
      reference,
      reason: body.message ?? "Paystack could not start that payment.",
    };
  }

  return {
    mode: "card",
    access_code: body.data.access_code,
    authorization_url: body.data.authorization_url,
    reference,
  };
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
