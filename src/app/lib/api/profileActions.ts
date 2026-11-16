"use server";
import { redirect } from "next/navigation";
import { getProfile, getToken, updateSessionProfile } from "./auth/session";
import { updateProfile, type ProfilePayload } from "./profiles";
import { ApiError } from "./types";
import type { FormState } from "./auth/actions";

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function updateProfileAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const token = await getToken();
  const session = await getProfile();
  if (!token || !session) redirect("/login");

  const avatarUrl = getText(formData, "avatarUrl");
  const bio = getText(formData, "bio");
  const venueManager = formData.has("venueManager");
  const values = {
    avatarUrl,
    bio,
    venueManager: venueManager ? "on" : "",
  };

  const errors: Record<string, string> = {};
  if (avatarUrl && !isValidUrl(avatarUrl)) {
    errors.avatarUrl = "Please enter a valid Image URL (https:// or http://).";
  }
  if (bio && bio.length > 160) {
    errors.bio = "Bio must be 160 characters or less.";
  }
  if (Object.keys(errors).length > 0) return { errors, values };
  const payload: ProfilePayload = {
    bio,
    venueManager,
  };
  if (avatarUrl) {
    payload.avatar = {
      url: avatarUrl,
      alt: `${session.name}'s profile picture`,
    };
  }
  try {
    const { data } = await updateProfile(session.name, payload, token);
    await updateSessionProfile({
      ...session,
      bio: data.bio,
      avatar: data.avatar,
      venueManager: Boolean(data.venueManager),
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) redirect("/login");
    return {
      message:
        error instanceof ApiError
          ? error.message
          : "Could not save your profile. Please try again.",
      values,
    };
  }
  redirect("/profile");
}
