import type { Product } from '@/types'
import { slugify } from '@/utils/helpers'

/**
 * Builds one standalone Girilal saree product.
 *
 * Every call returns a brand new object with its own `colors`, `tags` and
 * `images` arrays, and its own `image` string, so no two products share a
 * mutable reference. `image` is the single source of truth for the product's
 * picture and `images` is built from it here, so a card, Quick View, the detail
 * page and the SEO image can never disagree. Changing a product's picture means
 * editing exactly one argument on exactly one line, which cannot move any other
 * product's image.
 *
 * Every image passed here is a real saree photograph from /public. Lehenga
 * photography is never used, so a Girilal saree can never display an Arunima
 * picture.
 *
 * `collections` lists the collection slugs the product appears under; a product
 * belongs to as many collections as genuinely fit and to none otherwise.
 */
export function p(
  id: string, name: string, image: string, slug: string, category: string, subcategory: string,
  fabric: string, price: number, colors: string[], occasion: string,
  featured: boolean, isNew: boolean, tags: string[], collections: string[] = []
): Product {
  return {
    id, name, image,
    // `/product/[slug]` receives the raw, still-encoded URL segment, so a slug
    // carrying a space or an apostrophe resolves to nothing. Normalising here
    // keeps every product link URL-safe no matter how the slug was written.
    slug: slugify(slug),
    brand: 'girilal', category, subcategory, fabric, price,
    description: `Experience the timeless elegance of ${name}, a masterpiece from Giri Lal Prem Chand Sarees. Crafted from the finest ${fabric}, this exquisite piece embodies the rich textile heritage of India. Perfect for ${occasion} occasions, it showcases meticulous craftsmanship and attention to detail that has defined our legacy since 1946.`,
    images: [image],
    colors, occasion, featured, new: isNew, available: true,
    sku: `GLP-S-${id.toUpperCase()}`,
    tags,
    collections,
  }
}
