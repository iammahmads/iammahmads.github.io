---
name: github-projects-sync
description: How GitHub data is fetched, cached and rendered. Use when touching scripts/github-sync.ts, projects pages or overrides.
---
- Build-time only (Node, prebuild). Token from env, read-only, never VITE_-prefixed, never sent to the browser.
- Pinned repos first; fallback ranking by stars and activity per app/lib/github-ranking.ts.
- Validate with zod. Write app/content/github.snapshot.json (with fetchedAt) on success; use it when the API fails.
- Build must never fail because GitHub is unreachable.
- Sanitise README markdown; rewrite relative asset links.
- Curation lives in app/content/projects.overrides.ts, not in components.

