/**
 * Helpers for RSS and sitemap generation.
 * Uses gray-matter to read MDX frontmatter directly because Astro's
 * getCollection() is unavailable inside the astro:build:done hook.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { env } from '../env.ts';

const blogContentDir = fileURLToPath(new URL('../content/blog', import.meta.url));

/**
 * Returns sitemap entries for all published blog posts with real lastmod
 * dates from MDX frontmatter. Used by siteFiles({ sitemap: { sources: [...] } }).
 * loc must be a relative path — the integration prepends the siteUrl.
 *
 * @returns {import('@casoon/astro-site-files').SitemapEntry[]}
 */
export function getBlogSitemapEntries() {
  const files = readdirSync(blogContentDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  return files
    .map((file) => {
      const raw = readFileSync(`${blogContentDir}/${file}`, 'utf-8');
      const { data } = matter(raw);
      if (data.draft) return null;
      const slug = file.replace(/\.(mdx|md)$/, '');
      const lastmod = data.lastmod ?? data.date ?? null;
      return {
        loc: `/blog/${slug}/`,
        lastmod: lastmod ? new Date(lastmod).toISOString().split('T')[0] : undefined,
      };
    })
    .filter(Boolean);
}

/**
 * @param {string} siteUrl
 * @returns {import('@astrojs/rss').RSSFeedItem[]}
 */
export function getBlogRssItems(siteUrl) {
  const files = readdirSync(blogContentDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  return files
    .map((file) => {
      const raw = readFileSync(`${blogContentDir}/${file}`, 'utf-8');
      const { data } = matter(raw);
      return { slug: file.replace(/\.(mdx|md)$/, ''), data };
    })
    .filter(({ data }) => !data.draft)
    .sort((a, b) => {
      const da = new Date(a.data.date ?? 0).getTime();
      const db = new Date(b.data.date ?? 0).getTime();
      return db - da;
    })
    .map(({ slug, data }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.date ? new Date(data.date) : new Date(),
      link: `${siteUrl}/blog/${slug}/`,
      author: data.author ?? env.PUBLIC_AUTHOR,
      categories: data.tags ?? [],
    }));
}
