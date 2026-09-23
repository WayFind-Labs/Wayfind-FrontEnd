---
name: shelter-hooks
description: >
  Safety guardrails, deliberate seams, and enforcement hooks for the Shelter AI PWA.
  Use this before implementing any pipeline step that touches media uploads, LLM tool calls,
  candidate matching, human-review workflows, verification sagas, or audit logging.
  Defines nine non-negotiable guardrail specifications: CSAM scan, biometric isolation,
  MCP schema whitelist, Postgres RLS, deterministic scoring, human-in-the-loop gate,
  dual-consent verification saga, compensating saga actions, and cross-cutting audit lineage.
  Use alongside `shelter-context` for product/architecture context and `wayfind-design-system`
  for visual rules.
---

<!-- Full content lives in hook_skill_documentation in this same folder. -->
<!-- This file exists so the agent customization system can discover the skill by SKILL.md convention. -->

See [`hook_skill_documentation`](./hook_skill_documentation) for the full guardrail specifications.

## Quick reference — The Nine Guardrails

| # | Guardrail | Enforcement Point |
|---|---|---|
| 1 | CSAM & Media Safety Scan | Pre/post-upload ingestion layer |
| 2 | Biometric Template Isolation | CV module output phase |
| 3 | LLM Tool Call Whitelist | MCP Client Gateway |
| 4 | Row-Level Security (RLS) | PostgreSQL session context |
| 5 | Deterministic Scoring Engine | Matching engine — no LLM confidence numbers |
| 6 | Human-in-the-Loop Review Queue | Case management — blocks family notifications |
| 7 | Dual-Consent Verification Saga | Pre-DNA/biometric step |
| 8 | Compensating Saga Actions | Saga state machine — handles rollback |
| 9 | Cross-Cutting Audit Lineage | Event bus — immutable append-only log |

## Core principle

> **The Deliberate Seam Principle:** At every junction where the system could execute a consequential real-world action, execution must halt at a deliberate seam requiring either a deterministic rule (not an LLM) or a named, accountable human actor before proceeding.

## Frontend implications

- The single public prompt flow must **never** show a "match found!" confirmation to the public user. Surface guidance only: "Your information has been sent to the appropriate child-support team."
- If a user asks where to bring a found child, the backend may route them to an authorized child-intake shelter. This is not a general housing or local-assistance search.
- Found-child submission, intake-shelter lookup, and image handling remain backend/MCP responsibilities; the client only sends the prompt.
- The public chat interface must never display a candidate match as a verified identity.
- All match confidence is shown only in the shelter-staff UI, never the public UI.
