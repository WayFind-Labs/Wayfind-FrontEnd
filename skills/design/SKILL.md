---
name: wayfind-design-system
description: The complete visual identity, design tokens, component library, and UX rules for the "Wayfind" shelter/case-records product (a humanitarian PWA for shelters, case workers, and NGOs). Use this any time you are building, extending, or restyling any screen, component, mockup, or artifact for Wayfind — dashboards, child/case records, search, the AI assistant, mobile views, reports, settings, or any new page — so the output matches the established look exactly instead of inventing a new one. Also use it as a reference when asked to "match the Wayfind style," "use the shelter app design system," or to audit new UI against it.
---

# Wayfind Design System

Wayfind is a shelter and case-records product for humanitarian organizations — shelters, case workers, and partner NGOs — used to track children in care, cross-check missing-child reports, and manage case notes. It is designed as a real, daily-use application, not a marketing site: functional first, beautiful second.

A full working reference implementation (single self-contained HTML file, all tokens and components live) ships alongside this skill at `assets/wayfind-reference.html`. When in doubt about exact markup or CSS for a component, open that file and copy the pattern rather than re-deriving it.

## Design principles (do not violate these)

1. **No AI/SaaS defaults.** Never fall back to: purple-blue gradients, glassmorphism, pure-white backgrounds, heavy drop shadows on every card, bento grids, sparkle/magic icons, tracked-out ALL-CAPS eyebrows, em-dash-heavy copy, "It's not X, it's Y" copy, or a uniform border-radius applied to everything regardless of hierarchy.
2. **Functional first.** This is app UI, not a landing page. Default to dense, real information — stat cards, tables, records, badges — not hero sections or abstract illustration.
3. **One accent, spent carefully.** The clay/ochre accent (`--accent`) is the only warm, saturated color in the system. Everything else is neutral or muted. Don't introduce a second bright color.
4. **Radius and shadow encode hierarchy, not decoration.** Small radius = small/dense components (badges, inputs). Large radius = elevated/modal-like surfaces. Cards use a hairline border, never a shadow, unless they are genuinely floating above the page (modals, the phone frame, popovers).
5. **The AI assistant is a tool, not the product.** Keep it visually restrained — no sparkle icons, no "magical" gradients, plain speech-bubble iconography, scoped to one panel among many.
6. **Monospace is functional, never decorative.** `--font-mono` (IBM Plex Mono) appears only on case IDs, timestamps, and other literal record data — never as a stylistic label treatment.

---

## Color tokens

All colors are warm, paper-toned neutrals with a single clay accent — referenced from field ID badges and relief-agency signage, not a screen-native palette. Status colors are deliberately muted so an alert reads as information, not alarm. Light mode only — there is no dark theme.

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#F1EFE9` | App background (warm paper, not pure white/cream) |
| `--surface` | `#FFFFFF` | Card / panel surface |
| `--surface-sunken` | `#EAE7DF` | Recessed areas: table headers, search fields, sidebar org-switcher |
| `--border` | `#DBD6C9` | Default hairline border |
| `--border-strong` | `#C7C1B1` | Input borders, stronger dividers |
| `--ink` | `#1B211E` | Primary text (warm near-black, not pure black) |
| `--muted` | `#6B6F65` | Secondary text, labels |
| `--muted-2` | `#8A8D82` | Tertiary / placeholder-level text, disabled icon fill |
| `--accent` | `#A15A2B` | Primary accent — clay/ochre. Primary buttons, active/insight highlights |
| `--accent-ink` | `#7C4620` | Accent text-on-tint (darker clay for text on `--accent-tint`) |
| `--accent-tint` | `#F1E2D2` | Accent background tint (insight callouts) |
| `--teal` | `#2C4B49` | Secondary/structural — sidebar, nav-active state, headings that need weight without using the accent |
| `--teal-tint` | `#E3EAE8` | Teal background tint (eyebrow chip, active-tab family) |
| `--success` | `#5C7A3E` | Success status — a moss/olive green, deliberately **not** a generic checkmark green and distinct in hue from `--teal` |
| `--success-tint` | `#E6EBD9` | Success background tint |
| `--warning` | `#B4842B` | Warning status — amber, distinct from the accent clay |
| `--warning-tint` | `#F3E7D0` | Warning background tint |
| `--error` | `#9C3C2E` | Error/urgent status — brick red |
| `--error-tint` | `#F3E0DB` | Error background tint |
| `--info` | `#495F6D` | Informational status — slate blue-grey |
| `--info-tint` | `#E4E9EB` | Info background tint |

Shadows (used sparingly — see principle 4):
- `--shadow-sm: 0 1px 2px rgba(27,33,30,.08), 0 1px 1px rgba(27,33,30,.04)` — popovers, tooltips
- `--shadow-md: 0 8px 24px rgba(27,33,30,.14), 0 2px 6px rgba(27,33,30,.08)` — modals, the phone frame, the intro device frame

---

## Typography

- **UI/body/display face:** Public Sans (Google Fonts: `Public+Sans:wght@400;500;600;700`) — a civic, plain-spoken face built for public-service reading. Used across display, headings, and body; do not swap in Inter, Geist, or Space Grotesk.
- **Data/record face:** IBM Plex Mono (`IBM+Plex+Mono:wght@400;500`) — case IDs and timestamps only.
- Numeric stat values use `font-variant-numeric: tabular-nums` with the UI face (`.t-data`), not the mono face — only literal record identifiers use mono.

Type scale (class → size/weight/use):

| Class | Size / line-height | Weight | Use |
|---|---|---|---|
| `.t-display` | 26px / 1.2 | 700 | Rare, large emphasis (e.g. a case ID shown big) |
| `.t-page` | 20px / 1.25 | 600 | Page-level heading (e.g. "Dashboard") |
| `.t-section` | 15px / 1.3 | 600 | Card/section heading (e.g. "Recent cases") |
| `.t-body` | 14px / 1.55 | 400 | Default body text |
| `.t-small` | 12.5px / 1.45 | 400, color `--muted` | Meta text, timestamps, hints |
| `.t-label` | 12.5px / 1.3 | 500, color `--muted` | Field labels, stat card labels — sentence case, never uppercase |
| `.t-data` | inherits size | 600, tabular-nums | Big numbers (stat cards, match %) |
| `.t-mono` | 12px | 400 | Case IDs, timestamps |

Rules: no accenting a single word in a headline with italic/bold/color; no ALL-CAPS labels; no unnecessary "eyebrow" labels above content unless it's the one deliberate eyebrow chip in the intro band.

---

## Spacing, radius, shape

Spacing scale (px): `--sp-1:4 --sp-2:8 --sp-3:12 --sp-4:16 --sp-5:24 --sp-6:32 --sp-7:48 --sp-8:64`

Radius — **varies by role, never uniform**:
- `--radius-xs: 3px` — badges, inputs
- `--radius-sm: 6px` — buttons, chips, icon buttons
- `--radius-md: 10px` — cards, panels
- `--radius-lg: 16px` — modals, the phone frame, the intro device frame

Borders: 1px solid `--border` by default; `--border-strong` for inputs and emphasized dividers. Cards are defined by their border, not a shadow.

---

## Layout / app shell

Real application chrome, not a marketing page:

- **Grid:** `grid-template-columns: 232px 1fr` (sidebar + main). Sidebar is `position: sticky; height: 100vh`, background `--teal`, text in a light teal-tinted white (`#E9EEEC` family), with the active nav link rendered as a **white/surface pill** (inverted, not just a color change) so it reads clearly against the dark sidebar.
- **Topbar:** sticky, white surface, border-bottom, contains a search field (max-width 420px, sunken style), notification bell with a small dot-flag badge, help icon, avatar — right-aligned action cluster.
- **Content:** max-width 1280px, padding `--sp-5`, sections stacked with `--sp-7` gap between them, each section is a `.panel` with a `.panel-head` (title + one-line description + optional right-aligned action).
- **Intro band:** two-column (copy + a mini "device frame" showing a cropped dashboard screenshot with browser chrome dots and a URL bar). Not a hero — no big marketing headline treatment, just a page title at `.t-page`-adjacent scale with a one-line eyebrow chip above it reading the *page's own status* (e.g. "Design prototype — v0.1"), not a generic label.

Navigation groups in the sidebar are labeled by function (Overview / Records / Intelligence), each nav link is icon + label, with a red numeric badge for counts that need attention (e.g. open missing-case count). Icons are custom-drawn inline SVG (1.8px stroke, 24×24 viewBox, rounded caps/joins) — never a default icon-library set like Lucide used wall-to-wall.

---

## Components

All components below live as real markup/CSS in `assets/wayfind-reference.html`. Summary of each:

- **Buttons:** `.btn-primary` (solid clay, white text), `.btn-secondary` (white surface, strong border), `.btn-ghost` (transparent, teal text, teal-tint hover — used for lower-emphasis actions like "View details"), `.btn-destructive` (white surface, error-red border/text). All share one radius (`--radius-sm`) and weight (600, 13.5px). `.btn-sm` variant for dense contexts (table rows, cards).
- **Inputs:** `.text-input` — 9px/11px padding, `--border-strong` border, `--radius-sm`, focus state turns border to `--accent` (no glow/shadow). Labels are `.t-label`-style, sentence case. Error state (`.field-error`) turns the input border and hint text `--error` — no red background fill.
- **Select:** same visual treatment as text input, native `<select>`.
- **Tabs:** underline style — active tab gets a 2px `--accent` bottom border and full-opacity ink text; inactive tabs are muted. No pill/segmented-control tabs.
- **Status badge:** pill shape, small color dot (`::before`) + label, background = the status's `-tint` token, text = the status's base token. Variants: success, warning, error, info, neutral (`--surface-sunken`/`--muted`).
- **Alert:** left-aligned icon + text block, colored border + tinted background matching the alert level (warning/error/info) — no drop shadow, no dismiss animation implied.
- **Notification / list item:** simple row with a small accent dot or avatar, title + muted sub-line, hairline divider between rows (not cards-in-a-list).
- **Card:** `--surface`, `--border`, `--radius-md`, `--sp-4` padding, optional `.card-title-row` header with a right-aligned link/action.
- **Table:** `.data-table` — sunken header row, hairline row dividers, hover state = `--surface-sunken`, case IDs in mono, status column uses badges.
- **Avatar:** circle, tinted background (accent-tint or teal-tint) with ink-toned initials; for unidentified/no-photo records use `.record-photo` — a sunken square with a generic person-outline icon, never a silhouette photo placeholder.
- **Breadcrumbs / pagination:** breadcrumbs are plain muted text with `/` separators and a bold current page; pagination is small square buttons (`--radius-xs`), active page filled `--teal`.
- **Tooltip:** dark (`--ink`) bubble with a small triangle, white-on-dark text, used for explaining a data point (e.g. why a match percentage is what it is) — not for restating a button's label.
- **Empty state:** left-aligned (not centered), icon + one-line explanation + one muted supporting line + a single secondary-button recovery action.
- **Loading / skeleton:** animated gradient sweep between `--surface-sunken` and `--border`, `--radius-xs`, used as bars matching the real content's line lengths.
- **Error state:** same shape as `.alert-error` but framed as a component-level failure message ("Couldn't save this record") with a muted second line, not a full-page takeover.
- **Modal:** `--radius-lg`, `--shadow-md`, header with title + close (X, no icon button chrome around it), body copy, primary+secondary button pair — small, focused, not full-screen.

---

## Application-specific UI patterns

- **Stat cards:** 4-across grid, label (`.t-label`) → big number (`.t-data`, ~26px) → small trend line (`.stat-trend`, green "↑" for good, red for flagged — text only, no chart sparkline needed at this size).
- **Shelter card:** a flat map-tinted header strip (not a real map image) with a location-pin icon and a status badge overlaid top-right, then name/location, an occupancy bar (`--surface-sunken` track, `--teal` fill, `--warning` fill when near capacity), and two actions.
- **Child/case record:** photo-or-placeholder + name-or-"Unidentified" + mono case ID + status badge in the header; a `<dl>`-based definition grid (label above value, 2-column) for identity facts; a "Potential matches" list where each row shows a small match-strength bar (`--accent` fill) and a percentage in `.t-data`.
- **Search / RAG panel:** search field, removable filter chips (`--border-strong` outline pill with a "✕"), and results shown as title (teal, bold) + 1–2 line muted snippet + a small source line with a document icon and page reference — **never** a raw chat-style AI answer with no source shown.
- **AI assistant panel:** fixed-height chat panel, user messages right-aligned on `--teal` fill, agent messages left-aligned on `--surface-sunken`, suggested follow-up actions rendered as real secondary buttons under the agent's message (not clickable "chips" styled like tags), plain speech-bubble icon in the header — no sparkle icon, no gradient avatar.
- **Location/map:** a restrained placeholder grid (repeating hairline lines on `--surface-sunken`) with pin icons colored by legend (error-red = missing-case report, teal = partner shelter) and an explicit legend row — deliberately not a decorative gradient map graphic, and swapped for a real map tile provider before shipping.

---

## Mobile / PWA

- Phone mockups are a literal device frame: dark (`--ink`) rounded outer frame, `--radius-lg`-ish inner screen, iOS-style status row, then a mobile topbar (back chevron + page title), scrollable body reusing the same component set at tighter spacing, and a **bottom tab bar** (not a hamburger menu) with 4 items: Home, Children, Search, Assistant — active item colored `--teal`.
- PWA-identity section communicates: installable (home-screen, no store review cycle), offline-aware (local save + visible pending-sync state, not silent), fast on low-end Android devices, and transparent about system state (every save/sync/match run shows its status). Represent these as a plain 4-up icon+text grid — not a marketing feature grid with drop shadows.

---

## Responsive rules

Three breakpoints, and navigation genuinely changes shape at each (not just reflow):
- **Desktop ≥1080px:** persistent sidebar, multi-column dashboard, side-by-side panels.
- **Tablet 640–1080px:** sidebar collapses to an icon rail; content becomes a single scanning column.
- **Mobile <640px:** sidebar is replaced by a bottom tab bar; tables become stacked cards; wide content (tables, code, diagrams) scrolls horizontally inside its own container rather than forcing the page to scroll sideways.

---

## Copy voice

- Plain, active-voice, specific language: "Save changes" not "Submit"; name things the way a case worker would ("Children," "Missing children," "Cases") not by internal system names.
- No stock AI/SaaS phrases: avoid "seamless," "next-generation," "powered by AI," "transform your workflow," "the future of…", and the "It's not X, it's Y" construction.
- Errors state what happened and how to fix it, in the interface's voice, without apologizing ("Couldn't save this record — check the connection and try again").
- Empty states are an invitation to act, not a mood: name the cause, give one recovery action.
- No emoji as decoration, no exclamation-heavy copy.

---

## Accessibility & motion baseline

- Visible focus ring on every interactive element: `outline: 2px solid var(--accent); outline-offset: 2px`.
- Respect `prefers-reduced-motion` — collapse all animation/transition durations near-zero when set.
- A skip-to-content link is present and visible on focus.
- Motion is used only for loading (skeleton sweep) and smooth in-page anchor scrolling — no entrance animations, hover-lift, or decorative floating/pulsing elements anywhere.

---

## Known gaps / do not treat as finished

Carried over from the last design audit — don't "fix" these silently by inventing a different direction; flag them if asked to extend the system:
- Record photos are still a generic person-outline placeholder, not real photography/illustration guidance.
- The map is a placeholder grid, not a real map tile integration.
- "Wayfind" has a geometric badge mark but no full wordmark/lockup yet.
- Dark-mode tokens were intentionally removed — this system is light-mode only by explicit request; do not reintroduce a dark theme unless asked.