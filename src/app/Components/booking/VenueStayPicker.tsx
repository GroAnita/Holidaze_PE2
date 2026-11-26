"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Calendar, Users } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import type { Booking } from "@/app/lib/api/types";
import BookingSummary from "./BookingSummary";
import { formatDate, toLocalDate } from "@/app/lib/format";
import { Minus, Plus } from "lucide-react";

type VenueStayPickerProps = {
  maxGuests: number;
  bookings: Booking[];
  price: number;
  isLoggedIn: boolean;
  venueId: string;
};

function countNights(range?: DateRange) {
  if (!range?.from || !range.to) return 0;
  return Math.round(
    (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
  );
}

const boxStyles =
  "bg-action-background/80 border-text-primary focus-within:ring-focus-ring flex w-full items-center gap-4 rounded-xl border px-4 py-2 text-left focus-within:ring-2";

const calendarColors = {
  "--rdp-accent-color": "var(--holidaze-feedback-success-text)",
  "--rdp-accent-background-color":
    "var(--holidaze-feedback-success-background)",
} as CSSProperties;

export default function VenueStayPicker({
  venueId,
  maxGuests,
  bookings,
  price,
  isLoggedIn,
}: VenueStayPickerProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const datesRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookedRanges = bookings.map((booking) => ({
    from: toLocalDate(booking.dateFrom),
    to: toLocalDate(booking.dateTo),
  }));

  const nights = countNights(range);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        datesRef.current &&
        !datesRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function handleSelect(newRange: DateRange | undefined) {
    setRange(newRange);
    if (countNights(newRange) > 0) {
      setIsOpen(false);
    }
  }

  return (
    <div className="font-manrope bg-surface rounded-xl p-6 shadow-md">
      <h2 className="text-feedback-success-text mb-6 text-2xl">
        When do you arrive
      </h2>

      <div className="grid gap-4">
        <div ref={datesRef} className="relative grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className={boxStyles}
          >
            <Calendar className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="flex flex-col">
              <span className="text-text-primary">Start date</span>
              <span className="text-text-primary">
                {range?.from ? formatDate(range.from) : "Add date"}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className={boxStyles}
          >
            <Calendar className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="flex flex-col">
              <span className="text-text-primary">End date</span>
              <span className="text-text-primary">
                {nights > 0 && range?.to ? formatDate(range.to) : "Add date"}
              </span>
            </span>
          </button>

          {isOpen && (
            <div className="bg-surface border-border-control absolute top-full left-0 z-10 mt-2 rounded-xl border p-4 shadow-lg">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={handleSelect}
                disabled={[{ before: today }, ...bookedRanges]}
                excludeDisabled
                modifiers={{ booked: bookedRanges }}
                modifiersClassNames={{ booked: "line-through" }}
                weekStartsOn={1}
                startMonth={today}
                defaultMonth={range?.from ?? today}
                style={calendarColors}
              />
              <p className="text-text-muted mt-2 text-sm">
                Crossed-out dates are already booked.
              </p>
            </div>
          )}
        </div>

        <div className={boxStyles}>
          <Users className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="text-text-primary">Guests</span>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGuests((g) => g - 1)}
              disabled={guests <= 1}
              aria-label="Remove a guest"
              className="border-brand text-brand hover:bg-brand/10 flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-40"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span
              aria-live="polite"
              className="text-text-primary min-w-16 text-center"
            >
              {guests} {guests === 1 ? "guest" : "guests"}
            </span>
            <button
              type="button"
              onClick={() => setGuests((g) => g + 1)}
              disabled={guests >= maxGuests}
              aria-label="Add a guest"
              className="border-brand text-brand hover:bg-brand/10 flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-40"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <BookingSummary
          venueId={venueId}
          range={range}
          nights={nights}
          guests={guests}
          price={price}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}
