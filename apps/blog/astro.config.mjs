import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import crawlerPolicy from '@casoon/astro-crawler-policy';
import postAudit from '@casoon/astro-post-audit';
import astroSitemap from '@casoon/astro-sitemap';
import speedMeasure from '@casoon/astro-speed-measure';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { env } from './src/env.ts';
import { getBlogRssItems } from './src/utils/blog-rss.js';

export default defineConfig({
  site: env.PUBLIC_SITE_URL,
  adapter: cloudflare(),

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
    mdx(),
    astroSitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', de: 'de' },
      },
      priority: [{ pattern: '/blog/', priority: 0.7 }],
      changefreq: [{ pattern: '/blog/', changefreq: 'monthly' }],
      rss: {
        title: env.PUBLIC_SITE_NAME,
        description: 'A blog template built with Astro v6, MDX and Content Collections.',
        language: env.PUBLIC_LOCALE,
        getItems: getBlogRssItems,
      },
    }),
    crawlerPolicy({
      sitemaps: [`${env.PUBLIC_SITE_URL}/sitemap.xml`],
    }),
    speedMeasure(),
    postAudit({
      throwOnError: false,
      rules: {
        filters: { exclude: ['blog/index.html', '404.html'] },
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

  // Cloudflare Workers does not support Sharp — use noop image service.
  // When deploying to Node.js/Vercel/Netlify, replace with the Sharp service
  // and configure codec-specific options (new in Astro 6.1):
  //
  // image: {
  //   service: {
  //     entrypoint: 'astro/assets/services/sharp',
  //     config: {
  //       webp: { effort: 6, alphaQuality: 90 },
  //       avif: { effort: 4, chromaSubsampling: '4:2:0' },
  //       jpeg: { mozjpeg: true },
  //       png:  { compressionLevel: 8 },
  //     },
  //   },
  // },
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },

  // SmartyPants typography (options object new in Astro 6.1).
  // Converts ASCII punctuation to proper typographic characters in Markdown/MDX.
  markdown: {
    smartypants: {
      dashes: 'oldschool', // -- → en-dash, --- → em-dash
      ellipses: true, // ... → …
      backticks: false, // keep backticks as-is (used in code)
      quotes: true, // "hello" → "hello"
    },
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
