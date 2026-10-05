import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { CollectionBanner } from '@/components/shop/CollectionBanner'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { CategoryGrid } from '@/components/shop/CategoryGrid'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { QuickViewModal } from '@/components/shop/QuickViewModal'
import { getCategoriesByBrand } from '@/data/categories'
import { getFeaturedProducts } from '@/data/products'
import type { Product } from '@/types'
import { siteConfig } from '@/config/site'

export default function LehengasPage() {
  const lehengaCategories = getCategoriesByBrand('arunima')
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  // Each lehenga already owns its own distinct card image, so the featured row
  // is shown as-is rather than being handed a separate set of pictures.
  const featured = getFeaturedProducts('arunima').slice(0, 4)

  return (
    <PageTransition>
      <Helmet>
        <title>Designer Lehengas | {siteConfig.brand.arunima.name} | {siteConfig.seo.title}</title>
        <meta name="description" content="Explore designer lehengas from Arunima Fashions. Bridal, Reception, Cocktail, and Engagement lehengas for the modern woman." />
      </Helmet>

      <CollectionBanner
        title="Designer Lehengas"
        subtitle={siteConfig.brand.arunima.name}
        description="Contemporary designer lehengas crafted for weddings, celebrations, and timeless moments."
        backgroundGradient="from-[#344646] via-[#232E2E] to-night"
      />

      <section className="py-section bg-surface">
        <Container>
          <SectionTitle
            title="Browse Categories"
            subtitle="Arunima Fashions"
            description="Explore our exquisite lehenga categories."
          />
          <div className="mt-12">
            <CategoryGrid categories={lehengaCategories} />
          </div>
        </Container>
      </section>

      {featured.length > 0 && (
        <section className="py-section bg-cream">
          <Container>
            <SectionTitle
              title="Featured Lehengas"
              subtitle="Curated Selection"
              description="Our most exquisite lehengas, handpicked for you."
            />
            <div className="mt-12">
              <ProductGrid products={featured} columns={4} onQuickView={setQuickViewProduct} />
            </div>
          </Container>
        </section>
      )}

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </PageTransition>
  )
}
