import { Suspense } from "react";
import VenueDetails from "../../Components/venue/VenueDetails";

export default function VenuePage({ params }: PageProps<"/venues/[id]">) {
  return (
    <main>
      <Suspense fallback={<div>Loading Venue...</div>}>
        {params.then(({ id }) => (
          <>
            <VenueDetails id={id} />
          </>
        ))}
      </Suspense>
    </main>
  );
}
