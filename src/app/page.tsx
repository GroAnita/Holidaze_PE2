import { getVenues } from "./lib/api/venues";
import VenueCard from "./Components/VenueCard";

export default async function Home() {
  const { data: venues } = await getVenues();
  return (
    <div className="bg-holidaze-background flex flex-1 flex-col items-center justify-center font-sans dark:bg-black">
      <main>
        <h1 className="text-text-primary text-3xl font-bold dark:text-white">
          Welcome to Holidaze
        </h1>
        <p> Fetched {venues.length} venues</p>
        <div className="grid grid-cols-3 gap-4">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </main>
    </div>
  );
}
