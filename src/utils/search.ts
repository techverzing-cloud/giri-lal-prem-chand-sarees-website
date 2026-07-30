export interface SearchIndexEntry {
  id: string
  type: 'product' | 'collection' | 'article' | 'faq' | 'page'
  title: string
  description: string
  url: string
  image?: string
  tags: string[]
  keywords: string[]
  score: number
}

export interface SearchIndex {
  entries: SearchIndexEntry[]
  buildDate: string
  version: number
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'could', 'should', 'may', 'might', 'shall', 'can', 'need',
    'dare', 'ought', 'used', 'this', 'that', 'these', 'those', 'am',
    'it', 'its', 'our', 'your', 'their', 'his', 'her', 'my', 'me',
  ])

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word))
}

export function createIndexEntry(
  id: string,
  type: SearchIndexEntry['type'],
  title: string,
  description: string,
  url: string,
  tags: string[],
  image?: string
): SearchIndexEntry {
  const keywords = [
    ...extractKeywords(title),
    ...extractKeywords(description),
    ...tags.map((t) => t.toLowerCase()),
  ]

  const uniqueKeywords = [...new Set(keywords)]

  return {
    id,
    type,
    title,
    description,
    url,
    image,
    tags,
    keywords: uniqueKeywords,
    score: 0,
  }
}

export function buildSearchIndex(entries: SearchIndexEntry[]): SearchIndex {
  return {
    entries: entries.map((entry, index) => ({
      ...entry,
      score: entries.length - index,
    })),
    buildDate: new Date().toISOString(),
    version: 1,
  }
}

export function searchIndex(
  index: SearchIndex,
  query: string
): SearchIndexEntry[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const queryWords = q.split(/\s+/)

  const scored = index.entries.map((entry) => {
    let score = 0

    const titleLower = entry.title.toLowerCase()
    const descLower = entry.description.toLowerCase()

    for (const word of queryWords) {
      if (titleLower.includes(word)) score += 10
      if (titleLower.startsWith(word)) score += 5
      if (descLower.includes(word)) score += 3
      if (entry.keywords.some((k) => k.includes(word))) score += 2
      if (entry.tags.some((t) => t.toLowerCase().includes(word))) score += 1
    }

    return { ...entry, score }
  })

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
}

export function groupSearchResults(
  results: SearchIndexEntry[]
): Record<SearchIndexEntry['type'], SearchIndexEntry[]> {
  const groups: Record<string, SearchIndexEntry[]> = {}

  for (const result of results) {
    if (!groups[result.type]) groups[result.type] = []
    groups[result.type].push(result)
  }

  return groups as Record<SearchIndexEntry['type'], SearchIndexEntry[]>
}
