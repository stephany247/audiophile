export function formatCurrency(amount: number, currency = "USD") {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });
}
