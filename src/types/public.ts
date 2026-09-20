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
  prompt: string;
  response?: string;
  status: "idle" | "processing" | "completed" | "error";
}
