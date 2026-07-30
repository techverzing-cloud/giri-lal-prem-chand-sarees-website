import type { FeatureFlag } from '@/types/cms'

export const featureFlags: FeatureFlag[] = [
  { id: 'ff-1', key: 'journal', label: 'Journal', description: 'Enable the luxury editorial journal section', enabled: true, category: 'content' },
  { id: 'ff-2', key: 'consultation', label: 'Consultation Booking', description: 'Enable the multi-step consultation booking form', enabled: true, category: 'feature' },
  { id: 'ff-3', key: 'whatsapp', label: 'WhatsApp Integration', description: 'Show floating WhatsApp button and enable WhatsApp sharing', enabled: true, category: 'integration' },
  { id: 'ff-4', key: 'newsletter', label: 'Newsletter Signup', description: 'Enable newsletter subscription forms across the site', enabled: true, category: 'feature' },
  { id: 'ff-5', key: 'testimonials', label: 'Testimonials', description: 'Show testimonials section on the homepage and about page', enabled: true, category: 'content' },
  { id: 'ff-6', key: 'gallery', label: 'Gallery', description: 'Enable the photo gallery section on the about page', enabled: true, category: 'content' },
  { id: 'ff-7', key: 'awards', label: 'Awards', description: 'Show the awards and recognition section', enabled: true, category: 'content' },
  { id: 'ff-8', key: 'instagram', label: 'Instagram Feed', description: 'Show the Instagram gallery section on the homepage', enabled: true, category: 'content' },
  { id: 'ff-9', key: 'lazyLoading', label: 'Lazy Loading', description: 'Enable lazy loading for all images below the fold', enabled: true, category: 'experimental' },
  { id: 'ff-10', key: 'smoothScroll', label: 'Smooth Scroll', description: 'Enable Lenis smooth scrolling experience', enabled: true, category: 'experimental' },
  { id: 'ff-11', key: 'customCursor', label: 'Custom Cursor', description: 'Show the luxury custom cursor on desktop', enabled: true, category: 'experimental' },
  { id: 'ff-12', key: 'breadcrumbs', label: 'Breadcrumbs', description: 'Show breadcrumb navigation on inner pages', enabled: true, category: 'feature' },
  { id: 'ff-13', key: 'backToTop', label: 'Back to Top', description: 'Show the back-to-top button on long pages', enabled: true, category: 'feature' },
  { id: 'ff-14', key: 'recentlyViewed', label: 'Recently Viewed', description: 'Track and display recently viewed products', enabled: true, category: 'feature' },
  { id: 'ff-15', key: 'search', label: 'Search', description: 'Enable the global search functionality', enabled: true, category: 'feature' },
]

export function getFeatureFlags(): FeatureFlag[] {
  return featureFlags
}

export function isFeatureEnabled(key: string): boolean {
  return featureFlags.find((f) => f.key === key)?.enabled ?? false
}

export function getFlagsByCategory(category: FeatureFlag['category']): FeatureFlag[] {
  return featureFlags.filter((f) => f.category === category)
}
