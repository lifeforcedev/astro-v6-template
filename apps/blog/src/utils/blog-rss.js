/**
 * Builds RSS items for all published blog posts.
 * Used by astroSitemap({ rss: { getItems } }) in astro.config.mjs.
 *
 * Reads MDX frontmatter directly with gray-matter instead of Astro's
 * getCollection(), which is unavailable inside the astro:build:done hook.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { env } from '../env.ts';

const blogContentDir = fileURLToPath(new URL('../content/blog', import.meta.url));

/**
 * @param {string} siteUrl – passed by the astroSitemap integration
 * @returns {import('@casoon/astro-sitemap').RssItem[]}
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
