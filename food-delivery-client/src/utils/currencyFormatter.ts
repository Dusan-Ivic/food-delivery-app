export function formatCurrency(number: number) {
  return new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  }).format(number);
}
