import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { env } from '../env.ts';
import { getBlogRssItems } from '../utils/blog-rss.js';

export async function GET(context: APIContext) {
  const siteUrl = context.site?.toString() ?? env.PUBLIC_SITE_URL;
  const items = getBlogRssItems(siteUrl);

  return rss({
    title: env.PUBLIC_SITE_NAME,
    description: 'A blog template built with Astro v6, MDX and Content Collections.',
    site: siteUrl,
    items,
    customData: `<language>${env.PUBLIC_LOCALE}</language>`,
  });
}
