# Wayfind — Shelter & Case-Records PWA

A Progressive Web App (PWA) built for humanitarian organizations, shelters, case workers, and partner NGOs. Designed as a real, daily-use application for tracking children in care, managing cases, and cross-checking reports.

---

## Architectural Separation

The application is structured into two distinct user experiences powered by the Next.js App Router:

### 1. Normal User / Public Experience (`(public)`)
Designed for public entry and AI conversational assistance.
- `/` — Public landing & AI agent entrypoint
- `/chat` — Conversation interface
- `/help` — Guidance and assistance
- `/settings` — Public user preferences

### 2. Shelter Staff Operational Experience (`/shelter`)
Designed for high-density, multi-panel operational workflows for shelter staff and case workers.
- `/shelter` — Operational entrypoint (redirects to `/shelter/dashboard`)
- `/shelter/dashboard` — Main operational overview
- `/shelter/shelters` — Shelters directory & capacity management
- `/shelter/people` — People and children in care records
- `/shelter/cases` — Case records and management
- `/shelter/search` — Unified search & RAG query panel
- `/shelter/ai` — Staff AI assistant panel
- `/shelter/activity` — Audit trail and real-time activity log
- `/shelter/settings` — Operational and shelter settings

---

## Design System & Skills

The complete design system instructions, tokens, and UX rules reside in:
- [`skills/design/SKILL.md`](./skills/design/SKILL.md)

Tokens are defined as CSS variables in `src/app/globals.css`. Typography is configured with `Public Sans` (UI/body) and `IBM Plex Mono` (data/records) via `next/font/google`.

---

## PWA Architecture

- **Manifest**: Defined dynamically in `src/app/manifest.ts` and statically in `public/manifest.webmanifest`.
- **Service Worker**: `public/sw.js` handles cache lifecycle and offline preparation.
- **Registration**: Auto-registered via `<PwaRegister />` in the root layout.
- **Installability & Network State**: Hook available at `src/hooks/use-pwa.ts`.

---

## Directory Structure

```text
├── skills/
│   ├── design/
│   │   └── SKILL.md             # Wayfind design system source of truth
│   └── README.md
├── public/
│   ├── icons/                   # PWA icons (192, 512, apple-touch-icon, favicon)
│   ├── manifest.webmanifest     # Static manifest fallback
│   └── sw.js                    # PWA service worker
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (Fonts, PWA registration, metadata)
│   │   ├── globals.css          # Wayfind design tokens
│   │   ├── manifest.ts          # Next.js App Router dynamic manifest
│   │   ├── (public)/            # Normal user / conversational experience
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── chat/page.tsx
│   │   │   ├── help/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── shelter/             # Operational shelter experience
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── dashboard/page.tsx
│   │       ├── shelters/page.tsx
│   │       ├── people/page.tsx
│   │       ├── cases/page.tsx
│   │       ├── search/page.tsx
│   │       ├── ai/page.tsx
│   │       ├── activity/page.tsx
│   │       └── settings/page.tsx
│   ├── components/
│   │   ├── ui/                  # Design system primitives
│   │   ├── shared/              # Cross-cutting components (e.g. PwaRegister)
│   │   ├── public/              # Public experience components
│   │   └── shelter/             # Shelter operational components
│   ├── hooks/
│   │   └── use-pwa.ts           # PWA installation & network status hook
│   ├── lib/
│   │   ├── utils/               # Utilities (cn, etc.)
│   │   ├── config/              # App constants
│   │   └── ai/                  # Structural contracts for AI / MCP / RAG
│   ├── types/                   # TypeScript domain contracts
│   └── constants/               # Route paths and constants
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Development & Build

```bash
# Run local development server
npm run dev

# TypeScript type check
npm run type-check

# Production build
npm run build
```
