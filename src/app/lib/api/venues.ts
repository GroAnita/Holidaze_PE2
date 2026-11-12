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

export function getVenues() {
  return apiFetch<VenuesResponse>("/holidaze/venues");
}

type VenueResponse = {
  data: Venue;
};

export function getVenue(id: string) {
  return apiFetch<VenueResponse>(
    `/holidaze/venues/${id}?_bookings=true&_owner=true`,
  );
}
