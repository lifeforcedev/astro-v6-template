import type { APIRoute } from 'astro';

export interface SitemapPage {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export interface SitemapConfig {
  siteUrl: string;
  pageModules: Record<string, unknown>;
  blogPosts?: { id: string; data: { date: Date; draft?: boolean } }[];
  blogPrefix?: string;
  locales?: string[];
  exclude?: string[];
}

function generateSitemapPages(config: SitemapConfig): SitemapPage[] {
  const { pageModules, blogPosts, blogPrefix = '/blog', locales = [], exclude = [] } = config;
  const today = new Date().toISOString().split('T')[0];

  const staticPages = Object.entries(pageModules)
    .map(([filePath, modRaw]) => {
      const mod = modRaw as { draft?: boolean };

      if (mod.draft === true) return null;

      // Skip sitemap, API routes, 404, dynamic routes
      if (
        filePath.includes('sitemap.xml') ||
        filePath.includes('/api/') ||
        filePath.includes('404') ||
        filePath.includes('[')
      )
        return null;

      let url = filePath
        .replace('./index.astro', '/')
        .replace(/\.astro$/, '')
        .replace(/\/index$/, '/')
        .replace('./', '/')
        .replace(/\/\//g, '/');

      if (url !== '/' && !url.endsWith('/')) {
        url += '/';
      }

      // Skip excluded paths
      if (exclude.some((pattern) => url.startsWith(pattern))) return null;

      let priority = '0.8';
      let changefreq: SitemapPage['changefreq'] = 'monthly';

      if (url === '/' || url.match(/^\/[a-z]{2}\/$/)) {
        priority = '1.0';
        changefreq = 'weekly';
      } else if (url.match(/\/(contact|kontakt)\//)) {
        priority = '0.9';
        changefreq = 'monthly';
      }

      return { url, lastmod: today, changefreq, priority };
    })
    .filter((page): page is SitemapPage => !!page);

  const blogPages: SitemapPage[] = [];
  if (blogPosts) {
    const filteredPosts = blogPosts.filter((post) => !post.data.draft && post.id);
    // Default locale blog posts
    for (const post of filteredPosts) {
      blogPages.push({
        url: `${blogPrefix}/${post.id}/`,
        lastmod: post.data.date.toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7',
      });
    }
    // Localized blog posts
    for (const locale of locales) {
      for (const post of filteredPosts) {
        blogPages.push({
          url: `/${locale}${blogPrefix}/${post.id}/`,
          lastmod: post.data.date.toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: '0.6',
        });
      }
    }
  }

  return [...staticPages, ...blogPages];
}

function generateSitemapXML(pages: SitemapPage[], siteUrl: string): string {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export function createSitemapRoute(options: {
  siteUrl: string;
  pageModules: Record<string, unknown>;
  getBlogPosts?: () => Promise<{ id: string; data: { date: Date; draft?: boolean } }[]>;
  blogPrefix?: string;
  locales?: string[];
  exclude?: string[];
}): APIRoute {
  return async () => {
    const { siteUrl, pageModules, getBlogPosts, blogPrefix, locales, exclude } = options;

    const blogPosts = getBlogPosts ? await getBlogPosts() : undefined;

    const pages = generateSitemapPages({
      siteUrl,
      pageModules,
      blogPosts,
      blogPrefix,
      locales,
      exclude,
    });

    const sitemap = generateSitemapXML(pages, siteUrl);

    return new Response(sitemap, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
  };
}
