import { apiFetch } from "./client";
import type {
  RegisterPayload,
  LoginPayload,
  AuthProfile,
  LoginResponseData,
  ApiKeyResponseData,
} from "./types";

export function registerUser(payload: RegisterPayload) {
  return apiFetch<{ data: AuthProfile }>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function loginUser(payload: LoginPayload) {
  return apiFetch<{ data: LoginResponseData }>("/auth/login?_holidaze=true", {
    method: "POST",
    body: payload,
  });
}

export function createApiKey(token: string) {
  return apiFetch<{ data: ApiKeyResponseData }>("/auth/create-api-key", {
    method: "POST",
    token,
  });
}
