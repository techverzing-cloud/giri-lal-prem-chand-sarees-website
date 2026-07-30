import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { BENEFITS } from '@/constants/enquiry'
import { User, Crown, Sparkles, Gem, Flower2, Handshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const BENEFIT_ICONS: Record<string, LucideIcon> = {
  user: User,
  crown: Crown,
  sparkles: Sparkles,
  gem: Gem,
  flower2: Flower2,
  handshake: Handshake,
}

export function BenefitsSection() {
  return (
    <div>
      <SectionTitle
        subtitle="Why Choose Us"
        title="The Luxury Consultation Experience"
        description="Every consultation is designed to make you feel valued and celebrated."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((benefit, index) => {
          const Icon = BENEFIT_ICONS[benefit.icon]
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-lg border border-night/5 bg-white p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
            >
              {Icon && <Icon className="h-8 w-8 text-primary" aria-hidden="true" />}
              <h3 className="mt-4 font-heading text-lg text-night">{benefit.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-muted">{benefit.description}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
