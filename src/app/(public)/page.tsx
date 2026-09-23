import type { Metadata } from "next";
import { ChatInterface } from "@/components/public/ChatInterface";

export const metadata: Metadata = {
  title: "Wayfind assistant",
  description: "A single prompt for finding help, reporting a child, or searching for someone missing.",
};

export default function PublicPage() {
  return <ChatInterface />;
}
