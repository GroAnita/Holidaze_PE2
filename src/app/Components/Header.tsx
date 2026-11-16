import Link from "next/link";
import { getProfile } from "../lib/api/auth/session";
import UserMenu from "./UserMenu";

export default async function Header() {
  const profile = await getProfile();
  return (
    <header className="bg-background p-4 dark:bg-black">
      <section className="flex items-center justify-between">
        <Link
          href="/"
          className="brand-logo text-5xl"
          aria-label="Holidaze home"
        >
          <span className="text-feedback-success-text font-italiana font-normal tracking-wider dark:text-white">
            HOLIDAZE
          </span>
          <span className="brand-dot" aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-feedback-success-text dark:text-white">
            Explore
          </Link>
          {profile ? (
            <UserMenu name={profile.name} avatar={profile.avatar} />
          ) : (
            <Link
              href="/login"
              className="text-feedback-success-text dark:text-white"
            >
              LogIn
            </Link>
          )}
        </div>
      </section>
    </header>
  );
}
