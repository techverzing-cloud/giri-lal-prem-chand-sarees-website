import type { SearchIndexEntry, SearchIndex } from '@/utils/search'
import { createIndexEntry, buildSearchIndex, searchIndex } from '@/utils/search'

let globalSearchIndex: SearchIndex | null = null

export function initializeSearchIndex(entries: SearchIndexEntry[]): SearchIndex {
  globalSearchIndex = buildSearchIndex(entries)
  return globalSearchIndex
}

export function getSearchIndex(): SearchIndex | null {
  return globalSearchIndex
}

export function search(query: string): SearchIndexEntry[] {
  if (!globalSearchIndex) return []
  return searchIndex(globalSearchIndex, query)
}

export function rebuildSearchIndex(entries: SearchIndexEntry[]): SearchIndex {
  globalSearchIndex = buildSearchIndex(entries)
  return globalSearchIndex
}

export { createIndexEntry }
export type { SearchIndexEntry, SearchIndex }
