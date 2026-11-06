import Achievements from "@/components/achievements/Achievements";
import docs from "@/data/achievements.json";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  path: "/achievements",
  title: "Achievements",
  description:
    "See the milestones and achievements of Knockout Club - recognitions, wins, and accomplishments from our community.",
});
export default function AchievementsPage() {
  return <Achievements initialDocs={docs} />;
}
