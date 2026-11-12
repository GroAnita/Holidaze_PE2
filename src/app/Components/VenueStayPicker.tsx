"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Calendar, Users } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import type { Booking } from "@/app/lib/api/types";

type VenueStayPickerProps = {
  maxGuests: number;
  bookings: Booking[];
};

function toLocalDate(isoString: string) {
  return new Date(`${isoString.slice(0, 10)}T00:00`);
}

function formatDate(date?: Date) {
  if (!date) return "Add date";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function countNights(range?: DateRange) {
  if (!range?.from || !range.to) return 0;
  return Math.round(
    (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
  );
}

const boxStyles =
  "bg-action-background/30 border-text-primary focus-within:ring-focus-ring flex w-full items-center gap-4 rounded-xl border px-6 py-2 text-left focus-within:ring-2";

const calendarColors = {
  "--rdp-accent-color": "var(--holidaze-feedback-success-text)",
  "--rdp-accent-background-color":
    "var(--holidaze-feedback-success-background)",
} as CSSProperties;

export default function VenueStayPicker({
  maxGuests,
  bookings,
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
    <div className="font-manrope">
      <h2 className="text-feedback-success-text mb-6 text-2xl">
        When do you arrive
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div
          ref={datesRef}
          className="relative grid gap-6 md:col-span-2 md:grid-cols-2"
        >
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
                {formatDate(range?.from)}
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
                {formatDate(nights > 0 ? range?.to : undefined)}
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

        <label className={boxStyles}>
          <Users className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="flex flex-col">
            <span className="text-text-primary">Guests</span>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="text-text-primary bg-transparent outline-none"
            >
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      {nights > 0 && (
        <p className="text-text-muted mt-4">
          {nights} {nights === 1 ? "night" : "nights"}
        </p>
      )}
    </div>
  );
}
