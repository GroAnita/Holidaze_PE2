import Image from "next/image";
import type { Venue } from "../lib/api/venues";
import { formatPrice } from "../lib/format";
import VcIconBar from "./VcIconBar";
import Button from "./Button";

type VenueCardProps = {
  venue: Venue;
};

export default function VenueCard({ venue }: VenueCardProps) {
  const image = venue.media[0];

  return (
    <article className="bg-surface flex h-full flex-col overflow-hidden rounded-xl">
      <div className="relative aspect-16/10 w-full">
        <Image
          src={image?.url ?? "/gallery-placeholder.png"}
          alt={image?.alt || venue.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-text-primary font-playfair-display text-2xl">
            {venue.name}
          </h2>
          <VcIconBar meta={venue.meta} />
        </div>

        <p className="font-manrope text-text-primary mt-2 flex items-baseline gap-2">
          <span className="font-semibold tracking-wide">
            {venue.location.city}
          </span>
          <span className="text-xs uppercase">{venue.location.country}</span>
        </p>

        <div className="mt-auto flex items-end justify-between pt-6">
          <div>
            <p className="text-text-primary text-sm">Price/night</p>
            <p className="font-manrope text-text-primary text-lg font-semibold">
              {formatPrice(venue.price)}
            </p>
          </div>
          <Button href={`/venues/${venue.id}`}>View stay</Button>
        </div>
      </div>
    </article>
  );
}
