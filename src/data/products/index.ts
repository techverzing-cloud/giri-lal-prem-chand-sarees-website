import type { Product, BrandKey, SortOption, ActiveFilter, ProductSearchResult } from '@/types'
import { slugify } from '@/utils/helpers'
import { SAREES } from './sarees'
import { LEHENGAS } from './lehengas'

export const ALL_PRODUCTS: Product[] = [...SAREES, ...LEHENGAS]

/**
 * Normalises a category/filter keyword for comparison: lowercased, trimmed,
 * with spaces, underscores and repeated hyphens collapsed into one hyphen.
 * "Party Wear", "party wear", "Party_Wear" and "party-wear" all become
 * "party-wear", so keywords match regardless of how they were written.
 */
export function normalizeFilterKey(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getProductsByBrand(brand: BrandKey): Product[] {
  return ALL_PRODUCTS.filter((p) => p.brand === brand)
}

/**
 * Exact keyword match of a category against one product, never a substring
 * test: the normalised keyword must equal the product's category or its
 * subcategory (the product's type). Equality on normalised keys means
 * "bridal" can only ever return bridal pieces, "Party Wear" and "party_wear"
 * resolve to the "party" collection, and free-form marketing tags can never
 * leak an unrelated product into a collection.
 */
function matchesCategory(product: Product, categoryKey: string): boolean {
  return (
    normalizeFilterKey(product.category) === categoryKey ||
    normalizeFilterKey(product.subcategory) === categoryKey
  )
}

export function getProductsByCategory(brand: BrandKey, category: string): Product[] {
  const categoryKey = normalizeFilterKey(category)
  if (!categoryKey) return []
  return ALL_PRODUCTS.filter((p) => p.brand === brand && matchesCategory(p, categoryKey))
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

/**
 * Fabric keywords are matched on normalised whole tokens, so "silk" matches
 * "Banarasi Silk" and "Silk Blend with Net Dupatta" on a word boundary while
 * never matching a word that merely contains the letters (no substring drift).
 */
function matchesFabricKeyword(fabric: string, keyword: string): boolean {
  const target = normalizeFilterKey(keyword)
  if (!target) return false
  const fabricKey = normalizeFilterKey(fabric)
  if (fabricKey === target) return true

  const tokens = fabricKey.split('-')
  const targetTokens = target.split('-')
  for (let i = 0; i + targetTokens.length <= tokens.length; i++) {
    if (targetTokens.every((token, offset) => tokens[i + offset] === token)) return true
  }
  return false
}

/**
 * Applies the sidebar filters to a product list and returns the products that
 * match every active filter. Exported so the UI's option counts can be derived
 * from the exact same predicate that produces the grid, keeping the displayed
 * numbers and the visible products permanently in agreement.
 */
export function applyFilters(products: Product[], filters: ActiveFilter[]): Product[] {
  let filtered = [...products]

  for (const filter of filters) {
    const valueKey = normalizeFilterKey(filter.value)
    switch (filter.groupId) {
      case 'fabric':
        filtered = filtered.filter((p) => matchesFabricKeyword(p.fabric, filter.value))
        break
      case 'occasion':
        filtered = filtered.filter((p) => normalizeFilterKey(p.occasion) === valueKey)
        break
      case 'color':
        filtered = filtered.filter((p) => p.colors.some((c) => normalizeFilterKey(c) === valueKey))
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

  return filtered
}

export function filterProducts(
  products: Product[],
  filters: ActiveFilter[],
  sort: SortOption = 'newest',
  page = 1,
  pageSize = 12
): ProductSearchResult {
  let filtered = applyFilters(products, filters)

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
