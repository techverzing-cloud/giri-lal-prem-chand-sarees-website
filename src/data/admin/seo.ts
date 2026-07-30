import type { AdminRedirect } from '@/types/admin'

export const adminRedirects: AdminRedirect[] = [
  { id: 'red-001', from: '/old-home', to: '/', statusCode: 301, visible: true, description: 'Old homepage redirect' },
  { id: 'red-002', from: '/gallery', to: '/about#gallery', statusCode: 301, visible: true, description: 'Gallery moved to about page' },
  { id: 'red-003', from: '/products', to: '/collections', statusCode: 301, visible: true, description: 'Products page renamed' },
  { id: 'red-004', from: '/outdated-promo', to: '', statusCode: 410, visible: false, description: 'Removed promotional page' },
  { id: 'red-005', from: '/summer-sale', to: '/collections', statusCode: 302, visible: true, description: 'Temporary seasonal redirect' },
]

export const adminSEOPages = [
  { path: '/', label: 'Homepage', title: 'Giri Lal Prem Chand Sarees — Luxury Sarees & Designer Lehengas Since 1946', description: 'Discover exquisite luxury sarees and designer lehengas.' },
  { path: '/collections', label: 'Collections', title: 'Collections — Luxury Sarees & Designer Lehengas', description: 'Explore our exquisite collections.' },
  { path: '/journal', label: 'Journal', title: 'Journal — Luxury Fashion & Craftsmanship', description: 'Explore the world of luxury fashion.' },
  { path: '/about', label: 'About', title: 'Our Story — A Legacy of Luxury Since 1946', description: 'Discover the rich heritage of Giri Lal Prem Chand Sarees.' },
  { path: '/contact', label: 'Contact', title: 'Contact Us — Get in Touch', description: 'Visit our store or get in touch.' },
  { path: '/enquiry', label: 'Enquiry', title: 'Enquire — Personalised Luxury Consultation', description: 'Book a personal consultation.' },
]

export const adminStructuredDataTypes = ['Organization', 'WebSite', 'Product', 'Article', 'FAQPage', 'BreadcrumbList']

export function getAdminRedirects(): AdminRedirect[] {
  return adminRedirects
}
