"use server";

import { redirect } from "next/navigation";
import { loginUser, registerUser } from "../auth";
import { setSession, clearSession } from "./session";
import { ApiError } from "../types";

export type FormState = {
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function errorMessage(error: unknown) {
  return error instanceof ApiError
    ? error.message
    : "Something went wrong. Please try again.";
}

export async function login(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = getText(formData, "email").trim();
  const password = getText(formData, "password");
  const values = { email };

  const errors: Record<string, string> = {};
  if (!email) errors.email = "Please enter your email.";
  if (!password) errors.password = "Please enter your password.";
  if (Object.keys(errors).length > 0) return { errors, values };

  try {
    const { data } = await loginUser({ email, password });
    const { accessToken, ...profile } = data;
    await setSession(accessToken, profile);
  } catch (error) {
    return { message: errorMessage(error), values };
  }

  redirect("/");
}

export async function register(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = getText(formData, "name").trim();
  const email = getText(formData, "email").trim();
  const password = getText(formData, "password");
  const confirmPassword = getText(formData, "confirmPassword");
  const venueManager = formData.get("role") === "manager";
  const values = { name, email, role: venueManager ? "manager" : "customer" };

  const errors: Record<string, string> = {};
  if (!name) {
    errors.name = "Please choose a username.";
  } else if (!/^\w+$/.test(name)) {
    errors.name = "Use only letters, numbers and underscores.";
  }
  if (!email.toLowerCase().endsWith("@stud.noroff.no")) {
    errors.email = "Email must end with @stud.noroff.no.";
  }
  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  if (Object.keys(errors).length > 0) return { errors, values };

  try {
    await registerUser({ name, email, password, venueManager });
    // Log the new user in straight away
    const { data } = await loginUser({ email, password });
    const { accessToken, ...profile } = data;
    await setSession(accessToken, profile);
  } catch (error) {
    return { message: errorMessage(error), values };
  }

  redirect("/");
}

export async function logOut() {
  await clearSession();
  redirect("/");
}
