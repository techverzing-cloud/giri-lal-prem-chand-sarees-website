import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { JournalArticle } from '@/types/journal'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ReadingTime } from './ReadingTime'
import { JOURNAL_CATEGORIES } from '@/data/journal/categories'
import { JOURNAL_AUTHORS } from '@/data/journal/authors'

export function FeaturedArticle({ article }: { article: JournalArticle }) {
  const category = JOURNAL_CATEGORIES.find((c) => c.slug === article.category)
  const author = JOURNAL_AUTHORS.find((a) => a.id === article.author)

  return (
    <section className="py-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid overflow-hidden rounded-lg border border-night/5 bg-white lg:grid-cols-2"
        >
          <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-accent/5 to-night/10 lg:aspect-auto">
            <div className="flex h-full items-center justify-center">
              <p className="font-heading text-white/20">Featured</p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-10">
            {category && (
              <Link
                to={`/journal/category/${category.slug}`}
                className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-primary/70"
              >
                {category.name}
              </Link>
            )}

            <h2 className="font-heading text-2xl text-night leading-tight md:text-3xl">
              {article.title}
            </h2>

            <p className="mt-4 font-body text-sm leading-relaxed text-text-muted">
              {article.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-4 font-body text-xs text-text-muted">
              {author && (
                <span className="flex items-center gap-2">
                  <span className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-body text-[10px] text-primary">{author.name.charAt(0)}</span>
                  </span>
                  {author.name}
                </span>
              )}
              <ReadingTime minutes={article.readingTime} />
              <span>{new Date(article.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>

            <Link to={`/journal/${article.slug}`} className="mt-6">
              <LuxuryButton variant="primary" size="md" icon={<ArrowRight className="size-4" />}>
                Read Story
              </LuxuryButton>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
