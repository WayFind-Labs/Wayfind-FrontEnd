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

- **Public UI** (`/`) is a single prompt-first, mobile-first AI agent. Users do not choose between report and search flows.
- Wayfind shelters are authorized child-care and child-intake locations; this is not a general housing or local-assistance directory.
- The backend receives the prompt and decides which MCP function to call. The client never selects MCP tools.
- **Shelter administration** will be implemented in a separate PWA, outside this client repository.
- The frontend only calls the **Shelter API** — never MCP, Qdrant, PostgreSQL, or object storage directly.
- Candidate matches are **never** shown to public users as confirmed identities.
- Media safety checks and any follow-up collection are backend-owned.
