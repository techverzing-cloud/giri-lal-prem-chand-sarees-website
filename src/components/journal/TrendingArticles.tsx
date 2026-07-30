import { Link } from 'react-router-dom'
import type { JournalArticle } from '@/types/journal'

export function TrendingArticles({ articles }: { articles: JournalArticle[] }) {
  if (articles.length === 0) return null

  return (
    <div className="space-y-4">
      {articles.slice(0, 6).map((article, index) => (
        <Link
          key={article.id}
          to={`/journal/${article.slug}`}
          className="group flex items-start gap-4"
        >
          <span className="font-heading text-2xl font-medium text-primary/30 w-8 flex-shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="font-body text-sm text-night leading-snug transition-colors group-hover:text-primary line-clamp-2">
              {article.title}
            </h4>
            <p className="mt-1 font-body text-xs text-text-muted">
              {new Date(article.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
