import { createServerFn } from "@tanstack/react-start";

export const fetchProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { listStoreProducts } = await import("./shop.server");
  return listStoreProducts();
});

export const fetchProduct = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug) }))
  .handler(async ({ data }) => {
    const { getStoreProduct } = await import("./shop.server");
    return getStoreProduct(data.slug);
  });

export const beginCheckout = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      slug: string;
      name: string;
      email: string;
      phone?: string;
      business?: string;
      method?: string;
      origin: string;
    }) => ({
      slug: String(data.slug),
      name: String(data.name).slice(0, 120),
      email: String(data.email).slice(0, 200),
      phone: data.phone ? String(data.phone).slice(0, 40) : undefined,
      business: data.business ? String(data.business).slice(0, 160) : undefined,
      method: (["card", "mpesa", "airtel"].includes(String(data.method))
        ? String(data.method)
        : "card") as "card" | "mpesa" | "airtel",
      origin: String(data.origin).slice(0, 200),
    }),
  )
  .handler(async ({ data }) => {
    const { startCheckout } = await import("./shop.server");
    return startCheckout(data);
  });

export const confirmOrder = createServerFn({ method: "POST" })
  .inputValidator((data: { reference: string }) => ({ reference: String(data.reference) }))
  .handler(async ({ data }) => {
    const { verifyOrder } = await import("./shop.server");
    return verifyOrder(data.reference);
  });
