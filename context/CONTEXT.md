# Project Context

**Last Updated:** [Auto-updated]
**Purpose:** Project orientation and high-level architecture

---

<!-- TEMPLATE SECTION: KEEP ALL - Project overview structure -->
## What Is This Project?

**RBK Strategies** - A professional single-page website for a one-person consulting business specializing in business operations, finance, and technology consulting. The site serves as a digital presence to communicate services, build trust with potential clients, and facilitate contact through multiple channels (email, form submission, and calendar booking).

**Goals:**
- Create a minimal, professional static website deployed via Cloudflare Pages
- Clearly communicate consulting services in operations, finance, and technology
- Provide multiple contact methods for prospective clients (email, form, Calendly)
- Achieve Lighthouse scores of 95+ across all metrics (performance, accessibility, SEO, best practices)
- Maintain modularity and professional design for easy future upgrades

**Key Stakeholders:**
- Owner: Rex Kirshner (solo consultant)
- Users: Prospective B2B clients seeking consulting services
- Contributors: Rex Kirshner (maintainer)
<!-- END TEMPLATE SECTION -->

---

## Getting Started

**First time here? (5-minute startup)**

1. **Read STATUS.md Quick Reference** (30 seconds)
   - ✅ Checkpoint: Can you find production URL and current phase?

2. **Check Active Tasks in STATUS.md** (2 minutes)
   - ✅ Checkpoint: Know what needs doing next?

3. **Review last session in SESSIONS.md** (2 minutes)
   - ✅ Checkpoint: Understand recent work and decisions?

4. **Start working** ✅

**Need deeper context? (30-minute orientation)**
- Read this file (CONTEXT.md) for architecture → 10 minutes
- Read DECISIONS.md for technical rationale → 15 minutes
- Read recent SESSIONS.md entries for recent work → 5 minutes

**For AI agents taking over:**
Recommended: Complete 30-minute orientation above + review last 3 sessions in SESSIONS.md (45 minutes total) for full context.

---

<!-- TEMPLATE SECTION: KEEP ALL - Tech stack structure -->
## Tech Stack

**Core Technologies:**
- **Framework:** Astro - Modern static site generator with component-based architecture, excellent performance
- **Language:** TypeScript - Type safety and better developer experience
- **Database:** None - Static site with no backend
- **Hosting:** Cloudflare Pages - Fast global CDN, free tier, automatic HTTPS, simple deployment
- **Form Handling:** Formspree/Cloudflare Workers - Serverless form submission without managing backend
- **Calendar:** Calendly - Third-party booking integration for scheduling consultations

**Why these choices?**
Prioritizing performance, simplicity, and zero backend maintenance. Astro generates static HTML with minimal JavaScript, achieving maximum performance. Cloudflare Pages provides enterprise-grade hosting with zero cost. For detailed decision rationale, see DECISIONS.md
<!-- END TEMPLATE SECTION -->

---

<!-- TEMPLATE SECTION: KEEP ALL - Architecture structure -->
## High-Level Architecture

**Type:** Static Website (Single Page Application)

**Architecture Pattern:** Static site generation with component-based architecture

**System Diagram:**
```
┌─────────────────────┐
│   User Browser      │
└──────────┬──────────┘
           │ (HTTPS)
┌──────────▼──────────────────────┐
│  Cloudflare Pages CDN           │
│  (Static HTML/CSS/JS)           │
└──────────┬──────────────────────┘
           │
┌──────────▼──────────────────────┐
│  Third-party Services:          │
│  - Formspree (form submission)  │
│  - Calendly (booking)           │
└─────────────────────────────────┘
```

**Key Components:**
- **Single-page HTML:** All sections (Hero, Services, About, Contact) on one scrollable page
- **Astro Components:** Reusable UI components (Button, Container, Section, Header, Footer, ServiceCard)
- **Section Components:** Hero, Services, About, Contact sections
- **Contact Methods:** Email link, contact form (Formspree), calendar embed (Calendly)

**Data Flow:**
This is a static site with no server-side data processing. All HTML/CSS/JS is pre-rendered at build time by Astro and served from Cloudflare's CDN. User interactions (form submissions, calendar bookings) are handled by third-party services via client-side JavaScript. No database or backend API required.

**For detailed architectural decisions:** See [DECISIONS.md](./DECISIONS.md)
<!-- END TEMPLATE SECTION -->

---

## Directory Structure

```
rbk-strategies/
├── public/              # Static assets (favicon, robots.txt)
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   │   ├── sections/    # Page sections (Hero, Services, etc)
│   │   └── *.astro      # Base components (Button, Container, etc)
│   ├── layouts/         # Page layouts (BaseLayout)
│   ├── pages/           # Route pages (index.astro)
│   └── styles/          # Global styles and CSS variables
├── context/             # AI Context System docs
│   ├── CONTEXT.md       # This file
│   ├── STATUS.md        # Current state
│   ├── DECISIONS.md     # Decision log
│   └── SESSIONS.md      # History
├── artifacts/           # Build/test artifacts
├── .claude/             # Claude Code commands
└── PRD-v1.md            # Product Requirements Document
```

**File Organization Principles:**
- Component colocation - Related components grouped by purpose
- Clear separation of concerns - sections, layouts, pages are distinct
- Global styles centralized - Design system in one place
- TypeScript throughout - Type safety for components and props

---

## Development Workflow

**Core Principles:**
1. **Plan First** - Understand the problem before writing code
2. **Test in Dev** - Verify locally before committing
3. **Incremental Changes** - Small, focused commits
4. **Root Cause Solutions** - No temporary fixes or band-aids
5. **Minimal Impact** - Change only what's necessary
6. **Full Code Tracing** - Debug by following entire flow, no assumptions

**Git Workflow:**
- Branch: Trunk-based development (main branch, feature branches for major changes)
- Commits: Descriptive commit messages, commit liberally at logical milestones
- **Push Protocol:** NEVER push without explicit user approval
  - See [DECISIONS.md](./DECISIONS.md) for detailed push protocol
  - Current status: See STATUS.md for git state

**Testing Approach:**
- **Unit Tests:** Not planned for v1 (static site, minimal JavaScript)
- **Integration Tests:** Manual testing of forms and calendar integration
- **E2E Tests:** Manual browser testing across devices
- **Lighthouse Audits:** Target 95+ scores for performance, accessibility, SEO, best practices
- **Current Test Status:** See STATUS.md

**For detailed workflow decisions:** See [DECISIONS.md](./DECISIONS.md)

---

## Environment Setup

**Prerequisites:**
- Node.js 20+ (LTS version recommended)
- npm or pnpm package manager

**Initial Setup:**
```bash
# 1. Initialize Astro project (if not done)
npm create astro@latest

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

**Environment Variables:**
- No environment variables required for basic static site
- If using form service API keys, add to `.env` (gitignored, never commit)
- Cloudflare Pages handles environment variables via dashboard

---

## Key Resources

**Documentation:**
- [STATUS.md](./STATUS.md) - Current state, tasks, and Quick Reference
- [DECISIONS.md](./DECISIONS.md) - Technical decisions and rationale
- [SESSIONS.md](./SESSIONS.md) - Session history and mental models
- [PRD.md](./PRD.md) - Product vision and requirements (if exists)
- [CODE_MAP.md](./CODE_MAP.md) - Code location guide (if exists)

**External Resources:**
- Astro Docs: https://docs.astro.build
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages
- Formspree: https://formspree.io
- Calendly: https://calendly.com

**Project URLs:**
(Also available in STATUS.md Quick Reference)
- **Production:** TBD (will be custom domain)
- **Staging:** TBD (*.pages.dev)
- **Repository:** TBD (not initialized yet)

---

## Communication & Workflow Preferences

> **📋 Source of Truth:** All preferences are defined in `context/.context-config.json`
> The guidance below is derived from that configuration.

**Communication Style:**
- Direct, concise responses without preamble
- High-level summaries of changes (e.g., "Changed X to Y in file.ts:123")
- Honest assessment of confidence levels
- Simple solutions over complex ones
- No emojis unless explicitly requested

**What to Avoid:**
- Verbose explanations unless requested
- Pushing to GitHub without explicit approval
- Making assumptions about user intent
- Temporary fixes instead of root cause solutions

**Task Management:**
- Use TodoWrite tool for tracking tasks
- Create todo items that can be checked off during work
- Mark complete as you go, one task at a time

**Session Management:**
- Use `/save` for quick session updates (2-3 min)
- Use `/save-full` before breaks/handoffs (10-15 min)
- See `.claude/commands/` for all available commands

---

## Important Context & Gotchas

**Dependencies:**
- [Critical dependency 1 and why it matters]
- [External service requirements]

**Known Limitations:**
- [Limitation 1 and workaround if any]
- [Limitation 2]

**Common Pitfalls:**
- [Gotcha 1 that developers should know]
- [Gotcha 2]

**Performance Considerations:**
- [If any critical performance constraints]

**Security Notes:**
- Never commit credentials (use .env.local)
- [Any other security considerations]

---

## Project-Specific Notes

**Design Principles (from PRD):**
- Modular architecture - Components should be independent and reusable
- Professional design - Clean, trustworthy aesthetic for B2B consulting
- Maintainability - Simple codebase, well-documented, easy to update
- Upgradability - Structure allows easy addition of pages/features later
- Performance - Lighthouse 95+ across all metrics

**Brand Direction:**
- Primary color: Deep Navy (#1E3A5F) - Trust, expertise
- Secondary color: Corporate Blue (#2D7DD2) - Technology, innovation
- Accent color: Warm Amber (#F4A261) - Approachability, energy
- Typography: Inter font family for headings and body

**Technical Constraints:**
- Must be deployable to Cloudflare Pages (static site)
- Single-page architecture (all sections on one scrollable page)
- No backend/database (static only)

**Integration Points:**
- Formspree or Cloudflare Workers for form submissions
- Calendly embed for appointment scheduling

---

## Current Work

**For current tasks, status, and next steps:** See [STATUS.md](./STATUS.md)

**For recent work and sessions:** See [SESSIONS.md](./SESSIONS.md)

**For technical decisions:** See [DECISIONS.md](./DECISIONS.md)

**For code locations:** See [CODE_MAP.md](./CODE_MAP.md) (if exists)

---

**This file provides orientation.** For what's happening now, always check STATUS.md first.
