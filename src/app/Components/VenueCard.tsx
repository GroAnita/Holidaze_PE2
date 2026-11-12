import { Venue } from "../lib/api/venues";
import Image from "next/image";
import VcIconBar from "./VcIconBar";
import Button from "./Button";

type VenueCardProps = {
  venue: Venue;
};

export default function VenueCard({ venue }: VenueCardProps) {
  const image = venue.media[0];

  return (
    <div className="venue-card bg-surface border-border-control w-90 overflow-hidden rounded-xl">
      <div className="relative h-48 w-full">
        <Image
          src={image?.url ?? "/file.svg"}
          alt={image?.alt || venue.name}
          fill
          className="object-cover"
        />
      </div>
      <h2 className="text-text-primary font-source-sans-pro px-2 text-2xl font-normal">
        {venue.name}
      </h2>
      <section className="flex flex-row items-center justify-between px-2">
        <h3 className="text-text-primary font-manrope text-lg font-semibold">
          {venue.location.city}
        </h3>
        <VcIconBar meta={venue.meta} />
      </section>
      <p className="text-text font-manrope px-2 text-sm">{venue.description}</p>
      <div className="px-2 py-2">
        <Button href={`/venues/${venue.id}`}>Book Now</Button>
      </div>
    </div>
  );
}
