import { siteSettings } from '@/data/siteSettings'
import { seoDefaults } from '@/data/seoDefaults'

interface SitemapEntry {
  url: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  lastmod?: string
}

const STATIC_ROUTES: SitemapEntry[] = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/our-story', changefreq: 'monthly', priority: 0.7 },
  { url: '/craftsmanship', changefreq: 'monthly', priority: 0.7 },
  { url: '/collections', changefreq: 'weekly', priority: 0.9 },
  { url: '/collections/sarees', changefreq: 'weekly', priority: 0.8 },
  { url: '/collections/lehengas', changefreq: 'weekly', priority: 0.8 },
  { url: '/enquiry', changefreq: 'monthly', priority: 0.6 },
  { url: '/book-consultation', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/journal', changefreq: 'weekly', priority: 0.8 },
  { url: '/search', changefreq: 'monthly', priority: 0.3 },
  { url: '/privacy', changefreq: 'yearly', priority: 0.2 },
  { url: '/terms', changefreq: 'yearly', priority: 0.2 },
]

export function generateSitemap(): string {
  const baseUrl = siteSettings.meta.siteUrl
  const entries = [...STATIC_ROUTES]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((entry) => `  <url>
    <loc>${baseUrl}${entry.url}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`

  return xml
}

export function generateRobots(): string {
  return `# robots.txt for ${siteSettings.companyName}
User-agent: *
Allow: /
Disallow: /admin-preview/

Sitemap: ${siteSettings.meta.siteUrl}/sitemap.xml

# Crawl-delay: 10
`
}

export function generateSitemapEntries(): SitemapEntry[] {
  return STATIC_ROUTES
}
