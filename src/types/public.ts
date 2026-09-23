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

/** Status lifecycle for a found-child or missing-child report */
export type ReportStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "matched"
  | "resolved"
  | "closed";

/** An image the user attaches to a found-child report */
export interface ImageAttachment {
  /** Client-side object URL (before upload) or server-returned reference */
  previewUrl: string;
  /** File name for display */
  fileName: string;
  /** File size in bytes */
  sizeBytes: number;
  /** Set to true once the image has been confirmed safe and uploaded */
  uploaded: boolean;
}

/**
 * A follow-up question the AI surfaces during found-child reporting.
 * The AI drives the ordering; the frontend just renders these.
 */
export interface FollowUpQuestion {
  id: string;
  question: string;
  /** hint shown as placeholder in the answer field */
  hint?: string;
  /** If true the user must answer before continuing */
  required: boolean;
  /** User's typed answer — updated locally as they type */
  answer?: string;
}

/**
 * The in-progress state of a found-child report being assembled
 * through the prompt-first UI on /report.
 */
export interface FoundChildReportDraft {
  /** Free-text description the user typed first */
  initialPrompt: string;
  /** Structured answers collected via follow-up questions */
  followUpAnswers: Record<string, string>;
  /** Images attached (not yet submitted until status = "submitted") */
  images: ImageAttachment[];
  /** Optional location the user provides */
  locationDescription?: string;
  /** Current lifecycle state */
  status: ReportStatus;
  /** Set once the API returns a report reference */
  reportId?: string;
}

/** A report payload accepted by the public submission flow. */
export interface FoundChildReport extends FoundChildReportDraft {
  submittedAt?: string;
}
