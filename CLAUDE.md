# Claude Context

<!--
  TEMPLATE: This file is auto-loaded by Claude Code at conversation start.
  Location: Project root (./CLAUDE.md)
  Purpose: Critical context that Claude needs for EVERY conversation.

  For detailed project orientation, see ./context/CONTEXT.md
-->

## Project Identity

**RBK Strategies** - Professional single-page consulting website for business operations, finance, and technology consulting.

**Tech Stack:** Astro 5, TypeScript, Cloudflare Pages

**Current Phase:** See [STATUS.md](./context/STATUS.md) for active tasks and project state

---

## Critical Rules

**These are non-negotiable. Violating these breaks trust.**

### Git Push Protocol
- **NEVER push without EXPLICIT approval** - each push requires fresh permission
- "commit" means commit locally, then STOP
- "push" or "commit and push" means OK to push
- Wait for user to confirm changes work before pushing

### No Lazy Coding
- Find and fix ROOT CAUSES - no band-aids, no temporary fixes
- Trace through ENTIRE code flows when debugging - no assumptions, no shortcuts
- Verify what you think you know - don't assume

### Simplicity Above All
- Make the SMALLEST possible change to fix an issue
- Surgical precision over broad changes
- When in doubt, choose the simpler solution
- If a fix feels complex, step back and find the simpler path

---

## Working Style

> **Preferences Source:** `context/.context-config.json`

### Communication
- Direct and concise - no preamble or filler
- High-level summaries: "Changed X to Y in file.ts:123"
- Clear when waiting for approval vs. work complete
- Honest about confidence levels

### Complex Tasks Workflow
1. Read codebase, think through problem
2. Write plan to `context/tasks/todo.md` with checkable items
3. **Check in with user before starting** - wait for plan approval
4. Work incrementally, marking todos complete as you go
5. Provide high-level explanation at each step
6. Add review section summarizing changes

### Simple Tasks
Just do the work directly - no planning overhead needed.

### When User Says "let's make sure it works first"
1. Make the change
2. Verify in dev environment
3. **STOP and wait** for user's explicit approval
4. Do NOT push until user confirms

---

## Debugging Protocol

**CRITICAL: Trace the ENTIRE code flow. No assumptions. No shortcuts.**

1. Follow data from entry point to the issue
2. Check inputs, outputs, and state at every layer
3. Use logging/breakpoints at each step
4. Document what you find as you trace
5. Verify - don't assume

**Common Checks:**
- Astro build cache issues (delete dist/ and rebuild)
- Multiple dev servers running (check `lsof -i :4321`)
- Browser console errors
- Recent git changes: `git log --oneline -5`

---

## Before Committing

1. Verify changes work in dev environment
2. Check for console errors/warnings
3. Test desktop and mobile if UI involved
4. Confirm no unintended side effects
5. Build still works (`npm run build`)

---

## Session Management

**Commands:**
- `/save` - Quick save (2-3 min) - updates STATUS.md
- `/save-full` - Comprehensive save before breaks/handoffs
- `/review-context` - Verify continuity at session start
- `/code-review` - AI peer review with context

**Context Files:**
| File | Purpose |
|------|---------|
| [STATUS.md](./context/STATUS.md) | Current state, active tasks, Quick Reference |
| [DECISIONS.md](./context/DECISIONS.md) | Technical decisions and rationale |
| [SESSIONS.md](./context/SESSIONS.md) | Session history and mental models |
| [CONTEXT.md](./context/CONTEXT.md) | Deep project orientation |

---

## Decision Documentation

**Proactively document significant decisions in DECISIONS.md**

When making architectural, technical, or process decisions, ask:
"This appears to be an architectural decision. Should I document this in DECISIONS.md?"

**Document:** Library choices, performance strategies, data model changes, security approaches, process changes

**Skip:** Trivial code decisions, obvious bug fixes, following existing patterns

---

## Project-Specific Notes

**Key Constraints:**
- Static site deployed to Cloudflare Pages
- Single-page architecture (all sections on one scrollable page)
- No backend/database (static HTML/CSS/JS only)
- Server mode enabled for /api/contact endpoint (serverless function)

**Common Gotchas:**
- Chrome headless OG image generation has viewport quirks (set HTML background color as fallback)
- Astro server mode requires `export const prerender = true` on static pages
- Cloudflare Pages requires build config in dashboard (npm run build, dist output)

**Integration Points:**
- Formspree/Cloudflare Workers for form submissions
- Calendly embed for appointment scheduling
- Resend API for contact form emails (requires API key)

**Brand Colors:**
- Primary: Deep Navy (#0D1E35)
- Secondary: Corporate Blue (#2D7DD2)
- Accent: Warm Amber (#F4A261)

---

**For current work:** Check [STATUS.md](./context/STATUS.md) first

**For detailed orientation:** Read [CONTEXT.md](./context/CONTEXT.md)
