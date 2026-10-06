import type { Product } from '@/types'
import { slugify } from '@/utils/helpers'

/**
 * Builds one standalone lehenga product.
 *
 * Every call returns a brand new object with its own `colors`, `tags` and
 * `images` arrays, so no two products ever share a mutable reference. `image`
 * is the single source of truth for the product's picture and `images` is built
 * from it here — swapping a product's image means editing exactly one argument
 * on exactly one line, and cannot move any other product's picture.
 */
function p(
  id: string, name: string, image: string, slug: string, category: string, subcategory: string,
  fabric: string, price: number, colors: string[], occasion: string,
  featured: boolean, isNew: boolean, tags: string[]
): Product {
  return {
    id, name, image,
    // `/product/[slug]` receives the raw, still-encoded URL segment, so a slug
    // carrying a space or an apostrophe resolves to nothing. Normalising here
    // keeps every product link URL-safe no matter how the slug was written.
    slug: slugify(slug),
    brand: 'arunima', category, subcategory, fabric, price,
    description: `Discover the exquisite ${name} from Arunima Fashions. Meticulously crafted from premium ${fabric}, this designer piece embodies contemporary elegance while honoring traditional craftsmanship. Perfect for ${occasion} occasions, it represents the pinnacle of luxury fashion for the modern woman.`,
    images: [image],
    colors, occasion, featured, new: isNew, available: true,
    sku: `AF-L-${id.toUpperCase()}`,
    tags,
  }
}

/**
 * The Arunima Fashions lehenga collection, one independent product object per
 * look and one independent list per category.
 *
 * To change a product's picture, edit only its `image` argument below. Products
 * are not looked up by array position anywhere, so inserting, reordering or
 * removing a product has no effect on any other product in any other category.
 */

const BRIDAL_LEHENGAS: Product[] = [
  p('ab001', 'Pink Heritage Bridal Lehenga', '/girilal/bridal-lehenga/bridalLehenga1.png', 'crimson-heritage-bridal-lehenga', 'bridal', 'bridal', 'Silk Blend', 285000, ['pink', 'gold'], 'wedding', true, true, ['bridal', 'silk', 'heritage']),
  p('ab002', 'Ruby Wedding Bridal Lehenga', '/girilal/bridal-lehenga/bridalLehenga3.png', 'ruby-wedding-bridal-lehenga', 'bridal', 'bridal', 'Silk Blend with Net Dupatta', 320000, ['pink', 'gold'], 'wedding', true, false, ['bridal', 'silk', 'premium']),
  p('ab003', 'Ivory Pearl Bridal Lehenga', '/girilal/bridal-lehenga/bridalLehenga7.png', 'ivory-pearl-bridal-lehenga', 'bridal', 'bridal', 'Organza', 295000, ['ivory', 'gold','red'], 'wedding', false, false, ['bridal', 'organza', 'premium']),
  p('ab004', 'Champagne Embroidered Bridal Lehenga', '/girilal/bridal-lehenga/bridalLehenga5.png', 'champagne-embroidered-bridal-lehenga', 'bridal', 'bridal', 'Georgette', 250000, ['gold', 'red'], 'wedding', false, true, ['bridal', 'georgette', 'embroidered']),
  p('ab005', 'Red Zari Bridal Lehenga', '/girilal/bridal-lehenga/bridalLehenga4.png', 'rose-gold-zari-bridal-lehenga', 'bridal', 'bridal', 'Net', 280000, ['red', 'gold'], 'wedding', true, false, ['bridal', 'net', 'zari']),
  p('ab006', 'Red Bridal Lehenga', '/girilal/bridal-lehenga/bridalLehenga6.png', 'crimson-heritage-bridal-lehenga', 'bridal', 'bridal', 'Silk Blend', 285000, ['red', 'gold'], 'wedding', true, true, ['bridal', 'silk', 'heritage']),
]

const WEDDING_LEHENGAS: Product[] = [
  p('aw001', 'Blush Silk Wedding Lehenga', '/girilal/bridal-lehenga/bridalLehenga8.png', 'blush-silk-wedding-lehenga', 'wedding', 'wedding', 'Pure Silk', 185000, ['pink', 'gold'], 'wedding', true, false, ['wedding', 'silk', 'blush']),
  p('aw002', 'Golden Heritage Wedding Lehenga', '/girilal/bridal-lehenga/bridalLehenga10.png', 'golden-heritage-wedding-lehenga', 'wedding', 'wedding', 'Banarasi Silk', 195000, ['gold', 'red'], 'wedding', false, true, ['wedding', 'banarasi', 'heritage']),
  p('aw003', 'Scarlet Velvet Wedding Lehenga', '/girilal/bridal-lehenga/bridalLehenga3.png', 'scarlet-velvet-wedding-lehenga', 'wedding', 'wedding', 'Velvet', 215000, ['pink', 'gold'], 'wedding', true, false, ['wedding', 'velvet', 'bold']),
]

const LUXURY_LEHENGAS: Product[] = [
  p('al001', 'Emerald Royal Couture Lehenga', '/girilal/bridal-lehenga/bridalLehenga9.png', 'emerald-royal-couture-lehenga', 'luxury', 'luxury', 'Pure Silk', 450000, ['pink', 'gold'], 'wedding', true, false, ['luxury', 'couture', 'royal']),
  p('al002', 'Midnight Sapphire Couture Lehenga', '/girilal/bridal-lehenga/bridalLehenga13.png', 'midnight-sapphire-couture-lehenga', 'luxury', 'luxury', 'Silk Velvet', 520000, ['red', 'silver'], 'wedding', false, true, ['luxury', 'couture', 'velvet']),
  p('al003', 'Ivory Grand Couture Lehenga', '/girilal/party-wear/pw4.png', 'ivory-grand-couture-lehenga', 'luxury', 'luxury', 'Organza', 580000, ['ivory', 'gold'], 'wedding', true, false, ['luxury', 'couture', 'grand']),
]

const PREMIUM_LEHENGAS: Product[] = [
  p('ap001', 'Maroon Premium Bridal Lehenga', '/girilal/bridal-lehenga/bridalLehenga4.png', 'maroon-premium-bridal-lehenga', 'premium', 'premium', 'Pure Silk', 280000, ['maroon', 'gold'], 'wedding', true, false, ['premium', 'silk', 'exclusive']),
  p('ap002', 'Hot red Premium Lehenga', '/girilal/bridal-lehenga/bridalLehenga6.png', 'rani-pink-premium-lehenga', 'premium', 'premium', 'Velvet', 310000, ['red', 'gold'], 'wedding', false, true, ['premium', 'velvet', 'exclusive']),
  p('ap003', 'Antique Gold Premium Lehenga', '/girilal/bridal-lehenga/bridalLehenga11.png', 'antique-gold-premium-lehenga', 'premium', 'premium', 'Organza', 265000, ['red','gold', 'ivory'], 'wedding', true, false, ['premium', 'organza', 'designer']),
]

const DESIGNER_LEHENGAS: Product[] = [
  p('ad001', 'Regal Maroon Designer Lehenga', '/girilal/bridal-lehenga/bridalLehenga14.png', 'regal-maroon-designer-lehenga', 'designer', 'designer', 'Georgette', 85000, ['red', 'gold'], 'cocktail', true, false, ['designer', 'georgette', 'regal']),
  p('ad002', 'Festive Gold Designer Lehenga', '/girilal/party-wear/pw4.png', 'festive-gold-designer-lehenga', 'designer', 'designer', 'Net', 78000, ['gold', 'ivory'], 'party', false, false, ['designer', 'net', 'festive']),
  p('ad003', 'Silk Wine Designer Lehenga', '/girilal/cocktail-lehenga/cocktail3.png', 'silk-wine-designer-lehenga', 'designer', 'designer', 'Silk', 72000, ['wine', 'silver'], 'party', true, true, ['designer', 'silk', 'wine']),
  p('ad004', 'Bronze Party Designer Lehenga', '/girilal/cocktail-lehenga/cocktail2.png', 'bronze-party-designer-lehenga', 'designer', 'designer', 'Chiffon', 65000, ['white', 'gold'], 'party', false, false, ['designer', 'chiffon', 'party']),
]

const COCKTAIL_LEHENGAS: Product[] = [
  p('ac001', 'Noir Velvet Cocktail Lehenga', '/girilal/cocktail-lehenga/cocktail1.png', 'noir-velvet-cocktail-lehenga', 'cocktail', 'cocktail', 'Velvet', 68000, ['white','pink', 'gold'], 'cocktail', true, false, ['cocktail', 'velvet', 'evening']),
  p('ac002', 'Pearl Shimmer Cocktail Lehenga', '/girilal/cocktail-lehenga/cocktail5.png', 'pearl-shimmer-cocktail-lehenga', 'cocktail', 'cocktail', 'Net', 72000, ['white', 'silver'], 'cocktail', false, false, ['cocktail', 'net', 'shimmer']),
  p('ac003', 'Blush Satin Cocktail Lehenga', '/girilal/cocktail-lehenga/cocktail4.png', 'blush-satin-cocktail-lehenga', 'cocktail', 'cocktail', 'Chiffon', 75000, ['wine', 'ivory'], 'cocktail', true, true, ['cocktail', 'chiffon', 'satin']),
]

const RECEPTION_LEHENGAS: Product[] = [
  p('ar001', 'Champagne Reception Lehenga', '/girilal/cocktail-lehenga/cocktail3.png', 'champagne-reception-lehenga', 'reception', 'reception', 'Organza', 145000, ['wine', 'silver'], 'reception', true, false, ['reception', 'organza', 'champagne']),
  p('ar002', 'Antique Bronze Reception Lehenga', '/girilal/reception-lehenga/receptionLehenga2.png', 'antique-bronze-reception-lehenga', 'reception', 'reception', 'Silk', 158000, ['green', 'gold'], 'reception', false, false, ['reception', 'silk', 'antique']),
  p('ar003', 'Reception Lehenga', '/girilal/reception-lehenga/receptionLehenga3.png', 'deep-wine-reception-lehenga', 'reception', 'reception', 'Georgette', 168000, ['white', 'gold'], 'reception', true, true, ['reception', 'georgette', 'glamour']),
]

const ENGAGEMENT_LEHENGAS: Product[] = [
  p('ae001', 'Golden Engagement Lehenga', '/girilal/party-wear/pw4.png', 'golden-engagement-lehenga', 'engagement', 'engagement', 'Net', 95000, ['gold', 'ivory'], 'engagement', true, false, ['engagement', 'net', 'glow']),
  p('ae002', 'Ember Party Engagement Lehenga', '/girilal/party-wear/pw2.png', 'ember-party-engagement-lehenga', 'engagement', 'engagement', 'Georgette', 88000, ['green', 'gold'], 'engagement', false, false, ['engagement', 'georgette', 'festive']),
  p('ae003', 'Bronze Tissue Engagement Lehenga', '/girilal/party-wear/pw3.png', 'bronze-tissue-engagement-lehenga', 'engagement', 'engagement', 'Tissue', 102000, ['pink', 'gold'], 'engagement', true, true, ['engagement', 'tissue', 'sheen']),
]

/**
 * Each lehenga category's own product list, keyed by the category slug used in
 * `/collections/lehengas/[category]` and on `product.category`. The lists share
 * no products with each other, so a category is edited in complete isolation.
 */
export const LEHENGA_CATEGORIES: Record<string, Product[]> = {
  bridal: BRIDAL_LEHENGAS,
  wedding: WEDDING_LEHENGAS,
  luxury: LUXURY_LEHENGAS,
  premium: PREMIUM_LEHENGAS,
  designer: DESIGNER_LEHENGAS,
  cocktail: COCKTAIL_LEHENGAS,
  reception: RECEPTION_LEHENGAS,
  engagement: ENGAGEMENT_LEHENGAS,
}

/** Flat list for the existing brand/category filtering. */
export const LEHENGAS: Product[] = Object.values(LEHENGA_CATEGORIES).flat()
