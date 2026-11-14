import { getVenue } from "@/app/lib/api/venues";
import { notFound } from "next/navigation";
import VenueGallery from "./VenueGallery";
import VenueHeader from "./VenueHeader";
import { ApiError } from "@/app/lib/api/types";
import VenueTabs from "./VenueTabs";
import VenueMap from "./VenueMap";
import VenueAbout from "./VenueAbout";
import VenueStayPicker from "./VenueStayPicker";
import { getProfile } from "@/app/lib/api/auth/session";

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
  const profile = await getProfile();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col px-4 py-8">
      <section className="mx-auto mb-8">
        <VenueHeader
          name={venue.name}
          location={venue.location}
          rating={venue.rating}
        />
      </section>
      <section id="images">
        <VenueGallery media={venue.media} venueName={venue.name} />
      </section>
      <div className="mt-6">
        <VenueTabs venueName={venue.name} />
      </div>
      <div className="grid gap-12 py-8 md:grid-cols-2">
        <section id="about">
          <VenueAbout
            description={venue.description}
            maxGuests={venue.maxGuests}
            meta={venue.meta}
            location={venue.location}
          />
        </section>
        <section id="map">
          <VenueMap location={venue.location} venueName={venue.name} />
        </section>
      </div>
      <section id="your-stay" className="py-8">
        <VenueStayPicker
          maxGuests={venue.maxGuests}
          bookings={venue.bookings ?? []}
          price={venue.price}
          isLoggedIn={Boolean(profile)}
        />
      </section>

      <section id="policies" className="py-8">
        {/* coming later */}
      </section>
    </main>
  );
}
