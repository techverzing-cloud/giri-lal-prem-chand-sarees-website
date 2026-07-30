import { adminSEOPages, getAdminRedirects } from '@/data/admin/seo'
import { generateSitemap, generateRobots } from '@/utils/sitemap'

export function getSEOPages() {
  return adminSEOPages
}

export function getRedirects() {
  return getAdminRedirects()
}

export function getSitemapXml(): string {
  return generateSitemap()
}

export function getRobotsTxt(): string {
  return generateRobots()
}
