export function formatPeso(amount: number | null | undefined) {
  if (amount == null) return "₱0.00";

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}