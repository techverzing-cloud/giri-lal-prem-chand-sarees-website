import type { Product } from '@/types'
import { slugify } from '@/utils/helpers'

/**
 * Builds one standalone saree product.
 *
 * Every call returns a brand new object with its own `colors`, `tags` and
 * `images` arrays, and its own `image` string, so no two products share a
 * mutable reference. `image` is the single source of truth for the product's
 * picture and `images` is built from it here, so a card, Quick View, the detail
 * page and the SEO image can never disagree. Changing a product's picture means
 * editing exactly one argument on exactly one line, which cannot move any other
 * product's image.
 *
 * Every image below is a real saree photograph from /public. Lehenga
 * photography is never used here, so a Girilal saree can never display an
 * Arunima picture.
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
    brand: 'girilal', category, subcategory, fabric, price,
    description: `Experience the timeless elegance of ${name}, a masterpiece from Giri Lal Prem Chand Sarees. Crafted from the finest ${fabric}, this exquisite piece embodies the rich textile heritage of India. Perfect for ${occasion} occasions, it showcases meticulous craftsmanship and attention to detail that has defined our legacy since 1946.`,
    images: [image],
    colors, occasion, featured, new: isNew, available: true,
    sku: `GLP-S-${id.toUpperCase()}`,
    tags,
  }
}

export const SAREES: Product[] = [
  // Wedding Sarees
  p('w001', 'Royal Banarasi Heritage', '/collections/wedding-sarees.jpg', 'royal-banarasi-heritage', 'wedding', 'traditional', 'Banarasi Silk', 185000, ['gold', 'red', 'maroon'], 'wedding', true, false, ['banarasi', 'bridal', 'traditional']),
  p('w002', 'white Party wear', '/collections/handloomSaree.jpg', 'crimson-bridal-silk', 'wedding', 'bridal', 'Pure Silk', 220000, ['red', 'maroon', 'gold'], 'wedding', true, true, ['bridal', 'silk', 'wedding']),
  p('w003', 'Ivory Wedding Grace', '/collections/designerSaree.jpg', 'ivory-wedding-grace', 'wedding', 'bridal', 'Kanchipuram Silk', 250000, ['ivory', 'gold', 'pink'], 'wedding', true, false, ['bridal', 'kanjivaram', 'premium']),
  p('w004', 'Ruby Celebration Silk', '/products/royalBanarsi.jpg', 'ruby-celebration-silk', 'wedding', 'bridal', 'Pure Silk', 195000, ['red', 'gold', 'green'], 'wedding', false, false, ['bridal', 'silk', 'wedding']),
  p('w005', 'Golden Wedding Zari', '/products/ivorywedding.jpg', 'golden-wedding-zari', 'wedding', 'traditional', 'Banarasi Silk', 175000, ['gold', 'ivory', 'red'], 'wedding', false, true, ['banarasi', 'zari', 'traditional']),
  p('w006', 'Peach Blossom Bridal', '/products/maroonVelvet.jpg', 'peach-blossom-bridal', 'wedding', 'bridal', 'Georgette', 145000, ['peach', 'gold', 'pink'], 'wedding', false, false, ['bridal', 'designer', 'georgette']),
  p('w007', 'Maroon Velvet Wedding', '/products/crimsonBridalSilk.jpg', 'maroon-velvet-wedding', 'wedding', 'bridal', 'Velvet', 210000, ['maroon', 'gold', 'red'], 'wedding', true, false, ['velvet', 'bridal', 'premium']),
  p('w008', 'Sunrise Kanjivaram', '/collections/wedding-sarees.jpg', 'sunrise-kanjivaram', 'wedding', 'bridal', 'Kanchipuram Silk', 235000, ['gold', 'orange', 'red'], 'wedding', false, true, ['kanjivaram', 'bridal', 'silk']),
  p('w009', 'Saffron Wedding Silk', '/collections/Wedding-saree.jpg', 'saffron-wedding-silk', 'wedding', 'traditional', 'Pure Silk', 168000, ['orange', 'gold', 'red'], 'wedding', false, false, ['silk', 'traditional', 'festive']),
  p('w010', 'Rose Gold Bridal', '/collections/wedding.jpg', 'rose-gold-bridal', 'wedding', 'bridal', 'Organza', 190000, ['pink', 'gold', 'ivory'], 'wedding', true, false, ['organza', 'bridal', 'designer']),
  p('w011', 'Royal Blue Wedding', '/products/royalBanarsi.jpg', 'royal-blue-wedding', 'wedding', 'traditional', 'Pure Silk', 178000, ['blue', 'gold', 'purple'], 'wedding', false, false, ['silk', 'traditional', 'wedding']),
  p('w012', 'Traditional Bridal Red', '/products/ivorywedding.jpg', 'traditional-bridal-red', 'wedding', 'bridal', 'Banarasi Silk', 240000, ['red', 'gold', 'maroon'], 'wedding', true, false, ['banarasi', 'bridal', 'traditional']),

  // Silk Sarees
  p('silk001', 'Emerald Silk Grace', '/collections/Pure-silk.jpg', 'emerald-silk-grace', 'silk', 'silk', 'Pure Silk', 85000, ['green', 'gold', 'ivory'], 'festive', true, false, ['silk', 'festive', 'elegant']),
  p('silk002', 'Midnight Blue Silk', '/collections/kanjivaram.jpg', 'midnight-blue-silk', 'silk', 'silk', 'Pure Silk', 72000, ['blue', 'silver', 'purple'], 'party', false, false, ['silk', 'party', 'evening']),
  p('silk003', 'Blush Pink Silk', '/collections/banarasi-fabric.jpg', 'blush-pink-silk', 'silk', 'silk', 'Pure Silk', 68000, ['pink', 'gold', 'peach'], 'casual', false, true, ['silk', 'casual', 'summer']),
  p('silk004', 'Pearl White Silk', '/collections/Pure-silk.jpg', 'pearl-white-silk', 'silk', 'silk', 'Pure Silk', 78000, ['white', 'gold', 'ivory'], 'festive', false, false, ['silk', 'festive', 'classic']),
  p('silk005', 'Tangerine Silk Dream', '/collections/kanjivaram.jpg', 'tangerine-silk-dream', 'silk', 'silk', 'Pure Silk', 65000, ['orange', 'gold', 'red'], 'casual', false, false, ['silk', 'casual', 'summer']),
  p('silk006', 'Ocean Blue Silk', '/collections/banarasi-fabric.jpg', 'ocean-blue-silk', 'silk', 'silk', 'Pure Silk', 72000, ['blue', 'green', 'teal'], 'party', true, false, ['silk', 'party', 'evening']),
  p('silk007', 'Champagne Silk Saree', '/collections/Pure-silk.jpg', 'champagne-silk-saree', 'silk', 'silk', 'Pure Silk', 82000, ['gold', 'ivory', 'pink'], 'festive', false, true, ['silk', 'festive', 'champagne']),
  p('silk008', 'Lavender Silk Charm', '/collections/kanjivaram.jpg', 'lavender-silk-charm', 'silk', 'silk', 'Pure Silk', 69000, ['purple', 'silver', 'pink'], 'casual', false, false, ['silk', 'casual', 'summer']),
  p('silk009', 'Coral Silk Elegance', '/collections/banarasi-fabric.jpg', 'coral-silk-elegance', 'silk', 'silk', 'Pure Silk', 71000, ['pink', 'orange', 'gold'], 'party', false, false, ['silk', 'party', 'summer']),
  p('silk010', 'Silver Shadow Silk', '/collections/Pure-silk.jpg', 'silver-shadow-silk', 'silk', 'silk', 'Pure Silk', 88000, ['silver', 'grey', 'blue'], 'festive', true, false, ['silk', 'festive', 'evening']),

  // Banarasi Sarees
  p('b001', 'Golden Banarasi Treasure', '/collections/banarasi.jpg', 'golden-banarasi-treasure', 'banarasi', 'traditional', 'Banarasi Silk', 125000, ['gold', 'red', 'maroon'], 'wedding', true, false, ['banarasi', 'zari', 'traditional']),
  p('b002', 'Heritage Banarasi Weave', '/products/royalBanarsi.jpg', 'heritage-banarasi-weave', 'banarasi', 'traditional', 'Banarasi Silk', 135000, ['red', 'gold', 'green'], 'festive', false, false, ['banarasi', 'heritage', 'traditional']),
  p('b003', 'Pure Zari Banarasi', '/collections/banarasi-fabric.jpg', 'pure-zari-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 145000, ['maroon', 'gold', 'ivory'], 'wedding', true, true, ['banarasi', 'zari', 'bridal']),
  p('b004', 'Silk Brocade Banarasi', '/collections/banarasi.jpg', 'silk-brocade-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 118000, ['green', 'gold', 'red'], 'festive', false, false, ['banarasi', 'brocade', 'festive']),
  p('b005', 'Antique Gold Banarasi', '/products/royalBanarsi.jpg', 'antique-gold-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 138000, ['gold', 'ivory', 'brown'], 'wedding', false, false, ['banarasi', 'antique', 'traditional']),
  p('b006', 'Royal Ruby Banarasi', '/collections/banarasi-fabric.jpg', 'royal-ruby-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 142000, ['red', 'gold', 'maroon'], 'wedding', true, false, ['banarasi', 'bridal', 'premium']),
  p('b007', 'Emerald Banarasi Silk', '/collections/banarasi.jpg', 'emerald-banarasi-silk', 'banarasi', 'traditional', 'Banarasi Silk', 128000, ['green', 'gold', 'blue'], 'festive', false, true, ['banarasi', 'festive', 'silk']),
  p('b008', 'Peacock Blue Banarasi', '/products/royalBanarsi.jpg', 'peacock-blue-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 132000, ['blue', 'gold', 'green'], 'party', false, false, ['banarasi', 'party', 'evening']),
  p('b009', 'Sunset Gold Banarasi', '/collections/banarasi-fabric.jpg', 'sunset-gold-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 115000, ['gold', 'orange', 'red'], 'festive', false, false, ['banarasi', 'festive', 'traditional']),
  p('b010', 'Classic Banarasi Red', '/collections/banarasi.jpg', 'classic-banarasi-red', 'banarasi', 'traditional', 'Banarasi Silk', 120000, ['red', 'gold', 'maroon'], 'wedding', false, false, ['banarasi', 'classic', 'traditional']),

  // Cotton Sarees
  p('c001', 'Handwoven Cotton Classic', '/collections/cottonSaree.jpg', 'handwoven-cotton-classic', 'cotton', 'cotton', 'Pure Cotton', 28000, ['white', 'blue', 'green'], 'casual', true, false, ['cotton', 'handloom', 'summer']),
  p('c002', 'Bengal Cotton White', '/collections/pure-cotton.jpg', 'bengal-cotton-white', 'cotton', 'cotton', 'Pure Cotton', 22000, ['white', 'blue', 'red'], 'casual', false, false, ['cotton', 'bengal', 'summer']),
  p('c003', 'Summer Breeze Cotton', '/collections/cottonSaree.jpg', 'summer-breeze-cotton', 'cotton', 'cotton', 'Pure Cotton', 25000, ['pink', 'green', 'yellow'], 'casual', false, true, ['cotton', 'summer', 'casual']),
  p('c004', 'Printed Cotton Grace', '/collections/pure-cotton.jpg', 'printed-cotton-grace', 'cotton', 'cotton', 'Pure Cotton', 20000, ['blue', 'white', 'green'], 'office', false, false, ['cotton', 'printed', 'office']),
  p('c005', 'Organic Cotton Elegance', '/collections/cottonSaree.jpg', 'organic-cotton-elegance', 'cotton', 'cotton', 'Organic Cotton', 32000, ['ivory', 'brown', 'green'], 'casual', true, false, ['cotton', 'organic', 'eco']),
  p('c006', 'Kerala Cotton White', '/collections/pure-cotton.jpg', 'kerala-cotton-white', 'cotton', 'cotton', 'Pure Cotton', 24000, ['white', 'gold', 'ivory'], 'casual', false, false, ['cotton', 'kerala', 'traditional']),
  p('c007', 'Block Print Cotton', '/collections/cottonSaree.jpg', 'block-print-cotton', 'cotton', 'cotton', 'Pure Cotton', 26000, ['red', 'blue', 'yellow'], 'office', false, false, ['cotton', 'blockprint', 'artisan']),
  p('c008', 'Eco Cotton Natural', '/collections/pure-cotton.jpg', 'eco-cotton-natural', 'cotton', 'cotton', 'Organic Cotton', 29000, ['brown', 'green', 'ivory'], 'casual', false, true, ['cotton', 'eco', 'natural']),
  p('c009', 'Chanderi Cotton Silk', '/collections/cottonSaree.jpg', 'chanderi-cotton-silk', 'cotton', 'cotton', 'Cotton Silk', 35000, ['gold', 'white', 'green'], 'festive', true, false, ['cotton', 'chanderi', 'festive']),
  p('c010', 'Cotton Linen Blend', '/collections/pure-cotton.jpg', 'cotton-linen-blend', 'cotton', 'cotton', 'Cotton Linen', 18000, ['blue', 'grey', 'white'], 'office', false, false, ['cotton', 'linen', 'office']),

  // Designer Sarees
  p('d001', 'Modern Muse Saree', '/collections/designerSaree.jpg', 'modern-muse-saree', 'designer', 'designer', 'Georgette', 58000, ['black', 'gold', 'red'], 'party', true, false, ['designer', 'georgette', 'evening']),
  p('d002', 'Ivory Organza Dream', '/collections/designer-saree.jpg', 'ivory-organza-dream', 'designer', 'designer', 'Organza', 65000, ['ivory', 'gold', 'pink'], 'party', false, true, ['designer', 'organza', 'bridal']),
  p('d003', 'Midnight Star Designer', '/collections/designerSaree.jpg', 'midnight-star-designer', 'designer', 'designer', 'Net', 48000, ['black', 'silver', 'blue'], 'cocktail', false, false, ['designer', 'net', 'evening']),
  p('d004', 'Blush Pink Organza', '/collections/designer-saree.jpg', 'blush-pink-organza', 'designer', 'designer', 'Organza', 62000, ['pink', 'gold', 'ivory'], 'party', true, false, ['designer', 'organza', 'party']),
  p('d005', 'Golden Tissue Saree', '/collections/designerSaree.jpg', 'golden-tissue-saree', 'designer', 'designer', 'Tissue', 72000, ['gold', 'ivory', 'pink'], 'festive', false, false, ['designer', 'tissue', 'festive']),

  // Handloom Sarees
  p('h001', 'Handloom Heritage Weave', '/collections/handloomSaree.jpg', 'handloom-heritage-weave', 'handloom', 'handloom', 'Handloom Cotton', 35000, ['red', 'blue', 'green'], 'casual', true, false, ['handloom', 'traditional', 'artisan']),
  p('h002', 'Tribal Art Handloom', '/collections/bandhej.jpg', 'tribal-art-handloom', 'handloom', 'handloom', 'Handloom Cotton', 28000, ['orange', 'black', 'red'], 'casual', false, false, ['handloom', 'tribal', 'artisan']),
  p('h003', 'Village Weave Story', '/collections/patola.jpg', 'village-weave-story', 'handloom', 'handloom', 'Handloom Cotton', 25000, ['green', 'yellow', 'red'], 'casual', false, true, ['handloom', 'story', 'artisan']),
  p('h004', 'Natural Dye Handloom', '/collections/handloomSaree.jpg', 'natural-dye-handloom', 'handloom', 'handloom', 'Handloom Cotton', 32000, ['brown', 'green', 'ivory'], 'casual', true, false, ['handloom', 'natural', 'eco']),
  p('h005', 'Artisan Weave Cotton', '/collections/bandhej.jpg', 'artisan-weave-cotton', 'handloom', 'handloom', 'Handloom Cotton', 30000, ['blue', 'white', 'red'], 'casual', false, false, ['handloom', 'artisan', 'cotton']),

  // Party Wear
  p('p001', 'Party Glam Georgette', '/collections/party-wear-saree.jpg', 'party-glam-georgette', 'party', 'party', 'Georgette', 42000, ['black', 'gold', 'red'], 'party', true, false, ['party', 'georgette', 'evening']),
  p('p002', 'Celebration Silk Saree', '/collections/partywear.jpg', 'celebration-silk-saree', 'party', 'party', 'Pure Silk', 55000, ['pink', 'gold', 'purple'], 'party', false, false, ['party', 'silk', 'celebration']),
  p('p003', 'Evening Star Chiffon', '/collections/party-wear-saree.jpg', 'evening-star-chiffon', 'party', 'party', 'Chiffon', 38000, ['blue', 'silver', 'purple'], 'cocktail', false, true, ['party', 'chiffon', 'evening']),
  p('p004', 'Sparkling Night Saree', '/collections/partywear.jpg', 'sparkling-night-saree', 'party', 'party', 'Net', 45000, ['black', 'gold', 'red'], 'cocktail', true, false, ['party', 'net', 'evening']),
  p('p005', 'Festival of Lights', '/collections/party-wear-saree.jpg', 'festival-of-lights', 'party', 'party', 'Pure Silk', 52000, ['gold', 'red', 'green'], 'festive', false, false, ['party', 'silk', 'festive']),

  // Printed Sarees
  p('pr001', 'Floral Paradise Print', '/collections/printedSaree.jpg', 'floral-paradise-print', 'printed', 'printed', 'Georgette', 24000, ['pink', 'green', 'white'], 'casual', true, false, ['printed', 'floral', 'summer']),
  p('pr002', 'Abstract Art Print', '/collections/printedSaree.jpg', 'abstract-art-print', 'printed', 'printed', 'Georgette', 22000, ['blue', 'black', 'white'], 'office', false, false, ['printed', 'abstract', 'modern']),
  p('pr003', 'Tropical Leaf Print', '/collections/printedSaree.jpg', 'tropical-leaf-print', 'printed', 'printed', 'Cotton', 18000, ['green', 'white', 'yellow'], 'casual', false, true, ['printed', 'tropical', 'summer']),
  p('pr004', 'Digital Floral Print', '/collections/printedSaree.jpg', 'digital-floral-print', 'printed', 'printed', 'Chiffon', 26000, ['purple', 'pink', 'white'], 'office', false, false, ['printed', 'floral', 'office']),
  p('pr005', 'Batik Print Saree', '/collections/printedSaree.jpg', 'batik-print-saree', 'printed', 'printed', 'Cotton', 20000, ['blue', 'white', 'brown'], 'casual', false, false, ['printed', 'batik', 'artisan']),

  // Bridal Collection
  p('br001', 'Ultimate Bridal Silk', '/products/crimsonBridalSilk.jpg', 'ultimate-bridal-silk', 'bridal', 'bridal', 'Kanchipuram Silk', 280000, ['red', 'gold', 'maroon'], 'wedding', true, true, ['bridal', 'kanjivaram', 'premium']),
  p('br002', 'Bridal Blush Lehenga', '/products/maroonVelvet.jpg', 'bridal-blush-lehenga', 'bridal', 'bridal', 'Silk Velvet', 260000, ['pink', 'gold', 'ivory'], 'wedding', true, false, ['bridal', 'designer', 'premium']),
  p('br003', 'Temple Jewel Saree', '/products/ivorywedding.jpg', 'temple-jewel-saree', 'bridal', 'bridal', 'Pure Silk', 310000, ['red', 'gold', 'green'], 'wedding', false, false, ['bridal', 'temple', 'premium']),
  p('br004', 'Golden Lotus Bridal', '/collections/wedding-sarees.jpg', 'golden-lotus-bridal', 'bridal', 'bridal', 'Banarasi Silk', 295000, ['gold', 'red', 'ivory'], 'wedding', true, false, ['bridal', 'banarasi', 'premium']),
  p('br005', 'Royal Bridal Trousseau', '/products/crimsonBridalSilk.jpg', 'royal-bridal-trousseau', 'bridal', 'bridal', 'Kanchipuram Silk', 350000, ['red', 'gold', 'maroon'], 'wedding', false, true, ['bridal', 'kanjivaram', 'premium']),
  p('br006', 'Mogra Bridal Silk', '/products/maroonVelvet.jpg', 'mogra-bridal-silk', 'bridal', 'bridal', 'Pure Silk', 240000, ['ivory', 'gold', 'pink'], 'wedding', false, false, ['bridal', 'silk', 'premium']),
  p('br007', 'Radiant Bride Kanjivaram', '/products/ivorywedding.jpg', 'radiant-bride-kanjivaram', 'bridal', 'bridal', 'Kanchipuram Silk', 320000, ['red', 'gold', 'orange'], 'wedding', true, false, ['bridal', 'kanjivaram', 'premium']),
  p('br008', 'Classic Bridal Banarasi', '/collections/wedding-sarees.jpg', 'classic-bridal-banarasi', 'bridal', 'bridal', 'Banarasi Silk', 270000, ['red', 'gold', 'maroon'], 'wedding', false, false, ['bridal', 'banarasi', 'traditional']),

  // Festive Sarees
  p('fv001', 'Diwali Gold Silk', '/collections/festiveSaree.jpg', 'diwali-gold-silk', 'festive', 'festive', 'Pure Silk', 48000, ['gold', 'red', 'orange'], 'festive', true, false, ['festive', 'diwali', 'silk']),
  p('fv002', 'Pongal Festive Cotton', '/collections/partywear.jpg', 'pongal-festive-cotton', 'festive', 'festive', 'Pure Cotton', 22000, ['yellow', 'red', 'green'], 'festive', false, false, ['festive', 'cotton', 'traditional']),
  p('fv003', 'Navratri Special Silk', '/collections/Pure-silk.jpg', 'navratri-special-silk', 'festive', 'festive', 'Pure Silk', 52000, ['green', 'gold', 'red'], 'festive', true, false, ['festive', 'navratri', 'silk']),
  p('fv004', 'Eid Celebrations Silk', '/collections/kanjivaram.jpg', 'eid-celebrations-silk', 'festive', 'festive', 'Pure Silk', 45000, ['green', 'gold', 'white'], 'festive', false, true, ['festive', 'eid', 'silk']),
  p('fv005', 'Onam Festival Silk', '/collections/festiveSaree.jpg', 'onam-festival-silk', 'festive', 'festive', 'Pure Silk', 42000, ['white', 'gold', 'ivory'], 'festive', false, false, ['festive', 'onam', 'silk']),
  p('fv006', 'Holi Color Splash', '/collections/partywear.jpg', 'holi-color-splash', 'festive', 'festive', 'Cotton', 18000, ['pink', 'yellow', 'green'], 'festive', false, false, ['festive', 'holi', 'cotton']),
  p('fv007', 'Durga Puja Silk', '/collections/Pure-silk.jpg', 'durga-puja-silk', 'festive', 'festive', 'Pure Silk', 58000, ['red', 'gold', 'white'], 'festive', true, false, ['festive', 'puja', 'silk']),
  p('fv008', 'Christmas Festive Red', '/collections/kanjivaram.jpg', 'christmas-festive-red', 'festive', 'festive', 'Silk Cotton', 28000, ['red', 'green', 'gold'], 'festive', false, false, ['festive', 'christmas', 'silk']),
  p('fv009', 'Rakhi Special Saree', '/collections/festiveSaree.jpg', 'rakhi-special-saree', 'festive', 'festive', 'Georgette', 32000, ['orange', 'gold', 'red'], 'festive', false, true, ['festive', 'rakhi', 'georgette']),
  p('fv010', 'Karakattam Silk', '/collections/partywear.jpg', 'karakattam-silk', 'festive', 'festive', 'Pure Silk', 38000, ['red', 'gold', 'green'], 'festive', false, false, ['festive', 'traditional', 'silk']),
]

export function getSareesByCategory(category: string): Product[] {
  return SAREES.filter((p) => p.category === category)
}
