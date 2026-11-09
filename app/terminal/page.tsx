import type { Metadata } from "next";
import Terminal from "@/components/terminal/Terminal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  path: "/terminal",
  title: "Terminal",
  description: "Explore Knockout Club from the command line.",
});

export default function TerminalPage() {
  return <Terminal />;
}
