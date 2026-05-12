# Astro v6 Template

<!-- BADGES:START -->
[![CI](https://github.com/casoon/astro-v6-template/actions/workflows/ci.yml/badge.svg)](https://github.com/casoon/astro-v6-template/actions/workflows/ci.yml)
[![Astro](https://img.shields.io/badge/Astro-6.3.1-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Svelte](https://img.shields.io/badge/Svelte-5.55.5-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/Biome-2.4.14-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev)
[![Zod](https://img.shields.io/badge/Zod-4.4.3-3068B7?logo=zod&logoColor=white)](https://zod.dev)
[![pnpm](https://img.shields.io/badge/pnpm-11.0.9-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![nosecrets](https://img.shields.io/badge/nosecrets-0.3.7-4B32C3?logo=gnuprivacyguard&logoColor=white)](https://www.npmjs.com/package/@casoon/nosecrets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- BADGES:END -->

A lean, production-ready **Astro v6** monorepo template with Tailwind v4, Svelte 5 and Biome.

**Live Demos:** [Starter](https://astrov6.casoon.dev) · [Blog](https://astrov6blog.casoon.dev)

> **Status:** Astro v6 is stable. This template tracks the latest Astro v6 releases.

## Multi-Project Architecture

This template uses **pnpm workspaces** with a shared library, making it an ideal foundation for running **multiple projects from a single repository**. Typical use cases:

- **Main site** + **Blog** (included as `starter` and `blog`)
- **Landing pages** for campaigns or product launches
- **Online shop** storefront
- **Documentation** site

All projects share the same design tokens, UI components and utilities — ensuring a consistent look and feel while keeping each app independently deployable. Adding a new project is as simple as creating a new folder under `apps/` and importing from `shared/`.

## Predecessor

This template succeeds [astro-v5-template](https://github.com/casoon/astro-v5-template). It was rebuilt from scratch with a focus on simplicity and the Astro v6 feature set.

### What Changed from v5?

| Area | v5 | v6 |
|---|---|---|
| Apps | 3 (blank, base, demo) | 2 (starter, blog) |
| Linting | Biome + ESLint + Prettier | Biome only |
| Fonts | 16 packages | 3 (Inter, Lora, Fira Code) |
| Styling | @casoon/atlas + Tailwind | Custom tokens + Tailwind v4 |
| Node | >= 20 | >= 22.12.0 |
| Zod | v3 | v4 |
| Content | Legacy Collections | Loader API |
| Dev server | Standard Vite | Vite Environment API |

## Features

- **Astro v6** — New dev server, Live Content Collections, CSP
- **Tailwind v4** — CSS-first config, Vite plugin, OKLCH colors
- **Svelte 5** — Runes API ($state, $derived) for reactive islands
- **i18n** — Multi-language support (en/de) with Astro i18n routing
- **OG Images** — Auto-generated Open Graph images at build time (Satori + resvg)
- **Astro Actions** — Server-side form handling (contact, newsletter, feedback)
- **CSP** — Content Security Policy with SHA-256 nonces
- **Build Metrics** — [`@casoon/astro-speed-measure`](https://github.com/casoon/astro-speed-measure) for build performance tracking
- **Post-Build Audit** — [`@casoon/astro-post-audit`](https://github.com/casoon/astro-post-audit) for SEO, link and WCAG checks after every build
- **Secret Scanning** — [`@casoon/nosecrets`](https://github.com/casoon/nosecrets) in pre-commit plus manual workspace scans
- **Playwright** — E2E tests for both apps with axe-core a11y scanning
- **Biome** — Single tool for linting + formatting (replaces ESLint + Prettier)
- **Zod v4** — Runtime validation for env, forms, API
- **pnpm Workspaces** — Monorepo with catalog for centralized dependency management
- **Dark Mode** — System preference + manual toggle
- **Site Files** — [`@casoon/astro-site-files`](https://github.com/casoon/astro-site-files) generates `robots.txt`, `sitemap.xml`, `llms.txt`, `security.txt` and `humans.txt` at build time
- **SEO** — robots.txt, canonical URLs, meta descriptions, JSON-LD
- **WCAG 2.1 AA** — Two-layer accessibility: axe-core runtime checks + static HTML audit
- **TypeScript Strict** — Fully typed throughout

> **Tip:** For additional ready-made Tailwind v4 components (buttons, cards, modals, navigation and more), check out [webspire.de](https://www.webspire.de) — a component library built on Tailwind v4 that pairs well with this template.

## Structure

```
astro-v6-template/
├── apps/
│   ├── starter/          # Landing page + contact form + i18n
│   └── blog/             # Blog with MDX + RSS + i18n
├── shared/                # Design tokens, components, layouts, SEO, utilities
├── e2e/
│   ├── starter/          # Playwright E2E tests for starter
│   └── blog/             # Playwright E2E tests for blog
├── .github/workflows/    # CI pipeline
├── biome.json            # Linting & formatting
├── playwright.config.ts  # E2E test configuration
└── pnpm-workspace.yaml   # Workspace + catalog
```

## Prerequisites

- **Node.js** >= 22.12.0
- **pnpm** >= 10.0.0

## Quick Start

```bash
# Clone the repository
git clone https://github.com/casoon/astro-v6-template.git
cd astro-v6-template

# Install dependencies
pnpm install

# Start the starter app
pnpm dev

# Start the blog app
pnpm dev:blog
```

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the starter app (port 4321) |
| `pnpm dev:blog` | Start the blog app (port 4322) |
| `pnpm build` | Build all apps |
| `pnpm build:starter` | Build starter only |
| `pnpm build:blog` | Build blog only |
| `pnpm check` | Run Biome lint + format check |
| `pnpm check:fix` | Biome auto-fix |
| `pnpm format` | Format all files |
| `pnpm test:e2e` | Run all Playwright E2E tests |
| `pnpm test:e2e:starter` | E2E tests for starter only |
| `pnpm test:e2e:blog` | E2E tests for blog only |
| `pnpm type-check` | TypeScript check |
| `pnpm clean` | Remove build artifacts + node_modules |

## Apps

### Starter

Landing page featuring:
- Hero section with feature grid
- Contact form with Astro Actions + Zod validation
- Newsletter subscription and feedback actions
- API route (`/api/contact`)
- i18n (English + German) with language switcher
- OG image generation per page and locale
- Dark mode toggle
- SEO component with JSON-LD

### Blog

Blog template featuring:
- MDX support
- Content Collections (Loader API)
- Automatic RSS feed (`/rss.xml`) via `@astrojs/rss` page endpoint
- Automatic sitemap (`/sitemap.xml`) with i18n hreflang via `@casoon/astro-site-files`
- i18n (English + German) with language switcher
- OG image generation per page and blog post
- Tag display
- Responsive post layout

## Shared Package (`@astro-v6/shared`)

All shared code lives in `shared/`:

- **Styles** — Design tokens (OKLCH), global CSS, Tailwind theme
- **Components** — `Navbar.astro`, `ThemeToggle.svelte`
- **Layouts** — `BaseLayout.astro` (HTML base with skip link)
- **SEO** — `PageSEO.astro` (meta tags, Open Graph, JSON-LD)
- **Utilities** — `env.ts`, `api.ts`, `cn.ts`, `i18n.ts`, `og.ts`

## i18n

Both apps support English (default) and German:

- English pages at root: `/`, `/contact`, `/blog/welcome`
- German pages with prefix: `/de/`, `/de/contact`
- Language switcher in the navbar (EN/DE links)
- Translation files per app in `src/i18n/`
- Shared locale utilities in `@astro-v6/shared/utils/i18n`

## OG Image Generation

Open Graph images are generated at build time:

```bash
# Generate manually
pnpm --filter starter generate:og
pnpm --filter blog generate:og

# Runs automatically before `astro build`
pnpm build
```

- Output: `public/og/*.png` (1200x630, gitignored)
- Blog script reads MDX frontmatter to generate post-specific images
- All pages reference their OG image via `<PageSEO ogImage={...}>`

## E2E Tests

```bash
# Run all tests (builds must exist)
pnpm test:e2e

# Run per app
pnpm test:e2e:starter
pnpm test:e2e:blog
```

Tests covering navigation, i18n, SEO/OG meta tags, contact form, theme toggle, RSS, accessibility (axe-core WCAG 2.1 AA), robots.txt and sitemap.

## Secret Scanning

```bash
# Scan the whole workspace
pnpm secrets:scan

# Scan only staged files (used by pre-commit)
pnpm secrets:scan:staged
```

## Build Performance Metrics

Both apps include [`@casoon/astro-speed-measure`](https://github.com/casoon/astro-speed-measure) to track build performance. It measures integration hooks, Vite plugin timing, per-page rendering and asset processing — giving you visibility into what slows down your build.

```js
// astro.config.mjs
import speedMeasure from '@casoon/astro-speed-measure';

export default defineConfig({
  integrations: [
    // ... other integrations
    speedMeasure(), // always add as last integration
  ],
});
```

Each build prints a performance report to the console and writes a JSON baseline for trend comparisons. Supports budgets, HTML reports and GitHub Actions CI summaries.

## Post-Build Audit

Both apps include [`@casoon/astro-post-audit`](https://github.com/casoon/astro-post-audit) for automatic SEO, link and WCAG checks after every build. It runs a fast Rust binary against the build output via the `astro:build:done` hook.

The template ships with comprehensive rules enabled out of the box:

```js
// astro.config.mjs
postAudit({
  failOn: 'errors',
  hints: { sourceFiles: true },
  rules: {
    filters: { exclude: ['404.html'] },
    canonical: { self_reference: true },
    headings: { no_skip: true },
    html_basics: { meta_description_required: true },
    opengraph: {
      require_og_title: true,
      require_og_description: true,
      require_og_image: true,
    },
    a11y: {
      require_skip_link: true,
      img_alt_required: true,
      button_name_required: true,
      label_for_required: true,
    },
    links: { check_fragments: true },
    sitemap: {
      require: true,
      canonical_must_be_in_sitemap: true,
      entries_must_exist_in_dist: true,
    },
    security: { check_target_blank: true },
    hreflang: {
      check_hreflang: true,
      require_x_default: true,
      require_self_reference: true,
      require_reciprocal: true,
    },
    assets: { check_broken_assets: true },
    structured_data: { check_json_ld: true },
    content_quality: {
      detect_duplicate_titles: true,
      detect_duplicate_descriptions: true,
      detect_duplicate_h1: true,
    },
  },
}),
```

Checks include canonical URLs, meta descriptions, Open Graph tags, heading hierarchy, broken links with fragment validation, sitemap cross-referencing, `target="_blank"` security, hreflang reciprocal validation, WCAG heuristics (skip link, alt text, button text, form labels), broken asset references, JSON-LD validity and duplicate content detection. Use `failOn: 'warnings'` for stricter CI enforcement.

## Site Files

Both apps use [`@casoon/astro-site-files`](https://github.com/casoon/astro-site-files) to generate all standard site meta-files at build time:

```js
// astro.config.mjs
import siteFiles from '@casoon/astro-site-files';

siteFiles({
  sitemap: {
    i18n: { defaultLocale: 'en', locales: { en: 'en', de: 'de-DE' } },
    sources: [getBlogSitemapEntries],  // blog: inject lastmod from MDX frontmatter
  },
  robots: {},   // allow all, sitemap URL auto-derived from astro.config.site
  llms: {
    title: 'Astro v6 Blog',
    description: 'A blog template built with Astro v6, MDX and Content Collections.',
  },
}),
```

Generated files: `robots.txt`, `sitemap.xml` (with i18n hreflang), `llms.txt`. Optional: `/.well-known/security.txt`, `humans.txt`.

The blog RSS feed is generated as a prerendered page endpoint (`src/pages/rss.xml.ts`) using `@astrojs/rss` + `getCollection()`.

## Accessibility (WCAG 2.1 AA)

This template enforces WCAG 2.1 Level AA compliance through two complementary layers:

### Layer 1: Static HTML Audit (Build Time)

[`@casoon/astro-post-audit`](https://github.com/casoon/astro-post-audit) runs automatically after every build and checks the raw HTML output for:

- Missing `alt` attributes on images
- Empty links (`<a>` without text or aria-label)
- Missing page landmarks and heading structure
- Duplicate `<h1>` elements per page

### Layer 2: Runtime Accessibility Testing (E2E)

[axe-core](https://github.com/dequelabs/axe-core) via `@axe-core/playwright` validates the fully rendered pages in a real browser:

- Color contrast ratios (>= 4.5:1)
- ARIA roles and attributes
- Keyboard navigation and focus management
- Form label associations

```bash
# Run accessibility tests
pnpm test:e2e           # all tests including a11y
```

Tests are located in `e2e/starter/a11y.spec.ts` and `e2e/blog/a11y.spec.ts`.

### Built-in Accessibility Features

- **Skip to content** link in `BaseLayout`
- **Semantic HTML** — `<nav>`, `<main>`, `<article>`, `<section>` throughout
- **ARIA attributes** — `aria-label`, `aria-current`, `role` where needed
- **Link underlines** — Always visible, not just on hover
- **Focus indicators** — Visible focus rings on all interactive elements
- **Dark mode** — Respects `prefers-color-scheme`, OKLCH colors maintain contrast in both modes

## Deployment

The template ships pre-configured for **Cloudflare Workers** — the default deployment target. All application logic (forms, i18n, routing, SEO) is platform-agnostic. Switching platforms requires only three config changes.

### Cloudflare Workers (default)

No changes needed. Deploy after building:

```bash
pnpm build:starter
wrangler deploy --config apps/starter/dist/server/wrangler.json

pnpm build:blog
cd apps/blog && wrangler deploy
```

Cloudflare's edge runtime gives you global low-latency SSR out of the box, without managing servers.

### Other platforms (Node.js, Vercel, Netlify, …)

Three config changes per app:

**1. Swap the adapter** in `astro.config.mjs`:

```js
// Node.js
import node from '@astrojs/node';
adapter: node({ mode: 'standalone' })

// Vercel
import vercel from '@astrojs/vercel';
adapter: vercel()

// Netlify
import netlify from '@astrojs/netlify';
adapter: netlify()
```

**2. Enable Sharp image optimization** (Sharp runs on Node.js but not on Cloudflare Workers):

```js
image: {
  service: {
    entrypoint: 'astro/assets/services/sharp',
  },
},
```

**3. Delete `wrangler.toml`** — not needed outside of Cloudflare.

Everything else — Astro Actions, contact form, i18n, CSP, post-build audit, sitemap — works identically on every platform.

## Astro v6 Highlights

This template leverages the key features of Astro v6:

- **Vite Environment API** — Dev server runs in the same runtime as production
- **Content Collections Loader API** — `glob()` loader instead of legacy `type: 'content'`
- **Content Security Policy** — Built-in CSP with SHA-256 nonces
- **Astro Actions** — Type-safe server-side form handling
- **Zod v4** — `z.email()`, `z.url()` as top-level functions
- **Node 22+** — Minimum requirement

## Claude Code Integration

This template includes a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) setup for AI-assisted development:

- **MCP Servers** (`.claude/mcp.json`) — Pre-configured MCP servers for context7 documentation lookup, Cloudflare tooling, and Webspire UI patterns
- **Project instructions** (`CLAUDE.md`) — Architecture rules, code conventions, and dependency constraints

For the full set of reusable Claude Code skills (Astro, Tailwind, Svelte, SEO, Playwright, and more), see [casoon/ai-agent-config](https://github.com/casoon/ai-agent-config).

## License

MIT
