import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
};

export default function StarRating({ rating }: StarRatingProps) {
  const stars = Array.from({ length: 5 });
  const filledStars = Math.round(rating);

  return (
    <div className="flex items-center gap-1">
      {stars.map((_, index) =>
        index < filledStars ? (
          <Star
            key={index}
            fill="currentColor"
            className="h-4 w-4 text-yellow-500"
          />
        ) : (
          <Star key={index} className="h-4 w-4 text-yellow-500" />
        ),
      )}
    </div>
  );
}
