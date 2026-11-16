"use server";
import { redirect } from "next/navigation";
import { getToken } from "./auth/session";
import {
  createVenue,
  deleteVenue,
  getVenues,
  updateVenue,
  type VenuePayLoad,
} from "./venues";
import { ApiError } from "./types";
import type { FormState } from "./auth/actions";

export async function loadMoreVenues(page: number, query: string) {
  return getVenues({ page, query });
}

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

function errorMessage(error: unknown) {
  return error instanceof ApiError
    ? error.message
    : "Something went wrong. Please try again.";
}

// Shared by create and edit: reads the form, validates it and builds the payload
function readVenueForm(formData: FormData) {
  const name = getText(formData, "name");
  const description = getText(formData, "description");
  const priceText = getText(formData, "price");
  const maxGuestsText = getText(formData, "maxGuests");
  const address = getText(formData, "address");
  const city = getText(formData, "city");
  const zip = getText(formData, "zip");
  const country = getText(formData, "country");

  const price = Number(priceText);
  const maxGuests = Number(maxGuestsText);

  const mediaUrls = formData.getAll("mediaUrl").map(String);
  const mediaAlts = formData.getAll("mediaAlt").map(String);
  const media = mediaUrls.map((url, i) => ({ url, alt: mediaAlts[i] ?? "" }));

  const meta = {
    wifi: formData.has("wifi"),
    parking: formData.has("parking"),
    breakfast: formData.has("breakfast"),
    pets: formData.has("pets"),
  };

  // Sent back so the form keeps what the user typed if something is wrong
  const values: Record<string, string> = {
    name,
    description,
    price: priceText,
    maxGuests: maxGuestsText,
    address,
    city,
    zip,
    country,
    wifi: meta.wifi ? "on" : "",
    parking: meta.parking ? "on" : "",
    breakfast: meta.breakfast ? "on" : "",
    pets: meta.pets ? "on" : "",
  };

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please give your venue a name.";
  if (!description) errors.description = "Please add a description.";
  if (media.length === 0) errors.media = "Please add at least one photo.";
  if (media.some((item) => !isValidUrl(item.url))) {
    errors.media = "One of the image URLs is not valid.";
  }
  if (!city) errors.city = "Please enter a city.";
  if (!country) errors.country = "Please enter a country.";
  if (!price || price <= 0) errors.price = "Please enter a price above 0.";
  if (!Number.isInteger(maxGuests) || maxGuests < 1 || maxGuests > 100) {
    errors.maxGuests = "Guests must be a whole number from 1 to 100.";
  }

  const payload: VenuePayLoad = {
    name,
    description,
    media,
    price,
    maxGuests,
    meta,
    location: { address, city, zip, country },
  };

  return { payload, values, errors };
}

export async function createVenueAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const token = await getToken();
  if (!token) redirect("/login");

  const { payload, values, errors } = readVenueForm(formData);
  if (Object.keys(errors).length > 0) return { errors, values };

  try {
    await createVenue(payload, token);
  } catch (error) {
    return { message: errorMessage(error), values };
  }

  redirect("/profile");
}

export async function updateVenueAction(
  id: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const token = await getToken();
  if (!token) redirect("/login");

  const { payload, values, errors } = readVenueForm(formData);
  if (Object.keys(errors).length > 0) return { errors, values };

  try {
    await updateVenue(id, payload, token);
  } catch (error) {
    return { message: errorMessage(error), values };
  }

  redirect(`/venues/${id}`);
}

export async function deleteVenueAction(
  id: string,
  _prevState: FormState,
): Promise<FormState> {
  const token = await getToken();
  if (!token) redirect("/login");

  try {
    await deleteVenue(id, token);
  } catch (error) {
    return { message: errorMessage(error) };
  }

  redirect("/profile");
}
