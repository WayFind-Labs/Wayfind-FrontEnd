---
name: shelter-context
description: >
	Product, UX, architecture, safety, and frontend context for the Shelter AI PWA,
	also known as Wayfind. Read this before making product or implementation changes.
---

# Shelter AI Client Context

Wayfind is a client-only, prompt-first AI agent for people who need help related
to missing children, found children, shelter access, or nearby support. This
repository is the public PWA client. Shelter staff administration is planned as
a separate PWA and is not part of this client surface.

## One prompt, many intents

The root route `/` is the complete public experience. It behaves like a focused
AI assistant rather than an intent-selection landing page. A person writes one
natural-language prompt, whether they found a child, are looking for a child,
need shelter, or need another kind of help. The AI agent and backend determine
the intent and the appropriate MCP function.

The client sends only the prompt to the backend API. It must not select MCP
tools, construct tool arguments, call MCP directly, or connect to Qdrant,
PostgreSQL, or object storage. Backend responses are rendered as assistant
messages and status guidance. The client must never claim an identity match.

The current client integration boundary is `POST /api/agent` with a JSON body
of `{ "prompt": string }`. The response is expected to contain an assistant
`message`; the backend owns orchestration, follow-up questions, uploads, safety
checks, and MCP calls.

## Frontend structure

| Route | Experience | Purpose |
|---|---|---|
| `/` | Public | Single prompt-first AI agent |
| `/report` | Legacy redirect | Redirects to `/` |
| `/chat` | Legacy redirect | Redirects to `/` |
| `/help` | Public | Help and safety guidance |
| `/settings` | Public | PWA settings |
| Separate future PWA | Shelter staff | Case, people, search, shelter, and audit workflows |

The public route uses a mobile-first shell with a Wayfind top bar and a small
service status bar. The interface should feel quiet, trustworthy, and direct.

## Safety and privacy

- Candidate matches are reviewed by shelter staff before any notification.
- Public screens must describe guidance and report status, never certainty about identity.
- Media safety scanning happens in the backend before image processing or persistence.
- Location collection and media intake are backend-owned follow-up steps.
- The client exposes no shelter-admin controls or staff records.
