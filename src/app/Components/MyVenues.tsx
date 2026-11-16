import { CirclePlus, Pencil } from "lucide-react";
import type { Venue } from "../lib/api/venues";
import { formatDate } from "../lib/format";
import Button from "./Button";
import VenueCard from "./VenueCard";
import Link from "next/link";

type MyVenuesProps = {
  venues: Venue[];
};

export default function MyVenues({ venues }: MyVenuesProps) {
  return (
    <section className="font-manrope">
      <div className="border-text-primary mb-6 flex flex-wrap items-center justify-between gap-4 border-b pb-2">
        <h2 className="text-feedback-success-text text-2xl">
          My venues ({venues.length})
        </h2>
        <Button
          href="/venues/new"
          variant="primary"
          className="flex items-center gap-2"
        >
          <CirclePlus className="h-5 w-5" aria-hidden="true" />
          Add new venue
        </Button>
      </div>

      {venues.length === 0 ? (
        <p className="font-playfair-display text-feedback-success-text py-16 text-center text-2xl">
          No venues here yet, go add someone&apos;s dream vacation!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <div key={venue.id} className="flex flex-col gap-2">
              <div key={venue.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-text-muted text-sm">
                    Added {formatDate(new Date(venue.created))}
                  </p>
                  <Link
                    href={`/venues/${venue.id}/edit`}
                    className="text-text-primary flex items-center gap-1 text-sm hover:underline"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    Edit
                  </Link>
                </div>
                <VenueCard venue={venue} />
              </div>

              <VenueCard venue={venue} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
