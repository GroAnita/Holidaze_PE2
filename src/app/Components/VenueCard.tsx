import { Venue } from "../lib/api/venues";
import Image from "next/image";
import VcIconBar from "./VcIconBar";

type VenueCardProps = {
  venue: Venue;
};

export default function VenueCard({ venue }: VenueCardProps) {
  const image = venue.media[0];

  return (
    <div className="venue-card border-border-control w-90 border-2">
      <div className="relative h-48 w-full">
        <Image
          src={image?.url ?? "/file.svg"}
          alt={image?.alt || venue.name}
          fill
          className="object-cover"
        />
      </div>
      <h2>{venue.name}</h2>
      <section className="flex flex-row items-center justify-between px-2 py-2">
        <h2>{venue.location.city}</h2>
        <VcIconBar meta={venue.meta} />
      </section>
      <p>{venue.description}</p>
    </div>
  );
}
