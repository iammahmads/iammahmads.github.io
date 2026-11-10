# Redesign Progress Log

## Phase 0: Discovery (Complete)

- **Date:** 10 November 2026
- **Branch:** `redesign/3d` (active)

### 1. Existing Site & Repository Audit
- **Current Live Site:** `https://muhammadahmad.onrender.com/`
- **Current Stack Confirmed:**
  - Vite 5.2.0, React 18.2.0, React Router DOM 7.4.1 (with legacy `@types/react-router-dom` 5.3.3)
  - Tailwind CSS 3.4.3 + PostCSS + Autoprefixer
  - TypeScript 5.2.2, Node.js v24.18.1
  - Existing Build Command: `tsc && vite build` (to be split into `typecheck` and `build`)
  - Hosting: Render Static Site (existing publish directory `dist`, to become `build/client`)
- **Metadata & Asset Discoveries:**
  - Owner: Muhammad Ahmad Shahid (`iammahmads`)
  - Real Email: `mahmads0323@gmail.com` (found in `src/components/socialSidebar.tsx`; fixed old metadata bug where email was a GitHub URL)
  - Real LinkedIn: `https://www.linkedin.com/in/iammahmads` (found in `src/components/socialSidebar.tsx`; fixed old metadata bug pointing to X)
  - GitHub: `https://github.com/iammahmads`
  - X (Twitter): `https://x.com/iammahmads`
  - Profile Image: `/muhammad-ahmad-shahid.jpeg` (exists in `/public`)
  - Project Images: `URL_SHORTNER.png`, `BLOGGER.png`, `ECOMMERECE.png`, `HOSPITAL.png`, `BUS_MANAGMENT.png`, `3-STRATEGIES.png`, `LOGO.png`
- **Existing Routes:**
  - `/` (Home page with Header, Hero, About, Projects, Contact, Footer)
  - `/*` (`NotFound` component)

### 2. Contact Form Baseline
- **Delivery:** Direct `no-cors` POST to Google Forms response endpoint:
  - Action URL: `https://docs.google.com/forms/d/e/1FAIpQLSdBoBjQQm-0GHZxKGxrs94P0ugnRJW_SEjbm6Bmd5KHGThAMg/formResponse`
  - Name Entry: `entry.2005620554`
  - Email Entry: `entry.1045781291`
  - Message Entry: `entry.839337160`
- **Assessment:** Works without backend, but needs hardening per PLAN 6.8: typed results, timeout, honeypot, honest copy ("sent" not "delivered"), inline validation, length checks.

### 3. GitHub Audit (`iammahmads`)
- **Pinned Repositories:**
  - `FypGuard`: TypeScript — Final Year Project for Software Engineering (Batch 2022-2026, GCUF). Code authorship and compliance verification.
  - `Andoid-Magent-Detector`: Kotlin
  - `erc-8004-hackathon`: TypeScript
  - `zerobug`: JavaScript
  - `iammahmads`: GitHub profile config
  - `code_commenter`: Python — Hackathon project for LablabAi
- **Other Key Repositories:**
  - `short-url`: JavaScript (React, Node, Express, MongoDb)
  - `dev-ecommerce`: TypeScript (React, Node, Express, MongoDb)
  - `blooging`: JavaScript (Blogging app, MERN)
  - `TeachMe`: TypeScript (OpenAI Build Week)
  - `deriv-hackathon-frontend` & `deriv-hackathon-backend`: TypeScript & Python (Sentinal AI)
  - `name-generator-ai`: Python
  - `converter`: TypeScript

### 4. Tagline Proposals (for Owner Approval)
1. **Option 1 (Engineering craft & full-stack systems):**
   > *"Building resilient web systems and intelligent tools from concept to code."*
2. **Option 2 (Academic & research focus):**
   > *"Software engineer exploring scalable architectures, code integrity, and intelligent systems."*
3. **Option 3 (Direct, clear & human):**
   > *"Full-stack software engineer crafting robust applications and preparing for advanced research."*

### 5. Questionnaire & Next Steps
- Created `CONTENT_NEEDED.md` with all Appendix C questions and stated defaults.
- **Phase 0 STOP Gate:** Awaiting owner confirmation of stack, tagline choice, and questionnaire responses (or acceptance of defaults) to proceed with Phase 1 (migration spike & scaffold).
