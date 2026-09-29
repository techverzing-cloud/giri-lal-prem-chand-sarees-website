import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  index?: number
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const href = category.brand === 'girilal'
    ? `/collections/sarees/${category.slug}`
    : `/collections/lehengas/${category.slug}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-lg bg-night"
    >
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent transition-all duration-500" />
          <div
            className="h-full w-full bg-gradient-to-br from-primary/5 to-accent/5 transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage:
                `url(${category.image})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-heading text-2xl text-white md:text-3xl">{category.name}</h3>
            <p className="mt-2 font-body text-sm text-white/60 line-clamp-2">{category.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-body text-xs text-white/50">
                {category.productCount} {category.productCount === 1 ? 'Product' : 'Products'}
              </span>
              <span className="flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/60 transition-all duration-300 group-hover:text-white">
                Explore <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
