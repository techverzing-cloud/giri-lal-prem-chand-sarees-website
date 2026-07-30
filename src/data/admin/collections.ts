import type { AdminCollection } from '@/types/admin'

export const adminCollections: AdminCollection[] = [
  { id: 'col-001', name: 'Wedding Sarees', slug: 'wedding', type: 'sarees', brand: 'girilal', description: 'Exquisite bridal sarees for your special day.', image: '/collections/wedding-sarees.jpg', bannerImage: '/collections/wedding-sarees.jpg', displayOrder: 1, visible: true, featured: true, productCount: 12, createdAt: '2025-01-15T00:00:00.000Z' },
  { id: 'col-002', name: 'Silk Sarees', slug: 'silk', type: 'sarees', brand: 'girilal', description: 'Luxurious pure silk sarees from India\'s finest weaving traditions.', image: '/collections/kanjivaram.jpg', displayOrder: 2, visible: true, featured: true, productCount: 18, createdAt: '2025-01-15T00:00:00.000Z' },
  { id: 'col-003', name: 'Banarasi Sarees', slug: 'banarasi', type: 'sarees', brand: 'girilal', description: 'Timeless Banarasi silk sarees with pure zari.', image: '/collections/banarasi.jpg', displayOrder: 3, visible: true, featured: true, productCount: 15, createdAt: '2025-01-15T00:00:00.000Z' },
  { id: 'col-004', name: 'Designer Sarees', slug: 'designer', type: 'sarees', brand: 'girilal', description: 'Contemporary designer sarees blending tradition with modern aesthetics.', image: '/collections/designer-sarees.jpg', displayOrder: 4, visible: true, featured: false, productCount: 14, createdAt: '2025-01-20T00:00:00.000Z' },
  { id: 'col-005', name: 'Handloom Sarees', slug: 'handloom', type: 'sarees', brand: 'girilal', description: 'Masterfully handwoven sarees preserving India\'s rich textile heritage.', image: '/collections/party-wear.jpg', displayOrder: 5, visible: true, featured: false, productCount: 10, createdAt: '2025-01-20T00:00:00.000Z' },
  { id: 'col-006', name: 'Bridal Lehengas', slug: 'bridal-lehengas', type: 'lehengas', brand: 'arunima', description: 'Exquisite bridal lehengas for your unforgettable day.', image: '/collections/arunima-showcase.jpg', bannerImage: '/collections/arunima-showcase.jpg', displayOrder: 1, visible: true, featured: true, productCount: 10, createdAt: '2025-02-01T00:00:00.000Z' },
  { id: 'col-007', name: 'Designer Lehengas', slug: 'designer-lehengas', type: 'lehengas', brand: 'arunima', description: 'Contemporary designer lehengas for the modern woman.', image: '/collections/arunima-showcase.jpg', displayOrder: 2, visible: true, featured: true, productCount: 12, createdAt: '2025-02-01T00:00:00.000Z' },
  { id: 'col-008', name: 'Reception Lehengas', slug: 'reception', type: 'lehengas', brand: 'arunima', description: 'Elegant reception wear with modern sophistication.', image: '/collections/arunima-showcase.jpg', displayOrder: 3, visible: true, featured: false, productCount: 8, createdAt: '2025-02-05T00:00:00.000Z' },
  { id: 'col-009', name: 'Cocktail Lehengas', slug: 'cocktail', type: 'lehengas', brand: 'arunima', description: 'Chic cocktail lehengas for evening celebrations.', image: '/collections/arunima-showcase.jpg', displayOrder: 4, visible: true, featured: false, productCount: 6, createdAt: '2025-02-05T00:00:00.000Z' },
  { id: 'col-010', name: 'Festive Collection', slug: 'festive', type: 'seasonal', brand: 'girilal', description: 'Celebrate every occasion with our festive collection.', image: '/collections/party-wear.jpg', displayOrder: 6, visible: true, featured: false, productCount: 10, createdAt: '2025-03-01T00:00:00.000Z' },
  { id: 'col-011', name: 'Summer Edit', slug: 'summer-edit', type: 'seasonal', brand: 'arunima', description: 'Light and breezy lehengas for summer celebrations.', image: '/collections/arunima-showcase.jpg', displayOrder: 7, visible: false, featured: false, productCount: 5, createdAt: '2025-03-15T00:00:00.000Z' },
  { id: 'col-012', name: 'Bridal Edit', slug: 'bridal-edit', type: 'featured', brand: 'girilal', description: 'Curated bridal trousseau edit.', image: '/collections/wedding-sarees.jpg', bannerImage: '/collections/girilal-showcase.jpg', displayOrder: 1, visible: true, featured: true, productCount: 25, createdAt: '2025-04-01T00:00:00.000Z' },
]

export function getAdminCollections(): AdminCollection[] {
  return adminCollections
}

export function getAdminCollectionById(id: string): AdminCollection | undefined {
  return adminCollections.find((c) => c.id === id)
}
