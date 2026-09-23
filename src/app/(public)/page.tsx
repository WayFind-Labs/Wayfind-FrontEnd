import type { Metadata } from "next";
import { HomeIntentSelector } from "@/components/public/HomeIntentSelector";

export const metadata: Metadata = {
  title: "AI Agent",
};

export default function PublicPage() {
  return <HomeIntentSelector />;
}
