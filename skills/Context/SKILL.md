---
name: shelter-context
description: >
  Authoritative product, UX, architecture, safety, and development context for
  the Wayfind public AI agent client. Wayfind focuses on found-child intake,
  missing-child searches, and routing people to authorized child-intake shelters.
  Use alongside `shelter-hooks` and `wayfind-design-system`.
---

<!-- Full content lives in contextSkill.md in this same folder. -->
<!-- This file exists so the agent customization system can discover the skill by SKILL.md convention. -->

See [`contextSkill.md`](./contextSkill.md) for the full context document.

## Quick reference — frontend routes

| Route | Experience | Purpose |
|---|---|---|
| `/` | Public | Single prompt-first AI agent for child-safety workflows |
| `/report` | Legacy redirect | Redirects to `/` |
| `/chat` | Legacy redirect | Redirects to `/` |
| `/help` | Public | Help and guidance |
| `/settings` | Public | PWA settings |
| Separate future PWA | Shelter Staff | Child records, intake, matching, and audit workflows |

## Key architectural rules for frontend

1. The frontend only talks to the Shelter API, currently `POST /api/agent` with `{ prompt }`.
2. The backend decides whether to find an intake shelter, submit a found-child report, search for a missing child, or ask a follow-up question.
3. The client never selects MCP functions, constructs tool arguments, or calls MCP, Qdrant, PostgreSQL, or object storage directly.
4. A shelter means an authorized child-care or child-intake location, not a general homelessness or local-assistance service.
5. Shelter administration is a separate future PWA and is not part of this client repository.
6. Never show unverified AI match results to the public user as confirmed facts.
