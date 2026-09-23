"use client";

import { useState } from "react";
import type { ConversationTurn } from "@/types/public";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

const examples = [
  "I found a child ...",
  "I am looking to find a child ...",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<ConversationTurn[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(content: string) {
    const now = new Date().toISOString();
    setMessages((current) => [...current, { id: `user-${now}`, role: "user", content, status: "completed", timestamp: now }]);
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content }),
      });
      if (!response.ok) throw new Error("The assistant could not be reached.");
      const data = (await response.json()) as { message?: string };
      if (!data.message) throw new Error("The assistant returned an empty response.");
      const assistantMessage = data.message;
      setMessages((current) => [...current, { id: `agent-${Date.now()}`, role: "agent", content: assistantMessage, status: "completed", timestamp: new Date().toISOString() }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The assistant could not be reached.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <section className={`agent-workspace${messages.length > 0 ? " has-messages" : ""}`} aria-labelledby="agent-title">
      <div className="agent-heading">
        <span className="agent-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z" /><path d="m8 12 2.5 2.5L16 9" /></svg>
        </span>
        <p className="t-label">Wayfind assistant</p>
        <h1 id="agent-title" className="agent-title">What do you need help with?</h1>
        <p className="agent-description">Tell me what happened, who you are looking for, or where you need to safely bring a child. I will work out the right next step.</p>
      </div>

      {messages.length > 0 && <MessageList messages={messages} />}
      {isProcessing && <div className="agent-processing" aria-live="polite"><span className="processing-dot" /> Wayfind is thinking</div>}
      {error && <div className="alert alert-error" role="alert">{error} Check your connection and try again.</div>}

      <div className="agent-composer-wrap">
        <MessageInput onSend={handleSend} disabled={isProcessing} />
        {messages.length === 0 && <div className="prompt-examples" aria-label="Example prompts"><p className="prompt-examples-label">Try starting with</p><div className="prompt-example-list">{examples.map((example) => <button key={example} className="prompt-example" type="button" onClick={() => void handleSend(example)}>{example}<span aria-hidden="true">&#8594;</span></button>)}</div></div>}
        <p className="agent-privacy"><span aria-hidden="true">&#9679;</span> Your message is sent securely to the Wayfind support service.</p>
      </div>
    </section>
  );
}
