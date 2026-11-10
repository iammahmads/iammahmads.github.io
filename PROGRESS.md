# Redesign Progress Log

## Phase 0: Discovery (Complete)

- **Date:** 10 November 2026
- **Branch:** `redesign/3d` (active)
- **Approved Tagline:** Option 3 — *"Full-stack software engineer crafting robust applications and preparing for advanced research."*
- **Confirmed Defaults:** Proceeded with all stated defaults from Appendix C questionnaire for Education, projects, styling ("Glass Core"), and contact form.

---

## Phase 1: Migration Spike and Scaffold (Complete)

- **Date:** 10 November 2026
- **Stack Upgrades:**
  - Upgraded React to 19.3.1 and React DOM to 19.3.1 (`D1`).
  - Upgraded Three.js to 0.187.0 with `@react-three/fiber` 9.8.2 and `@react-three/drei` 10.7.9.
  - Migrated to React Router 7 framework mode (`react-router` 7.18.5, `@react-router/dev` 7.18.5) with `ssr: false` and `prerender` static HTML (`D2`).
  - Migrated to Tailwind CSS v4.3.5 via `@tailwindcss/vite` with `@theme` CSS tokens in `app/app.css` (`D3`). Removed obsolete `postcss.config.js` and `tailwind.config.js`.
  - Migrated to ESLint 9.14.0 with flat config (`eslint.config.js`) and TypeScript ESLint 8.72.2.
  - Removed `@types/react-router-dom` and `react-router-dom`.
- **Pre-rendering & Architecture:**
  - Created `react-router.config.ts` pre-rendering `/`, `/projects`, `/education`, `/404`, and all `/projects/<slug>` routes.
  - Output directory configured as `build/client`.
  - Added `scripts/postbuild.mjs` ensuring `build/client/404.html` is generated for static hosting.
  - Confirmed pre-rendered HTML contains semantic elements, per-route `<title>`, Open Graph tags, and zero `<canvas>` elements.
- **Agent Skills:**
  - Created required skills in `.agent/skills/`: `portfolio-design-rules`, `r3f-performance`, `github-projects-sync`, `contact-form`, `quality-gate`.

---

## Phase 2: Design System & Styleguide (Complete - Approved)

- **Date:** 10 November 2026
- **Concept:** "Glass Core" — deep atmospheric aubergine (`#170B2B`), structural surfaces (`#241346`), secondary lilac text accents (`#B9A7FF`), and a single interactive aqua accent (`#3DF2E0`).
- **Typography:**
  - Display: `Bricolage Grotesque` (variable font, width axis).
  - Body: `Instrument Sans`.
- **Components Implemented:**
  - `Button` (`app/components/ui/Button.tsx`): Primary, Secondary, Ghost with full keyboard and disabled states.
  - `Chip` (`app/components/ui/Chip.tsx`): Interactive technology badge with counts and aria-pressed states.
  - `Nav` (`app/components/ui/Nav.tsx`), `Footer` (`app/components/ui/Footer.tsx`), `SkipLink` (`app/components/ui/SkipLink.tsx`).
- **Styleguide:**
  - Created `/styleguide` (`app/routes/styleguide.tsx`) pre-rendered to `build/client/styleguide/index.html`.
- **Status:** Approved by owner.

---

## Phase 3: GitHub Data Layer (Complete)

- **Date:** 10 November 2026
- **Implementation:**
  - Extracted modular ranking and scoring logic into `app/lib/github-ranking.ts`.
  - Prioritizes owner's pinned repositories (`FypGuard`, `short-url`, `dev-ecommerce`, `code_commenter`, `erc-8004-hackathon`, `blooging`, `Andoid-Magent-Detector`, `zerobug`).
  - Fallback algorithmic ranking based on descriptions, live homepage URLs, star count, and commit recency.
  - Automatic filtering of forks and archived repos.
  - Curation overrides in `app/content/projects.overrides.ts`.
  - Schema validation with Zod (`app/lib/github.schema.ts`).
  - `scripts/github-sync.ts` integrated as `prebuild` step and `npm run github:sync`.
  - Resilient offline mode: build falls back to committed `app/content/github.snapshot.json` and never fails if GitHub API is unreachable or token is missing.
- **Verification:**
  - 10 unit tests passing (`tests/github-ranking.spec.ts`, `tests/github.spec.ts`, `tests/contact.spec.ts`).
  - Verified static generation for all 23 project pages.
- **Next Phase:** Phase 4 (Hero & 3D Glass Core Scene).
