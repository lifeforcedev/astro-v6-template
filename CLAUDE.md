# Astro v6 Template - Project Guidelines

## Project Purpose

Lean, production-ready Astro v6 monorepo template with two use cases: Starter (landing page + contact) and Blog (MDX + Content Collections).

## Architecture

### Monorepo Structure
```
apps/
  starter/    # Landing page + contact form + i18n
  blog/       # Blog with MDX, Content Collections, RSS

shared/       # Design tokens, components, layouts, SEO, utilities

e2e/
  starter/    # Playwright E2E tests for starter
  blog/       # Playwright E2E tests for blog
```

### Dependency Rules
- Apps only import from `@astro-v6/shared`
- NO cross-imports between apps/

## Tech Stack

- **Astro v6** (Beta) - Vite Environment API, Live Collections, CSP
- **Node >= 22.12.0** - Required for Astro v6
- **Tailwind v4** - CSS-first, Vite plugin, OKLCH
- **Svelte 5** - Runes ($state, $derived) for reactive islands
- **Zod v4** - z.email() instead of z.string().email(), z.url() instead of z.string().url()
- **Biome** - Single tool for linting + formatting (no ESLint/Prettier)
- **Playwright** - E2E tests for both apps with axe-core a11y scanning
- **pnpm** - Workspaces with catalog for centralized dependency management

## Code Conventions

### TypeScript
- Strict mode always enabled
- No `any` types (warn level)
- Export `interface Props` in Astro components
- Zod v4 syntax: `z.email()`, `z.url()`, `z.uuid()` (top-level)

### Astro v6 Breaking Changes
- `render(entry)` instead of `entry.render()` for Content Collections
- `getEntry()` instead of `getEntryBySlug()`
- `entry.id` instead of `entry.slug`
- `src/content.config.ts` instead of `src/content/config.ts`
- Loader API: `glob()` loader for local collections
- `<ClientRouter />` instead of `<ViewTransitions />`
- `import.meta.glob()` instead of `Astro.glob()`
- `import { z } from 'astro/zod'` (not from `astro:content`)

### Components
- PascalCase for file names
- Semantic HTML (nav, main, article, section)
- WCAG 2.1 Level AA compliance (see Accessibility section below)
- Mobile-first, dark mode support

### Accessibility (WCAG 2.1 Level AA)
See `accessibility-audit` skill. Automated testing via `@axe-core/playwright` in E2E suite.

### Styling
- Prefer Tailwind utility classes
- CSS custom properties for design tokens
- OKLCH colors for consistent color rendering
- Scoped styles in Astro/Svelte only when necessary

### Biome (no ESLint/Prettier)
- `biome check .` for lint + format
- `biome check --write .` for autofix
- Supports .js, .ts, .json, .astro, .svelte, .css

## i18n

- Default locale `en` at root (`/`, `/contact`), secondary locale `de` with prefix (`/de/`, `/de/contact`)
- `prefixDefaultLocale: false` in Astro i18n config
- Translation files per app: `src/i18n/en.ts`, `src/i18n/de.ts`, `src/i18n/index.ts`
- Shared locale utilities in `shared/src/utils/i18n.ts` (`localePath`, `switchLocalePath`, `useTranslations`)
- Language switcher as simple EN/DE link in Navbar

## OG Image Generation

- Build-time generation via `scripts/generate-og.ts` (runs before `astro build`)
- Uses Satori (HTML→SVG) + @resvg/resvg-js (SVG→PNG) — native Node.js, not WASM
- Output: `public/og/*.png` (1200x630, gitignored)
- Blog script reads MDX frontmatter automatically for post-specific images
- Wired into `<PageSEO ogImage={...}>` on all pages with absolute URLs via `Astro.site`

## Astro Actions

- Located in `src/actions/` with `index.ts` as re-export hub
- Split into separate files: `contact.ts`, `newsletter.ts`, `feedback.ts`
- Convention: `export const server = { submitContactForm, subscribeNewsletter, submitFeedback }`

## E2E Tests

- Playwright at workspace root, tests in `e2e/starter/` and `e2e/blog/`
- Static file server (`serve`) for testing built output
- Run: `pnpm test:e2e`, `pnpm test:e2e:starter`, `pnpm test:e2e:blog`
- Covers: navigation, i18n, SEO/OG meta tags, contact form, theme toggle, RSS, a11y (axe-core), robots.txt, sitemap

## CI

- Main CI workflow (`.github/workflows/ci.yml`) is read-only: install, lint, type-check, build
- README badge refresh runs separately in `.github/workflows/update-badges.yml`
- Do not assume the main CI job pushes commits

## Security
- Content Security Policy (CSP) with SHA-256 algorithm
- Server-side sessions via Cloudflare KV (`sessionKVBindingName: 'SESSION'`)
- `checkOrigin: true` for CSRF protection
- Zod validation for all inputs (env, forms, API)
- No `set:html` without sanitization
- API routes: always try/catch + Zod schema

## Claude Skills

Detailed development guidelines are available as global skills (in `~/.claude/skills/` via casoon-ai-agent-config). Local skills under `.claude/skills/`: `cloudflare`, `final-pass`.

- **astro-architecture** — Astro v6 API, Content Collections, Zod v4, component patterns
- **astro-client-scripts** — `<script>` vs `is:inline`, bundling, FOUC prevention, SPA events
- **tailwind-ui** — Tailwind v4 syntax, design tokens, dark mode, CSS-first config
- **svelte-5** — Runes API ($state, $derived, $effect), event handlers, props
- **playwright** — E2E test patterns, axe-core a11y, multi-project config
- **cloudflare** — Workers deploy, wrangler, KV bindings, sessions, adapter
- **i18n** — Translations, locale routing, adding pages/locales
- **biome** — Lint/format config, pre-commit hooks, known quirks
- **mdx-content** — Content Collections, Loader API, blog posts, RSS
- **seo** — OG images, PageSEO component, sitemap, robots.txt, JSON-LD
- **local-business-seo** — LocalBusiness JSON-LD, geo meta tags, areaServed, regionale Keywords
- **ui-design** — 7 core UI design rules: no pure black/white, 8px spacing, max 2 fonts, 60/30/10 color, type hierarchy, line length, visual hierarchy
- **accessibility-audit** — WCAG 2.2 AA patterns: landmarks, forms, focus, contrast, ARIA, motion, dialogs, checklists
- **darkmode** — Dark mode implementation: class-based toggle, cookie persistence, color guidelines, FOUC prevention
- **web-performance** — Core Web Vitals, image optimization, content-visibility, scroll-driven animations
- **post-audit** — Post-build SEO/a11y/link audit integration and remediation patterns
- **webspire** — Webspire MCP integration: UI patterns, CSS snippets, design tokens, glass effects

## Webspire MCP

MCP server configured in `.claude/mcp.json` (`@webspire/mcp`). See `webspire` skill for patterns, snippets, and token integration.

## View Transitions (ClientRouter)

See `astro-client-scripts` skill for script patterns. Known pitfalls:

| Mistake | Fix |
|---------|-----|
| `astro:page-load` + `data-astro-rerun` together | Choose one — causes double execution |
| `classList.add('a b')` (space in string) | Use `classList.add('a', 'b')` (separate args) |

## Dark Mode

Class-based via `.dark` on `<html>`. Persisted via cookie + localStorage. See `darkmode` skill.
