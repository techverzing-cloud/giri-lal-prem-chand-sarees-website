import type { Product, BrandKey, SortOption, ActiveFilter, ProductSearchResult } from '@/types'
import { SAREES } from './sarees'
import { LEHENGAS } from './lehengas'

export const ALL_PRODUCTS: Product[] = [...SAREES, ...LEHENGAS]

export function getProductsByBrand(brand: BrandKey): Product[] {
  return ALL_PRODUCTS.filter((p) => p.brand === brand)
}

export function getProductsByCategory(brand: BrandKey, category: string): Product[] {
  return ALL_PRODUCTS.filter((p) => p.brand === brand && p.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.fabric === product.fabric)
  ).slice(0, limit)
}

export function getFeaturedProducts(brand?: BrandKey): Product[] {
  let products = brand ? ALL_PRODUCTS.filter((p) => p.brand === brand) : ALL_PRODUCTS
  return products.filter((p) => p.featured)
}

export function getNewProducts(brand?: BrandKey): Product[] {
  let products = brand ? ALL_PRODUCTS.filter((p) => p.brand === brand) : ALL_PRODUCTS
  return products.filter((p) => p.new)
}

export function filterProducts(
  products: Product[],
  filters: ActiveFilter[],
  sort: SortOption = 'newest',
  page = 1,
  pageSize = 12
): ProductSearchResult {
  let filtered = [...products]

  for (const filter of filters) {
    switch (filter.groupId) {
      case 'fabric':
        filtered = filtered.filter((p) => p.fabric.toLowerCase().includes(filter.value.toLowerCase()))
        break
      case 'occasion':
        filtered = filtered.filter((p) => p.occasion === filter.value)
        break
      case 'color':
        filtered = filtered.filter((p) => p.colors.includes(filter.value))
        break
      case 'price': {
        const [min, max] = filter.value.split('-').map(Number)
        filtered = filtered.filter((p) => p.price >= min && p.price <= max)
        break
      }
      case 'availability':
        if (filter.value === 'instock') filtered = filtered.filter((p) => p.available)
        break
    }
  }

  switch (sort) {
    case 'newest':
      break
    case 'featured':
      filtered = filtered.filter((p) => p.featured)
      break
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name))
      break
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const paged = filtered.slice(start, start + pageSize)

  return { products: paged, total, page, pageSize, totalPages }
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return ALL_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.occasion.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.colors.some((c) => c.toLowerCase().includes(q))
  )
}
