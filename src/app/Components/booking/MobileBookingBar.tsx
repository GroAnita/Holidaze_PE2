"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/app/lib/format";

type MobileBookingBarProps = {
  price: number;
};

export default function MobileBookingBar({ price }: MobileBookingBarProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const card = document.getElementById("your-stay");
    const footer = document.querySelector("footer");
    const targets = [card, footer].filter(
      (el): el is HTMLElement => el !== null,
    );

    // Keep track of which of them are on screen right now
    const visible = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.add(entry.target);
        } else {
          visible.delete(entry.target);
        }
      });
      setShow(visible.size === 0);
    });

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!show) return null;

  return (
    <div className="bg-surface border-border-subtle font-manrope fixed inset-x-0 bottom-0 z-40 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <p className="text-text-primary">
          <span className="text-lg font-semibold">{formatPrice(price)}</span>
          <span className="text-text-muted text-sm"> / night</span>
        </p>
        <a
          href="#your-stay"
          className="bg-secondary-background text-secondary-text hover:bg-secondary-hover rounded-full px-5 py-2 text-sm font-semibold"
        >
          Choose dates
        </a>
      </div>
    </div>
  );
}
