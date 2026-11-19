import type { Metadata } from "next";
import ComingSoon from "../../Components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <ComingSoon
      title="Contact Us"
      text="Our contact page is coming soon. Stay tuned!"
      showContactLink={false}
    />
  );
}
