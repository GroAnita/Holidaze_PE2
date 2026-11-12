import { MapPin } from "lucide-react";
import type { Location } from "../lib/api/types";

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

  const encoded = encodeURIComponent(query);
  const embedUrl = `https://maps.google.com/maps?q=${encoded}&t=k&z=15&output=embed`;
  const linkUrl = `https://www.google.com/maps/search/?api=1&query=${encoded}`;

  return (
    <div className="font-manrope flex flex-col gap-4">
      <iframe
        src={embedUrl}
        title={`Map showing the location of ${venueName}`}
        loading="lazy"
        className="h-64 w-full rounded-xl border-0"
      />
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-primary flex items-center gap-2 hover:underline"
      >
        <MapPin className="h-4 w-4" />
        View on Google Maps
      </a>
    </div>
  );
}
