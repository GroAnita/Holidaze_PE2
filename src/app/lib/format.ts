export function formatPrice(amount: number) {
  return `${new Intl.NumberFormat("nb-NO").format(amount)} NOK`;
}

export function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function toLocalDate(isoString: string) {
  return new Date(`${isoString.slice(0, 10)}T00:00`);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function nightsBetween(fromIso: string, toIso: string) {
  const ms = toLocalDate(toIso).getTime() - toLocalDate(fromIso).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function pluralize(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export function toApiDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
