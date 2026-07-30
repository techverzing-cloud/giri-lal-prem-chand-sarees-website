import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ARTISANS } from '@/data/artisans'

export function ArtisanGrid() {
  return (
    <section className="py-section">
      <Container>
        <SectionTitle
          subtitle="Meet Our Artisans"
          title="The Hands Behind the Magic"
          description="Every piece tells a story. Meet the master craftspeople who bring our creations to life."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTISANS.map((artisan, index) => (
            <motion.div
              key={artisan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-lg border border-night/5 bg-white p-6 transition-all duration-500 hover:shadow-lg"
            >
              <div className="mx-auto aspect-square w-24 overflow-hidden rounded-full bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="flex h-full items-center justify-center">
                  <span className="font-heading text-2xl text-white/40">{artisan.name.charAt(0)}</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <h3 className="font-heading text-lg text-night">{artisan.name}</h3>
                <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.15em] text-primary">{artisan.role}</p>

                <div className="mt-4 flex justify-center gap-4 text-center">
                  <div>
                    <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">Experience</span>
                    <p className="font-body text-sm text-night">{artisan.experience}</p>
                  </div>
                  <div>
                    <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">Specialty</span>
                    <p className="font-body text-sm text-night">{artisan.specialty}</p>
                  </div>
                </div>

                <blockquote className="mt-4 border-t border-night/5 pt-4">
                  <p className="font-body text-sm italic leading-relaxed text-text-muted">
                    &ldquo;{artisan.quote}&rdquo;
                  </p>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
