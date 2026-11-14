import Link from "next/link";
import { getProfile } from "../lib/api/auth/session";

export default async function Header() {
  const profile = await getProfile();
  return (
    <header className="bg-background p-4 dark:bg-black">
      <section className="flex items-center justify-between">
        <Link
          href="/"
          className="text-feedback-success-text font-italiana text-4xl font-normal dark:text-white"
        >
          HOLIDAZE
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="text-feedback-success-text dark:text-white">
            Explore
          </Link>
          {profile ? (
            <span className="text-feedback-success-text dark:text-white">
              {profile.name}
            </span>
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
