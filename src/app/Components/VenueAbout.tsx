import type { Location, VenueMeta } from "../lib/api/types";

type VenueAboutProps = {
  description: string;
  maxGuests: number;
  meta: VenueMeta;
  location: Location;
};

const amenityLabels = [
  { key: "wifi", label: "Wi-Fi" },
  { key: "parking", label: "Parking" },
  { key: "breakfast", label: "Breakfast" },
  { key: "pets", label: "Pets Allowed" },
] as const;

export default function VenueAbout({
  description,
  maxGuests,
  meta,
  location,
}: VenueAboutProps) {
  const amenities = amenityLabels.filter((item) => meta[item.key]);
  const cityLine = [location.zip, location.city].filter(Boolean).join(" ");
  const addressLine = [cityLine, location.country].filter(Boolean).join(", ");

  return (
    <div className="font-manrope flex flex-col gap-6">
      <div>
        <h2 className="text-feedback-success-text mb-3 text-xl font-bold">
          About this stay
        </h2>
        <p className="text-text-muted mb-3">
          Up to {maxGuests} guests can stay here.
        </p>
        <p className="text-text-primary whitespace-pre-line">{description}</p>
      </div>

      <div>
        <h3 className="text-feedback-success-text mb-2 text-lg">Amenities</h3>
        {amenities.length > 0 ? (
          <ul className="text-text-muted flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {amenities.map((item) => (
              <li key={item.key}>{item.label}</li>
            ))}
          </ul>
        ) : (
          <p className="text-text-muted">No amenities available.</p>
        )}
      </div>

      <div>
        <h3 className="text-feedback-success-text mb-2 text-lg">Location</h3>
        <address className="text-text-muted text-sm not-italic">
          {location.address && <p>{location.address}</p>}
          {addressLine && <p>{addressLine}</p>}
        </address>
      </div>
    </div>
  );
}
