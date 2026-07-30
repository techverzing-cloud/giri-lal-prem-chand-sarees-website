import { useEffect, useState } from 'react'
import type { Product } from '@/types'
import { ALL_PRODUCTS } from '@/data/products'
import { ProductCard } from './ProductCard'
import { Container } from '@/components/ui/Container'

const STORAGE_KEY = 'glpc-recently-viewed'
const MAX_ITEMS = 8

export function addToRecentlyViewed(productId: string) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const items: string[] = stored ? JSON.parse(stored) : []
    const filtered = items.filter((id) => id !== productId)
    filtered.unshift(productId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)))
  } catch {}
}

export function RecentlyViewed() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return
      const ids: string[] = JSON.parse(stored)
      const found = ids
        .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined)
      setProducts(found)
    } catch {}
  }, [])

  if (products.length === 0) return null

  return (
    <section className="py-section bg-cream">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
              Recently Viewed
            </span>
            <h2 className="mt-2 font-heading text-2xl text-night md:text-3xl">
              Your Recent Selections
            </h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
