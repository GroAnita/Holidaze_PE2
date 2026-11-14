import type { DateRange } from "react-day-picker";
import Button from "./Button";
import { formatPrice } from "@/app/lib/format";

type BookingSummaryProps = {
  range: DateRange | undefined;
  nights: number;
  guests: number;
  price: number;
  isLoggedIn: boolean;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BookingSummary({
  range,
  nights,
  guests,
  price,
  isLoggedIn,
}: BookingSummaryProps) {
  const hasDates = nights > 0 && range?.from && range.to;
  const total = price * nights;

  return (
    <div className="bg-surface font-manrope text-text-primary w-full max-w-md rounded-xl p-6">
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

      <div className="mt-6 flex justify-end">
        {isLoggedIn ? (
          <Button disabled={!hasDates}>Reserve</Button>
        ) : (
          <Button href="/login">Log in to reserve</Button>
        )}
      </div>
    </div>
  );
}
