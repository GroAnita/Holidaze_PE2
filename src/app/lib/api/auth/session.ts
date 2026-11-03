import "server-only";
import { cookies } from "next/headers";
import type { AuthProfile } from "../types";

const TOKEN_COOKIE = "holidaze_token";
const PROFILE_COOKIE = "holidaze_profile";

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
};

export async function setSession(token: string, profile: AuthProfile) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, token, { ...cookieOptions, httpOnly: true });
  cookieStore.set(PROFILE_COOKIE, JSON.stringify(profile), {
    ...cookieOptions,
    httpOnly: false,
  });
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE)?.value;
}

export async function getProfile() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(PROFILE_COOKIE)?.value;
  return raw ? JSON.parse(raw) : null;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  cookieStore.delete(PROFILE_COOKIE);
}
