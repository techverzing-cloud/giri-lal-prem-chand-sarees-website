import type { AdminAboutSection } from '@/types/admin'

export const adminAboutSections: AdminAboutSection[] = [
  { id: 'ab-hero', name: 'About Hero', type: 'hero', visible: true, displayOrder: 1, content: { title: 'Our Story', subtitle: 'A Legacy of Luxury Since 1946' } },
  { id: 'ab-legacy', name: 'Legacy Section', type: 'stats', visible: true, displayOrder: 2, content: { title: 'Seven Decades of Excellence', stats: [{ label: 'Years', value: '70' }, { label: 'Artisans', value: '200+' }, { label: 'Collections', value: '1000+' }] } },
  { id: 'ab-story', name: 'Our Story', type: 'text', visible: true, displayOrder: 3, content: { title: 'Our Story', description: 'Founded in 1946 in the heart of Chandni Chowk...' } },
  { id: 'ab-timeline', name: 'Heritage Timeline', type: 'timeline', visible: true, displayOrder: 4, content: { title: 'Our Journey', milestones: 5 } },
  { id: 'ab-philosophy', name: 'Brand Philosophy', type: 'cards', visible: true, displayOrder: 5, content: { title: 'Our Philosophy', cards: 6 } },
  { id: 'ab-craftsmanship', name: 'Craftsmanship', type: 'text', visible: true, displayOrder: 6, content: { title: 'Craftsmanship', description: 'Masterful weaving traditions passed down through generations...' } },
  { id: 'ab-artisans', name: 'Artisan Profiles', type: 'profiles', visible: true, displayOrder: 7, content: { title: 'Meet Our Artisans', count: 6 } },
  { id: 'ab-store', name: 'Store Experience', type: 'text', visible: true, displayOrder: 8, content: { title: 'The Store Experience', description: 'Visit us in Chandni Chowk for a personalised experience...' } },
  { id: 'ab-trust', name: 'Trust Section', type: 'stats', visible: true, displayOrder: 9, content: { title: 'Trusted by Thousands', stats: [{ label: 'Happy Clients', value: '10,000+' }, { label: 'Years of Trust', value: '70' }] } },
  { id: 'ab-awards', name: 'Awards', type: 'cards', visible: true, displayOrder: 10, content: { title: 'Awards & Recognition', count: 6 } },
  { id: 'ab-gallery', name: 'Gallery', type: 'gallery', visible: true, displayOrder: 11, content: { title: 'Gallery', count: 12 } },
  { id: 'ab-faq', name: 'FAQ Section', type: 'faq', visible: true, displayOrder: 12, content: { title: 'Frequently Asked Questions', count: 6 } },
  { id: 'ab-cta', name: 'About CTA', type: 'cta', visible: true, displayOrder: 13, content: { title: 'Visit Our Store', buttonText: 'Book Consultation' } },
]

export function getAdminAboutSections(): AdminAboutSection[] {
  return adminAboutSections
}
