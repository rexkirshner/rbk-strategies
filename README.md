# RBK Strategies

Professional consulting website for RBK Strategies - specializing in business operations, finance, and technology consulting.

## Project Overview

This is a static single-page website built with Astro and deployed via Cloudflare Pages. The site showcases consulting services and provides multiple contact methods for prospective clients.

**Tech Stack:**
- Astro (Static Site Generator)
- TypeScript
- Cloudflare Pages (Hosting & Deployment)

**Design Principles:**
- Modular component architecture
- Professional B2B aesthetic
- Performance-first (Lighthouse 95+ target)
- Mobile-responsive design

## Quick Start

### Prerequisites
- Node.js 20+ (LTS recommended)
- npm or pnpm package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run format` | Format code with Prettier |

## Project Structure

```
rbk-strategies/
├── public/              # Static assets (favicon, images, etc.)
├── src/
│   ├── components/      # Reusable UI components
│   │   └── sections/    # Page sections (Hero, Services, etc.)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   └── styles/          # Global styles and design system
├── docs/
│   ├── planning/        # PRD and planning documents
│   └── reference/       # Reference materials
├── context/             # AI Context System documentation
└── artifacts/           # Build/test artifacts
```

## Deployment

### Cloudflare Pages

This project is configured for deployment on Cloudflare Pages:

**Build Configuration:**
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 20

**Deployment Steps:**
1. Push to GitHub repository
2. Connect repository to Cloudflare Pages
3. Configure build settings (see above)
4. Deploy automatically on push to main branch

See `wrangler.toml` for detailed Cloudflare configuration.

## Design System

**Brand Colors:**
- Primary (Deep Navy): `#1E3A5F`
- Secondary (Corporate Blue): `#2D7DD2`
- Accent (Warm Amber): `#F4A261`
- Neutral Dark: `#1A1A2E`
- Neutral Light: `#F8F9FA`

**Typography:**
- Font Family: Inter
- Base Size: 16px
- Scale: 1.25 (modular scale)

See `src/styles/variables.css` for complete design system.

## Development Guidelines

1. **Modularity**: Components should be independent and reusable
2. **Documentation**: Maintain clear comments and documentation
3. **Testing**: Test changes locally before committing
4. **Git Workflow**: Commit liberally at logical milestones

See `context/CONTEXT.md` for detailed development guidelines.

## Documentation

- **PRD**: `docs/planning/PRD-v1.md` - Product requirements
- **Context**: `context/CONTEXT.md` - Project orientation
- **Status**: `context/STATUS.md` - Current work status
- **Decisions**: `context/DECISIONS.md` - Technical decisions log

## Contact

**Owner**: Rex Kirshner
**Project**: RBK Strategies
**Type**: Consulting Website

## License

Copyright © 2025 Rex Kirshner. All rights reserved.
