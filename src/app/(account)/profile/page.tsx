import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getProfile, getToken } from "../../lib/api/auth/session";
import { getUserProfile, getMyVenues } from "../../lib/api/profiles";
import { ApiError } from "../../lib/api/types";
import ProfileHeader from "../../Components/profile/ProfileHeader";
import MyTrips from "../../Components/profile/MyTrips";
import { getMyBookings } from "../../lib/api/bookings";
import MyVenues from "../../Components/profile/MyVenues";
import BookingsAtMyVenues from "../../Components/profile/BookingsAtMyVenues";
import BookingConfirmed from "../../Components/booking/BookingConfirmed";

export const metadata: Metadata = { title: "My profile" };

export default function ProfilePage({ searchParams }: PageProps<"/profile">) {
  return (
    <main className="mx-auto w-full max-w-300 px-4 py-8">
      <Suspense fallback={<p>Loading profile...</p>}>
        <ProfileContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function ProfileContent({
  searchParams,
}: {
  searchParams: PageProps<"/profile">["searchParams"];
}) {
  const { booked } = await searchParams;
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
    // Token expired or invalid – send them back to log in again
    if (error instanceof ApiError && error.status === 401) redirect("/login");
    throw error;
  }

  return (
    <>
      {booked && <BookingConfirmed />}
      <ProfileHeader profile={profile} />
      {profile.venueManager && (
        <div>
          <div className="mt-10">
            <MyVenues venues={venues} />
          </div>
          <div className="mt-10">
            <BookingsAtMyVenues venues={venues} />
          </div>
        </div>
      )}
      <div className="mt-10">
        <MyTrips bookings={bookings} />
      </div>
    </>
  );
}
