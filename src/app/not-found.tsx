import type { Metadata } from "next";
import Button from "./Components/Button";
import StatusCard from "./Components/StatusCard";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <StatusCard
      eyebrow="A little detour"
      code="404"
      title="This stay is off the map."
      text="The page you're looking for may have moved or no longer exists. Let's find you somewhere lovely instead."
      image="/not-found-island.png"
      actions={
        <>
          <Button href="/#venues" variant="primary">
            Explore stays
          </Button>
          <Button href="/" variant="outline">
            Back to home
          </Button>
        </>
      }
    />
  );
}
