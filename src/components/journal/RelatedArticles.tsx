import type { JournalArticle } from '@/types/journal'
import { ArticleCard } from './ArticleCard'

export function RelatedArticles({ articles }: { articles: JournalArticle[] }) {
  if (articles.length === 0) return null

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </div>
  )
}
