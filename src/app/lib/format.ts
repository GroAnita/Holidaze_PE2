export function formatPrice(amount: number) {
  return `${new Intl.NumberFormat("nb-NO").format(amount)} NOK`;
}
