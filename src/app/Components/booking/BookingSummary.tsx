import type { DateRange } from "react-day-picker";
import Button from "../ui/Button";
import { formatDate, formatPrice, toApiDate } from "@/app/lib/format";

type BookingSummaryProps = {
  range: DateRange | undefined;
  nights: number;
  guests: number;
  price: number;
  isLoggedIn: boolean;
  venueId: string;
};

export default function BookingSummary({
  venueId,
  range,
  nights,
  guests,
  price,
  isLoggedIn,
}: BookingSummaryProps) {
  const hasDates = nights > 0 && range?.from && range.to;
  const total = price * nights;

  const bookHref = hasDates
    ? `/venues/${venueId}/book?${new URLSearchParams({
        from: toApiDate(range.from!),
        to: toApiDate(range.to!),
        guests: String(guests),
      })}`
    : undefined;

  return (
    <div className="font-manrope text-text-primary w-full">
      <h3 className="text-feedback-success-text mb-4 text-xl">Your stay</h3>
      {hasDates ? (
        <>
          <p>
            {formatDate(range.from!)} → {formatDate(range.to!)}
          </p>
          <p className="text-text-muted mb-4">
            {nights} {nights === 1 ? "night" : "nights"} · {guests}{" "}
            {guests === 1 ? "guest" : "guests"}
          </p>

          <div className="border-border-control flex justify-between border-b pb-3">
            <span>
              {formatPrice(price)} × {nights}{" "}
              {nights === 1 ? "night" : "nights"}
            </span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between pt-3 font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </>
      ) : (
        <p className="text-text-muted">
          {formatPrice(price)} / night. Choose your dates to see the total.
        </p>
      )}

      <div className="mt-6 flex">
        {!isLoggedIn ? (
          <Button href="/login" className="w-full justify-center">
            Log in to reserve
          </Button>
        ) : bookHref ? (
          <Button
            href={bookHref}
            variant="primary"
            className="w-full justify-center text-center"
          >
            Reserve
          </Button>
        ) : (
          <Button disabled className="w-full justify-center text-center">
            Reserve
          </Button>
        )}
      </div>
    </div>
  );
}
