import type { Product, BrandKey, SortOption, ActiveFilter, ProductSearchResult } from '@/types'
import { slugify } from '@/utils/helpers'
import { SAREES } from './sarees'
import { LEHENGAS } from './lehengas'

export const ALL_PRODUCTS: Product[] = [...SAREES, ...LEHENGAS]

export function getProductsByBrand(brand: BrandKey): Product[] {
  return ALL_PRODUCTS.filter((p) => p.brand === brand)
}

export function getProductsByCategory(brand: BrandKey, category: string): Product[] {
  return ALL_PRODUCTS.filter((p) => p.brand === brand && p.category === category)
}

/**
 * Resolves a `/product/[slug]` param to a product.
 *
 * Next.js hands the route param over exactly as it appears in the URL, so a
 * request for `/product/Red%20Bridal%20Lehenga` arrives as
 * `Red%20Bridal%20Lehenga` and a literal `slug === param` comparison misses and
 * renders the 404 page. Decoding first and comparing on the normalised slug
 * means percent-encoded, spaced and capitalised links all resolve, for every
 * product, without the catalogue relying on how a slug happens to be written.
 */
export function getProductBySlug(slug: string): Product | undefined {
  const decoded = safeDecode(slug).trim().toLowerCase()
  return (
    ALL_PRODUCTS.find((p) => p.slug === decoded) ??
    ALL_PRODUCTS.find((p) => slugify(p.slug) === slugify(decoded))
  )
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    // A malformed escape sequence can only be matched literally.
    return value
  }
}

/**
 * Relevance score for "You may also like". Same category weighs most, then
 * fabric, then shared tags; same brand is a mild tie-breaker so a lehenga page
 * does not surface sarees. Ties keep catalogue order, which keeps the existing
 * product sequence stable between renders.
 */
function relevanceScore(source: Product, candidate: Product): number {
  let score = 0
  if (candidate.brand === source.brand) score += 1
  if (candidate.category === source.category) score += 3
  if (candidate.subcategory === source.subcategory) score += 1
  if (candidate.fabric === source.fabric) score += 2
  score += candidate.tags.filter((tag) => source.tags.includes(tag)).length
  return score
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS.filter((p) => p.id !== product.id)
    .map((p) => ({ product: p, score: relevanceScore(product, p) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product)
}

export function getFeaturedProducts(brand?: BrandKey): Product[] {
  let products = brand ? ALL_PRODUCTS.filter((p) => p.brand === brand) : ALL_PRODUCTS
  return products.filter((p) => p.featured)
}

/**
 * Selection for the homepage "Featured Products" rail.
 *
 * `getFeaturedProducts()` returns 83 items in catalogue order, which is all 43
 * sarees before any lehenga — on a single-brand storefront that reads as a wall
 * of the same thing. Round-robin across brands keeps both houses on screen, and
 * the cap keeps the rail scannable. This replaces a hand-written list that
 * carried slugs absent from the catalogue, so every card resolves to a real
 * product page.
 */
export function getFeaturedProductsForRail(limit = 5): Product[] {
  const perBrand: BrandKey[] = ['girilal', 'arunima']
  const queues = perBrand.map((brand) => getFeaturedProducts(brand))
  const rail: Product[] = []

  for (let i = 0; rail.length < limit; i++) {
    const queue = queues[i % queues.length]
    const next = queue[Math.floor(i / queues.length)]

    if (!next) break
    rail.push(next)
  }

  return rail
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
