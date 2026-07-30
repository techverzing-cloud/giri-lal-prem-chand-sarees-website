import type { JournalArticle } from '@/types/journal'
import { ArticleCard } from './ArticleCard'

interface ArticleGridProps {
  articles: JournalArticle[]
  columns?: 2 | 3
}

export function ArticleGrid({ articles, columns = 3 }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-body text-text-muted">No articles found.</p>
      </div>
    )
  }

  return (
    <div
      className={`grid gap-8 ${
        columns === 2
          ? 'sm:grid-cols-2'
          : 'sm:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </div>
  )
}
