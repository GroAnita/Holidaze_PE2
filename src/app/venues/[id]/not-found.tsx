import Button from "../../Components/Button";

export default function VenueNotFound() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-16">
      <h1 className="text-text-primary font-playfair-display text-2xl font-bold">
        Venue Not Found
      </h1>
      <p className="text-text-muted font-manrope">
        This venue doesn&apos;t exist or has been removed.
      </p>
      <Button href="/">Back to Venues</Button>
    </main>
  );
}
