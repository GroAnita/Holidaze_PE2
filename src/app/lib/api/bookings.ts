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

export type BookingPayload = {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
};

export function createBooking(payload: BookingPayload, token: string) {
  return apiFetch<{ data: Booking }>(`/holidaze/bookings`, {
    token,
    method: "POST",
    body: payload,
  });
}
