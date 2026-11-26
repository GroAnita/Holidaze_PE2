import { getVenue } from "@/app/lib/api/venues";
import { notFound } from "next/navigation";
import VenueGallery from "./VenueGallery";
import VenueHeader from "./VenueHeader";
import { ApiError } from "@/app/lib/api/types";
import VenueTabs from "./VenueTabs";
import VenueMap from "./VenueMap";
import VenueAbout from "./VenueAbout";
import VenueStayPicker from "../booking/VenueStayPicker";
import { getProfile } from "@/app/lib/api/auth/session";
import Button from "../ui/Button";
import HouseRules from "./HouseRules";
import ShareButton from "./ShareButton";
import MobileBookingBar from "../booking/MobileBookingBar";

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
    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8">
      <section className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <VenueHeader
          name={venue.name}
          location={venue.location}
          rating={venue.rating}
          ownerName={venue.owner?.name}
        />
        <div className="flex gap-4">
          {profile && profile.name === venue.owner?.name && (
            <Button href={`/venues/${venue.id}/edit`}>Edit venue</Button>
          )}
          <ShareButton venueName={venue.name} />
        </div>
      </section>

      <section id="images">
        <VenueGallery media={venue.media} venueName={venue.name} />
      </section>
      <div className="mt-6">
        <VenueTabs />
      </div>
      <div className="grid gap-12 py-8 lg:grid-cols-[3fr_2fr] lg:items-start">
        <section id="about">
          <VenueAbout
            description={venue.description}
            maxGuests={venue.maxGuests}
            meta={venue.meta}
          />
        </section>
        <aside id="your-stay" className="scroll-mt-4 lg:sticky lg:top-4">
          <VenueStayPicker
            maxGuests={venue.maxGuests}
            bookings={venue.bookings ?? []}
            price={venue.price}
            isLoggedIn={Boolean(profile)}
            venueId={venue.id}
          />
        </aside>
      </div>

      <section id="map" className="scroll-mt-4 py-8">
        <VenueMap location={venue.location} venueName={venue.name} />
      </section>
      <section id="policies" className="scroll-mt-4 py-8">
        <HouseRules petsAllowed={Boolean(venue.meta.pets)} />
      </section>
      <MobileBookingBar price={venue.price} />
    </main>
  );
}
