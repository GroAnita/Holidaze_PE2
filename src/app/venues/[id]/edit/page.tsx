import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { getProfile } from "../../../lib/api/auth/session";
import { getVenue } from "../../../lib/api/venues";
import { ApiError } from "../../../lib/api/types";
import VenueForm from "../../../Components/VenueForm";
import DeleteVenueButton from "../../../Components/DeleteVenueButton";

export const metadata: Metadata = { title: "Edit venue" };

export default function EditVenuePage({
  params,
}: PageProps<"/venues/[id]/edit">) {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-4 py-12">
      <Suspense fallback={<p>Loading...</p>}>
        <EditVenueContent params={params} />
      </Suspense>
    </main>
  );
}

async function EditVenueContent({
  params,
}: {
  params: PageProps<"/venues/[id]/edit">["params"];
}) {
  const { id } = await params;
  const session = await getProfile();
  if (!session) redirect("/login");

  let venue;
  try {
    venue = (await getVenue(id)).data;
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 404 || error.status === 400)
    ) {
      notFound();
    }
    throw error;
  }

  // Only the owner may edit
  if (venue.owner?.name !== session.name) redirect(`/venues/${id}`);

  return (
    <>
      <VenueForm venue={venue} />s
      <DeleteVenueButton venueId={venue.id} venueName={venue.name} />
    </>
  );
}
