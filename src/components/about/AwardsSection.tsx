import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AWARDS } from '@/data/awards'
import { Award } from 'lucide-react'

export function AwardsSection() {
  return (
    <section className="py-section bg-cream/50">
      <Container>
        <SectionTitle
          subtitle="Recognition"
          title="Awards & Accolades"
          description="Our commitment to excellence has been recognised by the industry and our peers."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-lg border border-night/5 bg-white p-6 transition-all duration-500 hover:shadow-lg"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Award className="size-5" />
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-heading text-lg text-night">{award.title}</h3>
                  <span className="rounded-full bg-night/5 px-2.5 py-0.5 font-body text-[11px] font-semibold text-text-muted">
                    {award.year}
                  </span>
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-muted">{award.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
