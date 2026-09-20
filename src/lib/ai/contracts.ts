/**
 * AI Agent & MCP Architectural Foundation Contracts
 *
 * This file defines the type contracts establishing the future integration boundary:
 *   AI Agent
 *       ↓
 *   MCP Client
 *       ↓
 *   MCP Server
 *       ↓
 *   Backend / RAG
 *       ↓
 *   Database / Knowledge Sources
 *
 * NOTE: These are structural contracts only. No runtime API calls, vector DBs,
 * or MCP client instances are implemented at this stage.
 */

export type AgentRole = "user" | "assistant" | "system" | "tool";

export interface AgentMessage {
  id: string;
  role: AgentRole;
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface McpToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export interface McpToolCall {
  id: string;
  toolName: string;
  arguments: Record<string, unknown>;
}

export interface McpToolResult {
  toolCallId: string;
  content: unknown;
  isError?: boolean;
}

export interface RagDocumentReference {
  documentId: string;
  title: string;
  page?: number | string;
  excerpt?: string;
  confidenceScore?: number;
}

export interface RagQueryResult {
  query: string;
  results: RagDocumentReference[];
}
