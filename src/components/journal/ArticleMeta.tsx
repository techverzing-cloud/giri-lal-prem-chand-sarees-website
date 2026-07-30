import { Link } from 'react-router-dom'
import type { JournalArticle } from '@/types/journal'
import { ReadingTime } from './ReadingTime'
import { JOURNAL_CATEGORIES } from '@/data/journal/categories'
import { JOURNAL_AUTHORS } from '@/data/journal/authors'

export function ArticleMeta({ article }: { article: JournalArticle }) {
  const category = JOURNAL_CATEGORIES.find((c) => c.slug === article.category)
  const author = JOURNAL_AUTHORS.find((a) => a.id === article.author)

  return (
    <div className="flex flex-wrap items-center gap-4 font-body text-sm text-text-muted">
      {category && (
        <Link
          to={`/journal/category/${category.slug}`}
          className="font-semibold uppercase tracking-[0.15em] text-primary transition-colors hover:text-primary/70 text-xs"
        >
          {category.name}
        </Link>
      )}
      <span>·</span>
      <ReadingTime minutes={article.readingTime} />
      <span>·</span>
      <span>{new Date(article.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      {author && (
        <>
          <span>·</span>
          <span>By {author.name}</span>
        </>
      )}
    </div>
  )
}
