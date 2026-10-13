import type { Product } from '@/types'

export const LANDING_SAREES_FEATURED_IMAGES = [
  '/Saree/wedding-saree/weddingSaree1.png',
  '/Saree/wedding-saree/weddingSaree2.png',
  '/Saree/silk-saree/silkSaree1.png',
  '/Saree/designer-saree/designerSaree4.png',
] as const

export const SAREE_PAGE_FEATURED_IMAGES = [
  '/Saree/wedding-saree/weddingSaree1.png',
  '/Saree/Wedding-saree/weddingSaree2.png',
  '/Saree/silk-saree/silkSaree1.png',
  '/Saree/silk-saree/silkSaree2.png',
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
