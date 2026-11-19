import Image from "next/image";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[70vh] w-full items-center justify-center overflow-hidden px-6 py-16 text-center">
      <Image
        src="/register-hero.jpg"
        alt="Resort hero image"
        fill
        preload
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-black/45"
        aria-hidden="true"
      ></div>
      <div className="bg-hero-panel/50 border-hero-text/30 max-w-2xl rounded-lg border px-8 py-10 backdrop-blur-sm">
        <h1 className="font-italiana text-hero-accent text-5xl tracking-widest md:text-6xl">
          Discover Your Next Getaway
        </h1>
        <p className="font-manrope text-hero-text mt-4 text-lg tracking-wide md:text-xl">
          Explore unique stays and create unforgettable memories.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/#venues" variant="primary">
            Explore Stays
          </Button>
          <Button href="/register">Become a host</Button>
        </div>
      </div>
    </section>
  );
}
