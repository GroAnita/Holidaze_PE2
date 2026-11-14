import { getVenues } from "./lib/api/venues";
import VenueCard from "./Components/VenueCard";
import { Suspense } from "react";
import Hero from "./Components/Hero";

export default function Home() {
  return (
    <div className="bg-background flex flex-1 flex-col items-center justify-center px-4 font-sans dark:bg-black">
      <Hero />
      <main className="w-full max-w-300 py-8">
        <section id="venues" className="mt-12 scroll-mt-8">
          <h2 className="text-feedback-success-text font-manrope mb-6 text-2xl font-bold dark:text-white">
            Explore Stays
          </h2>
          <Suspense fallback={<p>Loading venues...</p>}>
            <VenueList />
          </Suspense>
        </section>
      </main>
    </div>
  );
}

async function VenueList() {
  const { data: venues } = await getVenues();
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </>
  );
}
