import cloudflare from '@astrojs/cloudflare';
import svelte from '@astrojs/svelte';
import postAudit from '@casoon/astro-post-audit';
import siteFiles from '@casoon/astro-site-files';
import speedMeasure from '@casoon/astro-speed-measure';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { env } from './src/env.ts';

export default defineConfig({
  site: env.PUBLIC_SITE_URL,
  adapter: cloudflare({
    sessionKVBindingName: 'SESSION',
  }),

  session: {
    cookie: 'astro-session',
    ttl: 86400, // 24 hours
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    svelte({
      compilerOptions: { runes: true },
    }),
    siteFiles({
      sitemap: {
        i18n: {
          defaultLocale: 'en',
          locales: { en: 'en', de: 'de-DE' },
        },
        audit: {
          warnOnEmpty: true,
          errorOnDuplicates: false,
        },
      },
      robots: {},
      llms: {
        title: env.PUBLIC_SITE_NAME,
        description: 'Astro v6 starter with Tailwind v4, Svelte 5 and Cloudflare.',
      },
    }),
    speedMeasure(),
    postAudit({
      throwOnError: true,
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
          require_img_alt: true,
          require_button_text: true,
          require_label: true,
        },
        links: { check_fragments: true },
        sitemap: {
          require: true,
          canonical_must_be_in_sitemap: true,
          entries_must_exist_in_dist: true,
        },
        security: {
          check_target_blank: true,
        },
        hreflang: {
          check_hreflang: true,
          require_x_default: true,
          require_self_reference: true,
          require_reciprocal: true,
        },
      },
    }),
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  security: {
    checkOrigin: true,
  },

  csp: {
    algorithm: 'SHA-256',
  },

  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['sharp'],
      noExternal: ['@fontsource/*'],
    },
  },

  build: {
    inlineStylesheets: 'auto',
  },
});
