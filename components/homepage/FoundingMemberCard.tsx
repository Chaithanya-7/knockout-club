"use client";

import Image, { StaticImageData } from "next/image";
import { LinkedIn } from "@/components/Icons";

interface Props {
  name: string;
  bio: string;
  img: StaticImageData;
  linkedin: string;
  isFlipped?: boolean;
  onFlip?: () => void;
}

export default function FoundingMemberCard({
  name,
  bio,
  img,
  linkedin,
  isFlipped,
  onFlip,
}: Props) {
  return (
    <div
      className={`relative z-10 flex flex-col items-center w-full h-full rounded-t-[54px] rounded-b-xl border border-pbborder hover:border-pbgreen transition-colors duration-300 bg-pbpages p-6 cursor-pointer touch-manipulation ${isFlipped ? "border-pbgreen" : ""}`}
      onClick={() => onFlip?.()}
    >
      <div className="relative w-full aspect-square perspective-[1000px] shrink-0">
        <div
          className={`relative w-full h-full transition-all duration-700 transform-3d ${
            isFlipped ? "transform-[rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 backface-hidden w-full h-full">
            <Image
              src={img}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="rounded-[30px] object-cover object-top"
              draggable={false}
            />
          </div>

          <div
            className="
              absolute inset-0 w-full h-full backface-hidden transform-[rotateY(180deg)]
              rounded-[30px] border border-pbgreen bg-pbpages
              flex items-center justify-center
            "
          >
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:scale-110 transition-transform"
              >
                <LinkedIn className="h-16 w-16 text-pbgreen" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-3 mb-1 w-full">
        <div className="flex flex-col items-center justify-center gap-1.5 w-full">
          <span className="text-pbgreen font-light whitespace-nowrap bg-pbdarkgray w-fit text-center rounded-full px-4 sm:px-6 py-1.5 sm:py-1 sm:mb-1.5 mb-1.5 text-sm sm:text-base border border-pbborder capitalize">
            {name}
          </span>
          <p className="text-pbtext font-light text-center text-sm leading-relaxed px-1 pb-1">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}
