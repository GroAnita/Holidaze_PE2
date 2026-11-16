"use client";
import { useActionState, useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteVenueAction } from "../lib/api/venueActions";
import type { FormState } from "../lib/api/auth/actions";

type DeleteVenueButtonProps = {
  venueId: string;
  venueName: string;
};

export default function DeleteVenueButton({
  venueId,
  venueName,
}: DeleteVenueButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [state, formAction, pending] = useActionState<FormState>(
    deleteVenueAction.bind(null, venueId),
    {},
  );

  return (
    <section className="border-feedback-error-text font-manrope w-full max-w-2xl rounded-2xl border-2 px-6 py-6 sm:px-10">
      <h2 className="text-feedback-error-text text-lg font-semibold">
        Delete venue
      </h2>
      <p className="text-text-primary mt-1 text-sm">
        This removes {venueName} and all its bookings. It cannot be undone.
      </p>

      {state.message && (
        <p role="alert" className="text-feedback-error-text mt-3 text-sm">
          {state.message}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="text-feedback-error-text border-feedback-error-text flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete this venue
          </button>
        ) : (
          <form
            action={formAction}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="text-text-primary text-sm font-semibold">
              Are you sure?
            </span>
            <button
              type="submit"
              disabled={pending}
              className="bg-feedback-error-text text-surface rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              {pending ? "Deleting..." : "Yes, delete"}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="text-text-primary px-2 py-2 text-sm hover:underline"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
