export const brand = {
  name: "NeoStrategy",
  tagline: "Clarity attracts. Systems scale. Freedom lasts.",
  founder: "Mary Njoroge",
  email: "hello@neostrategy.co.ke",
  location: "Nairobi, Kenya",
  // TODO: replace with NeoStrategy's real WhatsApp Business number (digits only, incl. country code)
  whatsappNumber: "254700000000",
  starterKitPrice: "KES 4,500",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
