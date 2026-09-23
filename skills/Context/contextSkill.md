---
name: shelter-context
description: >
	Product, UX, architecture, safety, and frontend context for the Shelter AI PWA,
	also known as Wayfind. Read this before making product or implementation changes.
---

# Shelter AI PWA Context

Wayfind is a humanitarian shelter and case-records application for the public,
shelter workers, and partner NGOs. The public experience is a prompt-first PWA;
the shelter experience is an operational workspace for reviewing records and
reports.

## Found-child reporting

The public `/report` route is the direct submission flow for someone who has
found a child. It must begin with a natural-language prompt rather than a long
structured form. As the person types, the frontend can reveal a small number of
follow-up questions to collect useful details without blocking the first report.

Images are optional and must be uploaded through the Shelter API. The interface
must explain that every image is safety-checked before processing. Location is
also optional and must be requested explicitly; do not infer or silently collect
precise location data. A submitted report may receive a status, but the public
user must never be shown an unverified match as a confirmed identity.

## Frontend structure

| Route | Experience | Purpose |
|---|---|---|
| `/` | Public | Choose an intent: report, search, or get help |
| `/report` | Public | Prompt-first found-child submission |
| `/chat` | Public | Missing-child search and general guidance |
| `/help` | Public | Help and safety guidance |
| `/settings` | Public | PWA settings |
| `/shelter/*` | Shelter staff | Case, people, search, shelter, and audit workflows |

The public routes use a mobile-first shell with a Wayfind top bar and bottom
navigation. The frontend talks only to the Shelter API and never directly to
MCP, Qdrant, or PostgreSQL.

## Safety and privacy

- Candidate matches are reviewed by shelter staff before any notification.
- Public screens must describe guidance and report status, never certainty about identity.
- Media safety scanning happens before image processing or persistence.
- Location collection is explicit, optional, and limited to what the person provides.
