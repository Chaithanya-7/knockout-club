import Image from "next/image";
import FadeIn from "@/components/FadeIn";

import ctfIcon from "@/public/images/icons/Cybersecurity.webp";
import hackathonIcon from "@/public/images/icons/hackathon.webp";
import iotIcon from "@/public/images/icons/iot.webp";
import embeddedIcon from "@/public/images/icons/systems.webp";
import webIcon from "@/public/images/icons/web.webp";
import pwnIcon from "@/public/images/icons/pwn.webp";
import reverseIcon from "@/public/images/icons/reverse.webp";
import cryptoIcon from "@/public/images/icons/crypto.webp";
import forensicsIcon from "@/public/images/icons/forensics.webp";
import osintIcon from "@/public/images/icons/osint.webp";
import networkIcon from "@/public/images/icons/network.webp";
import hardwareIcon from "@/public/images/icons/hardware-hacking.webp";

const domains = [
  { name: "Capture The Flag", icon: ctfIcon },
  { name: "Hackathons", icon: hackathonIcon },
  { name: "IoT & Hardware", icon: iotIcon },
  { name: "Embedded Systems", icon: embeddedIcon },
  { name: "Web Exploitation", icon: webIcon },
  { name: "Binary Exploitation", icon: pwnIcon },
  { name: "Reverse Engineering", icon: reverseIcon },
  { name: "Cryptography", icon: cryptoIcon },
  { name: "Digital Forensics", icon: forensicsIcon },
  { name: "OSINT", icon: osintIcon },
  { name: "Network Security", icon: networkIcon },
  { name: "Hardware Hacking", icon: hardwareIcon },
];

export default function DomainsSection() {
  return (
    <section id="domains" className="text-white px-4 sm:px-10 lg:px-20">
      <FadeIn className="text-center mb-20">
        <h2 className="text-4xl font-bold text-pbgreen mb-3">
          Domains we Love
        </h2>
        <p className="text-white/70 text-sm">
          From capturing flags to building and breaking hardware, these are the areas we live in.
        </p>
      </FadeIn>

      <div className="relative max-w-8xl mx-auto ko-panel overflow-hidden">
        <Image
          width={224}
          className="absolute"
          height={213}
          src={"/top-left-dot.svg"}
          alt="dotted-BG"
        />
        <Image
          width={224}
          className="absolute right-0 bottom-0"
          height={213}
          src={"/right-bottom-dot.svg"}
          alt="dotted-BG"
        /> 

        <div className="bg-pbdarkgray p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {domains.map(({ name, icon }, i) => (
              <FadeIn key={i} delay={(i % 4) * 0.1} className="flex">
                <div className="flex flex-col items-center justify-center py-8 px-6 gap-3 z-10 w-full bg-pbcard border-white/16 border ko-panel-sm transition-all duration-300 hover:border-pbgreen">
                  <div className="w-17.5 h-17.5 rounded-full p-2 flex bg-[linear-gradient(180deg,rgba(0,255,156,0.05)_0%,rgba(0,255,156,0)_100%)]">
                    <div className="w-13.5 h-13.5 rounded-full p-3 flex items-center justify-center bg-[linear-gradient(180deg,rgba(0,255,156,0.1)_-66.22%,rgba(0,255,156,0)_85.46%)]">
                      <Image
                        src={icon}
                        alt={name}
                        className="w-7.5 h-7.5 object-contain rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-white text-center leading-tight">
                    {name}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
