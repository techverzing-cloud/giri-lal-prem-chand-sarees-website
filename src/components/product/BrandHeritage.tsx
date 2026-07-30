import type { Product } from '@/types'
import { siteConfig } from '@/config/site'
import { motion } from 'framer-motion'

interface BrandHeritageProps {
  product: Product
}

export function BrandHeritage({ product }: BrandHeritageProps) {
  const isGiriLal = product.brand === 'girilal'

  const heritage = isGiriLal
    ? {
        title: 'A Legacy Since 1946',
        description: siteConfig.brand.girilal.description,
        stats: [
          { value: '80+', label: 'Years of Excellence' },
          { value: '3', label: 'Generations' },
          { value: '500000+', label: 'Happy Clients' },
        ],
        tag: 'Heritage',
        gradient: 'from-[#8E2D29] to-[#6E201D]',
      }
    : {
        title: 'Contemporary Couture',
        description: siteConfig.brand.arunima.description,
        stats: [
          { value: '15+', label: 'Years of Design Excellence' },
          { value: '500+', label: 'Designer Creations' },
          { value: '5K+', label: 'Brides Served' },
        ],
        tag: 'Designer Label',
        gradient: 'from-[#344646] to-[#232E2E]',
      }

  return (
    <div className="overflow-hidden rounded-lg bg-night">
      <div className={`bg-gradient-to-br ${heritage.gradient} p-8 md:p-10`}>
        <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
          {heritage.tag}
        </span>
        <h3 className="mt-3 font-heading text-2xl text-white md:text-3xl">{heritage.title}</h3>
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/70">
          {heritage.description}
        </p>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {heritage.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-2xl text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 font-body text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
