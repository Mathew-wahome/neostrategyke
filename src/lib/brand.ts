export const brand = {
  name: "Neostrategy",
  tagline: "Clarity attracts. Systems scale. Freedom lasts.",
  founder: "Nduta Njoroge",
  email: "support@theneostrategy.com",
  domain: "theneostrategy.com",
  location: "Nairobi, Kenya",
  // Neostrategy WhatsApp Business number (digits only, incl. country code)
  whatsappNumber: "254721744282",
  // Leave empty until the real company page URL is confirmed — an empty value
  // hides the link rather than pointing visitors at linkedin.com.
  linkedinUrl: "",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
