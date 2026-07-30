import type { Category } from '@/types'
import { CategoryCard } from './CategoryCard'

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category, index) => (
        <CategoryCard key={category.id} category={category} index={index} />
      ))}
    </div>
  )
}
