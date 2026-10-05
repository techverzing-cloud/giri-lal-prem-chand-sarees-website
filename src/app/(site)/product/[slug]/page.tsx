import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailPage from '@/views/ProductDetail'
import { ALL_PRODUCTS, getProductBySlug } from '@/data/products'
import { getProductMeta } from '@/utils/productSeo'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Pre-renders the catalogue so every product gets crawlable HTML, its own
 * metadata and a Product JSON-LD block. Unknown slugs fall through to
 * `notFound()` and render the site's 404.
 */
export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for is unavailable. Browse our saree and lehenga collections instead.',
      robots: { index: false, follow: true },
    }
  }

  const meta = getProductMeta(product)
  const image = product.images[0]

  return {
    title: product.name,
    description: meta.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: 'website',
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      siteName: 'Giri Lal Prem Chand Sarees',
      ...(image && { images: [{ url: image, alt: product.name }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      ...(image && { images: [image] }),
    },
  }
}

export default async function Page({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) notFound()

  const { jsonLd } = getProductMeta(product)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailPage product={product} />
    </>
  )
}
