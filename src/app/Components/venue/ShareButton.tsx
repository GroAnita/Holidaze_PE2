"use client";
import { useState } from "react";
import { Share2, Check } from "lucide-react";

type ShareButtonProps = {
  venueName: string;
};

export default function ShareButton({ venueName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    // Phones : opens the native share dialog if available
    if (navigator.share) {
      try {
        await navigator.share({ title: venueName, url });
      } catch {}
      return;
    }

    // Desktop: copy link and show a small confirm.
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="border-brand text-brand font-manrope hover:bg-brand/10 flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
    >
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Share2 className="h-4 w-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Link copied!" : "Share"}</span>
    </button>
  );
}
