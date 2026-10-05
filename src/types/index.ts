export interface SiteConfig {
  brand: {
    girilal: BrandConfig
    arunima: BrandConfig
  }
  company: CompanyConfig
  contact: ContactConfig
  social: SocialConfig
  seo: SEOConfig
}

export interface BrandConfig {
  name: string
  tagline: string
  since: string
  description: string
  collections: CollectionConfig[]
}

export interface CollectionConfig {
  id: string
  name: string
  slug: string
  description: string
  image: string
  brand: 'girilal' | 'arunima'
}

export interface ProductConfig {
  id: string
  name: string
  slug: string
  brand: 'girilal' | 'arunima'
  collection: string
  images: string[]
  price: string
  description: string
  details: string[]
  materials: string[]
  isNew?: boolean
  isFeatured?: boolean
}

export interface CompanyConfig {
  name: string
  founded: string
  developer: string
  description: string
}

export interface ContactConfig {
  email: string
  phone: string
  whatsapp: string
  address: string
  googleMapsUrl: string
  businessHours: string
}

export interface SocialConfig {
  instagram: string
  facebook: string
  youtube?: string
  pinterest?: string
}

export interface SEOConfig {
  title: string
  description: string
  ogImage: string
  siteUrl: string
  twitterHandle?: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  brand?: 'girilal' | 'arunima'
}

export interface EnquiryFormData {
  name: string
  email: string
  phone: string
  brand: 'girilal' | 'arunima'
  product?: string
  message: string
  preferredContact: 'email' | 'phone' | 'whatsapp'
}

export interface MetaData {
  title: string
  description: string
  ogImage?: string
  canonical?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  brand: BrandKey
  category: string
  subcategory: string
  fabric: string
  price: number
  description: string
  /**
   * The product's own picture, and the only thing that needs editing to swap it.
   * `images` is always derived from this value, so a card, Quick View, detail
   * page and SEO image can never disagree. Optional because saree products still
   * only carry `images`.
   */
  image?: string
  images: string[]
  colors: string[]
  occasion: string
  featured: boolean
  new: boolean
  available: boolean
  sku: string
  tags: string[]
}

export type BrandKey = 'girilal' | 'arunima'

export interface Category {
  id: string
  name: string
  slug: string
  brand: BrandKey
  description: string
  image: string
  productCount: number
  parent?: string
}

export interface FilterOption {
  id: string
  label: string
  value: string
  count: number
}

export interface FilterGroup {
  id: string
  label: string
  type: 'checkbox' | 'radio' | 'range'
  options: FilterOption[]
}

export interface ActiveFilter {
  groupId: string
  value: string
}

export type SortOption = 'newest' | 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

export interface ProductSearchResult {
  products: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface SearchSuggestion {
  type: 'product' | 'category' | 'fabric' | 'occasion'
  label: string
  href: string
  image?: string
}
