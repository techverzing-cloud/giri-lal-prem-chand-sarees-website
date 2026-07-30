import type { Category, BrandKey } from '@/types'

export const CATEGORIES: Category[] = [
  { id: 'g-wedding', name: 'Wedding Sarees', slug: 'wedding', brand: 'girilal', description: 'Exquisite bridal sarees adorned with intricate zari and hand-embroidered details.', image: '/collections/wedding-sarees.jpg', productCount: 12 },
  { id: 'g-silk', name: 'Silk Sarees', slug: 'silk', brand: 'girilal', description: 'Luxurious pure silk sarees from India\'s finest weaving traditions.', image: '/collections/kanjivaram.jpg', productCount: 18 },
  { id: 'g-banarasi', name: 'Banarasi Sarees', slug: 'banarasi', brand: 'girilal', description: 'Timeless Banarasi silk sarees woven with pure gold and silver zari.', image: '/collections/banarasi.jpg', productCount: 15 },
  { id: 'g-cotton', name: 'Cotton Sarees', slug: 'cotton', brand: 'girilal', description: 'Handwoven cotton sarees with exceptional breathability and comfort.', image: '/collections/designer-sarees.jpg', productCount: 10 },
  { id: 'g-designer', name: 'Designer Sarees', slug: 'designer', brand: 'girilal', description: 'Contemporary designer sarees blending tradition with modern aesthetics.', image: '/collections/designer-sarees.jpg', productCount: 14 },
  { id: 'g-handloom', name: 'Handloom Sarees', slug: 'handloom', brand: 'girilal', description: 'Masterfully handwoven sarees preserving India\'s rich textile heritage.', image: '/collections/party-wear.jpg', productCount: 10 },
  { id: 'g-traditional', name: 'Traditional Sarees', slug: 'traditional', brand: 'girilal', description: 'Classic traditional sarees for timeless elegance.', image: '/collections/banarasi.jpg', productCount: 8 },
  { id: 'g-festive', name: 'Festive Sarees', slug: 'festive', brand: 'girilal', description: 'Celebrate every occasion with our festive collection.', image: '/collections/party-wear.jpg', productCount: 10 },
  { id: 'g-party', name: 'Party Wear', slug: 'party', brand: 'girilal', description: 'Elegant sarees for celebrations and special occasions.', image: '/collections/party-wear.jpg', productCount: 8 },
  { id: 'g-printed', name: 'Printed Sarees', slug: 'printed', brand: 'girilal', description: 'Beautifully printed sarees with modern designs.', image: '/collections/designer-sarees.jpg', productCount: 6 },
  { id: 'g-bridal', name: 'Bridal Collection', slug: 'bridal', brand: 'girilal', description: 'The ultimate bridal trousseau for your special day.', image: '/collections/wedding-sarees.jpg', productCount: 8 },

  { id: 'a-bridal', name: 'Bridal Lehengas', slug: 'bridal', brand: 'arunima', description: 'Exquisite bridal lehengas for your unforgettable day.', image: '/collections/arunima-showcase.jpg', productCount: 10 },
  { id: 'a-designer', name: 'Designer Lehengas', slug: 'designer', brand: 'arunima', description: 'Contemporary designer lehengas for the modern woman.', image: '/collections/arunima-showcase.jpg', productCount: 12 },
  { id: 'a-reception', name: 'Reception Lehengas', slug: 'reception', brand: 'arunima', description: 'Elegant reception wear with modern sophistication.', image: '/collections/arunima-showcase.jpg', productCount: 8 },
  { id: 'a-cocktail', name: 'Cocktail Lehengas', slug: 'cocktail', brand: 'arunima', description: 'Chic cocktail lehengas for evening celebrations.', image: '/collections/arunima-showcase.jpg', productCount: 6 },
  { id: 'a-engagement', name: 'Engagement Lehengas', slug: 'engagement', brand: 'arunima', description: 'Beautiful lehengas for your engagement ceremony.', image: '/collections/arunima-showcase.jpg', productCount: 7 },
  { id: 'a-luxury', name: 'Luxury Couture', slug: 'luxury', brand: 'arunima', description: 'Haute couture lehengas for the discerning client.', image: '/collections/arunima-showcase.jpg', productCount: 5 },
  { id: 'a-wedding', name: 'Wedding Collection', slug: 'wedding', brand: 'arunima', description: 'Complete wedding trousseau for the modern bride.', image: '/collections/arunima-showcase.jpg', productCount: 9 },
  { id: 'a-premium', name: 'Premium Collection', slug: 'premium', brand: 'arunima', description: 'Our most exclusive premium designer pieces.', image: '/collections/arunima-showcase.jpg', productCount: 6 },
]

export function getCategoriesByBrand(brand: BrandKey): Category[] {
  return CATEGORIES.filter((c) => c.brand === brand)
}

export function getCategoryBySlug(brand: BrandKey, slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.brand === brand && c.slug === slug)
}

export function getBrandFromCategory(slug: string): BrandKey | null {
  const category = CATEGORIES.find((c) => c.slug === slug)
  return category?.brand ?? null
}
