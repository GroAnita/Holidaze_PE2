import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type StatusCardProps = {
  eyebrow: string;
  code?: string;
  title: string;
  text: string;
  image: string;
  actions: ReactNode;
};

export default function StatusCard({
  eyebrow,
  code,
  title,
  text,
  image,
  actions,
}: StatusCardProps) {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-12">
      <section className="bg-hero-panel grid w-full max-w-300 items-center gap-10 overflow-hidden rounded-3xl px-8 py-12 md:grid-cols-2 md:px-16 md:py-16">
        <div>
          <p className="font-manrope text-hero-accent text-sm font-semibold tracking-[0.35em] uppercase">
            {eyebrow}
          </p>
          {code && (
            <p className="font-italiana text-hero-accent mt-2 text-8xl leading-none md:text-9xl">
              {code}
            </p>
          )}
          <h1 className="font-italiana text-hero-text mt-4 text-5xl leading-tight md:text-6xl">
            {title}
          </h1>
          <p className="font-manrope text-hero-text mt-6 max-w-md text-lg">
            {text}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
        </div>
        <Image
          src={image}
          alt=""
          width={800}
          height={640}
          className="mx-auto h-auto w-full max-w-lg"
        />
      </section>

      <Link
        href="/contact"
        className="font-manrope text-link mt-10 underline underline-offset-4"
      >
        Need help? Contact us
      </Link>
    </main>
  );
}
