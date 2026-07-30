import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { JOURNAL_CATEGORIES } from '@/data/journal/categories'

export function CategoryChips() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
      {JOURNAL_CATEGORIES.map((cat, index) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.03 }}
        >
          <Link
            to={`/journal/category/${cat.slug}`}
            className="flex-shrink-0 rounded-full border border-night/10 px-5 py-2 font-body text-sm text-night transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary whitespace-nowrap"
          >
            {cat.name}
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
