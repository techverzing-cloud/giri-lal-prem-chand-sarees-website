import { Helmet } from 'react-helmet-async'
import { generateMeta, formatMetaTitle } from '@/utils/seo'
import type { SEOMetadata } from '@/types/cms'

interface SEOHeadProps {
  seo?: SEOMetadata
  title?: string
  description?: string
  path: string
  ogImage?: string
  structuredData?: Record<string, unknown>
}

export function SEOHead({ seo, title, description, path, ogImage, structuredData }: SEOHeadProps) {
  const meta = generateMeta(seo, { title, description, path })

  return (
    <Helmet>
      <title>{formatMetaTitle(meta.title)}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.ogDescription} />
      <meta property="og:image" content={ogImage || meta.ogImage} />
      <meta property="og:url" content={meta.ogUrl} />
      <meta property="og:locale" content={meta.ogLocale} />
      <meta name="twitter:card" content={meta.twitterCard} />
      <meta name="twitter:title" content={meta.twitterTitle} />
      <meta name="twitter:description" content={meta.twitterDescription} />
      <meta name="twitter:image" content={ogImage || meta.twitterImage} />
      {meta.twitterSite && <meta name="twitter:site" content={meta.twitterSite} />}
      <meta name="robots" content={meta.robots} />
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  )
}
