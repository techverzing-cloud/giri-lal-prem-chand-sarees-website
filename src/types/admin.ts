export interface AdminUser {
  id: string
  name: string
  email: string
  avatar: string
  role: AdminRole
  lastActive: string
  status: 'active' | 'inactive'
}

export type AdminRole = 'super_admin' | 'admin' | 'content_manager' | 'editor' | 'marketing'

export interface Permission {
  resource: string
  actions: ('create' | 'read' | 'update' | 'delete' | 'publish')[]
}

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  super_admin: [
    { resource: 'all', actions: ['create', 'read', 'update', 'delete', 'publish'] },
  ],
  admin: [
    { resource: 'products', actions: ['create', 'read', 'update', 'delete', 'publish'] },
    { resource: 'collections', actions: ['create', 'read', 'update', 'delete', 'publish'] },
    { resource: 'journal', actions: ['create', 'read', 'update', 'delete', 'publish'] },
    { resource: 'media', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'homepage', actions: ['read', 'update'] },
    { resource: 'about', actions: ['read', 'update'] },
    { resource: 'seo', actions: ['read', 'update'] },
    { resource: 'navigation', actions: ['read', 'update'] },
    { resource: 'settings', actions: ['read', 'update'] },
    { resource: 'enquiries', actions: ['read', 'update'] },
  ],
  content_manager: [
    { resource: 'products', actions: ['create', 'read', 'update', 'publish'] },
    { resource: 'collections', actions: ['create', 'read', 'update'] },
    { resource: 'journal', actions: ['create', 'read', 'update', 'publish'] },
    { resource: 'media', actions: ['create', 'read', 'update'] },
    { resource: 'homepage', actions: ['read', 'update'] },
    { resource: 'about', actions: ['read', 'update'] },
    { resource: 'seo', actions: ['read', 'update'] },
  ],
  editor: [
    { resource: 'products', actions: ['read', 'update'] },
    { resource: 'journal', actions: ['read', 'update'] },
    { resource: 'media', actions: ['read', 'update'] },
    { resource: 'seo', actions: ['read', 'update'] },
  ],
  marketing: [
    { resource: 'journal', actions: ['create', 'read', 'update', 'publish'] },
    { resource: 'media', actions: ['read'] },
    { resource: 'homepage', actions: ['read'] },
  ],
}

export type ProductStatus = 'draft' | 'published' | 'archived'
export type EnquiryStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
export type EnquiryPriority = 'low' | 'medium' | 'high' | 'urgent'
export type ArticleStatus = 'draft' | 'scheduled' | 'published'
export type CollectionType = 'sarees' | 'lehengas' | 'seasonal' | 'featured'

export interface AdminProduct {
  id: string
  name: string
  slug: string
  brand: 'girilal' | 'arunima'
  category: string
  subcategory: string
  fabric: string
  price: number
  colors: string[]
  occasion: string
  images: string[]
  status: ProductStatus
  featured: boolean
  tags: string[]
  sku: string
  seo?: AdminSEO
  createdAt: string
  updatedAt: string
}

export interface AdminCollection {
  id: string
  name: string
  slug: string
  type: CollectionType
  brand: 'girilal' | 'arunima'
  description: string
  image: string
  bannerImage?: string
  displayOrder: number
  visible: boolean
  featured: boolean
  seo?: AdminSEO
  productCount: number
  createdAt: string
}

export interface AdminArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  authorId: string
  coverImage: string
  readingTime: number
  status: ArticleStatus
  featured: boolean
  seo?: AdminSEO
  relatedProductIds: string[]
  relatedArticleIds: string[]
  publishedAt?: string
  scheduledAt?: string
  createdAt: string
  updatedAt: string
}

export interface AdminAuthor {
  id: string
  name: string
  email: string
  bio: string
  avatar: string
  role: string
}

export interface AdminHomepageSection {
  id: string
  name: string
  type: string
  visible: boolean
  displayOrder: number
  content: Record<string, unknown>
}

export interface AdminAboutSection {
  id: string
  name: string
  type: string
  visible: boolean
  displayOrder: number
  content: Record<string, unknown>
}

export interface AdminEnquiry {
  id: string
  type: string
  customerName: string
  customerEmail: string
  customerPhone: string
  subject?: string
  message: string
  status: EnquiryStatus
  priority: EnquiryPriority
  assignedTo?: string
  notes: string[]
  source: string
  createdAt: string
  updatedAt: string
}

export interface AdminMedia {
  id: string
  filename: string
  title: string
  alt: string
  caption?: string
  category: string
  src: string
  thumbnail?: string
  width: number
  height: number
  fileSize: number
  tags: string[]
  folder: string
  createdAt: string
}

export interface AdminSEO {
  metaTitle: string
  metaDescription: string
  canonical?: string
  robots?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: string
}

export interface AdminRedirect {
  id: string
  from: string
  to: string
  statusCode: 301 | 302 | 410
  visible: boolean
  description?: string
}

export interface AdminNavItem {
  id: string
  label: string
  url: string
  icon?: string
  parentId?: string
  displayOrder: number
  visible: boolean
  openInNewTab: boolean
  children?: AdminNavItem[]
}

export interface AdminNavMenu {
  id: string
  name: string
  items: AdminNavItem[]
}

export interface AdminActivity {
  id: string
  user: string
  action: string
  resource: string
  resourceId: string
  timestamp: string
}

export interface AdminDashboardStats {
  totalProducts: number
  publishedProducts: number
  draftProducts: number
  totalCollections: number
  totalArticles: number
  publishedArticles: number
  totalMedia: number
  totalEnquiries: number
  newEnquiries: number
  totalUsers: number
  featuredProducts: number
  monthlyGrowth: number
}

export interface AdminNotification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
}
