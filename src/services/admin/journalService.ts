import type { AdminArticle } from '@/types/admin'
import { getAdminArticles, getAdminArticleById } from '@/data/admin/journal'

export interface ArticleQuery {
  search?: string
  status?: string
  category?: string
  page?: number
  pageSize?: number
}

export interface ArticleQueryResult {
  items: AdminArticle[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export function queryArticles(query: ArticleQuery): ArticleQueryResult {
  let items = getAdminArticles()

  if (query.search) {
    const q = query.search.toLowerCase()
    items = items.filter((a) => a.title.toLowerCase().includes(q))
  }
  if (query.status) items = items.filter((a) => a.status === query.status)
  if (query.category) items = items.filter((a) => a.category === query.category)

  const page = query.page ?? 1
  const pageSize = query.pageSize ?? 10
  const total = items.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize

  return { items: items.slice(start, start + pageSize), total, page, pageSize, totalPages }
}

export function getArticle(id: string): AdminArticle | undefined {
  return getAdminArticleById(id)
}
