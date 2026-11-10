# Portfolio Redesign: 3D, Interactive, GitHub-Powered

**Owner:** Muhammad Ahmad Shahid (GitHub: `iammahmads`)
**Current site:** https://muhammadahmad.onrender.com/
**Plan date:** 10 November 2026
**Reader:** the coding agent (Google Antigravity). Follow this file top to bottom.
**Revision:** v2. Adapted to the owner's existing codebase (Vite + React + React Router + Tailwind) and his Google Form contact. v1 assumed Next.js; this version keeps the owner's stack. What changed and why is in section 2.3.

---

## 0. Operating rules for the agent

1. **Work in phases (section 13).** Do not start a phase until the previous phase's gate passes. Gates marked **STOP** need the owner's approval before continuing.
2. **Never invent personal facts.** No fake grades, test scores, awards, testimonials, job titles, dates or links. If something is missing, add a `TODO(owner)` marker in the content file and list it in `CONTENT_NEEDED.md`. The site must still build and look right with optional fields empty.
3. **Keep `PROGRESS.md` at the repo root.** After each phase, record what was done, what was decided, what is blocked, and what is next.
4. **Verify visually, not just by compiling.** Use the built-in browser to open the running site and capture screenshots at 390, 768 and 1440 px wide for every phase that changes UI. Fix what you see before reporting done.
5. **Work on a branch** (`redesign/3d`). Commit at the end of each phase. Do not touch or delete the old site until the cutover phase.
6. **Version policy.** Install the latest stable version of each dependency (`npm view <pkg> version`) and pin exact versions. Check peer-dependency compatibility, in particular React Three Fiber against the installed React major version. The existing site is on React 18. R3F v8 pairs with React 18 and R3F v9 pairs with React 19, and drei and other pmndrs add-ons must match R3F's major version (decision D1, section 2.3). Do not copy version numbers from memory or from this document.
7. **Restraint beats volume.** One memorable 3D moment (the hero), everything else quiet and disciplined. If a decoration does not help someone understand or use the site, cut it.
8. **Ask at most one batch of questions** (Appendix C) at the start of Phase 0. Proceed with the stated defaults for anything left unanswered, and record which defaults you used.
9. **Never break the contact form.** The owner's Google Form is how people reach him today. Keep it working through every phase and the cutover, and follow section 6.8.

---

## 1. Goal and success criteria

**Goal.** Replace the current portfolio with a modern, premium, 3D site that makes a visitor think "this person is serious about craft," shows the owner's GitHub projects automatically, and adds a dedicated **Education** page that supports the owner's applications for a Master's programme.

**The site is successful when:**

- [ ] First impression: within about 2 seconds, a visitor sees a striking interactive 3D hero and understands who the owner is and what he builds.
- [ ] Projects shown on the site come from the owner's GitHub (pinned repos first) with no manual copy-paste, and refresh automatically.
- [ ] The Education page is credible and scannable for an admissions committee or supervisor.
- [ ] Mobile works well. 3D degrades gracefully; nothing is broken or janky on mid-range phones.
- [ ] Accessible: keyboard-usable, readable contrast, reduced-motion respected.
- [ ] Every route is pre-rendered to static HTML: view-source shows the real content plus per-page title and Open Graph tags (so link previews work), and the text content is readable with JavaScript off.
- [ ] The contact form still delivers to the owner's Google Form (proven by a real test submission) and its UI never claims more than the code can know (section 6.8).
- [ ] Quality targets (section 11) are met and measured, not assumed.
- [ ] Live on Render at the existing URL (or a custom domain if the owner supplies one) with correct metadata and social links.

**Out of scope:** blog/CMS, user accounts, comments, e-commerce, server-side databases.

---

## 2. Known facts and issues about the current site

Observed from the current site's HTML metadata (the page itself renders client-side):

- Name: Muhammad Ahmad Shahid. Handle: `iammahmads`.
- Profile image path in metadata: `/muhammad-ahmad-shahid.jpeg`.
- Social handles present: GitHub `iammahmads`, Instagram `iammahmads`, X `iammahmads`.
- **Bugs to fix in the new site:**
  - The metadata `linkedin` field points to an X (Twitter) URL.
  - The metadata `email` field contains a GitHub URL instead of an email address.
  - `keywords` says "C# Backend Skills" while the description says React and Node.js. The owner must confirm the real stack (Appendix C).
  - Old image URL uses `http://`, not `https://`.

Phase 0 must inspect the live site in the browser and note: current sections, the URLs/routes that exist today, copy worth keeping, and any assets (photo, CV, icons) that can be reused.

### 2.1 Existing codebase (supplied by the owner)

| Item | Found | Consequence |
|---|---|---|
| Build tool | Vite 5, TypeScript 5.2 | Keep Vite. No migration to Next.js. |
| React | 18.2 | R3F v9 needs React 19. Upgrade (D1). |
| Router | `react-router-dom` 7, used as a library | Move to React Router framework mode to get pre-rendering (D2). In v7 import from `react-router`; `react-router-dom` is only a re-export. |
| Types | `@types/react-router-dom` 5.x | Obsolete: that is v5 typing and v7 ships its own types. Remove. |
| Styling | Tailwind 3.4 + PostCSS + autoprefixer | Tailwind stays. v3 or v4 is decided in Phase 1 (D3). |
| Lint | ESLint 8 with the legacy `--ext` flag | ESLint 8 is no longer maintained. Move to current ESLint with flat config. |
| Build script | `tsc && vite build` | Split into separate `typecheck` and `build` scripts. |
| Tooltips | `react-tooltip` | Keep only if the final design still needs it (restraint rule). |
| Host | Render | Static Site; confirm publish directory (probably `dist`) and any rewrite rule in Phase 0. |

### 2.2 Existing contact form

`postEmail({ from_name, from_email, message })` sends `FormData` to a Google Form's `formResponse` URL with `mode: "no-cors"`, using three `entry.*` IDs. It needs no backend, so **it stays** (D4). Weaknesses to fix (details in 6.8):

- It returns magic strings (`"SUCCESS"`, `"Invalid fields"`, `"ERROR: ..."`) instead of a typed result.
- With `no-cors` the response is opaque, so `"SUCCESS"` only means "the request left the browser". The UI must not say the message was delivered.
- Validation is only "non-empty": no email format check, no length limits, no trimming.
- No timeout, no double-submit guard, no spam protection, errors go to `console.log`, and the visitor gets no recovery path.
- The URL and entry IDs are hard-coded. They are public by design (every browser sees them) and are not secrets, but they belong in `content/site.ts` with a warning: editing, deleting or recreating a question in the Google Form changes its ID, and submissions then silently lose data.

### 2.3 Decisions that follow (what changed from v1)

| ID | Decision | Alternative considered |
|---|---|---|
| D1 | Upgrade React to 19 and use R3F v9 with the matching drei | Stay on React 18 with R3F v8. Works, but pins the project to the older line. |
| D2 | React Router **framework mode** with `ssr: false` plus `prerender`: static HTML per route, hosted as a Render Static Site | Plain SPA: smallest change, but no per-route HTML or meta tags, so weak link previews and no JS-off content. Next.js: a full rewrite of a stack that already works. |
| D3 | Tailwind: after checking v4's browser baseline against the audience, pick v4 (CSS-first tokens via `@theme`) or stay on 3.4. State the choice in `PROGRESS.md`. | Always v4 or always v3 |
| D4 | Keep the Google Form as the contact channel and drop v1's Formspree option | Formspree or a serverless function: extra service for no gain |
| D5 | Contact is a section on Home (`/#contact`) plus a block on `/education`; no separate `/contact` page | A `/contact` route |

---

## 3. Key technical decisions

| Decision | Choice | Why |
|---|---|---|
| Framework | **Vite + React + TypeScript (existing), upgraded to React 19** | Keeps the owner's toolchain (D1) |
| Routing and output | **React Router 7 framework mode, `ssr: false`, `prerender`** | Static HTML per route, including every `/projects/<slug>`; per-route meta tags; no runtime server (D2) |
| Styling | **Tailwind CSS** plus CSS variables for design tokens | Already in use; one token source (D3) |
| 3D | **three.js + React Three Fiber + drei** | Standard React approach to WebGL; R3F v9 pairs with React 19 |
| Scroll and motion | **GSAP + ScrollTrigger**, **Lenis** (smooth scroll), **motion** (UI transitions) | Scroll-driven storytelling plus polished UI motion |
| GitHub data | **Fetched at build time** by a Node script (`prebuild`), validated with `zod`, cached to a committed snapshot | Token never reaches the browser; build never fails if GitHub is down |
| Freshness | **Scheduled rebuild** (GitHub Actions cron calls a Render deploy hook, daily), a visible "updated on" date, and a second trigger (see 6.4) | Projects stay current without a server, and a silent stop is detectable |
| Contact | **Existing Google Form** (`no-cors` POST), hardened per 6.8. `mailto:` and copy-email only if the owner supplies an address | No backend needed; the owner already receives responses (D4) |
| Fonts | Self-hosted from npm (Fontsource packages) or local font files | No third-party requests, better privacy and speed |
| Head and SEO | Route-level `meta` / `links` exports; sitemap and robots generated at build | Static pages need real tags in the HTML |
| Hosting | **Render Static Site** defined in `render.yaml`, publish dir `build/client` | Already in use by the owner |

**Pre-rendering consequences the agent must handle:**
- `react-router.config.ts`: `ssr: false`, and `prerender` as an async function returning `/`, `/projects`, `/education`, a not-found path, and one `/projects/<slug>` per project in `github.snapshot.json`. With `ssr: false`, routes cannot export `action` or `headers`; use loaders only where they run at prerender time.
- Output is `build/client`. Each pre-rendered path gets an `index.html` plus a `.data` file, and because `/` is pre-rendered React Router also writes a SPA fallback file for any path that was not pre-rendered. Check the installed version's docs for the exact file names.
- Do **not** add a catch-all `/* -> /index.html` rewrite on Render: it answers unknown URLs with the Home page and a 200 status. Instead pre-render a not-found page, copy it to `404.html` in a `postbuild` step, and verify on staging that an unknown URL shows it with a 404 status (check Render's current docs for how it serves `404.html`). Add specific redirects for old routes found in Phase 0.
- Nothing that touches `window`, WebGL or `three` may run during pre-render (it runs in Node). Load the Scene only through a dynamic `import()` after hydration (client-only mount). Never import `three`, R3F or drei at module top level in a route or layout file.
- Images: no `next/image`. Pre-optimise with a `sharp` script (AVIF/WebP at 1x/2x) into `/public`, render with `<picture>` and explicit `width`/`height` to prevent layout shift.
- Env vars: only `VITE_`-prefixed variables reach the browser. `GITHUB_TOKEN` must never be renamed with that prefix.
- Test the production output with `npx serve build/client` and on the Render staging site, not only `npm run dev`.

**Dependencies (install latest stable, pin exact, and check each against the installed React major):**
- Runtime: `react react-dom react-router three @react-three/fiber @react-three/drei gsap @gsap/react lenis motion zod react-markdown rehype-sanitize`, plus Fontsource packages for the two typefaces (check with `npm view` that each exists and that the width axis of Bricolage Grotesque is available; otherwise host the font files locally).
- Build and dev: `@react-router/dev vite typescript tailwindcss` (plus `@tailwindcss/vite` if v4), `sharp tsx vitest eslint typescript-eslint prettier @types/three playwright @axe-core/playwright lighthouse`, and whatever else the current official React Router template lists for a static, pre-rendered app.
- Remove: `react-router-dom`, `@types/react-router-dom`, and (if Tailwind v4) `postcss` and `autoprefixer`. Keep `react-tooltip` only if still used.
- Optional: `@react-three/postprocessing` (only if bloom is clearly worth the cost), `detect-gpu` (self-host its benchmark data or use simple heuristics instead).

---

## 4. Design system

The owner has no visual preference, so the agent proposes and the owner approves at the Phase 2 gate. The direction below is the starting proposal. It is deliberately **not** the common AI-portfolio look (no cream-and-terracotta, no black-with-acid-green, no identical rounded-card grids).

### 4.1 Concept: "Glass Core"

A deep, dark aubergine space with one luminous, refractive glass form at its centre. It is the only loud element on the site. Everything else is typographic, calm and precise. The idea: a developer's work seen through a clear lens, with structure visible inside.

### 4.2 Colour tokens (CSS variables, adjust after seeing them on screen)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#170B2B` | Page background (deep aubergine) |
| `--surface` | `#241346` | Raised panels, project rows |
| `--lilac` | `#B9A7FF` | Secondary text accents, 3D rim light |
| `--aqua` | `#3DF2E0` | The single UI accent: links, focus rings, active states |
| `--pearl` | `#F3F1FA` | Primary text |
| `--amber` | `#FFB454` | Rare: one warm light inside the 3D scene only |

Rules: aqua is the only interactive colour. No gradient washes as decoration. Text contrast must meet WCAG AA (check pearl on ink, lilac on ink, and aqua on ink).

### 4.3 Typography

- **Display:** Bricolage Grotesque (variable, uses the width axis for expressive headlines).
- **Body:** Instrument Sans.
- If either is unavailable or looks wrong in testing, the agent may substitute a similarly distinctive pair, and must state the change and why.
- Code or language tags use the body font in a smaller weight. Do not use monospace for decorative labels.
- Type scale: 1.250 ratio, body 17–18 px, line length under 75 characters, sentence case throughout.
- Avoid: one accented word in a headline, ALL-CAPS eyebrow labels above every heading, "01 / 02 / 03" numbering on non-sequential content, "→" appended to every link.

### 4.4 Layout principles

- Left-aligned text, generous whitespace, one strong column plus occasional asymmetric breaks.
- Radius is intentional: large radius only on the 3D tilt plates, small or none elsewhere. Do not apply one radius to everything.
- Project presentation is **not** a card grid (see section 6.3).
- Structural devices (rules, borders, numbering) are used only when they carry information. A timeline is a real sequence, so dates and numbering are allowed there.

### 4.5 Motion budget

- **One** orchestrated load sequence (the hero reveal). Not on every section.
- Scroll-linked motion: the persistent 3D canvas responds to scroll; the pinned project showcase advances with scroll.
- User-triggered motion is welcome: hover, press, expand, filter, copy-confirmation.
- Do **not** add fade-and-slide-up to every section or hover transitions to every element.
- Respect `prefers-reduced-motion`: disable scroll hijacking, parallax and camera motion; show a static hero.

### 4.6 Copy voice

First person, plain, specific. Say what was built and what the owner did, not slogans. Buttons name what happens ("See projects", "Email me", "Download CV"). Errors say what went wrong and how to fix it. Propose **three** hero tagline options for the owner to choose from; do not ship a tagline without approval.

---

## 5. Information architecture

```
/                    Home: hero, short intro, featured projects, capabilities, education teaser, contact
/projects            All projects (GitHub-powered), filter by technology
/projects/[slug]     Project detail (README-based case study)
/education           NEW: Master's focus, academic record, journey timeline, credentials, documents
/contact             not a page: Contact is a section on Home (/#contact) and a block on /education
/404                 Custom not-found page
```

Global: top navigation (Home, Projects, Education, Contact), skip-to-content link, footer with real links, "Download CV" button (only if the owner supplies a PDF).

### 5.1 Home wireframe (desktop)

```
+--------------------------------------------------------------+
| Name                              Projects Education Contact |
|                                                              |
|   [ full-bleed 3D glass core, reacts to cursor ]             |
|   Muhammad Ahmad Shahid                                      |
|   <approved tagline>                                         |
|   [See projects]  [Education and Master's plans]             |
+--------------------------------------------------------------+
| Short intro (3-4 lines, first person) + photo                |
+--------------------------------------------------------------+
| Featured projects: pinned scroll showcase (one at a time)    |
+--------------------------------------------------------------+
| Capabilities: stack grouped by what the owner does           |
+--------------------------------------------------------------+
| Education teaser: "Open to Master's study" -> /education     |
+--------------------------------------------------------------+
| Contact: form (name, email, message) + GitHub, LinkedIn, X   |
+--------------------------------------------------------------+
```

---

## 6. Feature specifications

### 6.1 Hero and persistent 3D canvas

- One `<Canvas>` mounted in the root layout (`app/root.tsx`), fixed behind the content, loaded with `React.lazy` / dynamic `import()` after hydration (client-only, never during pre-render) and wrapped in `Suspense`. It must not block first paint of text, and the pre-rendered HTML must contain no canvas.
- **Scene (Home):** a faceted, refractive glass core (procedural geometry preferred over a heavy model), a few small orbiting facets, soft rim lighting in lilac, one amber light inside the core. The core tilts toward the cursor with damped easing. On touch devices, use gentle gyro-free auto-drift.
- **Lighting:** use a **local** `.hdr` environment (1k resolution, under 500 KB) in `/public`. Do not use drei's remote presets (they fetch from a CDN).
- **Scroll:** a shared module-level store holds scroll progress, written by ScrollTrigger and read in `useFrame`. Do not store per-frame values in React state. Do not use drei `ScrollControls` together with Lenis.
- **Other routes:** the same canvas stays mounted but switches to a low-cost scene (a few drifting shards, no transmission material). `/education` must feel calm and credible, not flashy.
- **Hero reveal:** one sequence (about 1.2 s) on first visit only. Skip it on repeat visits in the same session and when reduced motion is on.

### 6.2 Performance tiers for 3D

| Tier | Condition | Behaviour |
|---|---|---|
| 0 | No WebGL, reduced motion, `saveData`, or very weak device | Static poster image of the core (pre-rendered AVIF/WebP), no canvas |
| 1 | Low-end GPU or low memory | `dpr` 1, no transmission material (use `MeshPhysicalMaterial` with env reflections), fewer facets |
| 2 | Mid-range | `dpr` up to 1.5, transmission with reduced samples and resolution |
| 3 | High-end | `dpr` up to 1.75, full material quality, optional light bloom |

Additional rules: use `PerformanceMonitor` and `AdaptiveDpr` to step down at runtime; pause rendering when the canvas is off-screen or the tab is hidden; avoid allocating objects inside `useFrame`; dispose geometries and materials on unmount; keep any `.glb` under 2 MB with Draco or Meshopt compression (prefer procedural geometry so no model is needed).

### 6.3 Projects

**Home: pinned showcase.** On desktop, the section pins while scrolling; each featured project takes the full viewport in turn: large title, one-sentence summary, tech list, links (repo, live demo), and a media plane (screenshot or short looping video) tilted slightly in CSS 3D and responding to the cursor. On mobile (or reduced motion), render a simple vertical list with no pinning.

**`/projects` index.** A dense, readable list of rows (name, summary, language, stars, last updated). Hovering a row on desktop shows a floating preview image that follows the cursor. A technology filter (chips) filters instantly, is keyboard accessible, and is reflected in the URL hash or query so it can be shared.

**`/projects/[slug]` detail.** Title, summary, tech, links, media, then the repository README rendered through `react-markdown` + `rehype-sanitize` (strip raw HTML and scripts; rewrite relative image links to the GitHub raw URL or copy assets at build time). Add previous/next project links.

**Curation matters.** Show the owner's **pinned** repos first. A project can be hidden, reordered, retitled or given media through `content/projects.overrides.ts` without touching code.

### 6.4 GitHub data layer

- Script: `scripts/github-sync.ts` (run with `tsx`), build time only (Node), wired as `prebuild` and as `npm run github:sync`. The zod schema lives in `lib/github.schema.ts` and is shared with the app. Reads `GITHUB_TOKEN` from the environment. The token must be a **fine-grained, read-only, public-repositories** token. Never expose it to client code (never use a `VITE_` prefix); never commit it. Provide `.env.example`.
- Primary source: GraphQL `pinnedItems` (Appendix B).
- Fallback if nothing is pinned: the 30 most recently pushed repos where `isFork = false` and `isArchived = false`, ranked by (has description, has homepage URL, stars, recent push), then take the top 8.
- Validate everything with `zod`. Drop repos with no description unless an override supplies one.
- Write the successful result to `content/github.snapshot.json` (committed). If the API call fails or the token is missing, build from the snapshot and print a clear warning. **The build must never fail because GitHub is unreachable.**
- Project model:

```ts
type Project = {
  slug: string;          // kebab-case of repo name, overridable
  name: string;          // repo name
  title: string;         // display title (override or humanised name)
  summary: string;       // one sentence
  repoUrl: string;
  liveUrl?: string;      // homepageUrl or override
  stars: number;
  forks: number;
  pushedAt: string;      // ISO date
  language?: { name: string; color?: string };
  languages: { name: string; color?: string; share: number }[];
  topics: string[];
  media?: { type: "image" | "video"; src: string; alt: string };
  readme?: string;       // markdown, sanitised at render
  featured: boolean;
  order: number;
  source: "pinned" | "fallback";
};
```

- Media fallback order: override media in `/public/projects/<slug>.*` → GitHub's `openGraphImageUrl` (only if `usesCustomOpenGraphImage` is true) → a generated, on-brand placeholder plate (name plus language colour). Never show a broken image.
- Add an `npm run github:sync` script that refreshes the snapshot locally. Store `fetchedAt` in the snapshot and show "Updated from GitHub on <date>" on `/projects`, so a stalled refresh is visible.
- **Scheduled-rebuild caveat.** GitHub automatically disables scheduled workflows in a public repository after 60 days with no repository activity. Keep the daily cron, add `workflow_dispatch`, tell the owner in the README, and offer a second independent trigger (for example a free external scheduler calling the same Render deploy hook).

### 6.5 Capabilities (stack) section

Group by what the owner does (for example Frontend, Backend, Data and tooling) rather than a flat logo wall. Use only technologies evidenced by his repos or confirmed by the owner. On hover or keyboard focus, a technology highlights the related projects. Skills with no project evidence are marked or omitted.

### 6.6 Education page (`/education`) — NEW

**Level.** Wherever this plan says "Master's", read "Master's and/or PhD" according to `intent.level` (Appendix C, Q9); copy changes accordingly.

**Purpose:** help admissions committees and potential supervisors quickly see who the owner is academically, what he wants to study, and the evidence behind it. Tone: sober, specific, credible. 3D is minimal here (calm low-cost scene).

All content lives in `content/education.ts` so the owner can edit it without touching components. Every optional field hides its UI when empty.

```ts
type Education = {
  intent: {
    level: ("masters" | "phd")[];    // what the owner is applying for; default ["masters"]
    headline: string;              // e.g. "Open to Master's study, intake TBD"
    statement: string;             // 3 sentences, owner-approved
    intake?: string;               // e.g. "Fall 2027"
    fields: string[];              // intended field(s)
    researchInterests: { title: string; why: string; evidenceTags: string[] }[];
    targetRegions?: string[];      // optional, owner decides whether to publish
  };
  degrees: {
    degree: string; institution: string; location?: string;
    start: string; end: string | "ongoing";
    grade?: string;                // only if the owner approves publishing
    highlights: string[];
    coursework?: string[];
    finalProject?: { title: string; summary: string; link?: string };
  }[];
  timeline: { date: string; title: string; detail?: string; kind: "education" | "work" | "project" | "certification" | "award" }[];
  credentials: { name: string; issuer: string; date?: string; score?: string; url?: string }[];
  research?: { title: string; type: "paper" | "thesis" | "talk" | "writing"; link?: string; year?: string }[];
  documents: { label: string; href: string; note?: string }[];   // CV PDF only by default
  contact: { email?: string; subject: string };   // email optional: the contact form (6.8) is the default channel
};
```

**Sections, in order:**

1. **Intent.** Headline, statement, intake, intended fields. This is the first thing seen.
2. **Focus and evidence.** Each research interest paired with the owner's own projects that demonstrate it (auto-linked through `evidenceTags` matched to GitHub topics and languages). This ties the Education page to real work.
3. **Academic record.** Degree, institution, dates, optional grade, coursework, final-year project.
4. **Journey timeline.** A real chronological sequence mixing education, work, projects and certifications (dates and numbering are appropriate here). Scroll-revealed, keyboard-navigable.
5. **Credentials.** Language tests, standardised tests, certifications. Show only what the owner provides and approves.
6. **Research and writing.** Optional.
7. **Documents.** "Download academic CV (PDF)". Transcripts and references: "Available on request". Do not publish transcript images.
8. **Contact for admissions and supervisors.** If the owner supplies an address: email link with a prefilled subject line and a copy button. Always: the contact form (6.8) with the source tag `[Education]`, and LinkedIn if supplied.

**Privacy rules:** never publish CNIC or national ID, phone number, home address, date of birth, or transcript images. Grades and test scores only with explicit owner approval.

**SEO:** page-specific title and description; JSON-LD `Person` with `alumniOf` and `knowsAbout`.

### 6.7 Interaction and UX details

- Custom cursor only for fine pointers (`(pointer: fine)`), never replacing the native cursor on interactive text; fall back to native cursor otherwise.
- Smooth scroll (Lenis) must not break anchor links, browser find, keyboard scrolling or `prefers-reduced-motion`.
- Page transitions: short and interruptible; never block navigation.
- Magnetic or tilt effects only on hero actions and project media, small amplitude, no motion sickness triggers.
- Copy-email button (rendered only when an email address is configured) announces success to screen readers (`aria-live="polite"`) and visibly confirms.
- Visible focus ring (aqua, 2 px offset) on every interactive element.
- Loading state: text and layout appear immediately; the 3D scene fades in when ready. No blocking full-screen preloader longer than about 1 s.

### 6.8 Contact form (keep the owner's existing Google Form)

**Why it stays (D4).** It needs no backend, no third-party script and no cost, and the owner already receives responses through it. Harden it; do not replace it.

**Owner setup, one time (add to `CONTENT_NEEDED.md`).** In the Google Form: turn on email notifications for new responses (Responses tab) so messages get noticed; keep it open to anyone without sign-in, with no file-upload question and no email collection (any of these breaks anonymous submission); optionally link a Google Sheet.

**Configuration.** Copy the form URL and the three entry IDs from the existing `postEmail` file into `content/site.ts` as `contactForm: { actionUrl, entries: { name, email, message } }`, with this comment above them: "Editing, deleting or recreating a question in the Google Form changes its entry ID. Submissions will still look successful but fields will be lost. Re-test after any form change." These values are public by design, not secrets. Do not copy them into this plan or into `PROGRESS.md`.

**Logic.** Replace `postEmail` with a typed function and update every caller:

```ts
// app/lib/contact.ts
import { site } from "~/content/site"; // use the alias the scaffold provides

export type ContactInput = { name: string; email: string; message: string };
export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "timeout" | "network" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIMEOUT_MS = 10_000;

export function validate({ name, email, message }: ContactInput) {
  const errors: Partial<Record<keyof ContactInput, string>> = {};
  if (!name.trim() || name.trim().length > 100) errors.name = "Enter your name (up to 100 characters).";
  if (!EMAIL_RE.test(email.trim())) errors.email = "Enter an email address I can reply to.";
  const len = message.trim().length;
  if (len < 10 || len > 2000) errors.message = "Write between 10 and 2000 characters.";
  return errors;
}

export async function sendContact(input: ContactInput): Promise<ContactResult> {
  if (Object.keys(validate(input)).length > 0) return { ok: false, reason: "invalid" };

  const { actionUrl, entries } = site.contactForm;
  const body = new FormData();
  body.append(entries.name, input.name.trim());
  body.append(entries.email, input.email.trim());
  body.append(entries.message, input.message.trim());

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // no-cors: the response is opaque, so "ok" only means the request left the browser.
    await fetch(actionUrl, { method: "POST", mode: "no-cors", body, signal: controller.signal });
    return { ok: true };
  } catch {
    return { ok: false, reason: controller.signal.aborted ? "timeout" : "network" };
  } finally {
    clearTimeout(timer);
  }
}
```

**Behaviour rules (in the `ContactForm` component or a `useContactForm` hook):**
- **Honest wording.** "Sent" is allowed; "delivered" or "received" is not. Success copy: "Message sent. Thank you." Failure copy says what happened and what to do: "That didn't go through. Your message is still here. Try again, or email me at <address>." (show the address part only if one is configured; otherwise point to the GitHub and LinkedIn links).
- **Validation.** Trim all fields; inline errors tied to inputs with `aria-describedby`; move focus to the first invalid field on submit. Use `type="email"`, `autocomplete="name"` and `autocomplete="email"`.
- **Sending state.** Disable the button and show "Sending" while the request is in flight, to prevent double submits. Keep the draft on failure; clear it only on success.
- **Spam.** A visually hidden honeypot field (innocuous name, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden`); a minimum of about 2 seconds between first focus and submit; a 60-second cooldown after success (`sessionStorage`, in try/catch). If the honeypot or timing check trips, show the normal success message but do not send. Be honest in `PROGRESS.md`: the entry IDs are public, so a determined spammer can post to Google directly. The owner's mitigation is email notifications plus a mail filter; if abuse appears, replace the Google Form (new IDs) rather than adding infrastructure.
- **Source tag.** The form has no subject field, so the component accepts a `sourceTag` prop and prefixes the message (for example `[Education] `). Home uses no prefix.
- **Privacy note** under the form, one line: "Your message goes through Google Forms and is read only by me." The owner confirms the form's sharing settings make this true.
- **Accessibility.** Visible labels (not placeholder-only), 44 px minimum targets, a polite live region for status, no reliance on colour alone, usable with keyboard only and with reduced motion on.

**Tests.** Unit-test `validate` with Vitest. In Playwright, intercept `https://docs.google.com/forms/**` with `route.fulfill` to assert the body carries exactly the three configured entries (and no honeypot), and use `route.abort()` to cover the network-failure path and the timeout path. CI must never post to the real form. Before cutover, the owner makes one real submission on the staging site and confirms it arrives.

---

## 7. Repository structure

Paths elsewhere in this document written as `content/...` and `lib/...` mean `app/content/...` and `app/lib/...`.

```
/
  PLAN.md                    (this file)
  PROGRESS.md
  CONTENT_NEEDED.md
  .env.example               GITHUB_TOKEN, SITE_URL (no secret may carry a VITE_ prefix)
  render.yaml                Render static site: build, publish dir, headers, redirects
  react-router.config.ts     ssr: false + async prerender (reads the GitHub snapshot)
  vite.config.ts
  .agent/skills/             (Appendix A, agent skills for this project)
  app/
    root.tsx                 fonts, base meta, Lenis, nav/footer, persistent <Scene /> (client-only)
    routes.ts                route table
    routes/
      home.tsx  projects.tsx  project.tsx  education.tsx  not-found.tsx
    components/
      scene/                 Canvas, Core, Shards, Rig, tiers, store
      sections/              Hero, Intro, Showcase, Capabilities, EducationTeaser, Contact
      ui/                    Nav, Button, Chip, CopyEmail, FocusRing, SkipLink, ContactForm
    content/
      site.ts                name, role, links, tagline options, contactForm config
      education.ts
      projects.overrides.ts
      skills.ts
      github.snapshot.json
    lib/
      github.schema.ts  contact.ts  markdown.ts  seo.ts
  scripts/
    github-sync.ts  optimize-images.mjs  generate-seo.ts  postbuild.mjs
  public/
    env/studio-1k.hdr   projects/   cv/   og/
  tests/
    e2e.spec.ts  a11y.spec.ts  contact.spec.ts     (Vitest unit tests sit next to the code they test)
  .github/workflows/rebuild.yml    (daily deploy-hook call)
```

---

## 8. SEO, metadata and sharing

- Fix the issues listed in section 2. The old site-wide static tags in `index.html` are replaced by per-route metadata; do not carry the wrong values over. Use the owner's real email and LinkedIn once supplied. Do not guess URLs.
- Per-page `title`, `description`, canonical URL, Open Graph and Twitter card tags, set through each route's `meta` export with absolute URLs built from `SITE_URL`. Verify them in the pre-rendered HTML (view-source or `curl`), not in the browser DOM, because link-preview crawlers do not run JavaScript.
- Generate a branded OG image (1200×630) for Home, Projects, Education.
- JSON-LD: `Person` on Home and Education; `SoftwareSourceCode` or `CreativeWork` on project pages.
- `sitemap.xml`, `robots.txt` (generated by `scripts/generate-seo.ts` from the route list and snapshot slugs, written before the build), `lang="en"`, favicon set and web manifest.
- Keywords/description must match the confirmed stack.

---

## 9. Accessibility checklist

- [ ] Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, logical heading order.
- [ ] Skip link, full keyboard operation, visible focus.
- [ ] The 3D canvas is decorative: `aria-hidden="true"`, no keyboard trap, and all content exists as real text.
- [ ] `prefers-reduced-motion`: static hero, no pinning, no parallax, no camera motion.
- [ ] Colour contrast meets WCAG AA; verify with a tool, not by eye.
- [ ] Images have meaningful `alt`; video has controls or is muted, looping and decorative with no audio.
- [ ] Touch targets at least 44×44 px.
- [ ] Automated `axe` run has zero serious or critical issues on every route.

---

## 10. Security and privacy

- No secrets in the repo. `GITHUB_TOKEN` and `RENDER_DEPLOY_HOOK_URL` live only in Render and GitHub Actions secrets.
- Sanitise README markdown. Open external links with `rel="noopener noreferrer"`.
- No third-party scripts or fonts at runtime. The one permitted runtime third-party request is the contact form's POST to Google Forms, made only when the visitor presses Send and disclosed in a one-line note under the form. Analytics only if the owner asks (privacy-friendly option such as Plausible or Umami), off by default.
- Do not expose phone number, address or ID numbers anywhere.
- Set security headers in `render.yaml` (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, framing protection). Add a `Content-Security-Policy` only after testing it in report-only mode: it must allow `docs.google.com` for the form POST and the inline hydration data that pre-rendering emits.

---

## 11. Quality targets (measure, then record in `PROGRESS.md`)

| Metric | Target |
|---|---|
| Lighthouse mobile: Performance | 85 or higher (note the 3D cost honestly if lower and explain) |
| Lighthouse desktop: Performance | 90 or higher |
| Lighthouse: Accessibility, Best Practices, SEO | 95 or higher |
| LCP | under 2.5 s on throttled mobile |
| CLS | under 0.1 |
| INP | under 200 ms |
| Initial JS (route, excluding lazy 3D chunk) | under about 200 KB gzipped |
| Lazy 3D chunk | under about 450 KB gzipped |
| Hero poster / images | AVIF or WebP, sized to display |
| Frame rate | steady 60 fps on mid-range laptop; 30 fps or better on mid-range phone |

If a target cannot be met, say why and propose the smallest compromise. Do not silently relax it.

---

## 12. Test and QA matrix

- **Viewports:** 360, 390, 768, 1024, 1440, 1920.
- **Browsers:** Chrome, Firefox, Safari (including iOS Safari).
- **Conditions:** 4× CPU throttle, slow 4G, reduced motion on, JavaScript disabled (text content must still be present from static HTML), WebGL disabled (poster fallback appears).
- **Input:** keyboard only; touch.
- **Automated:** Playwright smoke test for each route (loads, no console errors, key text present), `axe` accessibility run, link check for all internal and external links, `npm run build` and `npx serve build/client` smoke test, a check that every pre-rendered route's HTML contains its `<title>` and key text, and the contact-form tests from 6.8 (intercepted, never against the real form).
- **Content:** every link resolves; no `TODO(owner)` text visible on the public site.

---

## 13. Phased execution

### Phase 0. Discovery (no code yet)

- [ ] Open the current site in the browser; record sections, the routes/URLs that exist today, copy worth keeping, reusable assets.
- [ ] Inspect the existing repo you are working in: confirm the stack in section 2.1, and record the Render service settings (build command, publish directory, rewrite rules, env vars) and the Node version. Do not change them yet.
- [ ] Contact form baseline: find `postEmail`, its callers and the form UI; ask the owner (Appendix C, Q16) how submissions reach him today and whether they are arriving.
- [ ] Fetch the owner's GitHub (use the API, since the web page may be rate limited): list public repos, pinned repos, languages, descriptions, homepage URLs. Record in `PROGRESS.md`.
- [ ] Create branch `redesign/3d`. Create `CONTENT_NEEDED.md` from Appendix C and ask the owner the questions in one batch.
- [ ] Propose three tagline options.

**STOP:** owner confirms stack, tagline choice, and answers (or accepts defaults for) the questionnaire.

### Phase 1. Migration spike and scaffold

Goal: prove decisions D1 and D2 before any design work.

- [ ] On `redesign/3d`: upgrade React to 19; move from `react-router-dom` to `react-router` framework mode (`ssr: false`, `prerender`); remove `@types/react-router-dom`; set up current ESLint (flat config) and Prettier; add a separate `typecheck` script; set up Tailwind per D3.
- [ ] Spike pages: `/`, `/projects` and one fake `/projects/test`, pre-rendered to static HTML; a not-found page copied to `404.html`; an empty R3F `<Canvas>` mounted client-only.
- [ ] Deploy `build/client` to a **second Render Static Site** pointed at the branch (staging). Confirm: view-source shows real content and a per-route `<title>`; hydration logs no console errors; an unknown URL shows the 404 page with a 404 status; deep links and refresh work; text is visible with JavaScript off.
- [ ] Folder structure from section 7 and scripts (`dev`, `build`, `lint`, `typecheck`, `test`, `github:sync`, `images`, `prebuild`, `postbuild`).
- [ ] Port the contact logic into `lib/contact.ts` and `content/site.ts` per 6.8 (logic only; the UI comes in Phase 5).
- [ ] Create the agent skills from Appendix A. Self-hosted fonts, base layout, skip link.

**Gate:** `npm run build` succeeds and staging serves a working shell that passes the checks above. If the spike cannot be made to work, stop and report what failed; do not silently switch stacks. Options to offer the owner: (a) React Router SPA mode without pre-rendering plus a Render rewrite (weaker link previews and no JS-off content), (b) Next.js static export.

### Phase 2. Design system

- [ ] Write a short design plan (tokens, type, layout, principles) and **review it against section 4**: if any choice reads like a generic default, revise it and say what changed and why.
- [ ] Implement tokens, type scale, buttons, chips, nav, focus ring, footer.
- [ ] Build a temporary `/styleguide` route (remove before cutover).

**STOP:** owner approves look and feel from screenshots.

### Phase 3. GitHub data layer

- [ ] Implement `scripts/github-sync.ts`, `lib/github.schema.ts`, fallback logic, snapshot, overrides, `github:sync`, and the `prebuild` wiring. The `prerender` path list in `react-router.config.ts` reads the snapshot.
- [ ] Unit-test (Vitest) the ranking and fallback logic. Test the "token missing" and "API down" paths.

**Gate:** build works with token, without token (snapshot), and offline, and the pre-rendered `/projects/<slug>` pages match the snapshot.

### Phase 4. Hero and 3D scene

- [ ] Canvas shell, core geometry, materials, local HDR, cursor rig, tiers, poster fallback, hero reveal, all client-only.
- [ ] Measure frame rate and bundle size of the 3D chunk. Confirm the pre-rendered HTML contains no canvas and the prerender step never imports `three`.

**Gate:** targets in section 11 are on track; reduced-motion and no-WebGL fallbacks work.

### Phase 5. Home sections

- [ ] Intro, pinned showcase (desktop) and list (mobile), capabilities, education teaser.
- [ ] Contact section: `ContactForm` on top of `lib/contact.ts`, all states from 6.8 (idle, invalid, sending, sent, failed), GitHub/LinkedIn/X links, copy-email only if an address exists.
- [ ] Lenis and ScrollTrigger integration.

**Gate:** full Home scroll tested on desktop, tablet and phone widths with screenshots, and a real test submission from the staging site appears in the owner's Google Form responses (owner confirms).

### Phase 6. Projects pages

- [ ] `/projects` list with hover preview and filter; `/projects/[slug]` details with sanitised README.
- [ ] Media pipeline and fallbacks.

**Gate:** every project renders with no broken images, links or layout shifts.

### Phase 7. Education page

- [ ] Implement `content/education.ts`, all eight sections, evidence auto-linking, documents area, contact block with the `[Education]` source tag, JSON-LD.
- [ ] Populate with owner-provided content only (the "already on record" items in Appendix C count once the owner confirms them); leave `TODO(owner)` where missing.

**STOP:** owner reviews every line on this page for accuracy and approves what is public.

### Phase 8. Polish

- [ ] Interactions from 6.7, page transitions, copy-email, micro-interactions on hero actions only.
- [ ] Critique pass: look at screenshots, then **remove one thing that does not earn its place**. Record notes on what was tried.

### Phase 9. Accessibility, performance, QA

- [ ] Run the full matrix in section 12. Fix issues. Record Lighthouse and `axe` results.
- [ ] Complete SEO tasks in section 8 and check every route's pre-rendered HTML (title, description, canonical, Open Graph).

**Gate:** all section 11 targets met or explicitly justified.

### Phase 10. Deploy and cutover

- [ ] Add `render.yaml`: static service, `buildCommand: npm ci && npm run build`, `staticPublishPath: build/client`, security headers, long-cache headers for hashed assets, redirects for old routes found in Phase 0, and no catch-all rewrite. Set `GITHUB_TOKEN` and `SITE_URL` as Render environment variables.
- [ ] Add `.github/workflows/rebuild.yml` (daily cron plus `workflow_dispatch`) calling the deploy hook (`RENDER_DEPLOY_HOOK_URL` secret). Explain the 60-day scheduled-workflow shutoff to the owner and offer the second trigger from 6.4.
- [ ] Compare staging against the old site route by route. The owner makes one real contact-form submission on staging and confirms it arrives.
- [ ] Tag `main` as `legacy-v1`. Cut over only after owner sign-off, by merging `redesign/3d` into `main`. The existing service keeps its `onrender.com` URL, so change its publish directory to `build/client` and remove any old catch-all rewrite in the same sitting as the merge, and watch the first deploy. Rollback: revert the merge or redeploy the `legacy-v1` tag. Keep the staging service until the new production site is confirmed, then delete it.
- [ ] Remove `/styleguide`, verify no `TODO(owner)` text is live, send one more real contact submission on production, and submit the sitemap if the owner has Search Console.

**Definition of Done:** all boxes in section 1 are checked, section 11 results are recorded, the contact form is verified on production, and `PROGRESS.md` shows every phase complete.

---

## 14. Risks and mitigations

| Risk | Mitigation |
|---|---|
| 3D too heavy on phones | Tier system, poster fallback, adaptive DPR, procedural geometry, performance budget |
| GitHub API limits or outage | Build-time fetch only, committed snapshot, never fail the build |
| Stale project data | Daily scheduled rebuild |
| Generic-looking result | Section 4 rules, Phase 2 design review, Phase 8 "remove one thing" pass |
| Fabricated or sensitive personal data | Operating rule 2, privacy rules in 6.6 and 10 |
| Scope creep | Out-of-scope list in section 1; log new ideas in `PROGRESS.md` under "Later" |
| Agent loses the thread | `PROGRESS.md` after every phase; skills in Appendix A |
| React 19 or router migration breaks something | Phase 1 spike on a staging site before any design work; fallback options listed at the Phase 1 gate |
| 3D libraries crash the pre-render (they touch `window`) | Client-only dynamic import; check the pre-rendered HTML in Phase 4 |
| Contact form fails silently (opaque `no-cors` response, changed entry IDs) | Honest wording, fallback path, warning comment next to the IDs, real test submission before cutover (6.8) |
| Form spam (entry IDs are public) | Honeypot, minimum fill time, cooldown, email notifications plus a mail filter; replace the form if abused |
| Daily rebuild silently stops (GitHub disables idle scheduled workflows after 60 days) | Visible "updated on" date, second independent trigger, owner told in the README |
| Old URLs break at cutover | Phase 0 records existing routes; redirects in `render.yaml` |

---

## Appendix A. Agent skills to create in Phase 1

Place each in the workspace skills folder (currently `.agent/skills/<name>/SKILL.md` in Antigravity; check Antigravity's docs if the location differs). Keep them short.

**`portfolio-design-rules/SKILL.md`**
```
---
name: portfolio-design-rules
description: Design and copy rules for this portfolio. Use when creating or changing any UI, style or text.
---
- Follow section 4 of PLAN.md: tokens, type, one loud 3D moment, everything else calm.
- Aqua is the only interactive colour. No decorative gradient washes.
- No ALL-CAPS eyebrow labels, no one-word headline accents, no numbering unless content is a sequence.
- No fade-up on every section. Motion only for the hero reveal, scroll-linked 3D, and user actions.
- Copy: first person, plain, specific. Buttons name the action.
- Before finishing a UI task: screenshot at 390/768/1440, critique, remove one unnecessary element.
```

**`r3f-performance/SKILL.md`**
```
---
name: r3f-performance
description: Rules for React Three Fiber code in this project. Use when touching anything under components/scene.
---
- The scene loads via dynamic import after hydration (client-only) inside Suspense. Never import three, R3F or drei at module top level in a route or layout file: pre-render runs in Node. Never block text paint.
- Respect the 4 performance tiers in PLAN.md 6.2; poster fallback for tier 0.
- Local HDR only. No remote drei presets, no CDN assets.
- No allocations in useFrame; no per-frame React state; scroll progress via shared store.
- Pause when off-screen or tab hidden; dispose on unmount.
- Keep 3D chunk under about 450 KB gzipped; report size after each change.
- R3F major must match the React major (v9 with React 19). Check peers before upgrading either.
```

**`github-projects-sync/SKILL.md`**
```
---
name: github-projects-sync
description: How GitHub data is fetched, cached and rendered. Use when touching scripts/github-sync.ts, projects pages or overrides.
---
- Build-time only (Node, prebuild). Token from env, read-only, never VITE_-prefixed, never sent to the browser.
- Pinned repos first; fallback ranking per PLAN.md 6.4.
- Validate with zod. Write app/content/github.snapshot.json (with fetchedAt) on success; use it when the API fails.
- Build must never fail because GitHub is unreachable.
- Sanitise README markdown; rewrite relative asset links.
- Curation lives in app/content/projects.overrides.ts, not in components.
```

**`contact-form/SKILL.md`**
```
---
name: contact-form
description: Rules for the contact form and lib/contact.ts. Use when touching contact, email or the Google Form.
---
- The Google Form is the delivery channel. Never change its URL or entry IDs unless the owner confirms against the live form.
- URL and entry IDs live only in app/content/site.ts, with the warning comment from PLAN.md 6.8.
- no-cors responses are opaque: say "sent", never "delivered". On error keep the draft and show the fallback.
- Validate, trim, cap length; honeypot; cooldown; disable the button while sending.
- Tests intercept docs.google.com. CI never posts to the real form.
- Any change to the form needs a manual test submission on staging.
```

**`quality-gate/SKILL.md`**
```
---
name: quality-gate
description: Checklist to run before marking any phase done.
---
1. npm run lint && npm run typecheck && npm run build
2. npx serve build/client and open every route in the browser (390, 768, 1440 px).
3. View-source on each route: real content, title and Open Graph tags present in the HTML.
4. Playwright smoke tests and axe: zero serious or critical issues. Contact tests pass.
5. Lighthouse mobile and desktop on Home, Projects, Education; record numbers in PROGRESS.md.
6. Reduced-motion on, WebGL off, JavaScript off: confirm graceful behaviour.
7. No TODO(owner) text visible; all links resolve.
8. Update PROGRESS.md.
```

---

## Appendix B. GitHub GraphQL queries

**Pinned repositories**

```graphql
query ($login: String!) {
  user(login: $login) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          stargazerCount
          forkCount
          pushedAt
          isArchived
          isFork
          openGraphImageUrl
          usesCustomOpenGraphImage
          primaryLanguage { name color }
          repositoryTopics(first: 8) { nodes { topic { name } } }
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name color } }
          }
          object(expression: "HEAD:README.md") { ... on Blob { text } }
        }
      }
    }
  }
}
```

**Fallback (nothing pinned)**

```graphql
query ($login: String!) {
  user(login: $login) {
    repositories(
      first: 30
      ownerAffiliations: OWNER
      isFork: false
      orderBy: { field: PUSHED_AT, direction: DESC }
    ) {
      nodes {
        name description url homepageUrl stargazerCount forkCount pushedAt isArchived
        openGraphImageUrl usesCustomOpenGraphImage
        primaryLanguage { name color }
        repositoryTopics(first: 8) { nodes { topic { name } } }
        object(expression: "HEAD:README.md") { ... on Blob { text } }
      }
    }
  }
}
```

---

## Appendix C. Owner questionnaire (create `CONTENT_NEEDED.md` from this)

Ask in one batch. Defaults apply if unanswered.

**Already on record (the owner confirms or corrects each line; being listed here does not authorise publishing it)**
- Bachelor's in Software Engineering, Government College University Faisalabad, Oct 2022 to Jun 2026. Grade: not provided (default: omit).
- Final-year project: FypGuard, a code authorship and compliance verification system. Summary and link: not provided.
- Section Leader and Mentor for Stanford Code in Place (2025 and 2026).
- Work at Bitzealth since June 2025 (current). Job title not provided. Which of the projects built there are public and allowed on the site: not provided (default: do not list employer work).

**Identity and links**
1. Correct public email address? (default: no email; the contact form plus GitHub and X links are the contact paths)
2. LinkedIn URL? (default: omit LinkedIn)
3. Confirm your real core stack (React, Node.js, C#, others)? (default: derive from GitHub languages and the old site's description)
4. Preferred photo (or keep `/muhammad-ahmad-shahid.jpeg`)? (default: keep)
5. Custom domain, if any? (default: existing Render URL)
6. Current CV as PDF? (default: no download button)

**Projects**
7. Which 4-6 repos should be pinned or featured? (default: GitHub pinned repos)
8. Any repo that must be hidden? Any with a live demo URL, screenshot or short video?

**Postgraduate plans (for `/education`)**
9. Master's, PhD, or both? Intended field(s) of study and 2-4 research interests? (default: level "masters"; no fields, so the page shows a neutral "open to postgraduate study" until provided)
10. Target intake and countries/regions you are comfortable publishing? (default: do not publish)
11. Degree details above: publish the grade or CGPA? (default: omit grade)
12. Final-year project: title, 2-3 sentence summary, and a link if public?
13. Tests and certifications (IELTS/TOEFL/GRE/others) with dates, and whether to publish scores? (default: omit scores)
14. Publications, talks or writing? Awards or scholarships?
15. Work, internships or freelance experience to include in the timeline (including Bitzealth and Code in Place)?

**Contact form**
16. How do form submissions reach you today (email notification, Google Sheet, checked by hand), and are they arriving? Is the form set to accept anyone without sign-in, with no file upload and no email collection? (default: assume it works; the agent adds the owner setup steps from 6.8 to `CONTENT_NEEDED.md`)

**Preferences**
17. Any colours, sites or styles you like or dislike? (default: the "Glass Core" direction in section 4)
18. Analytics wanted? (default: none)