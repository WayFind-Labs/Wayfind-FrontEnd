"use client";

import { useEffect, useRef, useState } from "react";
import type { ConversationTurn } from "@/types/public";
import { AgentEvent, sendUserMessage, sendFormResponse } from "@/lib/api/client";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

export type ChatScenario = "register" | "search" | "found";

const examples = [
  "I found a child alone near Saddar",
  "I am looking for my 8-year-old son who went missing in Gulberg",
  "Where is the nearest authorized child intake shelter?",
];

interface ChatInterfaceProps {
  /** Pre-seed text sent automatically on mount to establish intent context */
  seedMessage?: string;
  /** Visual scenario context for the sub-header pill */
  scenario?: ChatScenario;
  /** Called when user wants to go back to the landing page */
  onBack?: () => void;
}

const SCENARIO_LABELS: Record<ChatScenario, { label: string; color: string }> = {
  register: { label: "Registering a child", color: "accent" },
  search:   { label: "Searching for a lost child", color: "error" },
  found:    { label: "Found a child", color: "teal" },
};

export function ChatInterface({ seedMessage, scenario, onBack }: ChatInterfaceProps = {}) {
  const [messages, setMessages] = useState<ConversationTurn[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seededRef = useRef(false);

  // Auto-send the seed message exactly once on first mount
  useEffect(() => {
    if (seedMessage && !seededRef.current) {
      seededRef.current = true;
      void handleSend(seedMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processEvents = (events: AgentEvent[]) => {
    const newTurns: ConversationTurn[] = [];

    for (const evt of events) {
      const timestamp = new Date().toISOString();
      const uniqueId = `agent-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      if (evt.type === "assistant_message" && evt.content) {
        newTurns.push({
          id: uniqueId,
          role: "agent",
          content: evt.content,
          status: "completed",
          timestamp,
        });
      } else if (evt.type === "request_information" && evt.fields && evt.fields.length > 0) {
        newTurns.push({
          id: uniqueId,
          role: "agent",
          content: evt.content || "Please provide the following details to help us proceed:",
          status: "completed",
          timestamp,
          formFields: evt.fields,
        });
      } else if (evt.type === "request_image") {
        newTurns.push({
          id: uniqueId,
          role: "agent",
          content: evt.content || "Please attach a photo if available:",
          status: "completed",
          timestamp,
          requiresImage: true,
        });
      } else if (evt.type === "review_pending") {
        newTurns.push({
          id: uniqueId,
          role: "agent",
          content: evt.content || "Your case has been forwarded to our shelter verification team.",
          status: "completed",
          timestamp,
          caseReference: evt.case_reference,
          confidenceTier: evt.confidence_tier,
        });
      } else if (evt.type === "submission_complete" && (evt.record_id || evt.case_reference)) {
        newTurns.push({
          id: uniqueId,
          role: "agent",
          content: `Report successfully recorded. Case Reference: ${evt.record_id || evt.case_reference}`,
          status: "completed",
          timestamp,
          caseReference: evt.record_id || evt.case_reference,
        });
      } else if (evt.type === "error" && (evt.message || evt.content)) {
        newTurns.push({
          id: uniqueId,
          role: "agent",
          content: evt.message || evt.content || "An error occurred.",
          status: "error",
          timestamp,
        });
      }
    }

    if (newTurns.length > 0) {
      setMessages((current) => [...current, ...newTurns]);
    }
  };

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
      processEvents(events);
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

  async function handleFormSubmit(formData: Record<string, unknown>) {
    setIsProcessing(true);
    setError(null);

    // Mark previous form cards as submitted
    setMessages((current) =>
      current.map((turn) =>
        turn.formFields ? { ...turn, formDataSubmitted: true } : turn
      )
    );

    try {
      const events: AgentEvent[] = await sendFormResponse(formData);
      if (events && events.length > 0) {
        processEvents(events);
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to send details. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleImageUpload(mediaId: string) {
    setIsProcessing(true);
    setError(null);

    try {
      const events: AgentEvent[] = await sendUserMessage("", mediaId);
      if (events && events.length > 0) {
        processEvents(events);
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to register image with the assistant."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  const scenarioMeta = scenario ? SCENARIO_LABELS[scenario] : null;

  return (
    <section className={`agent-workspace${messages.length > 0 ? " has-messages" : ""}`} aria-labelledby="agent-title">
      {/* Back button + scenario pill when seeded from landing page */}
      {(onBack || scenarioMeta) && (
        <div className="agent-context-bar">
          {onBack && (
            <button type="button" className="agent-back-btn" onClick={onBack} aria-label="Back to home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="18" height="18"><path d="M19 12H5" /><path d="m12 5-7 7 7 7" /></svg>
              Back
            </button>
          )}
          {scenarioMeta && (
            <span className={`badge badge-${scenarioMeta.color} agent-scenario-pill`}>
              {scenarioMeta.label}
            </span>
          )}
        </div>
      )}

      {messages.length === 0 && !seedMessage && (
        <div className="agent-heading">
          <span className="agent-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z" /><path d="m8 12 2.5 2.5L16 9" /></svg>
          </span>
          <p className="t-label">Wayfind assistant</p>
          <h1 id="agent-title" className="agent-title">What do you need help with?</h1>
          <p className="agent-description">Tell me what happened, who you are looking for, or where you need to safely bring a child. I will work out the right next step.</p>
        </div>
      )}

      <div className="agent-conversation">
        {messages.length > 0 ? (
          <MessageList
            messages={messages}
            onFormSubmit={handleFormSubmit}
            onImageUpload={handleImageUpload}
          />
        ) : (
          <div className="agent-empty-space" aria-hidden="true" />
        )}
        {isProcessing && <div className="agent-processing" aria-live="polite"><span className="processing-dot" /> Wayfind is thinking</div>}
        {error && <div className="alert alert-error" role="alert">{error} Check your connection and try again.</div>}
      </div>

      <div className="agent-composer-wrap">
        {messages.length === 0 && (
          <div className="prompt-examples" aria-label="Example prompts">
            <p className="prompt-examples-label">Try starting with</p>
            <div className="prompt-example-list">
              {examples.map((example) => (
                <button
                  key={example}
                  className="prompt-example"
                  type="button"
                  onClick={() => void handleSend(example)}
                >
                  {example}
                  <span aria-hidden="true">&#8594;</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <MessageInput onSend={handleSend} disabled={isProcessing} />
        <p className="agent-privacy"><span aria-hidden="true">&#9679;</span> Your message is sent securely to the Wayfind support service.</p>
      </div>
    </section>
  );
}
