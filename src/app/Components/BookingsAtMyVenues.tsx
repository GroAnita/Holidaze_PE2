import Link from "next/link";
import type { Booking } from "../lib/api/types";
import type { Venue } from "../lib/api/venues";
import {
  formatDate,
  formatPrice,
  nightsBetween,
  pluralize,
  toLocalDate,
} from "../lib/format";
import Avatar from "./Avatar";

type BookingRow = Booking & {
  venue: Venue;
};

type BookingsAtMyVenuesProps = {
  venues: Venue[];
};

export default function BookingsAtMyVenues({
  venues,
}: BookingsAtMyVenuesProps) {
  const rows: BookingRow[] = venues
    .flatMap((venue) =>
      (venue.bookings ?? []).map((booking) => ({ ...booking, venue })),
    )
    .sort((a, b) => a.dateFrom.localeCompare(b.dateFrom));

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = rows.filter((r) => r.dateTo.slice(0, 10) >= today);
  const past = rows.filter((r) => r.dateTo.slice(0, 10) < today);

  return (
    <section className="font-manrope">
      <h2 className="text-feedback-success-text border-text-primary mb-6 border-b pb-2 text-2xl">
        Bookings at My Venues ({upcoming.length})
      </h2>
      {upcoming.length > 0 ? (
        <BookingList rows={upcoming} />
      ) : (
        <p className="text-text-muted">No upcoming bookings.</p>
      )}

      {past.length > 0 && (
        <details className="mt-6">
          <summary className="text-feedback-success-text cursor-pointer text-xl">
            Past Bookings ({past.length})
          </summary>
          <div className="mt-4 opacity-80">
            <BookingList rows={past} />
          </div>
        </details>
      )}
    </section>
  );
}

function BookingList({ rows }: { rows: BookingRow[] }) {
  return (
    <>
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="text-text-muted border-border-control border-b">
          <tr>
            <th scope="col" className="py-2 font-normal">
              Guest
            </th>
            <th scope="col" className="py-2 font-normal">
              Venue
            </th>
            <th scope="col" className="py-2 font-normal">
              Dates
            </th>
            <th scope="col" className="py-2 font-normal">
              Guests
            </th>
            <th scope="col" className="py-2 font-normal">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="text-text-primary">
          {rows.map((row) => (
            <tr key={row.id} className="border-border-control border-b">
              <td className="py-3">
                <GuestCell row={row} />
              </td>
              <td className="py-3">
                <Link
                  href={`/venues/${row.venue.id}`}
                  className="hover:underline"
                >
                  {row.venue.name}
                </Link>
              </td>
              <td className="py-3">
                <DateRange row={row} />
              </td>
              <td className="py-3">{pluralize(row.guests, "guest")}</td>
              <td className="py-3 text-right">{formatPrice(total(row))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile view */}
      <ul className="flex flex-col gap-4 md:hidden">
        {rows.map((row) => (
          <li
            key={row.id}
            className="bg-surface border-border-control text-text-primary flex flex-col gap-2 rounded-lg border p-4 text-sm"
          >
            <GuestCell row={row} />
            <Link
              href={`/venues/${row.venue.id}`}
              className="font-semiboldhover:underline"
            >
              {row.venue.name}
            </Link>
            <DateRange row={row} />
            <div className="flex justify-between">
              <span>{pluralize(row.guests, "guest")}</span>
              <span>{formatPrice(total(row))}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function GuestCell({ row }: { row: BookingRow }) {
  const name = row.customer?.name ?? "Guest";
  return (
    <div className="flex items-center gap-3">
      <Avatar
        name={name}
        avatar={row.customer?.avatar}
        className="h-8 w-8 text-xs"
      />
      <div className="flex flex-col">
        <span>{name}</span>
        {row.customer?.email && (
          <a
            href={`mailto:${row.customer?.email}`}
            className="text-text-muted hover:underline"
          >
            {row.customer?.email}
          </a>
        )}
      </div>
    </div>
  );
}

function DateRange({ row }: { row: BookingRow }) {
  const nights = nightsBetween(row.dateFrom, row.dateTo);
  return (
    <span>
      {formatDate(toLocalDate(row.dateFrom))} –{" "}
      {formatDate(toLocalDate(row.dateTo))}
      <span className="text-text-muted"> · {pluralize(nights, "night")}</span>
    </span>
  );
}

function total(row: BookingRow) {
  return nightsBetween(row.dateFrom, row.dateTo) * row.venue.price;
}
