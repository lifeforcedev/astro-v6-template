# Roadmap

## Phase 1: Foundation (complete)

- [x] Monorepo structure with pnpm Workspaces + Catalog
- [x] Shared packages: styles, ui, utils
- [x] Starter app: Landing page + contact form + API route
- [x] Blog app: MDX + Content Collections (Loader API) + RSS
- [x] Design tokens with OKLCH colors (light/dark)
- [x] Biome as single lint/format tool
- [x] CI pipeline (GitHub Actions)
- [x] CLAUDE.md project guidelines
- [x] Zod v4 integration (env, api, forms)

## Phase 2: Astro v6 Features (complete)

- [x] Add `<ClientRouter />` for view transitions
- [x] Prefetch configuration (viewport strategy)
- [x] Security: `checkOrigin` enabled
- [x] Astro Actions for contact form (`astro:actions`)
- [x] Zod v4 fix: `z.url()` top-level validator in env schema
- [x] Content Security Policy (CSP with SHA-256)
- [x] Astro Sessions with Cloudflare KV
- [ ] Upgrade to Astro v6 stable (once released)
- [ ] Add Live Content Collections example
- [ ] Update catalog versions to stable releases

## Phase 3: DX & Tooling

- [ ] Image optimization script (Sharp-based, ported from v5)
- [ ] Build validation script (config check before build)
- [ ] Improve Biome Astro/Svelte support (once stable)
- [ ] Lighthouse CI integration
- [ ] Bundle analysis script

## Phase 4: Extensions (complete)

- [x] Cloudflare Workers adapter + deployment
- [x] i18n setup (en/de) with Astro i18n routing
- [x] Astro Actions: contact, newsletter, feedback
- [x] OpenGraph image generation (Satori + resvg)
- [ ] Contact form with real backend (e.g. Resend)
- [ ] Sitemap generation (custom + @astrojs/sitemap)

## Phase 5: Testing & Quality (in progress)

- [x] Playwright E2E tests for both apps (28 tests)
- [ ] Accessibility audit automation (axe-core)
- [ ] Visual regression tests
- [ ] Define performance budgets

## Not Planned (intentionally omitted)

- **No demo showcase** — Only practical use cases
- **No 16 font packages** — 3 fonts are enough (Inter, Lora, Fira Code)
- **No @casoon/atlas** — Custom, lean design tokens
- **No ESLint/Prettier** — Biome covers everything
- **No map/animation/typography demos** — Focus on core features

## Astro v6 Features to Watch

Features we will integrate once they are stable:

| Feature | Status | Planned for |
|---|---|---|
| Vite Environment API | Beta | Phase 1 (done) |
| Content Collections Loader | Beta | Phase 1 (done) |
| Zod v4 | Beta | Phase 1 (done) |
| Client Router | Stable | Phase 2 (done) |
| Prefetch | Stable | Phase 2 (done) |
| Astro Actions | Stable | Phase 2 (done) |
| Cloudflare Workers | Stable | Phase 4 (done) |
| CSP support | Beta (stable in v6) | Phase 2 (done) |
| Sessions API | Experimental | Phase 2 (done) |
| Live Collections | Beta (stable in v6) | Phase 2 |
