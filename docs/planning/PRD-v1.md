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

**Deliverables**:
- [ ] Initialize Git repository
- [ ] Create Astro project with TypeScript
- [ ] Configure ESLint + Prettier
- [ ] Set up `.gitignore` for Astro/Node projects
- [ ] Create `README.md` with setup instructions

**Test Criteria**:
- `npm install` completes without errors
- `npm run dev` starts development server
- `npm run build` produces `/dist` folder
- Linting passes with `npm run lint`

---

### 1.2 Cloudflare Pages Configuration
**Objective**: Establish deployment pipeline

**Deliverables**:
- [ ] Create `wrangler.toml` for Cloudflare configuration
- [ ] Document deployment steps in README
- [ ] Configure build settings (build command: `npm run build`, output: `dist`)

**Test Criteria**:
- Manual deploy to Cloudflare Pages succeeds
- Site accessible at `*.pages.dev` URL
- Build logs show no errors

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

**Deliverables**:
- [ ] Create `src/styles/variables.css` with CSS custom properties
- [ ] Define spacing scale (4px base unit)
- [ ] Define typography scale (modular scale 1.25)
- [ ] Document color usage guidelines in code comments

**Test Criteria**:
- Variables file imports without errors
- Colors meet WCAG AA contrast requirements (verify with contrast checker)

---

### 2.2 Base Styles & Reset
**Objective**: Consistent cross-browser foundation

**Deliverables**:
- [ ] Create `src/styles/reset.css` (modern CSS reset)
- [ ] Create `src/styles/global.css` (base typography, links, etc.)
- [ ] Configure Astro to include global styles

**Test Criteria**:
- Page renders consistently in Chrome, Firefox, Safari
- No unexpected default margins/padding
- Base font size is 16px, line-height ~1.5

---

### 2.3 Component Library Foundation
**Objective**: Reusable UI primitives

**Deliverables**:
- [ ] `src/components/Button.astro` - Primary, secondary, outline variants
- [ ] `src/components/Container.astro` - Max-width wrapper with responsive padding
- [ ] `src/components/Section.astro` - Consistent vertical spacing wrapper

**Test Criteria**:
- Each component renders in isolation
- Components accept expected props
- Responsive behavior correct at 320px, 768px, 1024px, 1440px

---

## Phase 3: Layout Structure

### 3.1 Base Layout
**Objective**: Page wrapper with SEO foundations

**Deliverables**:
- [ ] Create `src/layouts/BaseLayout.astro`
  - HTML5 doctype and lang attribute
  - Meta viewport, charset
  - Configurable title, description props
  - Open Graph meta tags
  - Favicon links
- [ ] Create placeholder favicon set (can be updated later)

**Test Criteria**:
- Valid HTML (W3C validator)
- All meta tags render correctly with props
- Page title updates based on prop

---

### 3.2 Navigation Component
**Objective**: Site header with navigation

**Deliverables**:
- [ ] Create `src/components/Header.astro`
  - Logo/wordmark (text initially, image-ready)
  - Navigation links (smooth scroll to sections)
  - Mobile hamburger menu
  - Sticky header with backdrop blur on scroll (optional enhancement)

**Test Criteria**:
- Navigation links scroll to correct sections
- Mobile menu opens/closes correctly
- Header is accessible (keyboard navigation, ARIA labels)

---

### 3.3 Footer Component
**Objective**: Site footer with contact info

**Deliverables**:
- [ ] Create `src/components/Footer.astro`
  - Copyright notice with dynamic year
  - Email link
  - Optional: LinkedIn/social links
  - Optional: Back to top link

**Test Criteria**:
- Footer renders at bottom of page
- Links are functional
- Year updates automatically

---

## Phase 4: Page Sections

### 4.1 Hero Section
**Objective**: Strong first impression, clear value proposition

**Deliverables**:
- [ ] Create `src/components/sections/Hero.astro`
  - Headline: Clear statement of who you are
  - Subheadline: What you do / who you help
  - Primary CTA button (scroll to contact)
  - Optional: Secondary CTA (view services)
  - Professional background treatment (gradient, subtle pattern, or solid)

**Content Requirements**:
```
Headline: "Strategic Consulting for Growing Businesses"
Subheadline: "Expert guidance in operations, finance, and technology to help your business scale efficiently."
CTA: "Let's Talk" → scrolls to contact
```

**Test Criteria**:
- Hero is full viewport height on desktop
- Text is readable on all backgrounds
- CTA button is prominent and clickable
- Responsive: stacks appropriately on mobile

---

### 4.2 Services Section
**Objective**: Clearly communicate service offerings

**Deliverables**:
- [ ] Create `src/components/sections/Services.astro`
- [ ] Create `src/components/ServiceCard.astro`
  - Icon (simple SVG or emoji initially)
  - Title
  - Description (2-3 sentences)

**Service Cards**:
1. **Business Operations**
   - Streamline processes, improve efficiency, build scalable systems
2. **Finance**
   - Financial planning, analysis, budgeting, cash flow optimization
3. **Technology**
   - Tech strategy, system selection, digital transformation guidance

**Test Criteria**:
- Three cards display in grid (responsive: 1 col mobile, 3 col desktop)
- Cards have consistent heights
- Section has proper scroll anchor ID

---

### 4.3 About Section
**Objective**: Build trust and personal connection

**Deliverables**:
- [ ] Create `src/components/sections/About.astro`
  - Brief professional bio (placeholder initially)
  - Photo placeholder (can add real photo later)
  - Key credentials/experience highlights

**Test Criteria**:
- Section renders with placeholder content
- Layout works with and without photo
- Text is scannable (not a wall of text)

---

### 4.4 Contact Section
**Objective**: Multiple ways to initiate contact

**Deliverables**:
- [ ] Create `src/components/sections/Contact.astro`
  - Section intro text
  - Three contact methods displayed clearly

**Test Criteria**:
- Section has scroll anchor ID
- All contact methods are visible and distinct

---

## Phase 5: Contact Functionality

### 5.1 Email Link
**Objective**: Direct email contact

**Deliverables**:
- [ ] Styled email link/button
- [ ] Mailto link with subject line pre-filled: `mailto:email@example.com?subject=Consulting Inquiry`

**Test Criteria**:
- Clicking opens default email client
- Subject line is pre-filled

---

### 5.2 Contact Form
**Objective**: Form submission without managing backend

**Deliverables**:
- [ ] Create `src/components/ContactForm.astro`
  - Fields: Name, Email, Company (optional), Message
  - Client-side validation
  - Submit button with loading state
- [ ] Integrate with form service (Formspree or Cloudflare Workers)
- [ ] Success/error message display

**Test Criteria**:
- Form validates required fields before submit
- Successful submission shows confirmation
- Failed submission shows error message
- Form is accessible (labels, error messages)

---

### 5.3 Calendar Booking
**Objective**: Enable scheduling without back-and-forth

**Deliverables**:
- [ ] Create `src/components/CalendarEmbed.astro`
- [ ] Integrate Calendly embed (or Cal.com as alternative)
- [ ] Style to match site design as much as possible

**Test Criteria**:
- Calendar widget loads
- Booking flow completes successfully
- Widget is responsive

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

## File Structure (Target)

```
rbk-strategies/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Button.astro
│   │   ├── Container.astro
│   │   ├── Section.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ServiceCard.astro
│   │   ├── ContactForm.astro
│   │   ├── CalendarEmbed.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── Services.astro
│   │       ├── About.astro
│   │       └── Contact.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       ├── variables.css
│       ├── reset.css
│       └── global.css
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .prettierrc
├── .eslintrc.cjs
└── README.md
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
