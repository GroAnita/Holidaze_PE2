"use client";

import { useState, useTransition } from "react";
import type { Venue } from "../lib/api/venues";
import { loadMoreVenues } from "../lib/api/venueActions";
import VenueCard from "./VenueCard";
import Button from "./Button";

type VenueGridProps = {
  initialVenues: Venue[];
  initialIsLastPage: boolean;
  query: string;
};

export default function VenueGrid({
  initialVenues,
  initialIsLastPage,
  query,
}: VenueGridProps) {
  const [venues, setVenues] = useState(initialVenues);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(initialIsLastPage);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleLoadMore() {
    startTransition(async () => {
      try {
        const nextPage = page + 1;
        const { data, meta } = await loadMoreVenues(nextPage, query);
        setVenues((current) => {
          const showIds = new Set(current.map((venue) => venue.id));
          return [
            ...current,
            ...data.filter((venue) => !showIds.has(venue.id)),
          ];
        });
        setPage(nextPage);
        setIsLastPage(meta.isLastPage);
        setError("");
      } catch {
        setError("Failed to load more venues.");
      }
    });
  }
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
      {error && (
        <p role="alert" className="text-feedback-error-text mt-6 text-center">
          {error}
        </p>
      )}

      {!isLastPage && (
        <div className="mt-10 flex justify-center">
          <Button onClick={handleLoadMore} disabled={isPending}>
            {isPending ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </>
  );
}
