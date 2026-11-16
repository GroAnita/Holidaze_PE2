import Link from "next/link";
import { CircleCheck, X } from "lucide-react";

export default function BookingConfirmed() {
  return (
    <div
      role="status"
      className="bg-feedback-success-background text-feedback-success-text font-manrope mb-8 flex items-start gap-3 rounded-xl px-5 py-4"
    >
      <CircleCheck className="mt-0.5 h-6 w-6 shrink-0" aria-hidden="true" />
      <div className="flex-1">
        <p className="text-lg font-semibold">Booking confirmed</p>
        <p className="text-sm">
          Your stay is booked. You can view it under{" "}
          <a href="#trips" className="underline">
            Upcoming stays
          </a>
          *
        </p>
      </div>
      <Link
        href="/profile"
        scroll={false}
        aria-label="Close message"
        className="hover:opacity-70"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </Link>
    </div>
  );
}
