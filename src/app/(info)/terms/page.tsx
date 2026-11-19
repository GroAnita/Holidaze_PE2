import type { Metadata } from "next";
import ComingSoon from "../../Components/ui/ComingSoon";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <ComingSoon
      title="Terms of Service"
      text="We're putting the finishing touches on our terms. Check back soon to read how bookings and stays work on Holidaze."
    />
  );
}
