---
name: shelter-context
description: >
  Authoritative product, UX, architecture, safety, and development context for
  the Wayfind public PWA client, including 1-Click SOS, temporal search,
  finder-guardian communication gateway, and Empathetic Crisis Companion.
---

# Shelter / Wayfind Client Context

Wayfind is a mission-critical web application for child pre-registration, missing child SOS broadcasting, found child intake, and trauma-informed crisis assistance.

---

## Key Frontend User Journeys

1. **Single Landing Page (Replaces Chat-First Home Page):**
   - Clean, lightweight entry point with three distinct scenario cards:
     - **Card 1: I want to register my child on Wayfind** → triggers child pre-registration flow (`REGISTERED_SAFE`).
     - **Card 2: I am looking for my lost child** → if registered children exist, shows them by name with option to select or add new; if none exist or looking for someone else's child, goes straight to search/reporting.
     - **Card 3: I just found a lost child** → immediate safety guidance + report flow.
2. **Pre-Seeded Conversational Intake & Crisis Companion:**
   - Tapping any scenario card transitions into the conversational/AI flow with the user intent pre-seeded.
   - **Light, progressive UX:** No overwhelming long forms dumped at once; details collected step-by-step with explicit "Unknown" toggles serializing to `null`.
   - Distraught parent de-escalation, immediate physical search checklists, and finder safety guidance.
3. **Guardian Dashboard & Registered Child Profiles:**
   - View and manage pre-registered children, quick-launch missing reports.
4. **Masked Communication Bridge:**
   - Secure calling/messaging connecting citizen finder and verified guardian without exposing raw phone numbers.
5. **Staff Review Dashboard (`/shelter/cases` / `/admin/review`):**
   - Side-by-side evidence review for shelter staff prior to releasing contact/location information.
6. **Decoupled Biometric Vision Architecture (Future Roadmap):**
   - Biometric face embedding and matching will run as a separate microservice (`/api/biometrics/embed` & `/api/biometrics/match`).
   - Triggered only when pre-filtered demographic metadata has `significance_score >= 0.60`.
   - Evidence scoring is purely deterministic without LLM calls.
