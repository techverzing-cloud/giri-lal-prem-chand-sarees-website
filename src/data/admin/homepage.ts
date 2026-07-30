import type { AdminHomepageSection } from '@/types/admin'

export const adminHomepageSections: AdminHomepageSection[] = [
  { id: 'hp-hero', name: 'Hero Banner', type: 'hero', visible: true, displayOrder: 1, content: { title: 'Luxury Redefined Since 1946', subtitle: 'Giri Lal Prem Chand Sarees', description: 'Discover exquisite sarees and designer lehengas' } },
  { id: 'hp-legacy', name: 'Legacy Section', type: 'text', visible: true, displayOrder: 2, content: { title: 'A Legacy of Craftsmanship', description: 'Seven decades of masterful weaving' } },
  { id: 'hp-featured-collections', name: 'Featured Collections', type: 'collections', visible: true, displayOrder: 3, content: { title: 'Our Collections', count: 6 } },
  { id: 'hp-brands', name: 'Brand Section', type: 'brands', visible: true, displayOrder: 4, content: { title: 'Two Brands, One Legacy' } },
  { id: 'hp-fabrics', name: 'Fabric Section', type: 'fabrics', visible: true, displayOrder: 5, content: { title: 'Finest Fabrics', count: 6 } },
  { id: 'hp-featured-products', name: 'Featured Products', type: 'products', visible: true, displayOrder: 6, content: { title: 'Featured Products', count: 8 } },
  { id: 'hp-why-us', name: 'Why Choose Us', type: 'cards', visible: true, displayOrder: 7, content: { title: 'Why Choose Us', items: 6 } },
  { id: 'hp-process', name: 'Process Section', type: 'process', visible: true, displayOrder: 8, content: { title: 'Our Process', steps: 4 } },
  { id: 'hp-testimonials', name: 'Testimonials', type: 'testimonial', visible: true, displayOrder: 9, content: { title: 'What Our Clients Say', count: 4 } },
  { id: 'hp-instagram', name: 'Instagram Gallery', type: 'gallery', visible: true, displayOrder: 10, content: { title: 'Follow Us', count: 6 } },
  { id: 'hp-cta', name: 'CTA Section', type: 'cta', visible: true, displayOrder: 11, content: { title: 'Book Your Consultation', buttonText: 'Enquire Now' } },
  { id: 'hp-footer-banner', name: 'Footer Banner', type: 'banner', visible: false, displayOrder: 12, content: { title: '', buttonText: 'Shop Now' } },
]

export function getAdminHomepageSections(): AdminHomepageSection[] {
  return adminHomepageSections
}
