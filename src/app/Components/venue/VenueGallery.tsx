import Image from "next/image";
import { Venue } from "../../lib/api/venues";

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
    <div className="grid h-72 gap-2 sm:h-96 lg:grid-cols-[1.2fr_1fr_1fr] lg:grid-rows-2">
      <div className="relative h-full w-full lg:row-span-2">
        <Image
          src={hero.url}
          alt={hero.alt || venueName}
          className="rounded-lg object-cover"
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>
      {thumbnails.map((item, index) => (
        <div
          key={`thumbnail-${index}`}
          className="relative hidden h-full w-full lg:block"
        >
          <Image
            src={item.url}
            alt={item.alt || venueName}
            className="rounded-lg object-cover"
            fill
            sizes="25vw"
          />
        </div>
      ))}
      {placeholderThumbnails.map((_, index) => (
        <div
          key={`placeholder-${index}`}
          className="relative hidden h-full w-full lg:block"
        >
          <Image
            src="/gallery-placeholder.png"
            alt=""
            className="rounded-lg object-cover"
            fill
            sizes="25vw"
          />
        </div>
      ))}
    </div>
  );
}
