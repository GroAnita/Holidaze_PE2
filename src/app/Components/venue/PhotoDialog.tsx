"use client";
import Image from "next/image";
import { useRef } from "react";
import { Images, X } from "lucide-react";
import type { Media } from "../../lib/api/types";

type PhotoDialogProps = {
  media: Media[];
  venueName: string;
};

export default function PhotoDialog({ media, venueName }: PhotoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="bg-surface/90 hover:bg-surface text-text-primary font-manrope absolute right-3 bottom-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm shadow-md"
      >
        <Images className="h-4 w-4" aria-hidden="true" />
        View photos ({media.length})
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`Photos of ${venueName}`}
        className="bg-background m-0 h-full max-h-none w-full max-w-none p-0"
      >
        <div className="bg-background border-border-subtle sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3">
          <h2 className="font-manrope text-text-primary text-lg font-semibold">
            {venueName} · {media.length} photos
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close photos"
            className="text-text-primary hover:bg-brand/10 rounded-full p-2"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <ul className="mx-auto grid max-w-4xl gap-4 p-4 sm:grid-cols-2">
          {media.map((item, index) => (
            <li
              key={`${item.url}-${index}`}
              className={`relative aspect-4/3 ${index === 0 ? "sm:col-span-2" : ""}`}
            >
              <Image
                src={item.url}
                alt={item.alt || `${venueName}, photo ${index + 1}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="rounded-lg object-cover"
              />
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
