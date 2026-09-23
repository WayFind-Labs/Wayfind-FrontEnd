# Project Skills

This directory contains project-specific skills (agent-readable instruction sets) for the Shelter AI PWA (Wayfind).

Each skill folder contains a `SKILL.md` file discoverable by AI coding agents.

---

## Available Skills

| Skill | Folder | Purpose |
|---|---|---|
| `wayfind-design-system` | [`design/`](./design/SKILL.md) | Visual identity, design tokens, component library, UX rules |
| `shelter-context` | [`Context/`](./Context/SKILL.md) | Product context, architecture, workflows, safety principles, feature docs |
| `shelter-hooks` | [`Hooks/`](./Hooks/SKILL.md) | Safety guardrails, deliberate seams, nine enforcement hooks |

---

## Reading order for AI agents

Before making **any** change to this codebase:

1. Read [`Context/SKILL.md`](./Context/SKILL.md) (and [`Context/contextSkill.md`](./Context/contextSkill.md) for full detail)
2. Read [`Hooks/SKILL.md`](./Hooks/SKILL.md) (and [`Hooks/hook_skill_documentation`](./Hooks/hook_skill_documentation) for full detail)
3. Read [`design/SKILL.md`](./design/SKILL.md) for any frontend/UI work

---

## Key project constraints (summary)

- **Public UI** (`/`, `/report`, `/chat`) is prompt-first, mobile-first, and uses a bottom tab bar.
- **`/report`** is the found-child direct submission route — the new primary public feature.
- **Shelter staff UI** (`/shelter/*`) uses the sidebar + topbar operational shell.
- The frontend only calls the **Shelter API** — never MCP, Qdrant, or PostgreSQL directly.
- Candidate matches are **never** shown to public users as confirmed identities.
- All images pass a safety scan before processing (Hook #1).
