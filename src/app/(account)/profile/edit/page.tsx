import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getProfile, getToken } from "../../../lib/api/auth/session";
import { getUserProfile } from "../../../lib/api/profiles";
import { ApiError } from "../../../lib/api/types";
import ProfileForm from "../../../Components/profile/ProfileForm";

export const metadata: Metadata = { title: "Edit profile" };

export default function EditProfilePage() {
  return (
    <main className="flex flex-1 justify-center px-4 py-12">
      <Suspense fallback={<p>Loading...</p>}>
        <EditProfileContent />
      </Suspense>
    </main>
  );
}

async function EditProfileContent() {
  const token = await getToken();
  const session = await getProfile();
  if (!token || !session) redirect("/login");

  let profile;
  try {
    profile = (await getUserProfile(session.name, token)).data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) redirect("/login");
    throw error;
  }

  return <ProfileForm profile={profile} />;
}
