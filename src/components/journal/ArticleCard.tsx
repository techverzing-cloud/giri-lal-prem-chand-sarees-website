import Link from 'next/link'
import { motion } from 'framer-motion'
import type { JournalArticle } from '@/types/journal'
import { ReadingTime } from './ReadingTime'
import { JOURNAL_CATEGORIES } from '@/data/journal/categories'
import { JOURNAL_AUTHORS } from '@/data/journal/authors'

export function ArticleCard({ article, index = 0 }: { article: JournalArticle; index?: number }) {
  const category = JOURNAL_CATEGORIES.find((c) => c.slug === article.category)
  const author = JOURNAL_AUTHORS.find((a) => a.id === article.author)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/journal/${article.slug}`} className="group block">
        <div className="aspect-[16/10] overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-night/10">
          <div className="flex h-full items-center justify-center transition-transform duration-700 group-hover:scale-105">
            <p className="font-heading text-white/20">Read</p>
          </div>
        </div>

        <div className="mt-4">
          {category && (
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {category.name}
            </span>
          )}

          <h3 className="mt-2 font-heading text-lg text-night leading-tight transition-colors group-hover:text-primary md:text-xl">
            {article.title}
          </h3>

          <p className="mt-2 font-body text-sm text-text-muted line-clamp-2">
            {article.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-3 font-body text-xs text-text-muted">
            {author && <span>By {author.name}</span>}
            <span>·</span>
            <ReadingTime minutes={article.readingTime} />
            <span>·</span>
            <span>{new Date(article.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
