import { motion } from 'framer-motion'

const CRAFTSMANSHIP = [
  { label: 'Weaving Technique', value: 'Handloom — Traditional pit loom weaving passed down through generations of master weavers.' },
  { label: 'Embroidery', value: 'Intricate zardozi and resham embroidery, meticulously hand-done by skilled artisans.' },
  { label: 'Origin', value: 'Varanasi, Uttar Pradesh — the historic heart of India\'s silk weaving tradition.' },
  { label: 'Artisan Story', value: 'Each piece is crafted by artisans whose families have preserved this craft for over 200 years.' },
  { label: 'Time Required', value: 'A single saree can take 15 to 45 days depending on the complexity of the weave.' },
]

export function CraftsmanshipSection() {
  return (
    <div className="space-y-5">
      {CRAFTSMANSHIP.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="rounded-lg border border-night/5 bg-white p-5"
        >
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
            {item.label}
          </span>
          <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
            {item.value}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
