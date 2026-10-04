---
name: shelter-context
description: >
  Detailed product, UX, architecture, safety, and frontend context for the Wayfind PWA.
---

# Wayfind Client Context — Detailed Reference

## Core Philosophy
 
Wayfind provides a fast, accessible, trauma-informed interface for child safety, lost child recovery, and found child reporting.
 
**Key UX Pillars:**
- **Single Landing Page:** Replaces the previous chat-first home page. Users are greeted with 3 clear scenario cards to immediately direct their journey.
- **Pre-Seeded Intent:** The AI/chat assistant starts after a scenario is chosen, with full contextual pre-seeding so users don't have to explain their situation from scratch.
- **Light, Progressive UX:** Avoids overwhelming, long forms dumped at once. Details are gathered progressively through guided conversational turns and mini inline field prompts with explicit "Unknown" toggles (`null` payload).
 
---
 
## Route Map & Core Flows
 
| Route / Flow | User Role | Workflow & Guidance |
|---|---|---|
| **Landing Page** (`/`) | Public / Guardian / Finder | Single home entry displaying the 3 primary scenario cards: Register Child, Looking for Lost Child, and Found a Lost Child. |
| **1. Child Registration Flow** | Guardian | Pre-registration for safe children (`REGISTERED_SAFE`). Progressive capture of baseline photos, physical traits, medical needs, and emergency contacts. |
| **2. Found a Lost Child Flow** | Citizen / Shelter | Found child intake report. Immediate safety guidance (safe public area, nearest shelter/police, child helpline 1098/emergency) + progressive intake. |
| **3. Looking for Lost Child Flow** | Guardian / Public | Emergency or historical cold-case search. If registered children exist, shows them by name with option to pick or add new; if none exist, flows straight to progressive search intake. Sets status to `MISSING`, triggers temporal matching from $T_{\text{lost}}$, and provides crisis companion support. |
| `/guardian/dashboard` | Guardian | Manage registered children profiles and quick-trigger emergency search. |
| `/shelter/cases` (`/admin/review`) | Staff | Human-in-the-loop candidate match verification queue. |
| `/help` | Public | Emergency guidance, shelter directories, child protection hotline links. |
 
---
 
## Conversational Bot Intake & MCP Client Integration
 
1. **Scenario Selection & Pre-Seeded Intake:**
   - User chooses one of the 3 scenarios on the landing page.
   - The conversational interface initializes with pre-seeded intent and tailored opening guidance.
   - Information is collected progressively without long upfront forms.
 2. **MCP Client Crisis Companion Handoff:**
    - When a parent searches for a missing child or a citizen reports a found child, queries and context are handled by the **WayFind MCP Client**.
    - **Distraught Parent Support:** Trauma-informed de-escalation, immediate physical search checklist (immediate perimeter, notifying security, water/road hazards) while background matching executes.
    - **Finder Action Guidance:** Directs the finder on safe custody steps (shelter drop-off, local authorities, masked bridge communication) without revealing private guardian details.
 
---
 
## Form UX Principles for Unknown Values
 
- In high-stress situations, witnesses and reporters often know only a few details.
- Every field (Hair Color, Eye Color, Height, Skin Tone, Clothing) must feature a distinct **"Unknown / Don't Know"** toggle.
- When toggled, the input is disabled and the field is serialized as `null` in the JSON request body.
- Age and Height support both single numbers and range bounds.

---

## Decoupled Biometric Vision Architecture (Future Roadmap)

1. **Standalone Microservice Design:**
   - Biometric face embedding and comparison will be built as a separate microservice later.
   - Core functions: (1) `POST /api/biometrics/embed` (image $\rightarrow$ 512-D vector), (2) `POST /api/biometrics/match` (cosine similarity against candidate vectors).
2. **Deterministic Significance Gating:**
   - Biometrics are **never called unconditionally**.
   - Triggered only when pre-filtered metadata `significance_score >= 0.60`.
3. **Deterministic Evidence Scoring (Zero LLM):**
   - Composite matching score is purely mathematical without LLM dependency.
4. **Loosely Coupled Integration:**
   - The system connects via `ImageBackendClient` and falls back gracefully when the biometric service is offline.
