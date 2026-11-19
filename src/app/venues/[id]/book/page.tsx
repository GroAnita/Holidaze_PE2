import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProfile } from "../../../lib/api/auth/session";
import { getVenue } from "../../../lib/api/venues";
import { ApiError } from "../../../lib/api/types";
import {
  formatDate,
  formatPrice,
  nightsBetween,
  pluralize,
  toLocalDate,
} from "../../../lib/format";
import BookingConfirmForm from "../../../Components/booking/BookingConfirmForm";

export const metadata: Metadata = { title: "Confirm your booking" };

const amenityLabels = {
  wifi: "Wi-Fi",
  parking: "Parking",
  breakfast: "Breakfast",
  pets: "Pets allowed",
} as const;

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export default function BookPage({
  params,
  searchParams,
}: PageProps<"/venues/[id]/book">) {
  return (
    <main className="mx-auto w-full max-w-300 px-4 py-8">
      <Suspense fallback={<p>Loading...</p>}>
        <BookContent params={params} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function BookContent({
  params,
  searchParams,
}: Pick<PageProps<"/venues/[id]/book">, "params" | "searchParams">) {
  const { id } = await params;
  const { from, to, guests: guestsParam } = await searchParams;

  const session = await getProfile();
  if (!session) redirect("/login");

  const backHref = `/venues/${id}#your-stay`;
  const guests = Number(guestsParam);

  // Bad or missing values in the URL → send them back to pick again
  if (
    typeof from !== "string" ||
    typeof to !== "string" ||
    !isoDate.test(from) ||
    !isoDate.test(to) ||
    to <= from ||
    !Number.isInteger(guests) ||
    guests < 1
  ) {
    redirect(backHref);
  }

  let venue;
  try {
    venue = (await getVenue(id)).data;
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 404 || error.status === 400)
    ) {
      notFound();
    }
    throw error;
  }

  if (guests > venue.maxGuests) redirect(backHref);

  const nights = nightsBetween(from, to);
  const total = nights * venue.price;
  const image = venue.media[0];
  const amenities = (
    Object.keys(amenityLabels) as (keyof typeof amenityLabels)[]
  )
    .filter((key) => venue.meta[key])
    .map((key) => amenityLabels[key]);
  const place = [venue.location.city, venue.location.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="font-manrope">
      <Link
        href={backHref}
        className="text-brand flex w-fit items-center gap-2 underline underline-offset-4"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        Back to booking details
      </Link>

      <h1 className="font-playfair-display text-brand mt-4 text-4xl md:text-5xl">
        One step closer to your getaway.
      </h1>
      <p className="text-text-muted mt-2 text-lg">
        Review your stay and confirm your booking.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[3fr_2fr]">
        {/* Left: review */}
        <section className="bg-surface rounded-3xl p-6 md:p-10">
          <h2 className="font-playfair-display text-brand text-3xl">
            Review your stay
          </h2>

          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-text-muted text-sm">Check-in</dt>
              <dd className="text-text-primary text-lg">
                {formatDate(toLocalDate(from))}
              </dd>
            </div>
            <div>
              <dt className="text-text-muted text-sm">Check-out</dt>
              <dd className="text-text-primary text-lg">
                {formatDate(toLocalDate(to))}
              </dd>
            </div>
            <div>
              <dt className="text-text-muted text-sm">Length of stay</dt>
              <dd className="text-text-primary text-lg">
                {pluralize(nights, "night")}
              </dd>
            </div>
            <div>
              <dt className="text-text-muted text-sm">Guests</dt>
              <dd className="text-text-primary text-lg">
                {pluralize(guests, "guest")}
              </dd>
            </div>
          </dl>

          <hr className="border-border-subtle my-8" />

          <h3 className="text-brand text-sm font-semibold tracking-[0.3em] uppercase">
            Good to know
          </h3>
          <ul className="text-text-primary mt-4 flex flex-col gap-2">
            <li>Up to {pluralize(venue.maxGuests, "guest")} at this venue</li>
            {amenities.length > 0 && <li>Includes: {amenities.join(", ")}</li>}
            {venue.location.address && (
              <li>Address: {venue.location.address}</li>
            )}
            <li>Payment is made directly to the host at check-in.</li>
          </ul>
        </section>

        {/* Right: summary + confirm */}
        <div className="flex flex-col gap-6">
          <section className="bg-surface rounded-3xl p-6">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={image?.url ?? "/gallery-placeholder.png"}
                alt={image?.alt || venue.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="font-playfair-display text-brand mt-4 text-3xl">
              {venue.name}
            </h2>
            {place && <p className="text-text-muted">{place}</p>}
            <p className="text-text-primary mt-3">
              {formatDate(toLocalDate(from))} – {formatDate(toLocalDate(to))} ·{" "}
              {pluralize(guests, "guest")}
            </p>

            <div className="border-border-subtle text-text-primary mt-4 flex justify-between border-b pb-4">
              <span>
                {formatPrice(venue.price)} × {pluralize(nights, "night")}
              </span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="font-playfair-display text-text-primary flex justify-between pt-4 text-2xl">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <BookingConfirmForm
              venueId={venue.id}
              dateFrom={from}
              dateTo={to}
              guests={guests}
              total={total}
            />
          </section>

          <section className="bg-hero-panel flex items-center justify-between gap-4 overflow-hidden rounded-3xl px-8 py-6">
            <p className="font-playfair-display text-hero-text text-2xl">
              Your little escape awaits.
            </p>
            <Image
              src="/not-found-island.png"
              alt=""
              width={160}
              height={128}
              className="h-auto w-32 shrink-0"
            />
          </section>

          <Link
            href="/contact"
            className="text-link text-center underline underline-offset-4"
          >
            Need help? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
