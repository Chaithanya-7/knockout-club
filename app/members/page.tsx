import Members from "@/components/members/Members";
import membersData from "@/data/members.json";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  path: "/members",
  title: "Members",
  description:
    "Meet the members of Knockout Club - the student hackers and CTF players behind our team.",
});

export default function Events() {
  const members = membersData as React.ComponentProps<typeof Members>["members"];

  return (
    <section className="w-full h-full" id="members">
      <Members members={members} />
    </section>
  );
}
