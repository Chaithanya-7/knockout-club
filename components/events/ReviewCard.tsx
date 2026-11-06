"use client";

import { Star } from "lucide-react";

export function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "text-pbgreen fill-pbgreen" : "text-white/30"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewCard({
  name,
  review,
  rating,
}: {
  name: string;
  review: string;
  rating: number;
}) {
  return (
    <div className="bg-pbsurface rounded-[20px] px-4 md:px-5 py-5 flex flex-col gap-3 transition-colors duration-300 border border-transparent hover:border-pbgreen/50">
      <StarRating count={rating} />
      <p className="text-xs md:text-sm font-normal leading-[1.6] text-white/60 m-0">
        {review}
      </p>
      <span className="text-sm font-medium text-pbgreen">{name}</span>
    </div>
  );
}
