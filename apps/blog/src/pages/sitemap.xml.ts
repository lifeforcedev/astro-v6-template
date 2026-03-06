import { getCollection } from 'astro:content';
import { createSitemapRoute } from '@astro-v6/shared/utils/sitemap';

const pageModules = import.meta.glob('./**/*.astro', { eager: true });

export const GET = createSitemapRoute({
  siteUrl: import.meta.env.SITE,
  pageModules,
  getBlogPosts: () => getCollection('blog'),
  blogPrefix: '/blog',
  locales: ['de'],
  exclude: ['/blog/'],
});
