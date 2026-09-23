"use client";

import { useEffect, useRef } from "react";
import type { ConversationTurn } from "@/types/public";

export function MessageList({ messages }: { messages: ConversationTurn[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div ref={listRef} className="message-list" aria-live="polite">
      {messages.map((message) => (
        <div key={message.id} className={message.role === "user" ? "message-row user" : "message-row agent"}>
          <div className={message.role === "user" ? "msg-user" : "msg-agent"}>
            <p>{message.content}</p>
            {message.status === "processing" && <span className="message-status">Thinking...</span>}
            {message.suggestedActions && message.suggestedActions.length > 0 && (
              <div className="msg-agent-actions">
                {message.suggestedActions.map((action) => <button key={action} className="btn btn-secondary btn-sm" type="button">{action}</button>)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
