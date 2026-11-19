import type { Metadata } from "next";
import ComingSoon from "../../Components/ui/ComingSoon";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="Privacy Policy"
      text="Our privacy policy is on its way. Soon you'll find out here how we look after your personal information."
    />
  );
}
