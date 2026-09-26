import type { Product } from '@/types'

const IMAGE_POOL: readonly string[] = [
  '/products/banarasi.jpg',
  '/products/banarasiLehenga.jpg',
  '/products/bridalLehenga.jpg',
  '/products/crimsonBridalSilk.jpg',
  '/products/ivorywedding.jpg',
  '/products/maroonVelvet.jpg',
  '/products/royalBanarsi.jpg',
  '/collections/Intricate-Embroidery.jpg',
  '/collections/Wedding-saree.jpg',
  '/collections/arunima.png',
  '/collections/bandhej.jpg',
  '/collections/banarasi-fabric.jpg',
  '/collections/bridalCollection.jpg',
  '/collections/cocktailLehengas.jpg',
  '/collections/cottonSaree.jpg',
  '/collections/designer-saree.jpg',
  '/collections/designerLehenga.jpg',
  '/collections/designerSaree.jpg',
  '/collections/engagement.jpg',
  '/collections/festiveSaree.jpg',
  '/collections/girilal-showcase.png',
  '/collections/handloomSaree.jpg',
  '/collections/kanjivaram.jpg',
  '/collections/luxury.jpg',
  '/collections/party-wear-saree.jpg',
  '/collections/partywear.jpg',
  '/collections/patola.jpg',
  '/collections/premium.jpg',
  '/collections/printedSaree.jpg',
  '/collections/pure-cotton.jpg',
  '/collections/Pure-silk.jpg',
  '/collections/receptionLehenga.jpg',
  '/collections/traditionalSaree.jpg',
  '/collections/wedding-sarees.jpg',
  '/collections/wedding.jpg',
]

const POOL_SIZE = IMAGE_POOL.length

const GALLERY_SIZE = 4

// Coprime with POOL_SIZE (35 = 5 x 7), so no two picks collide.
const STRIDE = 8

function hash(value: string): number {
  let h = 5381
  for (let i = 0; i < value.length; i++) {
    h = ((h << 5) + h + value.charCodeAt(i)) >>> 0
  }
  return h
}

export function resolveProductImages(productId: string): string[] {
  const start = hash(productId) % POOL_SIZE
  return Array.from(
    { length: GALLERY_SIZE },
    (_, i) => IMAGE_POOL[(start + i * STRIDE) % POOL_SIZE]
  )
}

export const LANDING_SAREES_FEATURED_IMAGES = [
  '/products/lehengas/ab001/1.jpg',
  '/products/lehengas/ab001/2.jpg',
  '/products/lehengas/ab001/3.jpg',
  '/products/lehengas/ab001/4.jpg',
] as const

export const SAREE_PAGE_FEATURED_IMAGES = [
  '/products/sarree/royalBanarsi.jpg',
  '/products/sarree/crimsonBridalSilk.jpg',
  '/products/sarree/designerSaree.jpg',
  '/products/sarree/wedding-sarees.jpg',
] as const

export const LEHENGA_PAGE_FEATURED_IMAGES = [
  '/products/lehengas/bridalLehenga.jpg',
  '/products/lehengas/cocktailLehengas.jpg',
  '/products/lehengas/engagement.jpg',
  '/products/lehengas/receptionLehenga.jpg',
] as const

export function withFeaturedImages(
  products: Product[],
  images: readonly string[]
): Product[] {
  return products.map((product, i) => ({
    ...product,
    images: [images[i % images.length]],
  }))
}
