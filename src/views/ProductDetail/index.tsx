'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import type { Product } from '@/types'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { ProductHighlights } from '@/components/product/ProductHighlights'
import { CraftsmanshipSection } from '@/components/product/CraftsmanshipSection'
import { CareInstructions } from '@/components/product/CareInstructions'
import { StylingSuggestions } from '@/components/product/StylingSuggestions'
import { BrandHeritage } from '@/components/product/BrandHeritage'
import { ShareProduct } from '@/components/product/ShareProduct'
import { EnquiryModal } from '@/components/product/EnquiryModal'
import { StickyEnquiryPanel } from '@/components/product/StickyEnquiryPanel'
import { ProductCard } from '@/components/shop/ProductCard'
import { RecentlyViewed, addToRecentlyViewed } from '@/components/shop/RecentlyViewed'
import { getRelatedProducts } from '@/data/products'
import { getCategoryBySlug } from '@/data/categories'

interface ProductDetailPageProps {
  product: Product
}

/** `useLayoutEffect` without React's server-render warning. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Product details view.
 *
 * The route (`app/(site)/product/[slug]/page.tsx`) is a server component that
 * resolves the slug from the catalogue, calls `notFound()` for unknown slugs
 * and exports `generateMetadata`. This view receives the product as a prop, so
 * there is no client-side lookup, no loading skeleton and no second source of
 * product data.
 */
export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  // The homepage Featured Products rail links here with `?from=home-featured`,
  // which asks for the product's primary image alone. Reading it here rather
  // than in the route keeps `/product/[slug]` statically pre-rendered for every
  // product. The layout effect runs before paint, so the gallery is never
  // visibly swapped out.
  const [singleImage, setSingleImage] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const from = new URLSearchParams(window.location.search).get('from')
    if (from === 'home-featured') setSingleImage(true)
  }, [])

  useEffect(() => {
    addToRecentlyViewed(product.id)
  }, [product.id])

  const isGiriLal = product.brand === 'girilal'
  const accentColor = isGiriLal ? 'bg-primary' : 'bg-dark'
  const collectionLabel = isGiriLal ? 'Sarees' : 'Lehengas'
  const collectionHref = `/collections/${isGiriLal ? 'sarees' : 'lehengas'}`
  const category = getCategoryBySlug(product.brand, product.category)
  const relatedProducts = getRelatedProducts(product, 4)

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 md:pt-24">
        <Container>
          <nav aria-label="Breadcrumb" className="py-6 md:py-8">
            <ol className="flex flex-wrap items-center gap-2 font-body text-xs text-text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-night">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={collectionHref} className="transition-colors hover:text-night">
                  {collectionLabel}
                </Link>
              </li>
              {category && (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href={`${collectionHref}/${category.slug}`}
                      className="transition-colors hover:text-night"
                    >
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true">/</li>
              <li className="line-clamp-1 text-night" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid items-start gap-10 pb-12 lg:grid-cols-2 lg:gap-16 lg:pb-20">
            <div className="lg:sticky lg:top-28">
              <ProductGallery
                images={product.images}
                productName={product.name}
                singleImage={singleImage}
              />
            </div>
            <div className="flex flex-col gap-8">
              <ProductInfo product={product} />
              <LuxuryButton
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setEnquiryOpen(true)}
                icon={<Mail className="size-4" />}
              >
                Enquire for Price
              </LuxuryButton>
              <Link
                href={collectionHref}
                className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-primary transition-colors hover:text-primary/70"
              >
                <ArrowLeft className="size-3" />
                View Full {isGiriLal ? 'Saree' : 'Lehenga'} Collection
              </Link>
            </div>
          </div>
        </Container>

        <section className="py-section bg-cream/50">
          <Container>
            <SectionTitle
              subtitle="Highlights"
              title="Why You'll Love It"
              description="Every piece is a masterpiece of craftsmanship and design."
            />
            <div className="mt-8">
              <ProductHighlights />
            </div>
          </Container>
        </section>

        <section className="py-section">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className={`mb-4 inline-block h-1 w-12 ${accentColor}`} />
                <SectionTitle
                  subtitle="Craftsmanship"
                  title="The Art Behind the Weave"
                  description="Generations of expertise woven into every thread."
                />
                <div className="mt-8">
                  <CraftsmanshipSection />
                </div>
              </div>
              <div>
                <span className={`mb-4 inline-block h-1 w-12 ${accentColor}`} />
                <SectionTitle
                  subtitle="Heritage"
                  title={isGiriLal ? 'A Legacy Since 1946' : 'Contemporary Couture'}
                  description={isGiriLal
                    ? 'Seven decades of weaving excellence.'
                    : 'Modern designs for the discerning woman.'
                  }
                />
                <div className="mt-8">
                  <BrandHeritage product={product} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-section bg-cream/50">
          <Container>
            <SectionTitle
              subtitle="Care Guide"
              title="How to Care for Your Saree"
              description="Preserve the beauty of your handwoven treasure for generations."
            />
            <div className="mt-8">
              <CareInstructions />
            </div>
          </Container>
        </section>

        <section className="py-section">
          <Container>
            <SectionTitle
              subtitle="Styling"
              title="How to Style It"
              description="Inspiration for every occasion."
            />
            <div className="mt-8">
              <StylingSuggestions />
            </div>
          </Container>
        </section>

        <section className="py-section bg-cream/50">
          <Container>
            <SectionTitle
              subtitle="Share"
              title="Spread the Beauty"
              description="Share this exquisite piece with someone special."
            />
            <div className="mt-8">
              <ShareProduct product={product} />
            </div>
          </Container>
        </section>

        {relatedProducts.length > 0 && (
          <section className="py-section">
            <Container>
              <SectionTitle
                subtitle="Related"
                title="You May Also Like"
                description="You might also love these exquisite creations."
              />
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {relatedProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </Container>
          </section>
        )}

        <RecentlyViewed />

        <div className="h-24 md:h-16" />
      </div>

      <StickyEnquiryPanel product={product} onEnquire={() => setEnquiryOpen(true)} />
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} product={product} />
    </PageTransition>
  )
}
