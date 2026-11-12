import Image from "next/image";
import { Venue } from "../lib/api/venues";

type VenueGalleryProps = {
  media: Venue["media"];
  venueName: string;
};

export default function VenueGallery({ media, venueName }: VenueGalleryProps) {
  const hero = media[0];
  const thumbnails = media.slice(1, 5);
  const minThumbnails = Math.min(thumbnails.length, 4);
  const placeholderThumbnails = Array.from({ length: 4 - minThumbnails });

  if (!hero) return null;

  return (
    <div className="venue-gallery grid h-96 grid-cols-4 grid-rows-2 gap-2">
      <div className="relative col-span-2 row-span-2 h-full w-full">
        <Image
          src={hero.url}
          alt={hero.alt || venueName}
          className="h-full w-full rounded-lg object-cover"
          fill
        />
      </div>
      {thumbnails.map((item, index) => (
        <div key={`thumbnail-${index}`} className="relative h-full w-full">
          <Image
            src={item.url}
            alt={item.alt || venueName}
            className="h-full w-full rounded-lg object-cover"
            fill
          />
        </div>
      ))}
      {placeholderThumbnails.map((_, index) => (
        <div
          key={`placeholderThumbnails-${index}`}
          className="relative h-full w-full"
        >
          <Image
            src="/gallery-placeholder.png"
            alt="No Image available"
            className="h-full w-full rounded-lg object-cover"
            fill
          />
        </div>
      ))}
    </div>
  );
}
