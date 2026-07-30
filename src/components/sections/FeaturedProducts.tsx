import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LuxuryBadge } from '@/components/ui/LuxuryBadge'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { FEATURED_PRODUCTS } from '@/constants/home'

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null)
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
          <motion.div style={{ x, willChange: 'transform' }} className="flex gap-6 px-6 md:px-10 lg:px-16">
            {FEATURED_PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="min-w-[280px] flex-shrink-0 md:min-w-[320px] lg:min-w-[380px]"
              >
                <Link to={product.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-night">
                    <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-full w-full bg-gradient-to-br from-primary/5 to-accent/5 transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage:
                            'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
                        }}
                      />
                    </div>

                    <div className="absolute left-3 top-3">
                      <LuxuryBadge variant={product.tag === 'Premium' ? 'accent' : 'primary'} size="sm">
                        {product.tag}
                      </LuxuryBadge>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-body text-[11px] uppercase tracking-[0.15em] text-white/50">
                        {product.collection}
                      </p>
                      <h3 className="mt-2 font-heading text-xl text-white">{product.name}</h3>
                      <p className="mt-1 font-body text-sm text-white/60">{product.fabric}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-heading text-sm uppercase tracking-wider text-white/80">Enquire for Price</span>
                        <span className="flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/50 transition-all duration-300 group-hover:text-white">
                          View <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="rounded-full border border-white/60 px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-night">
                        Quick View
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream to-transparent" />
        </div>
      </FadeIn>

      <Container className="mt-10 text-center">
        <Link to="/collections">
          <LuxuryButton variant="outline" size="md">
            View All Products
          </LuxuryButton>
        </Link>
      </Container>
    </section>
  )
}
