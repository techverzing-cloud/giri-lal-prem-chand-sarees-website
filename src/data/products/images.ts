import type { Product } from '@/types'

export const LANDING_SAREES_FEATURED_IMAGES = [
  '/collections/wedding-sarees.jpg',
  '/collections/handloomSaree.jpg',
  '/collections/designerSaree.jpg',
  '/products/royalBanarsi.jpg',
] as const

export const SAREE_PAGE_FEATURED_IMAGES = [
  '/products/sarree/royalBanarsi.jpg',
  '/collections/handloomSaree.jpg',
  '/products/sarree/designerSaree.jpg',
  '/products/sarree/wedding-sarees.jpg',
] as const

/**
 * Overrides the picture of a landing-page featured product.
 *
 * `image` is written as well as `images` so the product keeps a single source of
 * truth for its picture: a card, Quick View, the detail page and the SEO image
 * can never end up showing different photographs.
 */
export function withFeaturedImages(
  products: Product[],
  images: readonly string[]
): Product[] {
  return products.map((product, i) => {
    const image = images[i % images.length]
    return { ...product, image, images: [image] }
  })
}
