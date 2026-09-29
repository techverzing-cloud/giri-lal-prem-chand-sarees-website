import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Eye } from 'lucide-react'
import type { Product } from '@/types'
import { LuxuryBadge } from '@/components/ui/LuxuryBadge'
import { cn } from '@/utils/cn'

interface ProductCardProps {
  product: Product
  index?: number
  onQuickView?: (product: Product) => void
}

export function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-night">
        <Link href={`/product/${product.slug}`} className="block h-full">
          <div
            className={cn(
              'h-full w-full transition-transform duration-700',
              isHovered ? 'scale-110' : 'scale-100'
            )}
          >
            {imgError ? (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10" />
                  <p className="mt-2 font-body text-xs text-text-muted">{product.name}</p>
                </div>
              </div>
            ) : (
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </Link>

        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-3 top-3">
          {product.new && <LuxuryBadge variant="primary" size="sm">New</LuxuryBadge>}
          {product.featured && !product.new && <LuxuryBadge variant="accent" size="sm">Featured</LuxuryBadge>}
        </div>

        <div className="absolute right-3 top-3">
          <button
            className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white"
            aria-label="Add to wishlist"
          >
            <Heart className="size-4" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => onQuickView?.(product)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-white/10 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
          >
            <Eye className="size-3.5" />
            Quick View
          </button>
        </div>

        {isHovered && (
          <div className="absolute inset-0 rounded-lg ring-1 ring-white/10" />
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-body text-[11px] uppercase tracking-[0.15em] text-text-muted">
            {product.brand === 'girilal' ? 'Giri Lal' : 'Arunima'}
          </span>
          <span className="font-body text-[11px] uppercase tracking-[0.1em] text-text-muted">
            {product.occasion}
          </span>
        </div>
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-heading text-lg text-night transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-sm text-text-muted">{product.fabric}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-heading text-sm uppercase tracking-wider text-primary">Enquire for Price</span>
          <span className="font-body text-[11px] uppercase tracking-[0.15em] text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
            View Details
          </span>
        </div>
      </div>
    </motion.div>
  )
}
