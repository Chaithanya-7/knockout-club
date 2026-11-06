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
        Connect with other <span className="text-pbgreen">Coders</span>
      </>
    ),
    description:
      "Stuck on something and tired of staring at the same error for hours? Just ask. Someone here has probably been through the same thing and can point you in the right direction. Or maybe you just want a second opinion on your code, your project, or an idea you are working on. Share it. Talk it out. You will find people who are figuring things out just like you.",
    image: connect,
    imagePosition: "right",
  },
  {
    title: (
      <>
        Want to learn <span className="text-pbgreen">something</span> new?
      </>
    ),
    description:
      "Learning here isn’t about following step by step guides or memorizing solutions. It’s about exploring ideas, asking better questions, and figuring things out with people who are on the same path as you. Whether you’re just getting started or trying to level up, there’s always someone around to nudge you in the right direction.",
    image: learn,
    imagePosition: "left",
  },
  {
    title: (
      <>
        Feeling <span className="text-pbgreen">bored?</span>
      </>
    ),
    description:
      "Hop into a chat, talk random stuff, share memes, or just see what others are up to. You’ll find people planning side projects, playing games, or just hanging out after a long day. It’s more than just code here . It’s a space where you can chill, reset, and enjoy being part of something.",
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
