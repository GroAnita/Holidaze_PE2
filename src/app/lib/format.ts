export function formatPrice(amount: number) {
  return `${new Intl.NumberFormat("nb-NO").format(amount)} NOK`;
}

export function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}
