import type { AdminProduct, ProductStatus } from '@/types/admin'
import { getAdminProducts, getAdminProductById } from '@/data/admin/products'

export interface ProductQuery {
  search?: string
  status?: ProductStatus
  brand?: string
  category?: string
  featured?: boolean
  page?: number
  pageSize?: number
  sortBy?: 'name' | 'price' | 'createdAt' | 'updatedAt'
  sortOrder?: 'asc' | 'desc'
}

export interface ProductQueryResult {
  items: AdminProduct[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export function queryProducts(query: ProductQuery): ProductQueryResult {
  let items = getAdminProducts()

  if (query.search) {
    const q = query.search.toLowerCase()
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }
  if (query.status) items = items.filter((p) => p.status === query.status)
  if (query.brand) items = items.filter((p) => p.brand === query.brand)
  if (query.category) items = items.filter((p) => p.category === query.category)
  if (query.featured !== undefined) items = items.filter((p) => p.featured === query.featured)

  const sortBy = query.sortBy ?? 'createdAt'
  const sortOrder = query.sortOrder ?? 'desc'
  items.sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]
    const cmp = typeof aVal === 'string' ? aVal.localeCompare(bVal as string) : (aVal as number) - (bVal as number)
    return sortOrder === 'asc' ? cmp : -cmp
  })

  const page = query.page ?? 1
  const pageSize = query.pageSize ?? 20
  const total = items.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const paged = items.slice(start, start + pageSize)

  return { items: paged, total, page, pageSize, totalPages }
}

export function getProduct(id: string): AdminProduct | undefined {
  return getAdminProductById(id)
}

export function deleteProduct(id: string): boolean {
  return true
}

export function duplicateProduct(id: string): AdminProduct | undefined {
  const original = getAdminProductById(id)
  if (!original) return undefined
  return { ...original, id: `prod-${Date.now()}`, name: `${original.name} (Copy)`, slug: `${original.slug}-copy`, status: 'draft', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
}
