import { motion } from 'framer-motion'

const STYLING = [
  { occasion: 'Wedding', desc: 'Perfect as bridal or bridesmaid attire with traditional gold jewellery.', gradient: 'from-[#8E2D29] to-[#6E201D]' },
  { occasion: 'Reception', desc: 'Pair with statement earrings and a clutch for an elegant reception look.', gradient: 'from-[#C9A96E] to-[#A6884E]' },
  { occasion: 'Festival', desc: 'Celebrate with vibrant accessories and traditional floral jewellery.', gradient: 'from-[#344646] to-[#232E2E]' },
  { occasion: 'Cocktail', desc: 'Style with modern minimal jewellery for a sophisticated evening look.', gradient: 'from-[#E3A2A0] to-[#D48582]' },
  { occasion: 'Traditional Ceremony', desc: 'Complete the look with traditional Bun or Braid hairstyle.', gradient: 'from-[#4A5F5F] to-[#344646]' },
]

export function StylingSuggestions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STYLING.map((item, index) => (
        <motion.div
          key={item.occasion}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className={`group relative min-h-[160px] overflow-hidden rounded-lg bg-gradient-to-br ${item.gradient} p-6`}
        >
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
          <div className="relative z-10 flex h-full flex-col justify-end">
            <h4 className="font-heading text-xl text-white">{item.occasion}</h4>
            <p className="mt-2 font-body text-sm text-white/70">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
