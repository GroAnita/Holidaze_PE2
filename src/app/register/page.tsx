import type { Metadata } from "next";
import Image from "next/image";
import RegisterForm from "../Components/RegisterForm";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="border-cta-secondary grid w-full max-w-5xl overflow-hidden rounded-2xl border-8 md:grid-cols-2">
        <div className="bg-footer hidden flex-col items-center gap-6 px-8 py-10 text-center text-white md:flex">
          <p className="font-italiana text-5xl tracking-widest">Holidaze</p>
          <p className="font-manrope text-lg tracking-wide">
            Find your next somewhere
          </p>
          <p className="font-manrope text-lg leading-loose tracking-wide">
            Browse unique stays, or
            <br />
            share your own space.
          </p>
          <div className="relative aspect-4/3 w-full max-w-sm overflow-hidden rounded-xl">
            <Image
              src="/register-hero.jpg"
              alt="Resort pool surrounded by palm trees"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="bg-background">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
