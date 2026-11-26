"use client";

import { useState } from "react";

const tabs = [
  { id: "about", label: "About" },
  { id: "amenities", label: "Amenities" },
  { id: "map", label: "Location" },
  { id: "policies", label: "Policies" },
];

export default function VenueTabs() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="border-border-subtle border-b">
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
    </div>
  );
}
