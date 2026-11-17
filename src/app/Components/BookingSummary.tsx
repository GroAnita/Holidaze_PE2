"use client";
import type { DateRange } from "react-day-picker";
import Button from "./Button";
import { useActionState } from "react";
import { createBookingAction } from "@/app/lib/api/bookingActions";
import type { FormState } from "@/app/lib/api/auth/actions";
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
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    createBookingAction,
    {},
  );

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
        {state.message && (
          <p
            role="alert"
            className="bg-feedback-error-background text-feedback-error-text mt-4 rounded-lg px-3 py-2 text-sm"
          >
            {state.message}
          </p>
        )}

        <div className="mt-6 flex justify-end">
          {isLoggedIn ? (
            <form action={formAction}>
              <input type="hidden" name="venueId" value={venueId} />
              <input type="hidden" name="guests" value={guests} />
              {hasDates && (
                <>
                  <input
                    type="hidden"
                    name="dateFrom"
                    value={toApiDate(range.from!)}
                  />
                  <input
                    type="hidden"
                    name="dateTo"
                    value={toApiDate(range.to!)}
                  />
                </>
              )}
              <Button type="submit" disabled={!hasDates || pending}>
                {pending ? "Reserving..." : "Reserve"}
              </Button>
            </form>
          ) : (
            <Button href="/login">Log in to reserve</Button>
          )}
        </div>
      </div>
    </div>
  );
}
