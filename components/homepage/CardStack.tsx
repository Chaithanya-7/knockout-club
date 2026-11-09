"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";
import connect from "@/public/images/connect.webp";
import learn from "@/public/images/learn.webp";
import bored from "@/public/images/bored.webp";

type Card = {
  title: React.ReactNode;
  description: string;
  image: StaticImageData;
  imagePosition: "left" | "right";
};

const cards: Card[] = [
  {
    title: (
      <>
        Team up with other <span className="text-pbgreen">Hackers</span>
      </>
    ),
    description:
      "Stuck on a challenge at 2 AM with no idea where the flag is hiding? Drop it in the chat. Someone has probably seen that trick before, or will happily dig into it with you. From reversing a binary to tracing a weird network capture, nobody solves alone here.",
    image: connect,
    imagePosition: "right",
  },
  {
    title: (
      <>
        Ready to break <span className="text-pbgreen">something</span> new?
      </>
    ),
    description:
      "Web exploits, buffer overflows, ciphers, forensics: pick a category and start pulling at threads. Our workshops and practice labs take you from your first SQL injection to your first real CTF, with people around to nudge you when you get stuck.",
    image: learn,
    imagePosition: "left",
  },
  {
    title: (
      <>
        Need a <span className="text-pbgreen">break?</span>
      </>
    ),
    description:
      "Not everything is about flags. Hang out in the chat, swap memes, argue about the best Linux distro or join a game night after a long contest. Knockout Club is a team first, and the best teams have fun together.",
    image: bored,
    imagePosition: "right",
  },
];

const StickyCard = ({
  i,
  card,
  progress,
  range,
  targetScale,
  isLast,
}: {
  i: number;
  card: Card;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  isLast: boolean;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  const cardOpacity = useTransform(
    progress,
    isLast ? range : [range[0] + 1 / cards.length, 1],
    [1, isLast ? 1 : 0.4],
  );

  const isLCP = card.image === bored;

  const imageEl = (
    <div className="relative w-full h-full min-h-52 rounded-2xl overflow-hidden">
      <Image
        src={card.image}
        alt=""
        className="inset-0 w-full h-full object-cover"
        loading={isLCP ? "eager" : "lazy"}
        draggable={false}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/paperBack.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale"
        style={{
          mixBlendMode: "overlay",
          opacity: 0.6,
        }}
      />
    </div>
  );

  const textEl = (
    <div className="flex flex-col justify-center h-full px-2">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-4">
        {card.title}
      </h2>
      <p className="text-pbtext text-sm sm:text-base leading-relaxed">
        {card.description}
      </p>
    </div>
  );

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center h-screen 3xl:-mb-24"
    >
      <motion.div
        style={{
          scale,
          opacity: cardOpacity,
          top: `calc(-5vh + ${i * 24}px)`,
        }}
        className="relative w-full mt-18 max-w-8xl mx-auto bg-pbgray rounded-3xl overflow-hidden shadow-2xl border border-transparent hover:border-pbgreen transition-colors duration-200"
      >
        <div
          className={`flex flex-col ${card.imagePosition === "left"
            ? "md:flex-row-reverse"
            : "md:flex-row"
            } gap-0`}
        >
          <div className="flex-1 p-8 sm:p-10 lg:p-14">{textEl}</div>

          <div className="flex-1 relative min-h- md:min-h-80">{imageEl}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default function CardStack() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="cards">
        <div
          ref={container}
          style={{ height: `${(cards.length + 1) * 100}vh` }}
          className="relative w-full px-4 sm:px-10 lg:px-20"
        >
          {cards.map((card, i) => {
            const targetScale = Math.max(
              0.75,
              1 - (cards.length - i - 1) * 0.08,
            );
            return (
              <StickyCard
                key={i}
                i={i}
                card={card}
                progress={scrollYProgress}
                range={[i / cards.length, 1]}
                targetScale={targetScale}
                isLast={i === cards.length - 1}
              />
            );
          })}
        </div>
    </section>
  );
}
