import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getProfile, getToken } from "../lib/api/auth/session";
import { getUserProfile } from "../lib/api/profiles";
import { ApiError } from "../lib/api/types";
import ProfileHeader from "../Components/ProfileHeader";

export const metadata: Metadata = { title: "My profile" };

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-300 px-4 py-8">
      <Suspense fallback={<p>Loading profile...</p>}>
        <ProfileContent />
      </Suspense>
    </main>
  );
}

async function ProfileContent() {
  const token = await getToken();
  const session = await getProfile();
  if (!token || !session) redirect("/login");

  let profile;
  try {
    const response = await getUserProfile(session.name, token);
    profile = response.data;
  } catch (error) {
    // Token expired or invalid – send them to log in again
    if (error instanceof ApiError && error.status === 401) redirect("/login");
    throw error;
  }

  return (
    <>
      <ProfileHeader profile={profile} />
      {/* Step 2 and 3: bookings and venues go here */}
    </>
  );
}
