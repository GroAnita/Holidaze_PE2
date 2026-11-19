import Button from "./Button";
import StatusCard from "./StatusCard";

type ComingSoonProps = {
  title: string;
  text: string;
  showContactLink?: boolean;
};

export default function ComingSoon({
  title,
  text,
  showContactLink,
}: ComingSoonProps) {
  return (
    <StatusCard
      eyebrow="Coming soon"
      title={title}
      text={text}
      image="/not-found-island.png"
      showContactLink={showContactLink}
      actions={
        <>
          <Button href="/#venues" variant="primary">
            Explore stays
          </Button>
          <Button href="/" variant="outline">
            Back to home
          </Button>
        </>
      }
    />
  );
}
