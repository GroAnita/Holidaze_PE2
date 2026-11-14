import { getVenues } from "./lib/api/venues";
import VenueCard from "./Components/VenueCard";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-background flex flex-1 flex-col items-center justify-center px-4 font-sans dark:bg-black">
      <main className="w-full max-w-300">
        <h1 className="text-text-primary text-3xl font-bold dark:text-white">
          Welcome to Holidaze
        </h1>
        <Suspense fallback={<p>Loading venues...</p>}>
          <VenueList />
        </Suspense>
      </main>
    </div>
  );
}

async function VenueList() {
  const { data: venues } = await getVenues();
  return (
    <>
      <p> Fetched {venues.length} venues</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </>
  );
}
