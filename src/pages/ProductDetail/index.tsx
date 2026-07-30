import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SEOHead } from '@/components/seo'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedDivider } from '@/components/ui/AnimatedDivider'
import { ProductGallery } from '@/components/product/ProductGallery'
import { GalleryLightbox } from '@/components/product/GalleryLightbox'
import { ProductInfo } from '@/components/product/ProductInfo'
import { ColourSelector } from '@/components/product/ColourSelector'
import { ProductHighlights } from '@/components/product/ProductHighlights'
import { CraftsmanshipSection } from '@/components/product/CraftsmanshipSection'
import { CareInstructions } from '@/components/product/CareInstructions'
import { StylingSuggestions } from '@/components/product/StylingSuggestions'
import { BrandHeritage } from '@/components/product/BrandHeritage'
import { ShareProduct } from '@/components/product/ShareProduct'
import { EnquiryModal } from '@/components/product/EnquiryModal'
import { StickyEnquiryPanel } from '@/components/product/StickyEnquiryPanel'
import { SkeletonProductPage } from '@/components/product/SkeletonProductPage'
import { ProductCard } from '@/components/shop/ProductCard'
import { RecentlyViewed, addToRecentlyViewed } from '@/components/shop/RecentlyViewed'
import { useProductGallery } from '@/hooks/useProductGallery'
import { getProductBySlug, getRelatedProducts } from '@/data/products'
import { getProductMeta } from '@/utils/productSeo'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState(getProductBySlug(slug ?? ''))
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  const gallery = useProductGallery(product?.images.length ?? 0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const p = getProductBySlug(slug ?? '')
    setProduct(p ?? undefined)
    if (p) addToRecentlyViewed(p.id)
  }, [slug])

  if (product === undefined) {
    return <SkeletonProductPage />
  }

  if (!product) {
    return (
      <PageTransition>
        <section className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl text-night">Product Not Found</h1>
            <p className="mt-4 font-body text-text-secondary">The product you are looking for does not exist.</p>
            <Link to="/collections" className="mt-6 inline-flex items-center gap-2 font-body text-sm text-primary hover:underline">
              <ArrowLeft className="size-4" /> Back to Collections
            </Link>
          </div>
        </section>
      </PageTransition>
    )
  }

  const meta = getProductMeta(product)
  const isGiriLal = product.brand === 'girilal'
  const accentColor = isGiriLal ? 'bg-primary' : 'bg-dark'
  const brandCollectionHref = `/collections/${isGiriLal ? 'sarees' : 'lehengas'}`
  const relatedProducts = getRelatedProducts(product)

  return (
    <PageTransition>
      <SEOHead
        title={product.name}
        description={meta.description}
        path={`/product/${product.slug}`}
        ogImage={meta.ogImage}
        structuredData={meta.jsonLd}
      />

      <div className="min-h-screen pt-20 md:pt-24">
        <Container>
          <div className="py-6 md:py-8">
            <nav className="flex items-center gap-2 font-body text-xs text-text-muted">
              <Link to="/" className="hover:text-night transition-colors">Home</Link>
              <span>/</span>
              <Link to={brandCollectionHref} className="hover:text-night transition-colors">
                {isGiriLal ? 'Sarees' : 'Lehengas'}
              </Link>
              <span>/</span>
              <span className="text-night line-clamp-1">{product.name}</span>
            </nav>
          </div>

          <div className="grid gap-10 pb-12 lg:grid-cols-2 lg:pb-20">
            <ProductGallery images={product.images} productName={product.name} />
            <div className="flex flex-col gap-8">
              <ProductInfo product={product} />
              <ColourSelector colors={product.colors} />
              <Link
                to={brandCollectionHref}
                className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-primary transition-colors hover:text-primary/70"
              >
                <ArrowLeft className="size-3" />
                View Full {isGiriLal ? 'Saree' : 'Lehenga'} Collection
              </Link>
            </div>
          </div>

          <GalleryLightbox
            isOpen={gallery.isLightboxOpen}
            images={product.images}
            currentIndex={gallery.currentIndex}
            productName={product.name}
            onClose={gallery.closeLightbox}
            onGoTo={gallery.goTo}
            onGoNext={gallery.goNext}
            onGoPrev={gallery.goPrev}
          />
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
                title="Explore Similar Pieces"
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
