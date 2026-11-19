import Image from "next/image";
import { getInitials } from "../../lib/format";
import type { Media } from "../../lib/api/types";

type AvatarProps = {
  name: string;
  avatar?: Media;
  className?: string;
};

export default function Avatar({
  name,
  avatar,
  className = "h-10 w-10",
}: AvatarProps) {
  return (
    <span
      className={`bg-surface border-text-primary text-text-primary font-italiana relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border ${className}`}
    >
      {avatar?.url ? (
        <Image src={avatar.url} alt={name} fill className="object-cover" />
      ) : (
        getInitials(name)
      )}
    </span>
  );
}
