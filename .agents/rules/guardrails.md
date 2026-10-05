# Guardrails & Workflow Standards for Wayfind Frontend

## 1. Git Commit & Push Guardrail (Mandatory)
- **Automatic Push After Meaningful Work:** After completing any meaningful writing, coding, refactoring, bug fix, or feature implementation, you must stage, commit, and run `git push` to the remote repository.
- **Descriptive & Understandable Commit Messages:** Commit messages must strictly follow Conventional Commits (e.g., `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`) with clear, understandable descriptions explaining *what* was changed and *why*.
  - Example: `feat(chat): implement progressive inline form cards for unknown trait handling`
  - Example: `fix(auth): resolve session token refresh edge case`

## 2. Project Context Synchronization Guardrail (Mandatory)
- **Keep Project Context in Sync:** If the work requested or performed alters, introduces, or extends the project's architecture, routes, UI components, state management, API contracts, or core user journeys, you **must immediately update** the project's context documentation (`skills/Context/SKILL.md`, `skills/Context/contextSkill.md`, `README.md`).
- Never leave project context files outdated or inconsistent with the active code implementation.
