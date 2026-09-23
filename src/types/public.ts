/**
 * Type declarations for the Public / Conversational user experience.
 */
export interface PublicUserSession {
  sessionId: string;
  createdAt: string;
  locale?: string;
}

export interface ConversationTurn {
  id: string;
  role: "user" | "agent";
  content: string;
  status: "idle" | "processing" | "completed" | "error";
  timestamp: string;
  suggestedActions?: string[];
}

/** The only request shape the public client sends to the backend agent. */
export interface AgentPromptRequest {
  prompt: string;
}

/** The backend may add metadata, but the public client renders the message only. */
export interface AgentPromptResponse {
  message: string;
  metadata?: Record<string, unknown>;
}
