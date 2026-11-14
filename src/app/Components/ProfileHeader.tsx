import type { ProfileDetails } from "../lib/api/profiles";
import Avatar from "./Avatar";

type ProfileHeaderProps = {
  profile: ProfileDetails;
};

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <section className="bg-surface border-cta-secondary font-manrope flex flex-col items-center gap-6 rounded-xl border-2 p-6 shadow-[6px_6px_0_var(--holidaze-cta-secondary)] sm:flex-row">
      <Avatar
        name={profile.name}
        avatar={profile.avatar}
        className="h-28 w-28 text-3xl"
      />

      <div className="text-center sm:text-left">
        <h1 className="font-italiana text-text-primary text-3xl tracking-wider">
          {profile.name}
        </h1>
        <p className="text-text-muted text-sm">
          {profile.venueManager ? "Venue Manager" : "Guest"}
        </p>
        <p className="text-text-muted text-sm">{profile.email}</p>
      </div>

      <p
        className={`flex-1 text-center ${
          profile.bio
            ? "font-italiana text-text-primary text-xl tracking-wide"
            : "text-text-muted text-sm"
        }`}
      >
        {profile.bio || "No bio yet. Tell people a little about yourself."}
      </p>
    </section>
  );
}
