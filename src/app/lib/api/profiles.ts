import { apiFetch } from "./client";
import type { Profile } from "./types";

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
