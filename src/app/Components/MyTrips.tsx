import type { BookingWithVenue } from "../lib/api/bookings";
import Button from "./Button";
import TripCard from "./TripCard";

type MyTripsProps = {
  bookings: BookingWithVenue[];
};

export default function MyTrips({ bookings }: MyTripsProps) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = bookings.filter((b) => b.dateTo.slice(0, 10) >= today);
  const past = bookings.filter((b) => b.dateTo.slice(0, 10) < today).reverse();

  if (bookings.length === 0) {
    return (
      <div className="font-manrope flex flex-col items-center gap-6 py-16 text-center">
        <p className="font-playfair-display text-feedback-success-text text-2xl">
          No trips planned yet. Find your next somewhere!
        </p>
        <Button href="/">Explore stays</Button>
      </div>
    );
  }

  return (
    <div className="font-manrope flex flex-col gap-10">
      <section>
        <h2 className="text-feedback-success-text border-text-primary mb-6 border-b pb-2 text-2xl">
          Upcoming stays
        </h2>
        {upcoming.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((booking) => (
              <TripCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4">
            <p className="text-text-muted">No upcoming stays right now.</p>
            <Button href="/">Find your next stay</Button>
          </div>
        )}
      </section>

      {past.length > 0 && (
        <details className="group">
          <summary className="text-feedback-success-text cursor-pointer text-xl">
            Past stays ({past.length})
          </summary>
          <div className="mt-6 grid gap-6 opacity-80 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((booking) => (
              <TripCard key={booking.id} booking={booking} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
