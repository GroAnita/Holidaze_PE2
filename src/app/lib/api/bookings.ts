import { apiFetch } from "./client";
import type { Booking } from "./types";
import type { Venue } from "./venues";

export type BookingWithVenue = Booking & {
  venue?: Venue;
};

export function getMyBookings(name: string, token: string) {
  const params = new URLSearchParams({
    _venue: "true",
    sort: "dateFrom",
    sortOrder: "asc",
    limit: "100",
  });
  return apiFetch<{ data: BookingWithVenue[] }>(
    `/holidaze/profiles/${encodeURIComponent(name)}/bookings?${params}`,
    { token },
  );
}
