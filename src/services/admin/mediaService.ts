import type { AdminMedia } from '@/types/admin'
import { getAdminMediaItems } from '@/data/admin/media'

export interface MediaQuery {
  search?: string
  category?: string
  folder?: string
  page?: number
  pageSize?: number
}

export interface MediaQueryResult {
  items: AdminMedia[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export function queryMedia(query: MediaQuery): MediaQueryResult {
  let items = getAdminMediaItems()

  if (query.search) {
    const q = query.search.toLowerCase()
    items = items.filter((m) => m.filename.toLowerCase().includes(q) || m.title.toLowerCase().includes(q))
  }
  if (query.category) items = items.filter((m) => m.category === query.category)
  if (query.folder) items = items.filter((m) => m.folder === query.folder)

  const page = query.page ?? 1
  const pageSize = query.pageSize ?? 20
  const total = items.length
  const totalPages = Math.ceil(total / pageSize)

  return { items: items.slice(0, pageSize), total, page, pageSize, totalPages }
}
