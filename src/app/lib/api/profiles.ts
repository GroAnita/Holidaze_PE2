import { apiFetch } from "./client";
import type { Profile, Media } from "./types";
import type { Venue } from "./venues";

export type ProfileDetails = Profile & {
  _count?: {
    venues: number;
    bookings: number;
  };
};

export function getUserProfile(name: string, token: string) {
  return apiFetch<{ data: ProfileDetails }>(
    `/holidaze/profiles/${encodeURIComponent(name)}`,
    {
      token,
    },
  );
}

export function getMyVenues(name: string, token: string) {
  const params = new URLSearchParams({
    _bookings: "true",
    sort: "created",
    sortOrder: "desc",
    limit: "100",
  });
  return apiFetch<{ data: Venue[] }>(
    `/holidaze/profiles/${encodeURIComponent(name)}/venues?${params}`,
    { token },
  );
}

export type ProfilePayload = {
  bio?: string;
  avatar?: Media;
  venueManager?: boolean;
};

export function updateProfile(
  name: string,
  payload: ProfilePayload,
  token: string,
) {
  return apiFetch<{ data: Profile }>(
    `/holidaze/profiles/${encodeURIComponent(name)}`,
    {
      method: "PUT",
      token,
      body: payload,
    },
  );
}
