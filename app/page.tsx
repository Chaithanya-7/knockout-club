import type { Metadata } from "next";
import HomeClient from "@/components/homepage/HomeClient";
import { safeJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import HeroSection from "@/components/homepage/HeroSection";
import Recruitment from "@/components/ui/Recruitment";
import MissionVisionSection from "@/components/homepage/MissionVisionSection";
import CardStack from "@/components/homepage/CardStack";
import DomainsSection from "@/components/homepage/DomainsSection";
import ActivitiesSection from "@/components/homepage/ActivitiesSection";
import FoundingMembersSection from "@/components/homepage/FoundingMembersSection";
import StayConnectedSection from "@/components/homepage/StayConnectedSection";

import { SITE_URL } from "@/lib/seo/constants";

export const metadata = buildMetadata({
  path: "/",
  absoluteTitle: "Knockout Club",
});


export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Knockout Club",
    url: SITE_URL,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(jsonLd),
        }}
      />
      <HomeClient />
      <div className="relative">
        <Recruitment />
        <HeroSection />
      </div>
      <DomainsSection />
      <ActivitiesSection />
      <MissionVisionSection />
      <CardStack />
      <FoundingMembersSection />
      <StayConnectedSection />
    </>
  );
}