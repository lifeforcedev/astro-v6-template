import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import postAudit from '@casoon/astro-post-audit';
import siteFiles from '@casoon/astro-site-files';
import speedMeasure from '@casoon/astro-speed-measure';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { env } from './src/env.ts';
import { getBlogSitemapEntries } from './src/utils/blog-rss.js';

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
    siteFiles({
      sitemap: {
        i18n: {
          defaultLocale: 'en',
          locales: { en: 'en', de: 'de-DE' },
        },
        exclude: [/\/blog\/?$/, /\/de\/blog\/?$/],
        priority: [
          { pattern: '/$', priority: 1.0 },
          { pattern: '/blog/', priority: 0.7 },
        ],
        changefreq: [
          { pattern: '/$', changefreq: 'weekly' },
          { pattern: '/blog/', changefreq: 'monthly' },
        ],
        // gray-matter reads MDX frontmatter directly — getCollection() unavailable in build hooks
        sources: [getBlogSitemapEntries],
        audit: {
          warnOnEmpty: true,
          errorOnDuplicates: false,
        },
      },
      robots: {},
      llms: {
        title: env.PUBLIC_SITE_NAME,
        description: 'A blog template built with Astro v6, MDX and Content Collections.',
        sections: [
          {
            title: 'Pages',
            links: [
              { title: 'Home', url: '/', description: 'Blog template overview.' },
              { title: 'Blog index', url: '/blog/', description: 'English blog archive.' },
              { title: 'German home', url: '/de/', description: 'German localized homepage.' },
              {
                title: 'German blog index',
                url: '/de/blog/',
                description: 'German localized blog archive.',
              },
            ],
          },
        ],
      },
    }),
    speedMeasure(),
    postAudit({
      preset: 'standard',
      failOn: 'errors',
      hints: { sourceFiles: true },
      rules: { filters: { exclude: ['blog/index.html', '404.html'] } },
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
