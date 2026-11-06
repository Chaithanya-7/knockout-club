import Image, { StaticImageData } from "next/image";
import FadeIn from "@/components/FadeIn";
import missionImg from "@/public/images/mission.webp";
import visionImg from "@/public/images/vision.webp";
import asphaltImg from "@/public/images/asphalt.png";

function ImageCard({ alt, src }: { alt: string; src: StaticImageData }) {
  return (
    <div className="relative isolate overflow-hidden w-full sm:w-md lg:w-136.25 h-64 sm:h-96 lg:h-125 border border-pbborder rounded-t-[70px] sm:rounded-t-[110px] rounded-bl-[20px] rounded-br-[20px]">
      <Image
        src={asphaltImg}
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 1024px) 100vw, 544px"
        className="object-cover pointer-events-none mix-blend-screen bg-pbpages"
      />
      <div className="absolute inset-0 bg-[linear-gradient(267.5deg,#1C1C1C_40.67%,rgba(28,28,28,0)_99.81%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(106.06deg,rgba(55,255,0,0.05)_-29.45%,rgba(55,255,0,0)_27.86%)]" />
      <div className="absolute inset-x-6 sm:inset-x-10 lg:inset-x-15 top-6 sm:top-10 lg:top-15 bottom-0 rounded-t-[40px] sm:rounded-t-[50px] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 544px"
          className="object-cover object-center"
          loading="eager"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function MissionVisionSection() {
  return (
    <section
      id="mission-vision"
      className="text-white overflow-hidden px-4 sm:px-10 lg:px-20"
    >
      <div className="max-w-8xl mx-auto">
        <div className="pt-14">
          <FadeIn x={-50} y={0}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-pbgreen">
              Our Mission, together.
            </h2>
          </FadeIn>
          <FadeIn x={-50} y={0} delay={0.1}>
            <p className="pt-3 text-white/70 max-w-270 text-sm sm:text-base leading-relaxed">
              In Knockout Club, we believe in the concept of no spoon-feeding. We
              are here to help you learn and grow together. We are a community
              of coders, hackers, developers, and tech enthusiasts passionate
              about technology and learning.
            </p>
          </FadeIn>
        </div>

        {/* Mission - Image Left */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center py-14 xl:pb-0 sm:pb-15 sm:pt-17">
          <FadeIn
            x={-50}
            y={0}
            delay={0.1}
            className="w-full sm:w-auto shrink-0 mx-auto lg:mx-0"
          >
            <ImageCard alt="Mission" src={missionImg} />
          </FadeIn>

          <FadeIn
            x={50}
            y={0}
            delay={0.25}
            className="w-full border-t-2 lg:border-t-0 lg:border-l-2 border-pbgreen pt-6 lg:pt-0 lg:pl-12"
          >
            <h3 className="text-3xl sm:text-4xl mb-4 sm:mb-6">Mission</h3>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              We want to create a place where people actually learn instead of just following steps. No shortcuts, no spoon feeding. Just curiosity, effort, and people helping each other grow.

              If you are stuck, ask. If you are learning, share. If you are building something, show it. The idea is simple. Learn by doing, make mistakes, and figure things out together. That is how real progress happens.
            </p>
          </FadeIn>
        </div>

        {/* Vision - Image Right */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center pb-14 sm:pb-20 xl:-mt-12">
          <FadeIn
            x={-50}
            y={0}
            className="order-2 lg:order-1 w-full border-t-2 lg:border-t-0 lg:border-r-2 border-pbgreen pt-6 lg:pt-0 lg:pr-12"
          >
            <h3 className="text-3xl sm:text-4xl mb-4 sm:mb-6">Vision</h3>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              We see a community where learning feels normal and not forced. A place where beginners can start without hesitation and experienced people still find new challenges.

              Over time, this should become more than just a coding space. A group of people who build things, share ideas, and keep pushing each other forward. Not just better developers, but better thinkers.
            </p>
          </FadeIn>

          <FadeIn
            x={50}
            y={0}
            delay={0.15}
            className="order-1 lg:order-2 w-full sm:w-auto shrink-0 mx-auto lg:mx-0"
          >
            <ImageCard alt="Vision" src={visionImg} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
