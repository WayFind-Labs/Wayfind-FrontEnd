import type { Metadata } from "next";
import { ChatInterface } from "@/components/public/ChatInterface";

export const metadata: Metadata = {
  title: "Conversation",
};

export default function ChatPage() {
  return <ChatInterface />;
}
