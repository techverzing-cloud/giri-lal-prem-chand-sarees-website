import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { STORE_EXPERIENCE } from '@/data/about'

export function StoreExperience() {
  return (
    <section className="py-section bg-cream/50">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle
              subtitle="The Store Experience"
              title="Step Into a World of Luxury"
              description="Every visit to our store is designed to be an experience you will cherish."
              align="left"
            />

            <div className="mt-8 space-y-6">
              {STORE_EXPERIENCE.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex size-1 flex-shrink-0 pt-2">
                    <div className="h-full w-px bg-primary/30" />
                    <div className="absolute mt-1.5 size-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-night">{item.title}</h4>
                    <p className="mt-1 font-body text-sm leading-relaxed text-text-muted">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[5/4] mt-24 overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-night/10"
          >
            <img
              src="/collections/random.jpg"
              alt="Giri Lal Prem Chand — A Digital Future"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
