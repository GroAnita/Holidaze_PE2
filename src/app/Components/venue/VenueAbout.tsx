import type { VenueMeta } from "../../lib/api/types";
import { Car, PawPrint, Users, Utensils, Wifi } from "lucide-react";

type VenueAboutProps = {
  description: string;
  maxGuests: number;
  meta: VenueMeta;
};

const amenityLabels = [
  { key: "wifi", label: "Wi-Fi", icon: Wifi },
  { key: "parking", label: "Parking", icon: Car },
  { key: "breakfast", label: "Breakfast", icon: Utensils },
  { key: "pets", label: "Pets Allowed", icon: PawPrint },
] as const;

export default function VenueAbout({
  description,
  maxGuests,
  meta,
}: VenueAboutProps) {
  const amenities = amenityLabels.filter((item) => meta[item.key]);
  return (
    <div className="font-manrope flex flex-col gap-10">
      <div>
        <h2 className="text-text-primary mb-3 text-xl font-semibold">
          About this stay
        </h2>
        <p className="text-text-muted mb-4 flex items-center gap-2 text-sm">
          <Users className="h-4 w-4" aria-hidden="true" />
          Up to {maxGuests} {maxGuests === 1 ? "guest" : "guests"} guests can
          stay here.
        </p>
        <p className="text-text-primary whitespace-pre-line">{description}</p>
      </div>

      <div id="amenities" className="scroll-mt-4">
        <h2 className="text-text-primary mb-4 text-2xl font-semibold">
          Amenities
        </h2>
        {amenities.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {amenities.map(({ key, label, icon: Icon }) => (
              <li
                key={key}
                className="bg-surface text-text-primary flex items-center gap-3 rounded-lg px-4 py-3 text-sm shadow-sm"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-text-muted">No amenities available.</p>
        )}
      </div>
    </div>
  );
}
