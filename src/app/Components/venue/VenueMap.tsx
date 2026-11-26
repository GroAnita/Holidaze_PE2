import { MapPin } from "lucide-react";
import type { Location } from "../../lib/api/types";

type VenueMapProps = {
  location: Location;
  venueName: string;
};

export default function VenueMap({ location, venueName }: VenueMapProps) {
  const hasCoordinates = Boolean(location.lat && location.lng);
  const query = hasCoordinates
    ? `${location.lat},${location.lng}`
    : [location.address, location.city, location.country]
        .filter(Boolean)
        .join(", ");

  if (!query) return null;
  const placeLine = [location.city, location.country]
    .filter(Boolean)
    .join(", ");
  const cityLine = [location.zip, location.city].filter(Boolean).join(" ");

  const encoded = encodeURIComponent(query);
  const embedUrl = `https://maps.google.com/maps?q=${encoded}&t=k&z=15&output=embed`;
  const linkUrl = `https://www.google.com/maps/search/?api=1&query=${encoded}`;

  return (
    <div className="bg-brand/25 font-manrope grid gap-6 rounded-xl p-4 sm:p-6 lg:grid-cols-[3fr_2fr]">
      <div>
        <h2 className="text-text-primary mb-4 text-2xl font-semibold">
          Explore the area
        </h2>
        <iframe
          src={embedUrl}
          title={`Map showing the location of ${venueName}`}
          loading="lazy"
          className="border-brand h-64 w-full rounded-xl border-4 sm:h-80"
        />
      </div>

      <div className="flex flex-col gap-4 lg:pt-12">
        <h3 className="text-text-primary flex items-center gap-2 text-xl font-semibold">
          <MapPin
            className="text-hero-accent h-5 w-5 shrink-0"
            aria-hidden="true"
          />
          {placeLine || venueName}
        </h3>

        <address className="text-text-primary not-italic">
          {location.address && <p>{location.address}</p>}
          {cityLine && <p>{cityLine}</p>}
          {location.country && <p>{location.country}</p>}
        </address>

        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary w-fit font-semibold underline underline-offset-4 hover:no-underline"
        >
          View on map
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
