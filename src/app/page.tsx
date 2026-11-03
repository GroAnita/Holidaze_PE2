import { getVenues } from "./lib/api/venues";

export default async function Home() {
  const { data: venues } = await getVenues();
  return (
    <div className="bg-holidaze-background flex flex-1 flex-col items-center justify-center font-sans dark:bg-black">
      <main>
        <h1 className="text-text-primary text-3xl font-bold dark:text-white">
          Welcome to Holidaze
        </h1>
        <p> Fetched {venues.length} venues</p>
      </main>
    </div>
  );
}
