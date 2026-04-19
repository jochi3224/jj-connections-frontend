export function formatPrice(price?: number | null, currency?: string | null) {
  if (price === null || price === undefined) return "Inquire for price.";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(price);
}