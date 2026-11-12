"use client";

import { useEffect } from "react";

export default function VenueError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-16">
      <h1 className="text-text-primary font-playfair-display text-2xl font-bold">
        Something went wrong
      </h1>
      <p className="text-text-muted font-manrope">
        We could not load the venue details. Please try again.
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="bg-cta-secondary text-surface font-manrope rounded-full px-6 py-2 font-semibold"
      >
        Try Again
      </button>
    </main>
  );
}
