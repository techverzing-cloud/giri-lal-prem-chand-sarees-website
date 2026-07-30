import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { motion } from 'framer-motion'

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
  onQuickView?: (product: Product) => void
}

export function ProductGrid({ products, columns = 3, onQuickView }: ProductGridProps) {
  return (
    <div
      className={`grid gap-6 sm:gap-8 ${
        columns === 2
          ? 'grid-cols-1 sm:grid-cols-2'
          : columns === 3
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }`}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  )
}
