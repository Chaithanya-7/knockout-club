"use client";

import ReviewCard from "@/components/events/ReviewCard";

// Placeholder reviews: replace with real feedback from your events.
const reviews = [
  { name: "Attendee", review: "Add a real review from a KO CTF participant here.", rating: 5 },
  { name: "Attendee", review: "Add a real review from a workshop attendee here.", rating: 5 },
  { name: "Attendee", review: "Add a real review from a team member here.", rating: 5 },
  { name: "Attendee", review: "Add a real review from a hack night here.", rating: 5 },
];

export default function ReviewMarquee() {
  const topRow = reviews.slice(0, 2);
  const bottomRow = reviews.slice(2);

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <style>{`
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scrollRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>

      {/* Top row — scrolls left */}
      <div className="overflow-hidden w-full">
        <div className="flex gap-4 w-max animate-[scrollLeft_60s_linear_infinite]">
          {[...topRow, ...topRow, ...topRow, ...topRow].map((r, i) => (
            <div key={i} className="w-81">
              <ReviewCard {...r} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row — scrolls right */}
      <div className="overflow-hidden w-full">
        <div className="flex gap-4 w-max animate-[scrollRight_60s_linear_infinite]">
          {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map(
            (r, i) => (
              <div key={i} className="w-81">
                <ReviewCard {...r} />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
