export interface CMSImage {
  id: string
  src: string
  alt: string
  title?: string
  width?: number
  height?: number
  category?: string
  tags?: string[]
  placeholder?: string
}

export interface CMSButton {
  id: string
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  openInNewTab?: boolean
  icon?: string
}

export interface CMSLink {
  id: string
  label: string
  url: string
  icon?: string
  openInNewTab?: boolean
  visible?: boolean
  children?: CMSLink[]
}

export interface SEOMetadata {
  metaTitle?: string
  metaDescription?: string
  canonical?: string
  robots?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  structuredData?: Record<string, unknown>
}

export interface EditableSection {
  id: string
  title: string
  subtitle?: string
  description?: string
  images?: CMSImage[]
  buttons?: CMSButton[]
  seo?: SEOMetadata
  visible: boolean
  displayOrder: number
  variant?: string
}

export interface HeroBannerContent extends EditableSection {
  heroImage?: string
  heroImageMobile?: string
  overlay?: string
  badges?: { label: string; variant?: string }[]
}

export interface TestimonialContent {
  id: string
  quote: string
  author: string
  role?: string
  image?: string
  rating?: number
  visible: boolean
  displayOrder: number
}

export interface FAQItemContent {
  id: string
  question: string
  answer: string
  category?: string
  visible: boolean
  displayOrder: number
}

export interface CallToActionContent extends EditableSection {
  backgroundImage?: string
  buttonVariant?: string
}

export interface StatsContent {
  id: string
  label: string
  value: string
  suffix?: string
  visible: boolean
}

export interface HomepageContent {
  hero: HeroBannerContent
  legacy: EditableSection
  featuredCollections: EditableSection
  brands: EditableSection
  fabrics: EditableSection
  featuredProducts: EditableSection
  whyChooseUs: EditableSection
  process: EditableSection
  testimonials: EditableSection & { items: TestimonialContent[] }
  instagram: EditableSection
  cta: CallToActionContent
}

export interface AboutContent {
  hero: EditableSection
  legacy: EditableSection & { stats: StatsContent[] }
  story: EditableSection
  timeline: EditableSection
  philosophy: EditableSection
  craftsmanship: EditableSection
  artisans: EditableSection
  store: EditableSection
  trust: EditableSection & { stats: StatsContent[] }
  awards: EditableSection
  gallery: EditableSection
  faq: EditableSection & { items: FAQItemContent[] }
  cta: CallToActionContent
}

export interface SiteSettings {
  companyName: string
  tagline: string
  description: string
  logo: string
  favicon: string
  faviconApple: string
  address: string
  phone: string
  whatsapp: string
  email: string
  businessHours: string
  googleMapsUrl: string
  socialLinks: {
    instagram?: string
    facebook?: string
    youtube?: string
    pinterest?: string
    twitter?: string
  }
  copyright: string
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    darkColor: string
    fontHeading: string
    fontBody: string
  }
  analytics: {
    googleAnalyticsId?: string
    googleTagManagerId?: string
    metaPixelId?: string
    clarityId?: string
    pinterestPixelId?: string
  }
  meta: {
    defaultTitle: string
    defaultDescription: string
    defaultOgImage: string
    siteUrl: string
    twitterHandle?: string
  }
}

export interface NavigationConfig {
  main: CMSLink[]
  mobile: CMSLink[]
  footer: {
    columns: { title: string; links: CMSLink[] }[]
  }
  quickLinks: CMSLink[]
  social: CMSLink[]
}

export interface MediaItem {
  id: string
  filename: string
  alt: string
  title: string
  category: 'image' | 'video' | 'document' | 'icon' | 'logo'
  src: string
  thumbnail?: string
  width?: number
  height?: number
  fileSize?: number
  tags: string[]
  createdAt: string
}

export interface Redirect {
  id: string
  from: string
  to: string
  statusCode: 301 | 302 | 410
  visible: boolean
  description?: string
}

export interface FeatureFlag {
  id: string
  key: string
  label: string
  description: string
  enabled: boolean
  category: 'content' | 'feature' | 'integration' | 'experimental'
}

export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    dark: string
    night: string
    gold: string
    text: { primary: string; muted: string; inverse: string }
    background: { primary: string; secondary: string; card: string }
    border: string
    success: string
    warning: string
    error: string
  }
  typography: {
    headingFont: string
    bodyFont: string
    baseSize: string
    scale: string
    headingWeight: string
    bodyWeight: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  spacing: {
    section: string
    container: string
    gutter: string
  }
  animations: {
    duration: { fast: string; normal: string; slow: string }
    easing: { default: string; smooth: string; spring: string }
  }
  button: {
    primaryStyle: string
    borderRadius: string
    paddingX: string
    paddingY: string
    fontWeight: string
    textTransform: string
    letterSpacing: string
  }
}

export interface SEODefaults {
  separator: string
  siteName: string
  home: { title: string; description: string }
  collections: { title: string; description: string }
  products: { title: string; description: string }
  journal: { title: string; description: string }
  about: { title: string; description: string }
  contact: { title: string; description: string }
  enquiry: { title: string; description: string }
  notFound: { title: string; description: string }
  ogImage: string
  twitterHandle: string
  siteUrl: string
  locale: string
}

export interface ContentSection {
  id: string
  type: 'hero' | 'text' | 'gallery' | 'cards' | 'cta' | 'testimonial' | 'faq' | 'stats' | 'timeline'
  title: string
  subtitle?: string
  description?: string
  images?: CMSImage[]
  buttons?: CMSButton[]
  seo?: SEOMetadata
  visible: boolean
  displayOrder: number
  variant?: string
}

export interface CollectionContent {
  id: string
  name: string
  slug: string
  brand: string
  description: string
  image: string
  seo?: SEOMetadata
  visible: boolean
  displayOrder: number
}

export interface ProductContent {
  id: string
  name: string
  slug: string
  brand: string
  category: string
  description: string
  images: string[]
  seo?: SEOMetadata
  visible: boolean
  featured: boolean
}

export interface JournalSettings {
  hero: EditableSection
  newsletter: EditableSection & { enabled: boolean }
  articleCount: number
  featuredCount: number
  trendingCount: number
  relatedCount: number
}

export interface FooterConfig {
  about: string
  columns: { title: string; links: CMSLink[] }[]
  social: CMSLink[]
  copyright: string
  visible: boolean
}

export interface ContactInfo {
  phone: string
  email: string
  whatsapp: string
  address: string
  googleMapsUrl: string
  businessHours: { day: string; hours: string }[]
  socialLinks: CMSLink[]
  enquiryTypes: { label: string; description: string; slug: string }[]
}
