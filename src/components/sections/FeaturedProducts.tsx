import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LuxuryBadge } from '@/components/ui/LuxuryBadge'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { QuickViewModal } from '@/components/shop/QuickViewModal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getFeaturedProductsForRail } from '@/data/products'
import type { Product } from '@/types'

/**
 * Homepage "Featured Products" rail.
 *
 * The list is read from the product catalogue (`getFeaturedProductsForRail`) so
 * the cards carry real slugs, names, fabrics and images. Each card exposes two
 * distinct targets: a whole-card `Link` to `/product/[slug]`, and a `QUICK
 * VIEW` button layered above it. Because the button sits at a higher stacking
 * order than the card link, activating it opens the modal instead of
 * navigating.
 */
export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const products = getFeaturedProductsForRail(5)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])

  return (
    <section ref={sectionRef} className="overflow-hidden bg-cream py-section lg:py-section-lg">
      <Container>
        <ScrollReveal>
          <SectionTitle
            title="Featured Products"
            subtitle="Curated Selection"
            description="Our most exquisite pieces, handpicked for the discerning client."
          />
        </ScrollReveal>
      </Container>

      <FadeIn>
        <div className="relative mt-12 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]">
          <motion.div
            style={prefersReducedMotion ? undefined : { x, willChange: 'transform' }}
            className="flex gap-6 px-6 md:px-10 lg:px-16"
          >
            {products.map((product, index) => {
              // `from=home-featured` asks the product page for the primary image
              // only, so this rail never shows a multi-image gallery.
              const href = `/product/${product.slug}?from=home-featured`
              const badge = product.new ? 'New' : product.featured ? 'Featured' : 'Curated'
              const badgeVariant = product.new ? 'primary' : product.featured ? 'accent' : 'primary'

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="min-w-[280px] flex-shrink-0 md:min-w-[320px] lg:min-w-[380px]"
                >
                  <article className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-night">
                    <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-full w-full bg-gradient-to-br from-primary/5 to-accent/5 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${product.images[0]})` }}
                        role="img"
                        aria-label={product.name}
                      />
                    </div>

                    <div className="absolute left-3 top-3">
                      <LuxuryBadge variant={badgeVariant} size="sm">
                        {badge}
                      </LuxuryBadge>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-body text-[11px] uppercase tracking-[0.15em] text-white/50">
                        {product.brand === 'girilal' ? 'Giri Lal Prem Chand Sarees' : 'Arunima Fashions'}
                      </p>
                      <h3 className="mt-2 font-heading text-xl text-white">
                        <Link
                          href={href}
                          className="transition-colors duration-300 hover:text-accent-light"
                        >
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 font-body text-sm text-white/60">{product.fabric}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="font-heading text-sm uppercase tracking-wider text-white/80">
                          Enquire for Price
                        </span>
                        <Link
                          href={href}
                          className="inline-flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/50 transition-colors duration-300 hover:text-white"
                        >
                          View <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    <Link
                      href={href}
                      className="absolute inset-0 z-10"
                      aria-label={`View details for ${product.name}`}
                    >
                      <span className="sr-only">View details for {product.name}</span>
                    </Link>

                    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 pointer-coarse:pointer-events-auto pointer-coarse:opacity-100">
                      <button
                        type="button"
                        onClick={() => setQuickViewProduct(product)}
                        className="rounded-full border border-white/60 px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-night"
                        aria-label={`Quick view ${product.name}`}
                      >
                        Quick View
                      </button>
                    </div>
                  </article>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Narrowed on small screens: at w-20 these two gradients washed out
              160px of a 320px viewport, hiding most of the first product card. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-cream to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent md:w-20" />
        </div>
      </FadeIn>

      <Container className="mt-10 text-center">
        <Link href="/collections">
          <LuxuryButton variant="outline" size="md">
            View All Products
          </LuxuryButton>
        </Link>
      </Container>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        source="home-featured"
      />
    </section>
  )
}
