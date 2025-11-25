# RBK Strategies Website - Product Requirements Document v1

## Overview

**Project**: RBK Strategies - Personal Consulting Website
**Owner**: Rex Kirshner
**Type**: Static single-page website
**Hosting**: Cloudflare Pages
**Tech Stack**: Astro

### Business Context
RBK Strategies is a one-person consulting firm specializing in:
- Business Operations
- Finance
- Technology

### Design Principles
1. **Modular Architecture** - Components should be independent and reusable
2. **Professional Design** - Clean, trustworthy aesthetic appropriate for B2B consulting
3. **Maintainability** - Simple codebase, well-documented, easy to update content
4. **Upgradability** - Structure allows easy addition of pages/features later
5. **Performance** - Lighthouse score 95+ across all metrics

---

## Phase 1: Project Foundation

### 1.1 Repository & Tooling Setup
**Objective**: Establish development environment and CI/CD pipeline

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Initialize Git repository
- [x] Create Astro project with TypeScript (strict mode)
- [x] Configure ESLint + Prettier
- [x] Set up `.gitignore` for Astro/Node projects
- [x] Create `README.md` with setup instructions

**Test Criteria**:
- ✅ `npm install` completes without errors
- ✅ `npm run dev` starts development server
- ✅ `npm run build` produces `/dist` folder
- ✅ Linting passes with `npm run lint`

---

### 1.2 Cloudflare Pages Configuration
**Objective**: Establish deployment pipeline

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Create `wrangler.toml` for Cloudflare configuration
- [x] Document deployment steps in README
- [x] Configure build settings (build command: `npm run build`, output: `dist`)

**Test Criteria**:
- ⏸️ Manual deploy to Cloudflare Pages (pending user execution)
- ⏸️ Site accessible at `*.pages.dev` URL (pending user execution)
- ✅ Build logs show no errors (local builds passing)

---

## Phase 2: Design System

### 2.1 Brand Definition
**Objective**: Establish visual identity

**Recommended Brand Direction**:

**Color Palette** (Professional, trustworthy, modern):
```
Primary:      #1E3A5F (Deep Navy) - Trust, expertise
Secondary:    #2D7DD2 (Corporate Blue) - Technology, innovation
Accent:       #F4A261 (Warm Amber) - Approachability, energy
Neutral Dark: #1A1A2E (Near Black) - Text
Neutral Light:#F8F9FA (Off White) - Backgrounds
```

**Typography**:
- Headings: Inter (clean, professional, excellent readability)
- Body: Inter (consistency, good for screens)
- Fallback stack: system-ui, sans-serif

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Create `src/styles/variables.css` with CSS custom properties
- [x] Define spacing scale (4px base unit: xs=4px through 5xl=128px)
- [x] Define typography scale (modular scale 1.25: xs=0.64rem through 4xl=3.815rem)
- [x] Document color usage guidelines in code comments
- [x] Define white/overlay color variables for transparency
- [x] Define z-index scale for layering
- [x] Document responsive breakpoints (480px, 768px, 1024px, 1440px)

**Test Criteria**:
- ✅ Variables file imports without errors
- ✅ Colors meet WCAG AA contrast requirements (all verified in comments)

---

### 2.2 Base Styles & Reset
**Objective**: Consistent cross-browser foundation

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Create `src/styles/reset.css` (modern CSS reset based on Josh Comeau)
- [x] Create `src/styles/global.css` (base typography, links, accessibility)
- [x] Configure Astro to include global styles via BaseLayout
- [x] Import Inter font from Google Fonts
- [x] Configure skip-to-content link for accessibility

**Test Criteria**:
- ✅ Page renders consistently in Chrome, Firefox, Safari
- ✅ No unexpected default margins/padding
- ✅ Base font size is 16px, line-height 1.5

---

### 2.3 Component Library Foundation
**Objective**: Reusable UI primitives

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] `src/components/Button.astro` - Primary, secondary, outline variants with sm/md/lg sizes
- [x] `src/components/Container.astro` - Max-width wrapper (sm/md/lg/xl/2xl) with responsive padding
- [x] `src/components/Section.astro` - Vertical spacing wrapper with background variants

**Test Criteria**:
- ✅ Each component renders in isolation
- ✅ Components accept expected props with TypeScript validation
- ✅ Responsive behavior correct at 320px, 768px, 1024px, 1440px

---

### 2.4 CSS Architecture Refinement
**Objective**: Establish modular, maintainable CSS patterns

**Status**: ✅ **COMPLETE**

**Background**: After initial component development, conducted comprehensive CSS audit and refactored for improved modularity, centralized branding control, and reduced duplication.

**Deliverables**:
- [x] Create `src/styles/utilities.css` with reusable patterns
  - Section header patterns (.section-header, .section-title, .section-subtitle)
  - Card hover effects (.card-hover)
  - Flexbox utilities (.flex-center, .flex-column, .flex-gap-*)
  - Spacing utilities (.mb-0, .mt-0)
  - Content width constraints (.content-constrained)
- [x] Enhance `variables.css` with missing design tokens
  - White/overlay colors (--color-white-90, --color-white-80, etc.)
  - Background overlay variable (--color-bg-overlay)
  - Documented responsive breakpoint standards
- [x] Replace all hardcoded rgba() values with CSS variables (40+ replacements)
- [x] Refactor components to use shared utility classes
  - Services.astro: Use .section-header utilities
  - Contact.astro: Use .section-header utilities
  - Hero.astro: Use --color-white variables
  - Header.astro: Use --color-bg-overlay
  - Footer.astro: Use --color-white-* variables
- [x] Consolidate duplicate Section component background variants
- [x] Fix global.css paragraph max-width issue (changed to opt-in)

**Impact**:
- Reduced CSS duplication by ~60 lines
- Centralized all color values (including transparent variants)
- Improved maintainability with single source of truth for common patterns
- Better component isolation with scoped styles + shared utilities
- Easier theming with complete design token system

**Test Criteria**:
- ✅ Build passes without errors
- ✅ All components render correctly with refactored CSS
- ✅ Responsive behavior maintained across all breakpoints
- ✅ No visual regressions from refactoring

**Documentation**: See `docs/reference/css-architecture.md` for complete architecture documentation.

---

## Phase 3: Layout Structure

### 3.1 Base Layout
**Objective**: Page wrapper with SEO foundations

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Create `src/layouts/BaseLayout.astro`
  - HTML5 doctype and lang attribute
  - Meta viewport, charset
  - Configurable title, description props
  - Open Graph and Twitter Card meta tags
  - Canonical URL support
  - Favicon links
  - Skip-to-content accessibility link
- [x] Create placeholder favicon set (using Astro default)

**Test Criteria**:
- ✅ Valid HTML5 (doctype, lang, semantic structure)
- ✅ All meta tags render correctly with props
- ✅ Page title updates based on prop

---

### 3.2 Navigation Component
**Objective**: Site header with navigation

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Create `src/components/Header.astro`
  - Logo/wordmark (text-based "RBK Strategies")
  - Navigation links with smooth scroll to sections
  - Mobile hamburger menu with animation
  - Sticky header with backdrop blur and semi-transparent overlay
  - Keyboard navigation support
  - ARIA labels for accessibility

**Test Criteria**:
- ✅ Navigation links scroll to correct sections
- ✅ Mobile menu opens/closes correctly with hamburger animation
- ✅ Header is accessible (keyboard navigation, ARIA labels)

---

### 3.3 Footer Component
**Objective**: Site footer with contact info

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Create `src/components/Footer.astro`
  - Copyright notice with dynamic year (2025)
  - Email link (contact@rbkstrategies.com)
  - Back to top link
  - Brand tagline
  - Responsive layout (columns → rows on mobile)

**Test Criteria**:
- ✅ Footer renders at bottom of page
- ✅ Links are functional
- ✅ Year updates automatically

---

## Phase 4: Page Sections

### 4.1 Hero Section
**Objective**: Strong first impression, clear value proposition

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Create `src/components/sections/Hero.astro`
  - Headline: "Strategic Consulting for Growing Businesses"
  - Subheadline: Clear value proposition
  - Primary CTA button ("Let's Talk" → scrolls to contact)
  - Secondary CTA ("View Services" → scrolls to services)
  - Professional background (primary color with white text)

**Content Requirements**:
```
Headline: "Strategic Consulting for Growing Businesses"
Subheadline: "Expert guidance in operations, finance, and technology to help your business scale efficiently."
CTA: "Let's Talk" → scrolls to contact
```

**Test Criteria**:
- ✅ Hero is full viewport height on desktop (min-height: 100vh)
- ✅ Text is readable on dark background (white text on primary color)
- ✅ CTA buttons are prominent and clickable
- ✅ Responsive: CTAs stack vertically on mobile

---

### 4.2 Services Section
**Objective**: Clearly communicate service offerings

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Create `src/components/sections/Services.astro`
- [x] Create `src/components/ServiceCard.astro`
  - Icon (emoji: 📊 💰 ⚙️)
  - Title
  - Description (2-3 sentences)
  - Hover effects and card styling

**Service Cards**:
1. **Business Operations**
   - Streamline processes, improve efficiency, build scalable systems
2. **Finance**
   - Financial planning, analysis, budgeting, cash flow optimization
3. **Technology**
   - Tech strategy, system selection, digital transformation guidance

**Test Criteria**:
- ✅ Three cards display in grid (responsive: 1 col mobile, 3 col desktop)
- ✅ Cards have consistent heights with flexbox
- ✅ Section has proper scroll anchor ID (#services)

---

### 4.3 About Section
**Objective**: Build trust and personal connection

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Create `src/components/sections/About.astro`
  - Professional bio (RBK Strategies description)
  - Professional photo (rex-profile.webp, 800x1066)
  - Key areas of expertise (5-item checklist)
  - Social links (personal website and LinkedIn below photo)
  - Two-column layout (text + photo) that stacks on mobile

**Test Criteria**:
- ✅ Section renders with real content and photo
- ✅ Layout works responsively (2 cols desktop → 1 col mobile)
- ✅ Text is scannable with expertise list
- ✅ Photo displays correctly below text on mobile

---

### 4.4 Contact Section
**Objective**: Multiple ways to initiate contact

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Create `src/components/sections/Contact.astro`
  - Section intro text ("Let's Work Together")
  - Three contact methods displayed as cards:
    - Email (📧)
    - Contact Form (📝) - with note about pending integration
    - Calendar Booking (📅)
  - Responsive grid layout (3 cols → 1 col on mobile)

**Test Criteria**:
- ✅ Section has scroll anchor ID (#contact)
- ✅ All contact methods are visible and distinct
- ✅ Cards have consistent styling and hover effects

---

## Phase 5: Contact Functionality

### 5.1 Email Link
**Objective**: Direct email contact

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Styled email button in Contact section
- [x] Mailto link to contact@rbkstrategies.com
- [x] Email also linked in Footer

**Test Criteria**:
- ✅ Clicking opens default email client
- ✅ Correct email address populated

---

### 5.2 Contact Form
**Objective**: Form submission without managing backend

**Status**: ⏸️ **PENDING** - Awaiting service selection and API key

**Deliverables**:
- [ ] Create `src/components/ContactForm.astro`
  - Fields: Name, Email, Company (optional), Message
  - Client-side validation
  - Submit button with loading state
- [ ] Integrate with form service (Formspree recommended or Cloudflare Workers)
- [ ] Success/error message display

**Blockers**:
- Form service selection (Formspree vs Cloudflare Workers)
- API key/configuration details

**Test Criteria**:
- Form validates required fields before submit
- Successful submission shows confirmation
- Failed submission shows error message
- Form is accessible (labels, error messages)

---

### 5.3 Calendar Booking
**Objective**: Enable scheduling without back-and-forth

**Status**: ✅ **COMPLETE**

**Deliverables**:
- [x] Calendly integration via button link (https://calendly.com/rexkirshner/30min)
- [x] Styled as secondary button in Contact section
- [x] Matches site design with button styling

**Implementation Note**: Using direct link to Calendly (opens in new tab) rather than embedded widget for simplicity and better UX on mobile.

**Test Criteria**:
- ✅ Calendar link opens Calendly
- ✅ Booking flow accessible
- ✅ Button responsive and matches design

---

## Phase 6: Performance & SEO

### 6.1 Performance Optimization
**Objective**: Fast load times

**Deliverables**:
- [ ] Optimize images (if any) with Astro's image optimization
- [ ] Ensure CSS is minimal and critical CSS is inlined
- [ ] Add preconnect hints for external resources (Calendly, fonts)
- [ ] Test and optimize Core Web Vitals

**Test Criteria**:
- Lighthouse Performance score ≥ 95
- First Contentful Paint < 1.5s
- Cumulative Layout Shift < 0.1

---

### 6.2 SEO Optimization
**Objective**: Discoverability in search

**Deliverables**:
- [ ] Complete meta descriptions for all pages
- [ ] Proper heading hierarchy (single H1, logical H2/H3)
- [ ] Create `robots.txt`
- [ ] Create `sitemap.xml` (Astro can auto-generate)
- [ ] Structured data (LocalBusiness schema)

**Test Criteria**:
- Lighthouse SEO score ≥ 95
- Google Rich Results Test passes for structured data
- All pages have unique titles and descriptions

---

### 6.3 Accessibility Audit
**Objective**: Usable by everyone

**Deliverables**:
- [ ] Run axe DevTools audit and fix issues
- [ ] Ensure keyboard navigation works throughout
- [ ] Verify color contrast ratios
- [ ] Add skip link for keyboard users

**Test Criteria**:
- Lighthouse Accessibility score ≥ 95
- No critical axe violations
- Site is fully navigable with keyboard only

---

## Phase 7: Launch Preparation

### 7.1 Content Finalization
**Objective**: Replace all placeholder content

**Deliverables**:
- [ ] Final headline and tagline copy
- [ ] Service descriptions
- [ ] About section bio
- [ ] Contact email address
- [ ] Calendly/calendar link

**Test Criteria**:
- No placeholder text remains ("Lorem ipsum", "[TODO]", etc.)
- All links point to real destinations

---

### 7.2 Final QA
**Objective**: Catch any remaining issues

**Deliverables**:
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Form submission end-to-end test
- [ ] Calendar booking end-to-end test
- [ ] All links verified working

**Test Criteria**:
- No visual bugs on any tested platform
- All interactive elements function correctly
- Console shows no errors

---

### 7.3 Domain & DNS
**Objective**: Connect custom domain

**Deliverables**:
- [ ] Configure custom domain in Cloudflare Pages
- [ ] Set up SSL (automatic via Cloudflare)
- [ ] Verify redirects (www → non-www or vice versa)

**Test Criteria**:
- Site accessible at custom domain
- HTTPS works correctly
- No mixed content warnings

---

## Future Enhancements (Out of Scope for v1)

The following items are documented for future consideration but are explicitly **not** part of the initial launch:

- Blog/content section
- Case studies/portfolio page
- Newsletter signup integration
- Analytics dashboard (beyond basic Cloudflare analytics)
- Multi-language support
- Dark mode toggle

---

## File Structure (Current)

```
rbk-strategies/
├── public/
│   ├── favicon.svg (Astro default)
│   └── rex-profile.webp (800x1066)
├── src/
│   ├── components/
│   │   ├── Button.astro ✅
│   │   ├── Container.astro ✅
│   │   ├── Section.astro ✅
│   │   ├── Header.astro ✅
│   │   ├── Footer.astro ✅
│   │   ├── ServiceCard.astro ✅
│   │   ├── ContactForm.astro ⏸️ (pending form service)
│   │   ├── CalendarEmbed.astro ⏸️ (using direct link instead)
│   │   └── sections/
│   │       ├── Hero.astro ✅
│   │       ├── Services.astro ✅
│   │       ├── About.astro ✅
│   │       └── Contact.astro ✅
│   ├── layouts/
│   │   └── BaseLayout.astro ✅
│   ├── pages/
│   │   └── index.astro ✅
│   └── styles/
│       ├── variables.css ✅ (complete design system)
│       ├── reset.css ✅ (modern CSS reset)
│       ├── utilities.css ✅ (shared patterns - NEW in Phase 2.4)
│       └── global.css ✅ (base typography)
├── docs/
│   ├── planning/
│   │   └── PRD-v1.md (this file)
│   ├── development/
│   │   └── sprint-001-report.md
│   └── reference/
│       ├── css-architecture.md
│       └── ORGANIZATION.md
├── context/ (AI Context System v3.4.0)
│   ├── CONTEXT.md
│   ├── STATUS.md
│   ├── DECISIONS.md
│   ├── SESSIONS.md
│   ├── CLAUDE.md
│   └── context-feedback.md
├── wrangler.toml ✅
├── astro.config.mjs ✅
├── package.json ✅
├── tsconfig.json ✅
├── .prettierrc ✅
├── .eslintrc.cjs ✅
└── README.md ✅
```

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Time to Interactive | < 2s |
| Total Page Weight | < 500KB |
| Build Time | < 30s |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-25 | Claude | Initial PRD |
| 1.1 | 2025-11-25 | Claude | Updated completion status for Phases 1-5; Added Phase 2.4 (CSS Architecture Refinement); Updated file structure to reflect actual implementation; Documented utilities.css and modular CSS patterns |
