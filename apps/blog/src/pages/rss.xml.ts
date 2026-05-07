export const prerender = true;

import rss from '@astrojs/rss';
import { env } from '../env.ts';
import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: env.PUBLIC_SITE_NAME,
    description: 'A blog template built with Astro v6, MDX and Content Collections.',
    site: new URL(env.PUBLIC_SITE_URL),
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: `<language>${env.PUBLIC_LOCALE}</language>`,
  });
}
