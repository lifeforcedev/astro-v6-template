---
name: tailwind-v4
description: Tailwind CSS v4 guidelines for this project. Use this skill for styling, layout, responsive design, dark mode, and design token tasks.
---

# Tailwind CSS v4 Skill

## Setup in This Project

Tailwind v4 uses a Vite plugin instead of PostCSS:

```javascript
// astro.config.mjs
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

CSS entry point per app:

```css
/* apps/*/src/styles/app.css */
@import 'tailwindcss';
@import '@fontsource/inter/latin-400.css';
```

## CSS-first Configuration

Tailwind v4 is configured via CSS, not JavaScript:

```css
@import 'tailwindcss';

@theme {
  --color-primary: oklch(58% 0.18 220);
  --color-accent: oklch(68% 0.16 250);
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}
```

In this project we use custom CSS custom properties from `@astro-v6/shared/styles`
and a shared `@theme` block (`shared/src/styles/theme.css`) that registers
design tokens with Tailwind. Tokens are referenced via `var()` in component styles.

## v4 Syntax Changes (from v3)

### Renamed Classes

```html
<!-- Gradient -->
bg-gradient-to-r   → bg-linear-to-r
bg-gradient-to-br  → bg-linear-to-br

<!-- Flexbox -->
flex-shrink-0  → shrink-0
flex-grow      → grow

<!-- Aspect Ratio -->
aspect-[3/2]   → aspect-3/2

<!-- Filter -->
grayscale-[30%] → grayscale-30
```

### Container Queries (built-in)

```html
<div class="@container">
  <div class="@sm:flex @md:grid @md:grid-cols-2 @lg:grid-cols-3">
    <!-- Responsive to container, not viewport -->
  </div>
</div>
```

### Native Nesting

```css
.card {
  background: var(--color-surface);

  &:hover {
    box-shadow: var(--shadow-md);
  }

  & h2 {
    font-weight: 700;
  }
}
```

## Design Tokens in This Project

We use CSS custom properties instead of Tailwind theme:

```css
/* In Astro/Svelte components */
.hero {
  background: var(--color-bg);
  color: var(--color-text);
  padding: var(--space-2xl) var(--space-lg);
}

.card {
  border: 1px solid var(--color-border);
  border-radius: var(--card-radius);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.btn-primary {
  background: var(--color-accent);
  color: var(--color-text-inverse);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
}
```

Available tokens (from `shared/src/styles/variables.css`):

### Colors
- `--color-bg`, `--color-bg-secondary`, `--color-surface`
- `--color-text`, `--color-text-secondary`, `--color-text-inverse`
- `--color-border`, `--color-border-secondary`
- `--color-accent`, `--color-accent-hover`
- `--color-success`, `--color-warning`, `--color-error`, `--color-info`

### Spacing
- `--space-xs` (0.25rem) through `--space-3xl` (4rem)

### Typography
- `--font-sans` (Inter), `--font-serif` (Lora), `--font-mono` (Fira Code)

### Radii
- `--radius-sm` through `--radius-full`
- `--card-radius`, `--button-radius`, `--input-radius`

### Shadows
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

### Transitions
- `--transition-fast` (150ms), `--transition-base` (200ms), `--transition-slow` (300ms)

### Z-Index
- `--z-dropdown` through `--z-tooltip`

## Dark Mode

Class-based (`.dark` on `<html>`):

```css
/* Automatic via design tokens */
background: var(--color-bg);      /* Light: neutral-50, Dark: neutral-950 */
color: var(--color-text);         /* Light: neutral-900, Dark: neutral-50 */
border-color: var(--color-border); /* Light: neutral-200, Dark: neutral-800 */
```

With Tailwind utilities:

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

## Tailwind v4.2 — New Features

### Font Feature Utilities

New classes for OpenType font features (v4.2):

```html
<!-- Ligatures -->
<code class="font-variant-[ligatures_contextual]">fn() => {}</code>

<!-- Tabular numbers (for tables, code) -->
<td class="tabular-nums">1,234.56</td>

<!-- Small Caps -->
<span class="small-caps">Section Title</span>
```

In this project: font features for `code/pre` and headings are applied globally in `shared/src/styles/global.css` — Fira Code gets ligatures and tabular numbers automatically.

### New Neutral Color Palettes

v4.2 ships four new built-in neutral scales alongside `gray`, `slate`, `zinc`, `stone`:

| Name | Tone | Best for |
|---|---|---|
| `mauve` | Warm violet-gray | Modern UI, soft SaaS |
| `taupe` | Warm brown-gray | Business, premium |
| `olive` | Muted green-gray | Nature, sustainability |
| `mist` | Cool blue-gray | Dashboards, data |

Usage — no config needed, works like any Tailwind color:
```html
<div class="bg-mist-50 dark:bg-mist-950 text-taupe-900">
```

These complement the project's OKLCH design tokens. Use them for backgrounds, borders, or accent elements without creating custom tokens.

### Logical Properties (i18n-ready)

v4.2 completes logical CSS property support. Relevant for EN/DE i18n and future RTL support:

```html
<!-- Physical (avoid for new code) -->
<div class="pl-4 pr-4 mt-2 mb-2">

<!-- Logical (preferred) -->
<div class="ps-4 pe-4 mt-2 mb-2">
<!--        ↑ inline-start ↑ inline-end -->
```

Key logical utilities:
- `ps-*` / `pe-*` → `padding-inline-start/end`
- `ms-*` / `me-*` → `margin-inline-start/end`
- `border-s-*` / `border-e-*` → `border-inline-start/end`

Physical `pt-/pb-/mt-/mb-` remain unchanged (block axis is less ambiguous).

**Note:** Existing components use physical properties — migration is optional. Apply logical utilities for new components, especially in shared layouts.

### Webpack Plugin

`@tailwindcss/webpack` is now first-class. Not relevant for this project (Vite/Astro).

## Best Practices

1. **Design tokens for everything** - `var(--color-*)` instead of hardcoded values
2. **Scoped styles** - `<style>` in Astro/Svelte for component-specific CSS
3. **Tailwind for utility** - Quick one-off adjustments directly in markup
4. **Mobile-first** - `sm:`, `md:`, `lg:` breakpoints ascending
5. **OKLCH colors** - Consistent across light/dark mode
6. **No tailwind.config.js** - Everything via CSS or tokens
