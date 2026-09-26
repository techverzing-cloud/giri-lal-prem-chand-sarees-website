import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { BRANDS } from '@/constants/home'

export function BrandSection() {
  return (
    <section className="bg-night py-section lg:py-section-lg">
      <Container>
        <SectionTitle
          title="Two Houses, One Legacy"
          subtitle="Our Brands"
          description="Distinct identities united by a commitment to exceptional craftsmanship."
          light
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {BRANDS.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <Link to={brand.href} className="block">
                <div className={`relative flex min-h-[400px] items- bg-gradient-to-br ${brand.gradient} p-8 md:min-h-[500px] md:p-12`}>
                  <div
                    className="absolute inset-0 bg-night/20 transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <div
                    className="absolute inset-0 opacity-100 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      backgroundImage: `url(${brand.image})`
                    }}
                  />

                  <div className="relative z-10 flex justify-between flex-col">
                    <div className=''>
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                        className="mb-3 block font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/60"
                      >
                        {brand.since}
                      </motion.span>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.4 }}
                        className="font-heading text-3xl text-white md:text-5xl"
                      >
                        {brand.name}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        className="mt-2 font-heading text-lg text-white/70 md:text-xl"
                      >
                        {brand.tagline}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.6 }}
                        className="mt-4 max-w-md font-body text-sm leading-relaxed text-white/60"
                      >
                        {brand.description}
                      </motion.p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.7 }}
                      className="mt-8 inline-flex items-center gap-3 border-b border-white/30 pb-1 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 group-hover:border-white"
                    >
                      <span>{brand.ctaLabel}</span>
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
