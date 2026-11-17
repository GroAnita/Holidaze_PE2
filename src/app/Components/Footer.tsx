import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-footer border-border-control border-t p-4 text-center">
      <div className="mb-4 flex flex-col justify-center gap-4 sm:flex-row">
        <section className="flex-1 gap-2 text-left">
          <p className="font-italiana text-brand-accent text-center text-4xl tracking-wider lg:text-left">
            HOLIDAZE
          </p>
        </section>
        <section className="flex flex-col gap-2 text-center lg:text-left">
          <p className="text-brand-accent font-playfair-display text-center text-2xl font-bold">
            Popular destinations and
          </p>
          <p className="text-brand-accent font-playfair-display text-center text-xl font-bold">
            unique venues for your next holiday.{" "}
          </p>
          <Link href="/?q=oslo#venues" className="text-surface hover:underline">
            Popular venues in Oslo
          </Link>
          <Link
            href="/?q=new%20york#venues"
            className="text-surface hover:underline"
          >
            Popular venues in New York
          </Link>
          <Link
            href="/?q=cabin#venues"
            className="text-surface hover:underline"
          >
            Popular venues in Cosy Cabins
          </Link>
          <Link
            href="/?q=london#venues"
            className="text-surface hover:underline"
          >
            Popular venues in London
          </Link>
        </section>
        <section className="flex flex-1 flex-col gap-2 text-center lg:text-right">
          <p className="text-surface text-bold font-playfair-display text-2xl">
            Information
          </p>
          <Link href="/contact" className="text-surface hover:underline">
            Contact
          </Link>
          <Link href="/tos" className="text-surface hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-surface hover:underline">
            Privacy Policy
          </Link>
        </section>
      </div>
      <span className="text-surface">&copy; 2026 Holidaze</span>
    </footer>
  );
}
