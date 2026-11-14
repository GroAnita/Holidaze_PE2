import { getVenues } from "./lib/api/venues";
import VenueCard from "./Components/VenueCard";
import { Suspense } from "react";
import Hero from "./Components/Hero";
import Link from "next/link";
import VenueGrid from "./Components/VenueGrid";
import SearchBar from "./Components/SearchBar";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <div className="bg-background flex flex-1 flex-col font-sans dark:bg-black">
      <Hero />
      <main className="mx-auto w-full max-w-300 px-4 py-8">
        <SearchBar />
        <section id="venues" className="mt-12 scroll-mt-8">
          <Suspense fallback={<p>Loading venues...</p>}>
            <VenueList searchParams={searchParams} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}

async function VenueList({
  searchParams,
}: Pick<PageProps<"/">, "searchParams">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const { data: venues, meta } = await getVenues({ query });

  return (
    <>
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="text-feedback-success-text font-manrope text-2xl font-bold dark:text-white">
          {query ? `Results for "${query}"` : "Explore stays"}
        </h2>
        {query && (
          <Link href="/" scroll={false} className="text-link underline">
            Clear search
          </Link>
        )}
      </div>

      {venues.length === 0 ? (
        <p className="text-text-muted">
          No venues found. Try another place or name.
        </p>
      ) : (
        <VenueGrid
          key={query}
          initialVenues={venues}
          initialIsLastPage={meta.isLastPage}
          query={query}
        />
      )}
    </>
  );
}
