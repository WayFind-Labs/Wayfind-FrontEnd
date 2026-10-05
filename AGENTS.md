# Agent Instructions & Operating Guardrails

## Core Guardrails

### 1. Mandatory Git Commit & Push Discipline
- **After Meaningful Coding / Writing Work:** Always stage, commit, and `git push` all changes to the remote repository.
- **Clear Commit Messages:** Write descriptive, understandable commit messages using Conventional Commits format (e.g., `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`). Never use vague messages like "update files" or "fix stuff".

### 2. Mandatory Project Context Maintenance
- **Keep Context Synced:** Whenever new features, architectural decisions, routes, components, or API contracts are created or modified, immediately update the project context files:
  - [`skills/Context/SKILL.md`](file:///e:/React/Shelter/ShelterApp%20ui/skills/Context/SKILL.md)
  - [`skills/Context/contextSkill.md`](file:///e:/React/Shelter/ShelterApp%20ui/skills/Context/contextSkill.md)
  - [`README.md`](file:///e:/React/Shelter/ShelterApp%20ui/README.md)
- Context documentation must remain an accurate reflection of the current codebase state.
