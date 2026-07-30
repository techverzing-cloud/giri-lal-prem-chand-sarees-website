import type { Product } from '@/types'
import { siteConfig } from '@/config/site'

interface ProductMeta {
  title: string
  description: string
  ogImage: string
  canonical: string
  jsonLd: Record<string, unknown>
}

export function getProductMeta(product: Product): ProductMeta {
  const brandName = product.brand === 'girilal'
    ? siteConfig.brand.girilal.name
    : siteConfig.brand.arunima.name

  const title = `${product.name} | ${brandName} | ${siteConfig.seo.title}`

  const description = `${product.name} — ${product.fabric}. ${product.description.slice(0, 120)}... ${brandName} — Since 1946. Kindly contact us for pricing.`

  const canonical = `${siteConfig.seo.siteUrl}/product/${product.slug}`

  const ogImage = product.images[0]
    ? `${siteConfig.seo.siteUrl}${product.images[0]}`
    : siteConfig.seo.ogImage

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    image: product.images.map((img) => `${siteConfig.seo.siteUrl}${img}`),
  }

  return { title, description, ogImage, canonical, jsonLd }
}
