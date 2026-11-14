import Image from "next/image";
import type { BookingWithVenue } from "../lib/api/bookings";
import {
  formatDate,
  formatPrice,
  nightsBetween,
  pluralize,
  toLocalDate,
} from "../lib/format";
import Button from "./Button";

type TripCardProps = {
  booking: BookingWithVenue;
};

export default function TripCard({ booking }: TripCardProps) {
  const { venue } = booking;
  const nights = nightsBetween(booking.dateFrom, booking.dateTo);
  const image = venue?.media?.[0];
  const place = venue
    ? [venue.location.city, venue.location.country].filter(Boolean).join(", ")
    : "";

  return (
    <article className="bg-surface flex h-full flex-col overflow-hidden rounded-xl">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={image?.url ?? "/gallery-placeholder.png"}
          alt={image?.alt || venue?.name || "Venue"}
          fill
          className="object-cover"
        />
      </div>

      <div className="font-manrope flex flex-1 flex-col p-4">
        <h3 className="font-playfair-display text-text-primary text-xl">
          {venue?.name ?? "Venue no longer available"}
        </h3>
        {place && <p className="text-text-muted text-sm">{place}</p>}

        <p className="text-text-primary mt-3">
          {formatDate(toLocalDate(booking.dateFrom))} →{" "}
          {formatDate(toLocalDate(booking.dateTo))}
        </p>
        <p className="text-text-muted text-sm">
          {pluralize(nights, "night")} · {pluralize(booking.guests, "guest")}
        </p>

        {venue && (
          <div className="mt-auto flex items-end justify-between pt-4">
            <div>
              <p className="text-text-primary text-sm">Total</p>
              <p className="text-text-primary text-lg font-semibold">
                {formatPrice(venue.price * nights)}
              </p>
            </div>
            <Button href={`/venues/${venue.id}`}>View stay</Button>
          </div>
        )}
      </div>
    </article>
  );
}
