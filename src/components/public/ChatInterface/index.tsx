"use client";

import { useState } from "react";
import type { ConversationTurn } from "@/types/public";
import { AgentEvent, sendUserMessage } from "@/lib/api/client";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

const examples = [
  "I found a child alone near Saddar",
  "I am looking for my 8-year-old son who went missing in Gulberg",
  "Where is the nearest authorized child intake shelter?",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<ConversationTurn[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(content: string) {
    const now = new Date().toISOString();
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", content, status: "completed", timestamp: now },
    ]);
    setIsProcessing(true);
    setError(null);

    try {
      const events: AgentEvent[] = await sendUserMessage(content);

      if (!events || events.length === 0) {
        throw new Error("The assistant returned an empty response.");
      }

      const newTurns: ConversationTurn[] = [];
      for (const evt of events) {
        const timestamp = new Date().toISOString();
        if (evt.type === "assistant_message" && evt.content) {
          newTurns.push({
            id: `agent-${Date.now()}-${Math.random()}`,
            role: "agent",
            content: evt.content,
            status: "completed",
            timestamp,
          });
        } else if (evt.type === "error" && evt.message) {
          newTurns.push({
            id: `agent-${Date.now()}-${Math.random()}`,
            role: "agent",
            content: evt.message,
            status: "error",
            timestamp,
          });
        } else if (evt.type === "submission_complete" && evt.record_id) {
          newTurns.push({
            id: `agent-${Date.now()}-${Math.random()}`,
            role: "agent",
            content: `Report successfully submitted. Reference number: ${evt.record_id}`,
            status: "completed",
            timestamp,
          });
        }
      }

      if (newTurns.length > 0) {
        setMessages((current) => [...current, ...newTurns]);
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The assistant could not be reached. Please check your connection."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <section className={`agent-workspace${messages.length > 0 ? " has-messages" : ""}`} aria-labelledby="agent-title">
      {messages.length === 0 && <div className="agent-heading">
        <span className="agent-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z" /><path d="m8 12 2.5 2.5L16 9" /></svg>
        </span>
        <p className="t-label">Wayfind assistant</p>
        <h1 id="agent-title" className="agent-title">What do you need help with?</h1>
        <p className="agent-description">Tell me what happened, who you are looking for, or where you need to safely bring a child. I will work out the right next step.</p>
      </div>}

      <div className="agent-conversation">
        {messages.length > 0 ? <MessageList messages={messages} /> : <div className="agent-empty-space" aria-hidden="true" />}
        {isProcessing && <div className="agent-processing" aria-live="polite"><span className="processing-dot" /> Wayfind is thinking</div>}
        {error && <div className="alert alert-error" role="alert">{error} Check your connection and try again.</div>}
      </div>

      <div className="agent-composer-wrap">
        {messages.length === 0 && <div className="prompt-examples" aria-label="Example prompts"><p className="prompt-examples-label">Try starting with</p><div className="prompt-example-list">{examples.map((example) => <button key={example} className="prompt-example" type="button" onClick={() => void handleSend(example)}>{example}<span aria-hidden="true">&#8594;</span></button>)}</div></div>}
        <MessageInput onSend={handleSend} disabled={isProcessing} />
        <p className="agent-privacy"><span aria-hidden="true">&#9679;</span> Your message is sent securely to the Wayfind support service.</p>
      </div>
    </section>
  );
}
