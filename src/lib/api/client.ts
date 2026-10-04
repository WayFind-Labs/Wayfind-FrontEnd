/**
 * Frontend API client for communicating with ShelterAppUiBackend.
 *
 * All backend URLs are loaded dynamically from environment variables
 * (NEXT_PUBLIC_BACKEND_URL or NEXT_PUBLIC_API_URL) so that in production
 * localhost can easily be replaced with the production URL.
 */

export interface AgentEvent {
  type:
    | "assistant_message"
    | "request_information"
    | "request_image"
    | "search_started"
    | "search_results"
    | "review_pending"
    | "submission_complete"
    | "error";
  content?: string;
  fields?: string[];
  message?: string;
  results?: Array<Record<string, unknown>>;
  record_id?: string;
  case_reference?: string;
  confidence_tier?: string;
  evidence?: Record<string, unknown>;
  media_id?: string;
}

export interface SessionData {
  sessionId: string;
  token: string;
}

const STORAGE_SESSION_KEY = "wayfind_session_id";
const STORAGE_TOKEN_KEY = "wayfind_session_token";

/**
 * Get base URL for backend from environment variables.
 * Defaults to http://localhost:8001 if not set.
 */
export function getBackendBaseUrl(): string {
  if (typeof window !== "undefined") {
    return (
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ||
      "http://localhost:8001"
    );
  }
  return (
    process.env.BACKEND_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:8001"
  );
}

/**
 * Retrieve current active session or create a new session via backend POST /api/sessions.
 */
export async function getOrCreateSession(): Promise<SessionData> {
  if (typeof window !== "undefined") {
    const cachedId = sessionStorage.getItem(STORAGE_SESSION_KEY);
    const cachedToken = sessionStorage.getItem(STORAGE_TOKEN_KEY);
    if (cachedId && cachedToken) {
      return { sessionId: cachedId, token: cachedToken };
    }
  }

  const baseUrl = getBackendBaseUrl();
  const response = await fetch(`${baseUrl}/api/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to initialize session (${response.status})`);
  }

  const data = (await response.json()) as { session_id: string; token: string };
  const sessionData: SessionData = {
    sessionId: data.session_id,
    token: data.token,
  };

  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_SESSION_KEY, sessionData.sessionId);
    sessionStorage.setItem(STORAGE_TOKEN_KEY, sessionData.token);
  }

  return sessionData;
}

/**
 * Reset local session storage to begin a fresh conversation.
 */
export function clearSession(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_SESSION_KEY);
    sessionStorage.removeItem(STORAGE_TOKEN_KEY);
  }
}

/**
 * Send a user message to the backend agent.
 */
export async function sendUserMessage(
  content: string,
  mediaId?: string
): Promise<AgentEvent[]> {
  const session = await getOrCreateSession();
  const baseUrl = getBackendBaseUrl();

  const response = await fetch(
    `${baseUrl}/api/sessions/${session.sessionId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({
        content,
        media_id: mediaId || null,
      }),
    }
  );

  if (!response.ok) {
    if (response.status === 403 || response.status === 401) {
      // Session expired, clear and retry once
      clearSession();
      const freshSession = await getOrCreateSession();
      const retryResponse = await fetch(
        `${baseUrl}/api/sessions/${freshSession.sessionId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${freshSession.token}`,
          },
          body: JSON.stringify({
            content,
            media_id: mediaId || null,
          }),
        }
      );
      if (!retryResponse.ok) {
        throw new Error("Unable to connect with the assistant. Please try again.");
      }
      return (await retryResponse.json()) as AgentEvent[];
    }
    throw new Error("Unable to connect with the assistant. Please try again.");
  }

  return (await response.json()) as AgentEvent[];
}

/**
 * Upload an image to the backend safety intake pipeline.
 */
export async function uploadImage(file: File): Promise<{ mediaId: string }> {
  const session = await getOrCreateSession();
  const baseUrl = getBackendBaseUrl();

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${baseUrl}/api/sessions/${session.sessionId}/images`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image. Please check file type and size.");
  }

  const data = (await response.json()) as { media_id: string };
  return { mediaId: data.media_id };
}

/**
 * Send structured form response data to the backend agent.
 */
export async function sendFormResponse(
  formData: Record<string, unknown>
): Promise<AgentEvent[]> {
  const session = await getOrCreateSession();
  const baseUrl = getBackendBaseUrl();

  const response = await fetch(
    `${baseUrl}/api/sessions/${session.sessionId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({
        form_data: formData,
      }),
    }
  );

  if (!response.ok) {
    if (response.status === 403 || response.status === 401) {
      clearSession();
      const freshSession = await getOrCreateSession();
      const retryResponse = await fetch(
        `${baseUrl}/api/sessions/${freshSession.sessionId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${freshSession.token}`,
          },
          body: JSON.stringify({
            form_data: formData,
          }),
        }
      );
      if (!retryResponse.ok) {
        throw new Error("Unable to submit form details. Please try again.");
      }
      return (await retryResponse.json()) as AgentEvent[];
    }
    throw new Error("Unable to submit form details. Please try again.");
  }

  return (await response.json()) as AgentEvent[];
}

export interface RegisteredChildItem {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  status: string;
  registered_at?: string;
}

/**
 * Fetch registered children for a guardian from backend API.
 */
export async function fetchRegisteredChildren(
  guardianId: string = "demo-guardian-1"
): Promise<RegisteredChildItem[]> {
  const baseUrl = getBackendBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/api/guardians/${guardianId}/children`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    return (await response.json()) as RegisteredChildItem[];
  } catch {
    return [];
  }
}

/**
 * Direct REST child pre-registration without conversational turns.
 */
export async function registerChildDirect(
  data: Record<string, unknown>
): Promise<{ success: boolean; child_id: string; guardian_id: string; message: string }> {
  const baseUrl = getBackendBaseUrl();
  const response = await fetch(`${baseUrl}/api/guardians/register-child`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to register child profile.");
  }

  return await response.json();
}

