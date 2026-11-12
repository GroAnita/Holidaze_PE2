"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

const tabs = [
  { id: "images", label: "Images" },
  { id: "about", label: "About" },
  { id: "your-stay", label: "Your Stay" },
  { id: "policies", label: "Policies" },
];

type VenueTabsProps = {
  venueName: string;
};

export default function VenueTabs({ venueName }: VenueTabsProps) {
  const [activeTab, setActiveTab] = useState("images");
  const [saved, setSaved] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: venueName,
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
    }
  }

  return (
    <div className="border-text-primary flex items-center justify-between border-b py-3">
      <nav aria-label="Venue sections">
        <ul className="font-manrope text-md flex gap-12">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <a
                href={`#${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? "true" : undefined}
                className={
                  activeTab === tab.id
                    ? "text-feedback-success-text font-semibold"
                    : "text-text-primary hover:text-feedback-success-text"
                }
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          aria-pressed={saved}
          className="border-text-primary text-feedback-success-text font-manrope flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
        >
          <Heart
            className="h-6 w-6 text-red-500"
            fill={saved ? "currentColor" : "none"}
          />
          {saved ? "Saved" : "Save"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="border-text-primary text-feedback-success-text font-manrope flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
        >
          <Share2 className="h-6 w-6 text-green-500" />
          Share
        </button>
      </div>
    </div>
  );
}
