"use server";
import { redirect } from "next/navigation";
import { getToken } from "./auth/session";
import { createBooking } from "./bookings";
import { ApiError } from "./types";
import type { FormState } from "./auth/actions";

export async function createBookingAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const token = await getToken();
  if (!token) redirect("/login");

  const venueId = String(formData.get("venueId") ?? "");
  const dateFrom = String(formData.get("dateFrom") ?? "");
  const dateTo = String(formData.get("dateTo") ?? "");
  const guests = Number(formData.get("guests"));

  if (!venueId || !dateFrom || !dateTo || dateTo <= dateFrom) {
    return { message: "Please choose your arrival and departure dates." };
  }
  if (!Number.isInteger(guests) || guests < 1) {
    return { message: "Please choose how many guests." };
  }

  try {
    await createBooking({ venueId, dateFrom, dateTo, guests }, token);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) redirect("/login");
    return {
      message:
        error instanceof ApiError
          ? error.message
          : "Could not complete the booking. Please try again.",
    };
  }

  redirect("/profile?booked=1");
}
