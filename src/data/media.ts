import type { MediaItem } from '@/types/cms'

export const mediaItems: MediaItem[] = [
  { id: 'med-1', filename: 'hero-main.jpg', alt: 'Luxury saree collection hero', title: 'Hero Banner', category: 'image', src: '/placeholders/image.svg', width: 1920, height: 1080, tags: ['hero', 'banner'], createdAt: '2025-01-15' },
  { id: 'med-2', filename: 'logo.svg', alt: 'Giri Lal Prem Chand Sarees logo', title: 'Company Logo', category: 'logo', src: '/media/logo.svg', tags: ['logo', 'brand'], createdAt: '2025-01-10' },
  { id: 'med-3', filename: 'og-default.jpg', alt: 'Default OG image', title: 'OG Image Default', category: 'image', src: '/seo/og-default.jpg', width: 1200, height: 630, tags: ['seo', 'social'], createdAt: '2025-01-10' },
  { id: 'med-4', filename: 'wedding-sarees.jpg', alt: 'Wedding saree collection', title: 'Wedding Sarees', category: 'image', src: '/collections/wedding-sarees.jpg', width: 800, height: 1000, tags: ['collections', 'sarees', 'wedding'], createdAt: '2025-01-20' },
  { id: 'med-5', filename: 'banarasi.jpg', alt: 'Banarasi silk sarees', title: 'Banarasi Silk', category: 'image', src: '/collections/banarasi.jpg', width: 800, height: 1000, tags: ['collections', 'banarasi'], createdAt: '2025-01-20' },
  { id: 'med-6', filename: 'kanjivaram.jpg', alt: 'Kanjivaram silk sarees', title: 'Kanjivaram Silk', category: 'image', src: '/collections/kanjivaram.jpg', width: 800, height: 1000, tags: ['collections', 'kanjivaram'], createdAt: '2025-01-20' },
  { id: 'med-7', filename: 'arunima-showcase.jpg', alt: 'Arunima Fashions showcase', title: 'Arunima Showcase', category: 'image', src: '/collections/arunima-showcase.jpg', width: 800, height: 1000, tags: ['collections', 'arunima', 'lehengas'], createdAt: '2025-02-01' },
  { id: 'med-8', filename: 'client-1.jpg', alt: 'Client testimonial', title: 'Client Testimonial 1', category: 'image', src: '/testimonials/client-1.jpg', width: 200, height: 200, tags: ['testimonial', 'client'], createdAt: '2025-02-05' },
  { id: 'med-9', filename: 'client-2.jpg', alt: 'Client testimonial', title: 'Client Testimonial 2', category: 'image', src: '/testimonials/client-2.jpg', width: 200, height: 200, tags: ['testimonial', 'client'], createdAt: '2025-02-05' },
  { id: 'med-10', filename: 'client-3.jpg', alt: 'Client testimonial', title: 'Client Testimonial 3', category: 'image', src: '/testimonials/client-3.jpg', width: 200, height: 200, tags: ['testimonial', 'client'], createdAt: '2025-02-05' },
  { id: 'med-11', filename: 'brand-girilal.jpg', alt: 'Giri Lal Prem Chand Sarees brand', title: 'Giri Lal Brand', category: 'image', src: '/collections/girilal-showcase.jpg', width: 800, height: 600, tags: ['brand', 'girilal'], createdAt: '2025-01-25' },
  { id: 'med-12', filename: 'brand-arunima.jpg', alt: 'Arunima Fashions brand', title: 'Arunima Brand', category: 'image', src: '/collections/arunima-showcase.jpg', width: 800, height: 600, tags: ['brand', 'arunima'], createdAt: '2025-01-25' },
  { id: 'med-13', filename: 'favicon.svg', alt: 'Favicon', title: 'Favicon', category: 'icon', src: '/favicon.svg', tags: ['favicon', 'brand'], createdAt: '2025-01-10' },
  { id: 'med-14', filename: 'icons.svg', alt: 'Site icons', title: 'Site Icons', category: 'icon', src: '/icons.svg', tags: ['icons'], createdAt: '2025-01-10' },
  { id: 'med-15', filename: 'product-saree-1.jpg', alt: 'Royal Banarasi Heritage saree', title: 'Royal Banarasi Heritage', category: 'image', src: '/products/sarees/wedding/1.jpg', width: 800, height: 1000, tags: ['product', 'sarees', 'wedding'], createdAt: '2025-02-10' },
  { id: 'med-16', filename: 'product-lehenga-1.jpg', alt: 'Royal Emerald Bridal lehenga', title: 'Royal Emerald Bridal', category: 'image', src: '/products/lehengas/bridal/1.jpg', width: 800, height: 1000, tags: ['product', 'lehengas', 'bridal'], createdAt: '2025-02-10' },
]

export function getMediaItems(): MediaItem[] {
  return mediaItems
}

export function getMediaByCategory(category: MediaItem['category']): MediaItem[] {
  return mediaItems.filter((item) => item.category === category)
}

export function getMediaById(id: string): MediaItem | undefined {
  return mediaItems.find((item) => item.id === id)
}

export function searchMedia(query: string): MediaItem[] {
  const q = query.toLowerCase()
  return mediaItems.filter(
    (item) =>
      item.filename.toLowerCase().includes(q) ||
      item.alt.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
  )
}
