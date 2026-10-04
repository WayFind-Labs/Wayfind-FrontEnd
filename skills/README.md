# Project Skills — Wayfind Client

This directory contains project-specific skills (agent-readable instruction sets) for the Wayfind Frontend PWA.

---

## Available Skills

| Skill | Folder | Purpose |
|---|---|---|
| `shelter-context` | [`Context/`](./Context/SKILL.md) | Product context, route map, structured forms, safety principles |
| `wayfind-design-system` | [`design/`](./design/SKILL.md) | Visual identity, design tokens, accessible form components |
| `shelter-hooks` | [`Hooks/`](./Hooks/SKILL.md) | Safety guardrails and PII protection boundaries |

---

## Key Project Rules

1. **Structured Forms with Explicit "Unknown" Toggles:** All reporting forms allow users to explicitly mark unknown attributes as `null`.
2. **Deterministic Search Backend:** The frontend talks to standard REST endpoints on `ShelterAppUiBackend` (`/api/children`, `/api/search/match`, `/api/cases/sos`).
3. **Zero Public PII Exposure:** Candidate matches and public search views never leak guardian contacts or private child identity details.
4. **Staff Review Seam:** Candidate matches are reviewed in the staff portal before guardian notification and release of identity information.
