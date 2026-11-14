import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getProfile, getToken } from "../lib/api/auth/session";
import { getUserProfile, getMyVenues } from "../lib/api/profiles";
import { ApiError } from "../lib/api/types";
import ProfileHeader from "../Components/ProfileHeader";
import MyTrips from "../Components/MyTrips";
import { getMyBookings } from "../lib/api/bookings";
import MyVenues from "../Components/MyVenues";

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
  let bookings;
  let venues;
  try {
    const [profileResponse, bookingsResponse, venuesResponse] =
      await Promise.all([
        getUserProfile(session.name, token),
        getMyBookings(session.name, token),
        getMyVenues(session.name, token),
      ]);
    profile = profileResponse.data;
    bookings = bookingsResponse.data;
    venues = venuesResponse.data;
  } catch (error) {
    // Token expired or invalid – send them to log in again
    if (error instanceof ApiError && error.status === 401) redirect("/login");
    throw error;
  }

  return (
    <>
      <ProfileHeader profile={profile} />
      {profile.venueManager && (
        <div className="mt-10">
          <MyVenues venues={venues} />
        </div>
      )}
      <div className="mt-10">
        <MyTrips bookings={bookings} />
      </div>
    </>
  );
}
