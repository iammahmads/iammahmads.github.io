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
