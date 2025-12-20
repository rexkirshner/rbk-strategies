# SEO Audit Report: RBK Strategies

| Field | Value |
|-------|-------|
| Date | 2025-12-20 |
| Last Updated | 2025-12-20 |
| Repository | rbk-strategies |
| Framework | Astro 5.16.0 |
| Rendering | Hybrid SSR (Server mode with prerendered homepage) |
| Hosting | Cloudflare Pages |
| Primary Goal | Improve visibility for "Rex Kirshner" name searches |
| Status | **Phase 1 & 2 Complete** |

**Assumptions:**
- Site is live at https://rbkstrategies.com
- Google Search Console is configured (per STATUS.md user action items)
- Cross-site linking with rexkirshner.com is in place
- No access to Google Search Console data for this audit

---

## Executive Summary

**Overall SEO Health: 9/10** - Strong technical foundation with comprehensive personal name visibility.

**Completed Improvements (Session 11):**
- ✅ Page title now includes "Rex Kirshner"
- ✅ Meta description mentions personal name and Stanford credential
- ✅ Standalone Person schema added to @graph (first entity for priority)
- ✅ WebPage schema includes author property referencing Person
- ✅ Sitemap cleaned up (removed hash fragments, updated dates, added image)
- ✅ LocalBusiness placeholder phone removed
- ✅ og:image converted to absolute URL
- ✅ LinkedIn company page added to footer

**Already in Place:**
- Comprehensive JSON-LD structured data with @graph architecture
- Proper canonical URLs and Open Graph implementation
- rel="me" identity links for cross-site verification
- "Founded by Rex Kirshner" prominently in About section content
- Profile photo with descriptive alt text

**Remaining Opportunities (Phase 3):**
1. **P2**: FAQ schema for service questions (rich results opportunity)
2. **P2**: Dedicated /about page for Rex Kirshner (high impact)
3. **P2**: Testimonials section with Review schema
4. **P3**: Dynamic sitemap generation

**Expected Impact:** With P0/P1 fixes implemented, "Rex Kirshner" search rankings should improve within 2-4 weeks of Google re-crawling.

---

## Methodology

**Discovery Process:**
1. Analyzed `package.json` and `astro.config.mjs` for stack and rendering mode
2. Enumerated all pages in `src/pages/` directory
3. Inspected `src/layouts/BaseLayout.astro` for meta tags and JSON-LD
4. Reviewed `public/robots.txt` and `public/sitemap.xml`
5. Examined all section components for content structure and heading hierarchy
6. Cross-referenced with session history in `context/SESSIONS.md` for prior SEO work

**Files Inspected:**
- `astro.config.mjs` - Site configuration
- `src/layouts/BaseLayout.astro` - Meta tags, JSON-LD, OG tags
- `src/pages/index.astro` - Homepage and title/description props
- `src/components/sections/*.astro` - All section components
- `src/components/Header.astro` - Navigation structure
- `src/components/Footer.astro` - Footer links
- `public/robots.txt` - Crawl directives
- `public/sitemap.xml` - URL inventory

**What Couldn't Be Verified:**
- Live page rendering (no network requests)
- Google Search Console indexing status
- Actual SERP rankings for "Rex Kirshner"
- Core Web Vitals metrics
- Mobile rendering behavior

---

## Findings Table

| Priority | Issue | Impact | Location | Status |
|----------|-------|--------|----------|--------|
| P0 | Title tag omits "Rex Kirshner" | CRITICAL | `src/pages/index.astro` | ✅ DONE |
| P0 | Meta description omits personal name | CRITICAL | `src/pages/index.astro` | ✅ DONE |
| P0 | Person schema only nested, not standalone | HIGH | `src/layouts/BaseLayout.astro` | ✅ DONE |
| P1 | Sitemap contains hash fragment URLs | MEDIUM | `public/sitemap.xml` | ✅ DONE |
| P1 | Sitemap lastmod dates are stale | MEDIUM | `public/sitemap.xml` | ✅ DONE |
| P1 | LocalBusiness has placeholder phone | MEDIUM | `src/layouts/BaseLayout.astro` | ✅ DONE |
| P1 | og:image URL is relative | MEDIUM | `src/layouts/BaseLayout.astro` | ✅ DONE |
| P1 | H1 doesn't mention founder name | MEDIUM | `src/components/sections/Hero.astro` | ⏭️ SKIPPED |
| P2 | No FAQ schema for service questions | LOW | N/A | ⏳ BACKLOG |
| P2 | Missing BreadcrumbList schema | LOW | N/A | ⏳ BACKLOG |
| P2 | No author property on WebPage | LOW | `src/layouts/BaseLayout.astro` | ✅ DONE |

---

## Detailed Recommendations

### P0: Title Tag Must Include "Rex Kirshner"

**Current state:**
```astro
// src/pages/index.astro:21
title="RBK Strategies - Business Operations, Finance & Technology Consulting"
```
The title completely omits the personal name. Google Search Console likely shows zero impressions for "Rex Kirshner" queries from this page.

**Why it matters:**
The `<title>` tag is the single most important on-page SEO signal. For personal brand searches, the name MUST appear in the title. Users searching "Rex Kirshner" will not click a result titled "RBK Strategies" unless they already know the connection.

**Recommendation:**
```astro
title="Rex Kirshner | RBK Strategies - Business Consulting"
```
Or for the homepage specifically:
```astro
title="RBK Strategies | Rex Kirshner - Business Operations & Tech Consulting"
```

**Where:** `src/pages/index.astro:21`

**Acceptance criteria:**
- "Rex Kirshner" appears in rendered `<title>` tag
- Title is under 60 characters to avoid truncation
- Personal name appears within first 30 characters

---

### P0: Meta Description Must Include "Rex Kirshner"

**Current state:**
```astro
// src/pages/index.astro:22
description="Expert consulting services in business operations, finance, and technology. Strategic guidance to help your business scale efficiently."
```
The description is generic and doesn't mention the founder.

**Why it matters:**
Meta descriptions influence click-through rates. When someone searches "Rex Kirshner", seeing his name in the description confirms they found the right result.

**Recommendation:**
```astro
description="Rex Kirshner provides expert consulting in business operations, finance, and technology. Stanford CS grad helping growing businesses scale efficiently."
```

**Where:** `src/pages/index.astro:22`

**Acceptance criteria:**
- "Rex Kirshner" appears in meta description
- Description is under 160 characters
- Includes differentiating credential (Stanford)

---

### P0: Add Standalone Person Schema to @graph

**Current state:**
```javascript
// src/layouts/BaseLayout.astro:58-68
"founder": {
  "@type": "Person",
  "name": "Rex Kirshner",
  "jobTitle": "Principal Consultant",
  ...
}
```
The Person is only nested inside Organization. Google may not surface this as a standalone entity.

**Why it matters:**
For personal name searches, Google needs to understand "Rex Kirshner" as a primary entity, not just a property of an organization. A standalone Person schema with `sameAs` links creates stronger knowledge graph associations.

**Recommendation:**
Add a top-level Person entity to the @graph array:
```javascript
{
  "@type": "Person",
  "@id": `${Astro.site}#person`,
  "name": "Rex Kirshner",
  "givenName": "Rex",
  "familyName": "Kirshner",
  "jobTitle": "Principal Consultant",
  "worksFor": {
    "@id": `${Astro.site}#organization`
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Stanford University"
  },
  "url": "https://rexkirshner.com",
  "image": `${Astro.site}rex-profile.webp`,
  "sameAs": [
    "https://rexkirshner.com",
    "https://www.linkedin.com/in/rexkirshner/",
    "https://scratchspace.dev"
  ],
  "knowsAbout": [
    "Business Operations",
    "Financial Consulting",
    "Technology Consulting",
    "Blockchain",
    "Ethereum"
  ]
}
```

**Where:** `src/layouts/BaseLayout.astro` - Add to structuredData["@graph"] array

**Acceptance criteria:**
- Person schema appears at top level of @graph
- @id uses consistent URL fragment (#person)
- sameAs includes all identity URLs
- worksFor references Organization by @id

---

### P1: Fix Sitemap - Remove Hash Fragments, Update Dates

**Current state:**
```xml
<!-- public/sitemap.xml:14-34 -->
<url>
  <loc>https://rbkstrategies.com/#about</loc>
  <lastmod>2025-11-26</lastmod>
  ...
</url>
```
- Hash fragments (#about, #services, #contact) are ignored by Google
- Dates are nearly a month old

**Why it matters:**
Google explicitly ignores URL fragments. These entries waste crawl budget and may confuse the crawler. Stale lastmod dates signal an inactive site.

**Recommendation:**
Remove all hash fragment URLs. Keep only:
```xml
<url>
  <loc>https://rbkstrategies.com/</loc>
  <lastmod>2025-12-20</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
</url>
```
Consider generating sitemap dynamically or updating dates on each deployment.

**Where:** `public/sitemap.xml`

**Acceptance criteria:**
- No URLs contain hash fragments
- lastmod reflects actual last modification date
- Sitemap validates at https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

### P1: Remove Placeholder Phone Number from LocalBusiness

**Current state:**
```javascript
// src/layouts/BaseLayout.astro:79
"telephone": "+1-XXX-XXX-XXXX",
```
Placeholder value appears spammy and could trigger quality filters.

**Why it matters:**
Google's quality raters flag placeholder content as low-quality. If no business phone is available, omit the property entirely rather than using a placeholder.

**Recommendation:**
Either:
1. Remove the `telephone` property entirely, OR
2. Add a real business phone number

```javascript
// Option 1: Remove
// "telephone": "+1-XXX-XXX-XXXX",  // DELETE THIS LINE

// Option 2: Real number
"telephone": "+1-415-555-0123",  // Replace with actual
```

**Where:** `src/layouts/BaseLayout.astro:79`

**Acceptance criteria:**
- No placeholder values in structured data
- JSON-LD validates without warnings

---

### P1: Use Absolute URL for og:image

**Current state:**
```astro
// src/layouts/BaseLayout.astro:188
<meta property="og:image" content={ogImage} />
```
Where `ogImage = '/og-image.jpg'` (relative path).

**Why it matters:**
Some social platforms fail to resolve relative URLs. The Open Graph protocol requires absolute URLs for reliability.

**Recommendation:**
```astro
<meta property="og:image" content={new URL(ogImage, Astro.site).href} />
```

**Where:** `src/layouts/BaseLayout.astro:188`

**Acceptance criteria:**
- og:image renders as absolute URL (https://rbkstrategies.com/og-image.jpg)
- Validates at https://developers.facebook.com/tools/debug/

---

### P1: Consider Adding Founder Name to H1 or Subheadline

**Current state:**
```astro
// src/components/sections/Hero.astro:70
<h1 class="hero-headline">Strategic Consulting for Growing Businesses</h1>
```
The H1 is generic with no personal branding.

**Why it matters:**
H1 is a significant relevance signal. While the current H1 is good for "business consulting" queries, it doesn't help with "Rex Kirshner" searches.

**Recommendation:**
Either modify H1 or add a prominent tagline:
```astro
<!-- Option 1: Modify H1 -->
<h1>Rex Kirshner: Strategic Consulting for Growing Businesses</h1>

<!-- Option 2: Add visible tagline -->
<p class="hero-attribution">with Rex Kirshner, Principal Consultant</p>
```

**Where:** `src/components/sections/Hero.astro:70-74`

**Acceptance criteria:**
- "Rex Kirshner" appears in hero section visible text
- Maintains visual design hierarchy

---

### P2: Add FAQ Schema for Service Questions

**Current state:**
No FAQ structured data despite having accordion-style service descriptions.

**Why it matters:**
FAQ schema can trigger rich results in search, increasing visibility and click-through rates. The existing accordion content is perfect for FAQ format.

**Recommendation:**
Add FAQPage schema with common questions:
```javascript
{
  "@type": "FAQPage",
  "@id": `${Astro.site}#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What consulting services does Rex Kirshner offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rex Kirshner provides consulting in operations & financial management, technology solutions, blockchain & digital assets, and podcasting."
      }
    },
    // ... more questions
  ]
}
```

**Where:** `src/layouts/BaseLayout.astro` - Add to @graph array

**Acceptance criteria:**
- FAQPage schema validates at https://validator.schema.org/
- Questions match common search queries
- At least 3-5 Q&A pairs

---

### P2: Add Author Property to WebPage Schema

**Current state:**
```javascript
// src/layouts/BaseLayout.astro:137-149
{
  "@type": "WebPage",
  // ... no author property
}
```

**Why it matters:**
Author attribution strengthens the connection between content and creator, improving E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals.

**Recommendation:**
```javascript
{
  "@type": "WebPage",
  "@id": canonicalURL,
  "author": {
    "@id": `${Astro.site}#person`
  },
  // ... rest of properties
}
```

**Where:** `src/layouts/BaseLayout.astro:137-149`

**Acceptance criteria:**
- WebPage schema includes author property
- author references Person @id

---

## Decisions Needed

1. **Title format preference**: "Rex Kirshner | RBK Strategies" vs "RBK Strategies | Rex Kirshner" - which brand takes priority?

2. **Phone number policy**: Should a real phone number be added for LocalBusiness, or remove the property entirely?

3. **H1 modification**: Is changing the H1 to include "Rex Kirshner" acceptable from a design perspective, or use a separate tagline element?

4. **Sitemap generation**: Should sitemap be generated dynamically at build time, or continue with static file?

5. **FAQ content**: Which common questions should be included in FAQ schema? Suggestions:
   - "What consulting services does Rex Kirshner offer?"
   - "Where is RBK Strategies located?"
   - "What is Rex Kirshner's background?"
   - "How do I contact RBK Strategies?"

6. **Image alt text**: Should profile image alt text be more SEO-focused? Current: "Rex Kirshner - Principal Consultant at RBK Strategies" (already good)

7. **Twitter handle**: Should `twitter:site` and `twitter:creator` be added with @handle if available?

8. **Video content**: Are there any video assets (podcast clips, etc.) that could be added with VideoObject schema?

---

## Implementation Roadmap

### Phase 1: Quick Wins ✅ COMPLETE

| Task | File | Status |
|------|------|--------|
| Add "Rex Kirshner" to page title | `src/pages/index.astro` | ✅ Done |
| Add "Rex Kirshner" to meta description | `src/pages/index.astro` | ✅ Done |
| Remove placeholder phone from LocalBusiness | `src/layouts/BaseLayout.astro` | ✅ Done |
| Fix og:image to absolute URL | `src/layouts/BaseLayout.astro` | ✅ Done |
| Update sitemap.xml (remove fragments, update date) | `public/sitemap.xml` | ✅ Done |

**Commits:** `4edf1bb`, `1d4e561`, `734a980`

### Phase 2: Medium Effort ✅ COMPLETE

| Task | File | Status |
|------|------|--------|
| Add standalone Person schema to @graph | `src/layouts/BaseLayout.astro` | ✅ Done |
| Add "Rex Kirshner" to hero section | `src/components/sections/Hero.astro` | ⏭️ Skipped (name in title/meta/schema sufficient) |
| Add author property to WebPage | `src/layouts/BaseLayout.astro` | ✅ Done |

**Commits:** `c528021`

### Phase 3: Larger Initiatives ⏳ BACKLOG

| Task | Effort | Impact | Status |
|------|--------|--------|--------|
| Implement FAQ schema with 5+ Q&A pairs | 2-3 hours | MEDIUM | Not started |
| Add dynamic sitemap generation | 3-4 hours | LOW | Not started |
| Create dedicated /about page for Rex Kirshner | 4-6 hours | HIGH | Not started |
| Add testimonials section with Review schema | 4-6 hours | MEDIUM | Not started |

---

## Appendix

### Route Inventory

| Pattern | Type | Template File | Prerendered |
|---------|------|---------------|-------------|
| `/` | Static | `src/pages/index.astro` | Yes |
| `/api/contact` | API (POST) | `src/pages/api/contact.ts` | No |
| `/#about` | Hash anchor | N/A | N/A |
| `/#services` | Hash anchor | N/A | N/A |
| `/#contact` | Hash anchor | N/A | N/A |

### Files Inspected

```
astro.config.mjs
package.json
src/layouts/BaseLayout.astro
src/pages/index.astro
src/pages/api/contact.ts
src/components/Header.astro
src/components/Footer.astro
src/components/sections/Hero.astro
src/components/sections/About.astro
src/components/sections/Services.astro
src/components/sections/Contact.astro
public/robots.txt
public/sitemap.xml
public/og-image.jpg (existence verified)
public/rex-profile.webp (existence verified)
public/favicon.svg (existence verified)
```

### Verification Commands (for team reference)

```bash
# Validate structured data
curl -s https://rbkstrategies.com | grep -o '<script type="application/ld+json">.*</script>'

# Check title tag
curl -s https://rbkstrategies.com | grep -o '<title>.*</title>'

# Validate sitemap
curl -s https://rbkstrategies.com/sitemap.xml | xmllint --noout -

# Check robots.txt
curl -s https://rbkstrategies.com/robots.txt

# Test OG tags
curl -s https://rbkstrategies.com | grep -E 'og:(title|description|image)'

# Google Rich Results Test (manual)
# https://search.google.com/test/rich-results?url=https://rbkstrategies.com
```

---

**Report generated:** 2025-12-20
**Last updated:** 2025-12-20 (Session 11)
**Auditor:** Claude Code (AI-assisted)
**Status:** Phase 1 & 2 complete, Phase 3 backlogged
**Next review:** After deployment and Google re-crawl (2-4 weeks)
