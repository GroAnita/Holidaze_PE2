import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-holidaze-background p-4 dark:bg-black">
      <section className="flex items-center justify-between">
        <h1 className="text-feedback-success-text font-italiana text-4xl font-bold dark:text-white">
          Holidaze
        </h1>
        <div className="flex gap-4">
          <Link href="/" className="text-feedback-success-text dark:text-white">
            Explore
          </Link>
          <Link
            href="/login"
            className="text-feedback-success-text dark:text-white"
          >
            LogIn
          </Link>
        </div>
      </section>
    </header>
  );
}
