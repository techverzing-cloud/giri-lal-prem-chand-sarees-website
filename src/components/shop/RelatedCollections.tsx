import type { Category } from '@/types'
import { CategoryCard } from './CategoryCard'
import { Container } from '@/components/ui/Container'

interface RelatedCollectionsProps {
  categories: Category[]
  title?: string
}

export function RelatedCollections({
  categories,
  title = 'Related Collections',
}: RelatedCollectionsProps) {
  if (categories.length === 0) return null

  return (
    <section className="py-section bg-surface">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
              Explore More
            </span>
            <h2 className="mt-2 font-heading text-2xl text-night md:text-3xl">
              {title}
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
