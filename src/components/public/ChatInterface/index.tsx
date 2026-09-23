"use client";

import { useState } from "react";
import type { ConversationTurn } from "@/types/public";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

const welcome: ConversationTurn = {
  id: "welcome",
  role: "agent",
  content: "I can help you look for a missing child or find the right local support. Tell me what is happening, in your own words.",
  status: "completed",
  timestamp: new Date().toISOString(),
  suggestedActions: ["Look for a missing child", "Find local help"],
};

export function ChatInterface() {
  const [messages, setMessages] = useState<ConversationTurn[]>([welcome]);
  const [isProcessing, setIsProcessing] = useState(false);

  function handleSend(content: string) {
    const now = new Date().toISOString();
    setMessages((current) => [...current, { id: `user-${now}`, role: "user", content, status: "completed", timestamp: now }]);
    setIsProcessing(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: `agent-${Date.now()}`, role: "agent", content: "Thank you. A Wayfind support worker can help you take the next step. Please share the child's name, where they were last seen, or any detail you know.", status: "completed", timestamp: new Date().toISOString() }]);
      setIsProcessing(false);
    }, 450);
  }

  return (
    <section className="public-page chat-page" aria-labelledby="chat-title">
      <div className="public-intro compact">
        <p className="t-label">Wayfind assistant</p>
        <h1 id="chat-title" className="t-page">Tell us what you need</h1>
        <p className="t-body t-muted">Start with whatever you know. A support worker may follow up with questions.</p>
      </div>
      <div className="chat-panel">
        <MessageList messages={messages} />
        <MessageInput onSend={handleSend} disabled={isProcessing} />
      </div>
    </section>
  );
}
