import { motion } from 'framer-motion'
import { Hand, Sparkles, Trophy, Globe, Gem, Star } from 'lucide-react'

const HIGHLIGHTS = [
  { icon: Hand, label: 'Handwoven', desc: 'Masterfully crafted by skilled artisans' },
  { icon: Sparkles, label: 'Premium Silk', desc: 'Finest quality silk from India' },
  { icon: Trophy, label: 'Authentic Craftsmanship', desc: 'Generations of weaving expertise' },
  { icon: Globe, label: 'Made in India', desc: 'Proudly crafted in India' },
  { icon: Gem, label: 'Luxury Finish', desc: 'Impeccable attention to detail' },
  { icon: Star, label: 'Limited Collection', desc: 'Exclusive, limited edition pieces' },
]

export function ProductHighlights() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {HIGHLIGHTS.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
          className="rounded-lg border border-night/5 bg-white p-5 text-center transition-shadow duration-500 hover:shadow-md"
        >
          <item.icon className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
          <h4 className="mt-3 font-heading text-base text-night">{item.label}</h4>
          <p className="mt-1 font-body text-xs text-text-muted">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}
