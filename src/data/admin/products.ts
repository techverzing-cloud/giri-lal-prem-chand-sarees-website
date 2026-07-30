import type { AdminProduct } from '@/types/admin'

const now = new Date().toISOString()

const productNames = ['Royal Banarasi Heritage', 'Crimson Bridal Silk', 'Ivory Wedding Grace', 'Ruby Celebration Silk', 'Golden Wedding Zari', 'Peach Blossom Bridal', 'Emerald Silk Elegance', 'Sapphire Blue Banarasi', 'Rose Gold Tissue', 'Sunset Kanjivaram', 'Majestic Peacock Silk', 'Pearl White Georgette', 'Blush Pink Organza', 'Royal Blue Brocade', 'Gold Tissue Lehenga', 'Black Velvet Lehenga', 'Pastel Dream Lehenga', 'Red Bridal Masterpiece', 'Green Emerald Lehenga', 'Floral Print Lehenga']

export const adminProducts: AdminProduct[] = Array.from({ length: 50 }, (_, i) => ({
  id: `prod-${String(i + 1).padStart(3, '0')}`,
  name: productNames[i % 20],
  slug: `product-${i + 1}`,
  brand: i % 2 === 0 ? 'girilal' : 'arunima',
  category: ['wedding', 'bridal', 'silk', 'banarasi', 'designer', 'party', 'festive', 'cotton', 'handloom', 'printed', 'bridal', 'designer', 'reception', 'cocktail', 'engagement'][i % 15],
  subcategory: i % 2 === 0 ? 'traditional' : 'bridal',
  fabric: ['Banarasi Silk', 'Pure Silk', 'Kanchipuram Silk', 'Georgette', 'Organza', 'Silk Velvet', 'Net', 'Cotton Silk', 'Tissue', 'Brocade'][i % 10],
  description: `A stunning ${productNames[i % 20].toLowerCase()} crafted from premium fabric.`,
  price: [185000, 220000, 250000, 195000, 175000, 145000, 285000, 320000, 295000, 265000][i % 10],
  colors: ['red', 'gold', 'maroon', 'ivory', 'pink', 'green', 'blue', 'peach'].slice(0, (i % 4) + 2),
  occasion: ['wedding', 'bridal', 'festive', 'party', 'engagement', 'cocktail'][i % 6],
  images: [`/products/sarees/wedding/${(i % 4) + 1}.jpg`, `/products/sarees/wedding/${((i + 1) % 4) + 1}.jpg`],
  status: i < 30 ? 'published' : i < 42 ? 'draft' : 'archived',
  featured: i < 8,
  tags: ['silk', 'banarasi', 'bridal', 'premium', 'designer', 'traditional'].slice(0, (i % 4) + 2),
  sku: `GLP-S-${String(i + 1).padStart(4, '0')}`,
  seo: {
    metaTitle: `Buy ${['Royal Banarasi Heritage', 'Crimson Bridal Silk', 'Ivory Wedding Grace'][i % 3]} Online`,
    metaDescription: `Shop the finest ${['Banarasi Silk', 'Pure Silk', 'Kanjipuram Silk'][i % 3]} saree online. Premium quality.`,
  },
  createdAt: new Date(Date.now() - (50 - i) * 86400000).toISOString(),
  updatedAt: now,
}))

export function getAdminProducts(): AdminProduct[] {
  return adminProducts
}

export function getAdminProductById(id: string): AdminProduct | undefined {
  return adminProducts.find((p) => p.id === id)
}

export function getAdminProductsByStatus(status: AdminProduct['status']): AdminProduct[] {
  return adminProducts.filter((p) => p.status === status)
}
