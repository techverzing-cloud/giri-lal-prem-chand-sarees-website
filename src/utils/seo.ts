import type { SEOMetadata } from '@/types/cms'
import { seoDefaults } from '@/data/seoDefaults'
import { siteSettings } from '@/data/siteSettings'

export interface MetaResult {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogUrl: string
  ogType: string
  ogLocale: string
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  twitterSite: string
  robots: string
}

export function generateMeta(
  pageSeo?: SEOMetadata,
  overrides?: { title?: string; description?: string; path?: string }
): MetaResult {
  const defaults = seoDefaults
  const site = siteSettings.meta
  const path = overrides?.path ?? '/'
  const fullUrl = `${site.siteUrl}${path}`

  const title = pageSeo?.metaTitle ?? overrides?.title ?? site.defaultTitle
  const description = pageSeo?.metaDescription ?? overrides?.description ?? site.defaultDescription
  const ogImage = pageSeo?.ogImage ?? site.defaultOgImage
  const canonical = pageSeo?.canonical ?? fullUrl

  return {
    title,
    description,
    canonical,
    ogTitle: pageSeo?.ogTitle ?? title,
    ogDescription: pageSeo?.ogDescription ?? description,
    ogImage,
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: defaults.locale,
    twitterCard: pageSeo?.twitterCard ?? 'summary_large_image',
    twitterTitle: pageSeo?.twitterTitle ?? title,
    twitterDescription: pageSeo?.twitterDescription ?? description,
    twitterImage: ogImage,
    twitterSite: defaults.twitterHandle ? `@${defaults.twitterHandle}` : '',
    robots: pageSeo?.robots ?? 'index, follow',
  }
}

export const generateMetaTags = generateMeta

export function generateCanonical(path: string): string {
  return `${siteSettings.meta.siteUrl}${path}`
}

export function generateStructuredData(
  type: 'Product' | 'Article' | 'Organization' | 'BreadcrumbList' | 'FAQPage' | 'WebSite',
  data: Record<string, unknown>
): Record<string, unknown> {
  const base = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  if (type === 'Organization') {
    return {
      ...base,
      name: siteSettings.companyName,
      url: siteSettings.meta.siteUrl,
      logo: `${siteSettings.meta.siteUrl}${siteSettings.logo}`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteSettings.phone,
        contactType: 'customer service',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteSettings.address,
        addressCountry: 'IN',
      },
      sameAs: [
        siteSettings.socialLinks.instagram,
        siteSettings.socialLinks.facebook,
        siteSettings.socialLinks.youtube,
      ].filter(Boolean),
    }
  }

  if (type === 'WebSite') {
    return {
      ...base,
      name: siteSettings.companyName,
      url: siteSettings.meta.siteUrl,
      description: siteSettings.meta.defaultDescription,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteSettings.meta.siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }
  }

  return { ...base, ...data }
}

export function generateBreadcrumb(items: { label: string; href?: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteSettings.meta.siteUrl}${item.href}` } : {}),
    })),
  }
}

export function formatMetaTitle(title: string): string {
  return `${title} ${seoDefaults.separator} ${seoDefaults.siteName}`
}
