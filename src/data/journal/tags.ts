import type { JournalTag } from '@/types/journal'

export const JOURNAL_TAGS: JournalTag[] = [
  { id: 'tag-1', slug: 'bridal', name: 'Bridal', articleCount: 12 },
  { id: 'tag-2', slug: 'silk', name: 'Silk', articleCount: 8 },
  { id: 'tag-3', slug: 'banarasi', name: 'Banarasi', articleCount: 6 },
  { id: 'tag-4', slug: 'kanjivaram', name: 'Kanjivaram', articleCount: 4 },
  { id: 'tag-5', slug: 'wedding', name: 'Wedding', articleCount: 10 },
  { id: 'tag-6', slug: 'luxury', name: 'Luxury', articleCount: 15 },
  { id: 'tag-7', slug: 'fashion', name: 'Fashion', articleCount: 18 },
  { id: 'tag-8', slug: 'designer', name: 'Designer', articleCount: 9 },
  { id: 'tag-9', slug: 'handloom', name: 'Handloom', articleCount: 7 },
  { id: 'tag-10', slug: 'indian-wear', name: 'Indian Wear', articleCount: 14 },
  { id: 'tag-11', slug: 'lehenga', name: 'Lehenga', articleCount: 6 },
  { id: 'tag-12', slug: 'saree', name: 'Saree', articleCount: 10 },
  { id: 'tag-13', slug: 'craftsmanship', name: 'Craftsmanship', articleCount: 7 },
  { id: 'tag-14', slug: 'styling-tips', name: 'Styling Tips', articleCount: 5 },
  { id: 'tag-15', slug: 'heritage', name: 'Heritage', articleCount: 6 },
]

export function getTagBySlug(slug: string): JournalTag | undefined {
  return JOURNAL_TAGS.find((t) => t.slug === slug)
}
