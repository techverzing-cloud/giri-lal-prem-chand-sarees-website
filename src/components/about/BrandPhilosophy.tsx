import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { BRAND_PHILOSOPHY } from '@/data/about'
import { ShieldCheck, Sparkles, Crown, Flame, Gem, Handshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const PHILOSOPHY_ICONS: Record<string, LucideIcon> = {
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  crown: Crown,
  flame: Flame,
  gem: Gem,
  handshake: Handshake,
}

export function BrandPhilosophy() {
  return (
    <section className="py-section">
      <Container>
        <SectionTitle
          subtitle="Our Philosophy"
          title="What We Stand For"
          description="Six pillars that define everything we do."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BRAND_PHILOSOPHY.map((item, index) => {
            const Icon = PHILOSOPHY_ICONS[item.icon]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-lg border border-night/5 bg-white p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {Icon && <Icon className="relative z-10 h-8 w-8 text-primary" aria-hidden="true" />}
                <h3 className="relative z-10 mt-4 font-heading text-lg text-night">{item.title}</h3>
                <p className="relative z-10 mt-2 font-body text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
