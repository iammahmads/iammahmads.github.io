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

---

## Phase 4: Hero & 3D Scene (Complete)

- **Date:** 10 November 2026
- **Implementation:**
  - Procedural "Glass Core" geometry with faceted icosahedron shell and inner glowing amber seed (`app/components/scene/Core.tsx`).
  - Local studio lighting with lilac rim lighting, soft ambient aubergine, and amber interior glow (`app/components/scene/Lighting.tsx`). No remote CDN dependencies.
  - Cursor tracking with damped lerp easing and mobile auto-drift.
  - 4 performance tiers (`app/components/scene/store.ts`):
    - Tier 0: No WebGL / reduced motion / weak device -> Zero canvas, static atmospheric glow poster fallback.
    - Tier 1: Fast physical reflective material, dpr 1.0, 4 shards.
    - Tier 2: Refractive transmission material with lilac/aqua dispersion, dpr 1.5, 8 shards.
    - Tier 3: Full transmission and high dpr 1.75.
  - Visibility management: pauses animation loops when tab is hidden or off-screen.
- **Verification & Performance Metrics:**
  - Lazy 3D chunk: **243.7 KB gzipped** (well within budget target of <450 KB gzipped).
  - Pre-rendered HTML contains zero `<canvas>` tags.

---

## Phase 5: Home Sections & Hardened Contact (Complete)

- **Date:** 10 November 2026
- **Sections Implemented:**
  - `Hero` (`app/components/sections/Hero.tsx`): High-contrast headline in Bricolage Grotesque, approved Option 3 tagline, availability pill badge, dual CTA buttons.
  - `Intro` (`app/components/sections/Intro.tsx`): First-person engineering statement, high-resolution portrait with `<picture>`, metrics display.
  - `Showcase` (`app/components/sections/Showcase.tsx`): Pinned featured projects (`FypGuard`, `short-url`, `dev-ecommerce`, `code_commenter`, `erc-8004-hackathon`) with preview images, topic tags, and direct demo/GitHub links.
  - `Capabilities` (`app/components/sections/Capabilities.tsx`): Domain-grouped capabilities with interactive hover highlights connecting skills to verified evidence repositories.
  - `EducationTeaser` (`app/components/sections/EducationTeaser.tsx`): Direct link and preview card for postgraduate study plans.
  - `Contact` (`app/components/sections/Contact.tsx`) & `ContactForm` (`app/components/ui/ContactForm.tsx`):
    - Hardened submission to the owner's Google Form with entry ID mapping (`entry.2005620554`, `entry.1045781291`, `entry.839337160`).
    - Full error handling, draft preservation on failure, honeypot protection, minimum fill time guard, and 60s submission cooldown.
    - Honest wording: "Message sent. Thank you."
    - Direct email link and copy-to-clipboard button with visual feedback.
  - `SmoothScroll` (`app/components/ui/SmoothScroll.tsx`): Lenis smooth scrolling that respects `prefers-reduced-motion` and native anchor navigation.
- **Verification:**
  - 12 unit tests passing.

---

## Phase 6: Projects Pages & Case Studies (Complete)

- **Date:** 10 November 2026
- **Implementation:**
  - `/projects` index (`app/routes/projects.tsx`):
    - Real-time technology filtering with chips (`techOptions`) synchronized to URL query parameters (`?tech=...`).
    - Real-time client search filtering through title, name, summary, and repository topics.
    - Desktop live hover preview plate following focused/hovered rows.
    - Dense, scannable layout with stars, language badge, and pushed date.
  - `/projects/[slug]` detail route (`app/routes/project.tsx`):
    - Hero header with verified summary and stack tags.
    - Media showcase with graceful fallbacks (custom screenshots -> brand technical plate).
    - Previous and Next project links for scannable exploration.
    - Markdown rendering with `react-markdown` and `rehype-sanitize` (`app/lib/markdown.ts`), rewriting relative image and file URLs to raw GitHub URLs.
- **Verification:**
  - 15 unit tests passing (`tests/markdown.spec.ts` added).
  - All 23 static project detail pages pre-rendered cleanly.
- **Commit:** `6d59eab`

## Phase 7: Education & Postgraduate Research Page (Completed)
- **Delivered:**
  - Dedicated `/education` route (`app/routes/education.tsx`) fulfilling all 8 structural sections:
    1. **Intent Section:** Clear statement of Master's study objectives, focus fields, and research interests.
    2. **Research Focus with Evidence Linking:** Deep dive into Code Integrity & Automated Compliance, Distributed Web Architecture & Scalability, and Applied AI Tooling for Developers, auto-linking to real GitHub snapshot projects (`/projects/fypguard`, etc.).
    3. **Academic Record:** Bachelor of Science in Software Engineering from Government College University Faisalabad (Oct 2022 – Jun 2026), key highlights, coursework, and Final Year Project (`FypGuard`).
    4. **Chronological Journey:** Timeline spanning industry engineering at Bitzealth, Section Leader & Mentor at Stanford Code in Place (2025 & 2026), hackathons (CodeCommenter AI), and GCUF BS SE.
    5. **Verified Credentials:** Google Project Management Professional Certificate.
    6. **Publications & Writing:** Clean graceful component ready for preprints and academic writings.
    7. **Documents Area:** Formal requests for transcripts and references routing directly to admissions contact block.
    8. **Admissions & Supervisor Contact Block:** Pre-tagged Google Form channel with `sourceTag="Education"` emitting `[Education]` subject tag for dedicated triage.
    9. **Structured Data:** JSON-LD `Person` schema specifying `alumniOf`, `knowsAbout`, and `sameAs` academic and professional profiles.
- **Verification:**
  - Clean TypeScript compilation (`npm run typecheck`).
  - Unit tests passing (`15/15`).
  - Route pre-renders statically to `build/client/education/index.html`.
- **Next Phase:** Phase 8 (Polish) & Phase 9 (Accessibility, Performance & QA).
- **Commit:** `936efbf`

## Phase 8: Polish & Design System Review (Completed)
- **Delivered:**
  - Dedicated `CopyEmail.tsx` component with polite screen-reader announcements (`aria-live="polite"`), clipboard fallback safety, and active visual feedback.
  - Eliminated ALL-CAPS uppercase tracking labels across all pages (`Showcase`, `Capabilities`, `Contact`, `projects.tsx`, `project.tsx`, `education.tsx`, `not-found.tsx`) in strict compliance with the typography rules in section 4.
  - Critique pass: Removed vanity stat ("100% Academic Integrity Focus") from `Intro.tsx`, preserving grounded, verifiable facts (23+ repositories, 2x Stanford section leader).
  - Accessible focus ring styling active across all interactive anchors and buttons with custom aqua highlight.
  - Cleaned up temporary `/styleguide` route ahead of cutover.

## Phase 9: Accessibility, SEO & Quality Verification (Completed)
- **Delivered:**
  - **SEO & Structured Metadata:**
    - Canonical links, Open Graph, and Twitter Cards configured per-route with absolute URLs.
    - JSON-LD structured data implemented:
      - `Person` schema on `/` (Home) and `/education`.
      - `SoftwareSourceCode` schema on `/projects/[slug]`.
    - Script `scripts/generate-seo.ts` automatically generating `sitemap.xml` (all static routes and project URLs), `robots.txt`, `site.webmanifest`, and custom "Glass Core" `favicon.svg`.
    - Integrated `seo:generate` into `prebuild`.
  - **Automated Verification:**
    - Added `tests/html-audit.spec.ts`: verified pre-rendered HTML on disk for `<title>`, `<meta name="description">`, canonical links, OpenGraph, Twitter tags, JSON-LD, 404 generation, and confirmed zero `<canvas>` tags in pre-rendered static HTML.
    - Added `tests/link-integrity.spec.ts`: verified that 100% of internal links resolve to pre-rendered static HTML destinations (0 broken links).
    - 22/22 unit and integration tests passing in Vitest (`tests/`).
  - **Performance Targets Check:**
    - Lazy 3D chunk: **243.7 KB gzipped** (Budget: <450 KB).
    - Static HTML build: 27 pre-rendered static HTML files generated in <400ms.
    - Initial JS bundle: ~85 KB gzipped (Budget: <200 KB).
    - Contrast ratios: `--pearl` (17.5:1), `--aqua` (13.8:1), `--lilac` (8.6:1) on `--ink` (all exceeding WCAG AAA).
  - **Scheduled Rebuild Automation:**
    - Created `.github/workflows/rebuild.yml` with daily cron (`0 4 * * *`) and `workflow_dispatch` invoking `RENDER_DEPLOY_HOOK_URL`.

## Phase 10: Production Cutover & Deployment (Completed)
- **Delivered:**
  - Tagged legacy portfolio state on `main` as `legacy-v1` for safe rollback if ever required.
  - Merged `redesign/3d` into `main` cleanly with fast-forward.
  - Archived legacy React 18 single-page `src/` codebase and root `index.html`.
  - Configured `render.yaml` with:
    - `buildCommand: npm ci && npm run build`
    - `staticPublishPath: ./build/client`
    - Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`)
    - Cache headers for hashed assets (`max-age=31536000, immutable`)
    - `/404` to `/404.html` rewrite
    - `SITE_URL` and `GITHUB_TOKEN` environment variables
  - Verified full test suite (`22/22` passing), static pre-render (`27` pages), typecheck, and lint on `main`.
- **Status:** Portfolio redesign is 100% complete and deployed to `main`.
