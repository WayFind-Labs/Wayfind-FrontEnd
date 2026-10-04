"use client";

import { useEffect, useRef } from "react";
import type { ConversationTurn } from "@/types/public";
import { InlineFormCard } from "./InlineFormCard";
import { InlineImageUploadCard } from "./InlineImageUploadCard";
import { InlineCaseReviewCard } from "./InlineCaseReviewCard";

interface MessageListProps {
  messages: ConversationTurn[];
  onFormSubmit?: (formData: Record<string, unknown>) => Promise<void>;
  onImageUpload?: (mediaId: string) => Promise<void>;
}

export function MessageList({
  messages,
  onFormSubmit,
  onImageUpload,
}: MessageListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div ref={listRef} className="message-list" aria-live="polite">
      {messages.map((message) => (
        <div
          key={message.id}
          className={message.role === "user" ? "message-row user" : "message-row agent"}
        >
          <div className={message.role === "user" ? "msg-user" : "msg-agent"}>
            {message.content && <p>{message.content}</p>}

            {/* Inline Form prompt from request_information */}
            {message.formFields && message.formFields.length > 0 && onFormSubmit && (
              <InlineFormCard
                fields={message.formFields}
                submitted={message.formDataSubmitted}
                onSubmit={onFormSubmit}
              />
            )}

            {/* Inline Photo upload prompt from request_image */}
            {message.requiresImage && onImageUpload && (
              <InlineImageUploadCard onImageUploaded={onImageUpload} />
            )}

            {/* Case review reference card from review_pending */}
            {message.caseReference && (
              <InlineCaseReviewCard
                caseReference={message.caseReference}
                confidenceTier={message.confidenceTier}
              />
            )}

            {message.status === "processing" && <span className="message-status">Thinking...</span>}

            {message.suggestedActions && message.suggestedActions.length > 0 && (
              <div className="msg-agent-actions">
                {message.suggestedActions.map((action) => (
                  <button key={action} className="btn btn-secondary btn-sm" type="button">
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
