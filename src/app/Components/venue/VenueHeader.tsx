import { MapPin, Star } from "lucide-react";
import type { Venue } from "@/app/lib/api/venues";

type VenueHeaderProps = {
  name: string;
  location: Venue["location"];
  rating: number;
  ownerName?: string;
};

export default function VenueHeader({
  name,
  location,
  rating,
  ownerName,
}: VenueHeaderProps) {
  const place = [location.city, location.country].filter(Boolean).join(", ");

  return (
    <div>
      <h1 className="text-text-primary font-playfair-display text-4xl font-bold sm:text-5xl">
        {name}
      </h1>

      <ul className="font-manrope text-text-muted mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        {place && (
          <li className="flex items-center gap-1">
            <MapPin className="text-hero-accent h-4 w-4" aria-hidden="true" />
            {place}
          </li>
        )}
        {ownerName && <li>Hosted by {ownerName}</li>}
        <li>
          {rating > 0 ? (
            <span className="bg-secondary-background text-secondary-text flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold">
              <Star
                className="h-3 w-3"
                fill="currentColor"
                aria-hidden="true"
              />
              <span className="sr-only">Rated </span>
              {rating.toFixed(1)}
              <span className="sr-only"> out of 5</span>
            </span>
          ) : (
            "New venue"
          )}
        </li>
      </ul>
    </div>
  );
}
