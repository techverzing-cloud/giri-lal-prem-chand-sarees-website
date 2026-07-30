import { motion } from 'framer-motion'
import { Droplets, Package, Sun, Flame, Box } from 'lucide-react'

const INSTRUCTIONS = [
  { icon: Droplets, label: 'Dry Clean Only', desc: 'Professional dry cleaning recommended to preserve fabric and embellishments.' },
  { icon: Package, label: 'Store in Muslin Cloth', desc: 'Wrap in soft muslin cloth to protect the weave and prevent snagging.' },
  { icon: Sun, label: 'Avoid Direct Sunlight', desc: 'Prolonged exposure to sunlight may cause colour fading over time.' },
  { icon: Flame, label: 'Iron on Low Heat', desc: 'Use a low heat setting. Avoid ironing directly on embroidery or zari work.' },
  { icon: Box, label: 'Fold Carefully', desc: 'Fold along the weave lines. Avoid sharp creases that may damage the fabric.' },
]

export function CareInstructions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {INSTRUCTIONS.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="rounded-lg border border-night/5 bg-white p-5"
        >
          <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
          <h4 className="mt-3 font-heading text-base text-night">{item.label}</h4>
          <p className="mt-1 font-body text-xs leading-relaxed text-text-muted">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}
