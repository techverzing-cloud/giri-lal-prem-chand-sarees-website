import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { CategoryGrid } from '@/components/shop/CategoryGrid'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { QuickViewModal } from '@/components/shop/QuickViewModal'
import { CATEGORIES } from '@/data/categories'
import { FILTER_GROUPS } from '@/data/filters'
import { getFeaturedProducts } from '@/data/products'
import { LANDING_SAREES_FEATURED_IMAGES, withFeaturedImages } from '@/data/products/images'
import type { Product } from '@/types'

const OCCASIONS = [
  { label: 'Wedding', slug: 'wedding', image: '/Saree/wedding-saree/weddingSaree1.png', gradient: 'from-[#8E2D29] to-[#6E201D]' },
  { label: 'Festive', slug: 'festive', image: '/Saree/festive-saree/festiveSaree1.png', gradient: 'from-[#C9A96E] to-[#A6884E]' },
  { label: 'Party', slug: 'party', image: '/Saree/party-wear/partyWear1.png', gradient: 'from-[#344646] to-[#232E2E]' },
  { label: 'Engagement', slug: 'engagement', image: '/Saree/silk-saree/silkSaree5.png', gradient: 'from-[#E3A2A0] to-[#D48582]' },
  { label: 'Navratri', slug: 'navratri', image: '/Saree/handloom-saree/handloomSaree1.png', gradient: 'from-[#4A5F5F] to-[#344646]' },
  { label: 'Cocktail', slug: 'cocktail', image: '/Saree/wedding-saree/weddingSaree3.png', gradient: 'from-[#111717] to-[#1E2828]' },
]

export function CollectionLandingSections() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [imageModal, setImageModal] = useState<{ isOpen: boolean; image: string }>({
    isOpen: false,
    image: '',
  })
  const featuredProducts = withFeaturedImages(
    getFeaturedProducts().slice(0, 4),
    LANDING_SAREES_FEATURED_IMAGES
  )
  const allCategories = CATEGORIES

  useEffect(() => {
    if (imageModal.isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [imageModal.isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setImageModal({ isOpen: false, image: '' })
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const openImageModal = (image: string) => {
    setImageModal({ isOpen: true, image })
  }

  const closeImageModal = () => {
    setImageModal({ isOpen: false, image: '' })
  }

  return (
    <>
      <section className="py-section bg-surface">
        <Container>
          <SectionTitle
            title="Browse by Category"
            subtitle="Our Collections"
            description="Explore our curated categories, each telling a unique story of Indian craftsmanship."
          />
          <div className="mt-12">
            <CategoryGrid categories={allCategories} />
          </div>
        </Container>
      </section>

      <section className="py-section bg-cream">
        <Container>
          <SectionTitle
            title="Shop by Occasion"
            subtitle="Every Moment Matters"
            description="Find the perfect piece for every celebration and occasion."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {OCCASIONS.map((occasion, index) => (
              <motion.div
                key={occasion.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div
                  className={`group relative flex min-h-[200px] items-end overflow-hidden rounded-lg p-5 bg-cover bg-center cursor-pointer`}
                  onClick={() => openImageModal(occasion.image)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${occasion.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
                  <div className="relative z-10">
                    <h3 className="font-heading text-xl text-white">{occasion.label}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-section bg-surface">
        <Container>
          <SectionTitle
            title="Shop by Fabric"
            subtitle="Craftsmanship"
            description="Discover the finest fabrics from India's premier weaving traditions."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FILTER_GROUPS[0].options.slice(0, 5).map((fabric, index) => (
              <motion.div
                key={fabric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={`/search?fabric=${fabric.value}`}
                  className="group block rounded-lg border border-night/5 bg-white p-6 text-center transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                >
                  <h3 className="font-heading text-lg text-night group-hover:text-primary transition-colors">{fabric.label}</h3>
                  <p className="mt-1 font-body text-xs text-text-muted">{fabric.count} Products</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-section bg-surface">
          <Container>
            <SectionTitle
              title="Featured Products"
              subtitle="Curated Selection"
              description="Our most exquisite pieces, handpicked for the discerning client."
            />
            <div className="mt-12">
              <ProductGrid products={featuredProducts} columns={4} onQuickView={setQuickViewProduct} />
            </div>
            <div className="mt-10 text-center">
              <Link href="/collections">
                <LuxuryButton variant="outline" size="md">
                  View All Products
                </LuxuryButton>
              </Link>
            </div>
          </Container>
        </section>
      )}

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      {imageModal.isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          onClick={closeImageModal}
        >
          <button
            className="fixed top-6 right-6 z-[10000] flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/80 md:top-8 md:right-8"
            onClick={(e) => {
              e.stopPropagation()
              closeImageModal()
            }}
            aria-label="Close image preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={imageModal.image}
            alt="Occasion image"
            className="max-h-[calc(100dvh-48px)] max-w-[calc(100vw-48px)] h-auto w-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
