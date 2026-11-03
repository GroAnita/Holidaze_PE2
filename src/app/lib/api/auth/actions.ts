"use server";
import { loginUser, registerUser } from "../auth";
import { setSession, clearSession } from "./session";
import { ApiError, type LoginPayload, type RegisterPayload } from "../types";

type ActionResult = { success: true } | { success: false; message: string };

export async function login(payload: LoginPayload): Promise<ActionResult> {
  try {
    const { data } = await loginUser(payload);
    const { accessToken, ...profile } = data;
    await setSession(accessToken, profile);
    return { success: true };
  } catch (error) {
    const message =
      error instanceof ApiError ? error.message : "Something went wrong";
    return { success: false, message };
  }
}

export async function logOut() {
  await clearSession();
}

export async function register(
  payload: RegisterPayload,
): Promise<ActionResult> {
  try {
    await registerUser(payload);
    return { success: true };
  } catch (error) {
    const message =
      error instanceof ApiError ? error.message : "Something went wrong";
    return { success: false, message };
  }
}
