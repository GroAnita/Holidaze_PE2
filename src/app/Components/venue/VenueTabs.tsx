"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

const tabs = [
  { id: "about", label: "About" },
  { id: "amenities", label: "Amenities" },
  { id: "map", label: "Location" },
  { id: "policies", label: "Policies" },
];

type VenueTabsProps = {
  venueName: string;
};

export default function VenueTabs({ venueName }: VenueTabsProps) {
  const [activeTab, setActiveTab] = useState("about");
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
    <div className="border-border-subtle flex items-end justify-between gap-4 border-b">
      <nav aria-label="Venue sections">
        <ul className="font-manrope flex gap-6 text-sm sm:gap-10">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <a
                href={`#${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? "true" : undefined}
                className={`-mb-px block border-b-2 py-3 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-hero-accent text-text-primary font-semibold"
                    : "text-text-muted hover:text-text-primary border-transparent"
                }`}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-2 pb-2">
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
