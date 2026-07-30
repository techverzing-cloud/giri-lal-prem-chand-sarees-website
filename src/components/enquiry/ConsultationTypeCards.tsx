import { motion } from 'framer-motion'
import { CONSULTATION_TYPES } from '@/types/enquiry'

export function ConsultationTypeCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {CONSULTATION_TYPES.map((type, index) => (
        <motion.div
          key={type.value}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="group relative overflow-hidden rounded-lg border border-night/5 bg-white p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10">
            <h3 className="font-heading text-lg text-night">{type.label}</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-text-muted">{type.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
