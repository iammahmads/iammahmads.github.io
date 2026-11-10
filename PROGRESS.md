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
  - Confirmed pre-rendered HTML contains semantic elements, per-route `<title>`, Open Graph tags, and zero `<canvas>` elements (proving clean client-only mounting without SSR leakage).
- **GitHub Layer Spike:**
  - Implemented `app/lib/github.schema.ts` with strict Zod validation.
  - Implemented `scripts/github-sync.ts` wired as `prebuild` and `npm run github:sync`.
  - Generated initial `app/content/github.snapshot.json` containing 23 validated projects.
  - Added fallback resilience: if GitHub API is unreachable, build proceeds from cached snapshot without failing.
- **Contact Form Port:**
  - Ported existing Google Forms submission logic into typed `app/lib/contact.ts` and `app/content/site.ts` with validation, timeout guard, and honest delivery semantics ("sent" vs "delivered").
- **Agent Skills:**
  - Created required skills in `.agent/skills/`: `portfolio-design-rules`, `r3f-performance`, `github-projects-sync`, `contact-form`, `quality-gate`.
- **Testing & Quality:**
  - Added Vitest suite in `tests/contact.spec.ts` and `tests/github.spec.ts`. All 6 tests passing.
  - `npm run lint` passing (0 errors).
  - `npm run typecheck` passing (0 errors).
  - `npm run build` succeeds in ~300ms.
- **Next Phase:** Phase 2 (Design System & Styleguide).
