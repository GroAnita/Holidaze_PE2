import { getVenue } from "@/app/lib/api/venues";
import { notFound } from "next/navigation";
import VenueGallery from "./VenueGallery";
import VenueHeader from "./VenueHeader";
import { ApiError } from "@/app/lib/api/types";

type VenueDetailsProps = {
  id: string;
};

export default async function VenueDetails({ id }: VenueDetailsProps) {
  let venue;
  try {
    const response = await getVenue(id);
    venue = response.data;
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 404 || error.status === 400)
    ) {
      notFound();
    }
    throw error;
  }
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col px-4 py-8">
      <section className="mx-auto mb-8">
        <VenueHeader
          name={venue.name}
          location={venue.location}
          rating={venue.rating}
        />
      </section>
      <VenueGallery media={venue.media} venueName={venue.name} />
    </main>
  );
}
