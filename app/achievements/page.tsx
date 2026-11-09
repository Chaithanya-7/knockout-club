import Achievements from "@/components/achievements/Achievements";
import docs from "@/data/achievements.json";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  path: "/achievements",
  title: "Achievements",
  description:
    "CTF results, wins and milestones from the members of Knockout Club.",
});
export default function AchievementsPage() {
  return <Achievements initialDocs={docs} />;
}
