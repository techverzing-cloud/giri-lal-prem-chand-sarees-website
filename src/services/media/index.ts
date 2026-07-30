import type { MediaItem } from '@/types/cms'
import { getMediaItems } from '@/data/media'

export interface MediaQuery {
  category?: MediaItem['category']
  search?: string
  tags?: string[]
  page?: number
  pageSize?: number
}

export interface MediaQueryResult {
  items: MediaItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export function queryMedia(query: MediaQuery): MediaQueryResult {
  let items = getMediaItems()

  if (query.category) {
    items = items.filter((item) => item.category === query.category)
  }

  if (query.search) {
    const q = query.search.toLowerCase()
    items = items.filter(
      (item) =>
        item.filename.toLowerCase().includes(q) ||
        item.alt.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    )
  }

  if (query.tags && query.tags.length > 0) {
    items = items.filter((item) => query.tags!.some((tag) => item.tags.includes(tag)))
  }

  const page = query.page ?? 1
  const pageSize = query.pageSize ?? 20
  const total = items.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const paged = items.slice(start, start + pageSize)

  return { items: paged, total, page, pageSize, totalPages }
}

export function getMediaByTags(tags: string[]): MediaItem[] {
  return getMediaItems().filter((item) => tags.some((tag) => item.tags.includes(tag)))
}

export function getMediaByCategory(category: MediaItem['category']): MediaItem[] {
  return getMediaItems().filter((item) => item.category === category)
}
