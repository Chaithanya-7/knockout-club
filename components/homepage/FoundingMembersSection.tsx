"use client";

import React from "react";
import FadeIn from "@/components/FadeIn";
import FoundingMemberCard from "@/components/homepage/FoundingMemberCard";
import founderImg from "@/public/images/founder.webp";

// Placeholder members: replace names, bios, photos and LinkedIn links.
const members = [
  { name: "Member One", bio: "Add a short bio: their role and what they work on in Knockout Club.", img: founderImg, linkedin: "#" },
  { name: "Member Two", bio: "Add a short bio: their role and what they work on in Knockout Club.", img: founderImg, linkedin: "#" },
  { name: "Member Three", bio: "Add a short bio: their role and what they work on in Knockout Club.", img: founderImg, linkedin: "#" },
  { name: "Member Four", bio: "Add a short bio: their role and what they work on in Knockout Club.", img: founderImg, linkedin: "#" },
  { name: "Member Five", bio: "Add a short bio: their role and what they work on in Knockout Club.", img: founderImg, linkedin: "#" },
  { name: "Member Six", bio: "Add a short bio: their role and what they work on in Knockout Club.", img: founderImg, linkedin: "#" },
];

export default function FoundingMembersSection() {
  const [flippedIndex, setFlippedIndex] = React.useState<number | null>(null);

  const handleFlip = (i: number) => {
    setFlippedIndex(flippedIndex === i ? null : i);
  };

  return (
    <section
      id="founding-members"
      className="text-white pt-20 px-4 sm:px-10 lg:px-20"
    >
      <div className="max-w-8xl mx-auto">
        <FadeIn className="text-center mb-4">
          <h2 className="text-4xl font-bold text-white">
            <span className="text-pbgreen">Knockout Club</span> Members
          </h2>
        </FadeIn>
        <FadeIn
          delay={0.1}
          className="text-center text-white/70 text-sm max-w-xl mx-auto mb-16"
        >
          <p>
            The hackers, builders and CTF players who make Knockout Club what it
            is. Meet the team.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mx-auto">
          {members.map(({ name, bio, img, linkedin }, i) => (
            <FadeIn key={i} delay={i * 0.12} className="h-full">
              <FoundingMemberCard
                name={name}
                bio={bio}
                img={img}
                linkedin={linkedin}
                isFlipped={flippedIndex === i}
                onFlip={() => handleFlip(i)}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
