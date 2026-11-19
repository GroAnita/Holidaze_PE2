"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import Button from "../ui/Button";
import { inputStyles } from "../ui/FormField";
import type { Media } from "../../lib/api/types";

const MAX_IMAGES = 5;

type MediaInputProps = {
  error?: string;
  initialImages?: Media[];
};

type MediaItem = { url: string; alt: string };

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function MediaInput({
  error,
  initialImages = [],
}: MediaInputProps) {
  const [images, setImages] = useState<MediaItem[]>(
    initialImages.map((m) => ({ url: m.url, alt: m.alt ?? "" })),
  );
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [urlError, setUrlError] = useState("");

  const isFull = images.length >= MAX_IMAGES;

  function handleAdd() {
    const trimmedUrl = url.trim();
    if (!isValidUrl(trimmedUrl)) {
      setUrlError("Please enter a valid image URL starting with https://");
      return;
    }
    setImages([...images, { url: trimmedUrl, alt: alt.trim() }]);
    setUrl("");
    setAlt("");
    setUrlError("");
  }

  function handleRemove(index: number) {
    setImages(images.filter((_, i) => i !== index));
  }

  // Pressing Enter in these fields should add the image, not submit the whole form
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAdd();
    }
  }

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-feedback-success-text mb-1 text-lg">
        Photos <span aria-hidden="true">*</span>
      </legend>
      <p className="text-text-muted text-sm">
        Show your guests what they get. Up to {MAX_IMAGES} images.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-text-primary flex flex-col gap-1 text-sm">
          Image URL
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://..."
            disabled={isFull}
            className={inputStyles}
          />
        </label>
        <label className="text-text-primary flex flex-col gap-1 text-sm">
          Image description
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="E.g. Pool with palm trees"
            disabled={isFull}
            className={inputStyles}
          />
        </label>
      </div>

      {urlError && (
        <p className="text-feedback-error-text text-sm">{urlError}</p>
      )}

      <div>
        <Button
          variant="primary"
          onClick={handleAdd}
          disabled={isFull || !url.trim()}
        >
          Add image
        </Button>
      </div>

      {images.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image, index) => (
            <li key={`${image.url}-${index}`} className="flex flex-col gap-1">
              <div className="relative aspect-4/3 overflow-hidden rounded-lg">
                <Image
                  src={image.url}
                  alt={image.alt || "Venue photo"}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  aria-label={`Remove image ${index + 1}`}
                  className="bg-surface/90 text-text-primary absolute top-2 right-2 rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {image.alt && (
                <p className="text-text-muted text-xs">{image.alt}</p>
              )}
              <input type="hidden" name="mediaUrl" value={image.url} />
              <input type="hidden" name="mediaAlt" value={image.alt} />
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-feedback-error-text text-sm">{error}</p>}
    </fieldset>
  );
}
