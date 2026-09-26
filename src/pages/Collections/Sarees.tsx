import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { CollectionBanner } from '@/components/shop/CollectionBanner'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { CategoryGrid } from '@/components/shop/CategoryGrid'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { getCategoriesByBrand, CATEGORIES } from '@/data/categories'
import { getFeaturedProducts } from '@/data/products'
import { SAREE_PAGE_FEATURED_IMAGES, withFeaturedImages } from '@/data/products/images'
import { siteConfig } from '@/config/site'

export default function SareesPage() {
  const sareeCategories = getCategoriesByBrand('girilal')
  const featured = withFeaturedImages(
    getFeaturedProducts('girilal').slice(0, 4),
    SAREE_PAGE_FEATURED_IMAGES
  )

  return (
    <PageTransition>
      <Helmet>
        <title>Luxury Sarees | {siteConfig.brand.girilal.name} | {siteConfig.seo.title}</title>
        <meta name="description" content="Explore luxury sarees from Giri Lal Prem Chand Sarees. Handcrafted Banarasi, Kanjivaram, Silk, Cotton, and Designer sarees since 1946." />
      </Helmet>

      <CollectionBanner
        title="Luxury Sarees"
        subtitle={siteConfig.brand.girilal.name}
        description="Handcrafted luxury sarees woven with tradition, heritage, and timeless elegance."
        backgroundGradient="from-[#8E2D29] via-[#6E201D] to-night"
      />

      <section className="py-section bg-surface">
        <Container>
          <SectionTitle
            title="Browse Categories"
            subtitle="Giri Lal Prem Chand Sarees"
            description="Explore our wide range of luxury saree categories."
          />
          <div className="mt-12">
            <CategoryGrid categories={sareeCategories} />
          </div>
        </Container>
      </section>

      {featured.length > 0 && (
        <section className="py-section bg-cream">
          <Container>
            <SectionTitle
              title="Featured Sarees"
              subtitle="Curated Selection"
              description="Our most exquisite sarees, handpicked for you."
            />
            <div className="mt-12">
              <ProductGrid products={featured} columns={4} />
            </div>
          </Container>
        </section>
      )}
    </PageTransition>
  )
}
