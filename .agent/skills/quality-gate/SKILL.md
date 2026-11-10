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
