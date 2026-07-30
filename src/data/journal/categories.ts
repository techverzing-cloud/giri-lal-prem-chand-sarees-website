import type { JournalCategory } from '@/types/journal'

export const JOURNAL_CATEGORIES: JournalCategory[] = [
  { id: 'cat-1', slug: 'bridal', name: 'Bridal', description: 'Everything you need to know about bridal fashion, from lehenga styling to jewellery pairing.', image: '/journal/category-bridal.jpg', articleCount: 6 },
  { id: 'cat-2', slug: 'sarees', name: 'Sarees', description: 'Explore the world of luxury sarees — Banarasi, Kanjivaram, silk, and more.', image: '/journal/category-sarees.jpg', articleCount: 5 },
  { id: 'cat-3', slug: 'lehengas', name: 'Lehengas', description: 'Designer lehenga inspiration for weddings, receptions, and celebrations.', image: '/journal/category-lehengas.jpg', articleCount: 4 },
  { id: 'cat-4', slug: 'styling', name: 'Styling', description: 'Style guides and fashion tips to help you look your best on every occasion.', image: '/journal/category-styling.jpg', articleCount: 3 },
  { id: 'cat-5', slug: 'fabric-guide', name: 'Fabric Guide', description: 'Learn about different fabrics — silk, chiffon, georgette, organza, and more.', image: '/journal/category-fabric.jpg', articleCount: 3 },
  { id: 'cat-6', slug: 'wedding-inspiration', name: 'Wedding Inspiration', description: 'Real weddings, colour palettes, decor ideas, and bridal inspiration.', image: '/journal/category-wedding.jpg', articleCount: 3 },
  { id: 'cat-7', slug: 'heritage', name: 'Heritage', description: 'Stories of tradition, craftsmanship, and the legacy of Indian textiles.', image: '/journal/category-heritage.jpg', articleCount: 3 },
  { id: 'cat-8', slug: 'craftsmanship', name: 'Craftsmanship', description: 'Behind the scenes of handwoven luxury — the art, the process, the people.', image: '/journal/category-craft.jpg', articleCount: 3 },
]

export function getCategoryBySlug(slug: string): JournalCategory | undefined {
  return JOURNAL_CATEGORIES.find((c) => c.slug === slug)
}

export function getArticlesByCategory(categorySlug: string, articles: any[]) {
  return articles.filter((a) => a.category === categorySlug)
}
