export const brand = {
  name: "Neostrategy",
  tagline: "Clarity attracts. Systems scale. Freedom lasts.",
  founder: "Mary Njoroge",
  email: "hello@neostrategy.co.ke",
  location: "Nairobi, Kenya",
  // Neostrategy WhatsApp Business number (digits only, incl. country code)
  whatsappNumber: "254721744282",

  starterKitPrice: "KES 4,500",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
