import { apiFetch } from "./client";
import type { Booking, Location, Media, Profile, VenueMeta } from "./types";

export type Venue = {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: Location;
  bookings?: Booking[];
  owner?: Profile;
};

type VenuesResponse = {
  data: Venue[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
};

type GetVenuesOptions = {
  page?: number;
  limit?: number;
  query?: string;
};
export function getVenues({
  page = 1,
  limit = 12,
  query = "",
}: GetVenuesOptions = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort: "created",
    sortOrder: "desc",
  });

  if (query) {
    params.set("q", query);

    return apiFetch<VenuesResponse>(`/holidaze/venues/search?${params}`);
  }
  return apiFetch<VenuesResponse>(`/holidaze/venues?${params}`);
}

type VenueResponse = {
  data: Venue;
};

export function getVenue(id: string) {
  return apiFetch<VenueResponse>(
    `/holidaze/venues/${id}?_bookings=true&_owner=true`,
  );
}
