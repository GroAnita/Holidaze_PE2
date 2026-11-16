"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createVenueAction, updateVenueAction } from "../lib/api/venueActions";
import type { FormState } from "../lib/api/auth/actions";
import Button from "./Button";
import FormField, { inputStyles } from "./FormField";
import MediaInput from "./MediaInput";
import type { Venue } from "../lib/api/venues";

const initialState: FormState = {};

const amenities = [
  { name: "wifi", label: "Wifi" },
  { name: "parking", label: "Parking" },
  { name: "breakfast", label: "Breakfast" },
  { name: "pets", label: "Pet friendly" },
];

function venueToValues(venue: Venue): Record<string, string> {
  return {
    name: venue.name,
    description: venue.description,
    price: String(venue.price),
    maxGuests: String(venue.maxGuests),
    address: venue.location.address ?? "",
    city: venue.location.city ?? "",
    zip: venue.location.zip ?? "",
    country: venue.location.country ?? "",
    wifi: venue.meta.wifi ? "on" : "",
    parking: venue.meta.parking ? "on" : "",
    breakfast: venue.meta.breakfast ? "on" : "",
    pets: venue.meta.pets ? "on" : "",
  };
}

type VenueFormProps = {
  venue?: Venue;
};

export default function VenueForm({ venue }: VenueFormProps) {
  const isEdit = Boolean(venue);
  const action = venue
    ? updateVenueAction.bind(null, venue.id)
    : createVenueAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  const values = state.values ?? (venue ? venueToValues(venue) : {});

  const errors = state.errors ?? {};

  return (
    <div className="bg-background border-cta-secondary font-manrope w-full max-w-2xl rounded-2xl border-8 px-6 py-10 sm:px-10">
      <h1 className="text-text-primary text-center text-3xl">
        {isEdit ? "Edit your venue on " : "Add your venue to "}
        <span className="font-italiana text-feedback-success-text tracking-widest">
          HOLIDAZE
        </span>
      </h1>
      <p className="text-text-primary mt-2 text-center text-sm">
        Give your guests a reason to stay.
        <br />
        Fields marked with * are required.
      </p>

      <form action={formAction} noValidate className="mt-8 flex flex-col gap-8">
        <FormField
          label="Venue name"
          name="name"
          required
          placeholder="Venue name"
          defaultValue={values.name}
          error={errors.name}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-text-primary text-sm">
            Description <span aria-hidden="true">*</span>
          </label>
          <p id="description-hint" className="text-text-muted text-xs">
            Describe the space, surroundings, and what makes your venue special
          </p>
          <textarea
            id="description"
            name="description"
            rows={5}
            required
            defaultValue={values.description}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description
                ? "description-hint description-error"
                : "description-hint"
            }
            className={inputStyles}
          />
          {errors.description && (
            <p
              id="description-error"
              className="text-feedback-error-text text-sm"
            >
              {errors.description}
            </p>
          )}
        </div>

        <MediaInput error={errors.media} initialImages={venue?.media} />

        <fieldset className="flex flex-col gap-4">
          <legend className="text-feedback-success-text mb-2 text-lg">
            Location <span aria-hidden="true">*</span>
          </legend>
          <FormField
            label="Street address"
            name="address"
            placeholder="Street address"
            autoComplete="street-address"
            defaultValue={values.address}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="City"
              name="city"
              required
              placeholder="City"
              defaultValue={values.city}
              error={errors.city}
            />
            <FormField
              label="Postal code"
              name="zip"
              placeholder="Postal code"
              autoComplete="postal-code"
              defaultValue={values.zip}
            />
          </div>
          <FormField
            label="Country"
            name="country"
            required
            placeholder="Country"
            autoComplete="country-name"
            defaultValue={values.country}
            error={errors.country}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="text-feedback-success-text mb-2 text-lg">
            Stay details <span aria-hidden="true">*</span>
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Price per night (NOK)"
              name="price"
              type="number"
              min={1}
              inputMode="numeric"
              required
              placeholder="1950"
              defaultValue={values.price}
              error={errors.price}
            />
            <FormField
              label="Maximum guests"
              name="maxGuests"
              type="number"
              min={1}
              max={100}
              inputMode="numeric"
              required
              placeholder="6"
              defaultValue={values.maxGuests}
              error={errors.maxGuests}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-feedback-success-text mb-4 text-lg">
            Amenities
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {amenities.map((amenity) => (
              <label
                key={amenity.name}
                className="text-text-primary flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  name={amenity.name}
                  defaultChecked={values[amenity.name] === "on"}
                  className="accent-cta-secondary h-4 w-4"
                />
                {amenity.label}
              </label>
            ))}
          </div>
        </fieldset>

        {state.message && (
          <p
            role="alert"
            className="bg-feedback-error-background text-feedback-error-text rounded-lg px-3 py-2 text-sm"
          >
            {state.message}
          </p>
        )}

        <div className="border-text-primary flex justify-center gap-4 border-t pt-6">
          <Link
            href={venue ? `/venues/${venue.id}` : "/profile"}
            className="bg-feedback-error-text text-surface rounded-lg px-6 py-2 font-semibold"
          >
            Cancel
          </Link>
          <Button type="submit" variant="primary" disabled={pending}>
            {pending
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
                ? "Save changes"
                : "Create venue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
