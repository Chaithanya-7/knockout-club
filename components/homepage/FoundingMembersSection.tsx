"use client";

import React from "react";
import FadeIn from "@/components/FadeIn";
import FoundingMemberCard from "@/components/homepage/FoundingMemberCard";
import founderImg from "@/public/images/founder.webp";

// Photos: replace founderImg with each member's photo when available.
const members = [
  { name: "Pavan C", bio: "Active CTF player and CPENT certified. Loves breaking into web apps and chasing down flags under pressure.", img: founderImg, linkedin: "https://www.linkedin.com/in/pavan-cx7/" },
  { name: "Chaithanya", bio: "CPENT certified penetration tester and CTF player. Enjoys turning hackathon ideas into working builds.", img: founderImg, linkedin: "https://www.linkedin.com/in/chaithanyakumar-s/" },
  { name: "Madhu KK", bio: "CTF player and hackathon regular. Digs into reversing and forensics challenges until they crack.", img: founderImg, linkedin: "https://www.linkedin.com/in/madhu-k-k-0554902a9/" },
  { name: "Dinakar N", bio: "Hackathon builder and CTF player. Brings ideas to life with IoT and hardware projects.", img: founderImg, linkedin: "https://www.linkedin.com/in/dinakar-gowda-n-b7b06b341/" },
  { name: "Ganesha HK", bio: "PJPT certified and an active CTF player. Focused on network and Active Directory exploitation.", img: founderImg, linkedin: "https://www.linkedin.com/in/hackmeifyoucan/" },
  { name: "Jhenkar", bio: "CTF player and hackathon teammate. Always up for a new challenge, from crypto puzzles to late-night builds.", img: founderImg, linkedin: "" },
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
