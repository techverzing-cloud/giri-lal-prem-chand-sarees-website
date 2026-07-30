export type ContentBlockType = 'heading' | 'paragraph' | 'quote' | 'image' | 'gallery' | 'bulletList' | 'numberedList' | 'checklist' | 'table' | 'divider' | 'callout'

export interface HeadingBlock { type: 'heading'; level: 1 | 2 | 3 | 4; text: string }
export interface ParagraphBlock { type: 'paragraph'; text: string }
export interface QuoteBlock { type: 'quote'; text: string; attribution?: string }
export interface ImageBlock { type: 'image'; src: string; alt: string; caption?: string }
export interface GalleryBlock { type: 'gallery'; images: { src: string; alt: string; caption?: string }[] }
export interface BulletListBlock { type: 'bulletList'; items: string[] }
export interface NumberedListBlock { type: 'numberedList'; items: string[] }
export interface ChecklistBlock { type: 'checklist'; items: { text: string; checked: boolean }[] }
export interface TableBlock { type: 'table'; headers: string[]; rows: string[][] }
export interface DividerBlock { type: 'divider' }
export interface CalloutBlock { type: 'callout'; variant: 'info' | 'tip' | 'warning'; text: string }

export type ContentBlock = HeadingBlock | ParagraphBlock | QuoteBlock | ImageBlock | GalleryBlock | BulletListBlock | NumberedListBlock | ChecklistBlock | TableBlock | DividerBlock | CalloutBlock

export interface JournalAuthor {
  id: string
  name: string
  bio: string
  avatar: string
  role: string
  social?: { instagram?: string; twitter?: string }
}

export interface JournalCategory {
  id: string
  slug: string
  name: string
  description: string
  image: string
  articleCount: number
}

export interface JournalTag {
  id: string
  slug: string
  name: string
  articleCount: number
}

export interface ArticleSEO {
  title: string
  description: string
  ogImage: string
}

export interface JournalArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: ContentBlock[]
  category: string
  tags: string[]
  author: string
  readingTime: number
  publishDate: string
  coverImage: string
  heroImage: string
  relatedProductIds: string[]
  seo: ArticleSEO
  featured: boolean
  trending: boolean
  popular: boolean
}
