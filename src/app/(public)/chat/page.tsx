import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Conversation",
};

export default function ChatPage() {
  redirect("/");
}
