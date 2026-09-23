---
name: shelter-context
description: >
  Authoritative product, UX, architecture, data, safety, and development context
  for the Shelter AI PWA (also known as Wayfind internally). Read this before making
  any architectural or implementation change. Covers the core mission, users, two-sided
  product (public prompt experience + shelter-worker operational UI), backend architecture,
  safety/privacy principles, found-child and missing-child workflows, and the new direct
  found-child submission feature. Use alongside `shelter-hooks` for guardrail details and
  `wayfind-design-system` for visual/UX rules.
---

<!-- Full content lives in contextSkill.md in this same folder. -->
<!-- This file exists so the agent customization system can discover the skill by SKILL.md convention. -->

See [`contextSkill.md`](./contextSkill.md) for the full context document.

## Quick reference — frontend routes (as of current state)

| Route | Experience | Purpose |
|---|---|---|
| `/` | Public | Intent selector — "I found a child" · "Looking for someone" |
| `/report` | Public | **Found-child direct submission** — prompt-first, image upload, location |
| `/chat` | Public | Conversational AI assistant — missing-child search, general help |
| `/help` | Public | Help and guidance |
| `/settings` | Public | PWA settings |
| `/shelter/dashboard` | Shelter Staff | Operational dashboard |
| `/shelter/cases` | Shelter Staff | Case management |
| `/shelter/people` | Shelter Staff | Child/person records |
| `/shelter/search` | Shelter Staff | Structured search + RAG |
| `/shelter/shelters` | Shelter Staff | Shelter capacity and status |
| `/shelter/ai` | Shelter Staff | AI assistant panel |
| `/shelter/activity` | Shelter Staff | Activity feed / audit log |
| `/shelter/settings` | Shelter Staff | Staff settings |

## Key architectural rules for frontend

1. The frontend **only talks to the Shelter API** (`POST /api/chat`, `/api/reports`, etc.). It must never call MCP, Qdrant, or PostgreSQL directly.
2. The `/report` route is the **new found-child submission entrypoint**. It is prompt-first — do not turn it into a traditional form.
3. Image uploads on `/report` go through the Shelter API, never directly to object storage.
4. The public experience (`/`, `/report`, `/chat`) is mobile-first and uses the bottom-tab-bar navigation pattern.
5. The shelter staff experience (`/shelter/*`) uses the sidebar + topbar shell.
6. Never show unverified AI match results to the public user as confirmed facts.
