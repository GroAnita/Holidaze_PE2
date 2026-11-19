"use client";
import Link from "next/link";
import { useActionState } from "react";
import { createBookingAction } from "@/app/lib/api/bookingActions";
import type { FormState } from "@/app/lib/api/auth/actions";
import { formatPrice } from "@/app/lib/format";
import Button from "../ui/Button";

type BookingConfirmFormProps = {
  venueId: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  total: number;
};

export default function BookingConfirmForm({
  venueId,
  dateFrom,
  dateTo,
  guests,
  total,
}: BookingConfirmFormProps) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    createBookingAction,
    {},
  );

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <input type="hidden" name="venueId" value={venueId} />
      <input type="hidden" name="dateFrom" value={dateFrom} />
      <input type="hidden" name="dateTo" value={dateTo} />
      <input type="hidden" name="guests" value={guests} />
      <label className="text-text-primary flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name="terms"
          required
          className="accent-brand mt-1 h-4 w-4"
        />
        <span>
          I agree to the{" "}
          <Link href="/terms" className="underline">
            terms and conditions
          </Link>
        </span>
      </label>

      {state.message && (
        <p
          role="alert"
          className="bg-feedback-error-background text-feedback-error-text rounded-lg px-3 py-2 text-sm"
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={pending}
        className="w-full py-3 text-lg"
      >
        {pending ? "Confirming..." : `Confirm Booking ${formatPrice(total)}`}
      </Button>
      <p className="text-text-muted text-center text-sm">
        payment is made directly to the host at check-in.
      </p>
    </form>
  );
}
