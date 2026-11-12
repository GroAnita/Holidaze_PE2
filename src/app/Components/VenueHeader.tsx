import { Venue } from "@/app/lib/api/venues";
import StarRating from "./StarRating";

type VenueHeaderProps = {
  name: string;
  location: Venue["location"];
  rating: number;
};

export default function VenueHeader({
  name,
  location,
  rating,
}: VenueHeaderProps) {
  return (
    <div>
      <h1 className="text-text-primary font-playfair-display text-3xl font-bold">
        {name}
      </h1>
      <p className="text-text-primary font-manrope text-sm">
        {location.city}, {location.country}
      </p>
      <StarRating rating={rating} />
    </div>
  );
}
