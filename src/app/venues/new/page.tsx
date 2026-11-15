import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getProfile } from "../../lib/api/auth/session";
import VenueForm from "../../Components/VenueForm";

export const metadata: Metadata = { title: "Add venue" };

export default function NewVenuePage() {
  return (
    <main className="flex flex-1 justify-center px-4 py-12">
      <Suspense fallback={<p>Loading...</p>}>
        <ManagerOnly />
      </Suspense>
    </main>
  );
}

async function ManagerOnly() {
  const session = await getProfile();
  if (!session) redirect("/login");
  if (!session.venueManager) redirect("/profile");
  return <VenueForm />;
}
