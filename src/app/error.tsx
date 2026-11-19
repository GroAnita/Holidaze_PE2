"use client";

import { useEffect } from "react";
import Button from "./Components/ui/Button";
import StatusCard from "./Components/ui/StatusCard";

export default function Error({
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
    <StatusCard
      eyebrow="A little hiccup"
      title="Something went wrong"
      text="We couldn't load this page right now. Please try again in a moment."
      image="/error-island.png"
      actions={
        <>
          <Button onClick={() => retry()} variant="primary">
            Try again
          </Button>
          <Button href="/" variant="outline">
            Back to home
          </Button>
        </>
      }
    />
  );
}
