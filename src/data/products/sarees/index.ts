import type { Product } from '@/types'
import { resolveProductImages } from '../images'

function p(
  id: string, name: string, slug: string, category: string, subcategory: string,
  fabric: string, price: number, colors: string[], occasion: string,
  featured: boolean, isNew: boolean, tags: string[]
): Product {
  return {
    id, name, slug, brand: 'girilal', category, subcategory, fabric, price,
    description: `Experience the timeless elegance of ${name}, a masterpiece from Giri Lal Prem Chand Sarees. Crafted from the finest ${fabric}, this exquisite piece embodies the rich textile heritage of India. Perfect for ${occasion} occasions, it showcases meticulous craftsmanship and attention to detail that has defined our legacy since 1946.`,
    images: resolveProductImages(id),
    colors, occasion, featured, new: isNew, available: true,
    sku: `GLP-S-${id.toUpperCase()}`,
    tags,
  }
}

export const SAREES: Product[] = [
  // Wedding Sarees
  p('w001', 'Royal Banarasi Heritage', 'royal-banarasi-heritage', 'wedding', 'traditional', 'Banarasi Silk', 185000, ['gold', 'red', 'maroon'], 'wedding', true, false, ['banarasi', 'bridal', 'traditional']),
  p('w002', 'Crimson Bridal Silk', 'crimson-bridal-silk', 'wedding', 'bridal', 'Pure Silk', 220000, ['red', 'maroon', 'gold'], 'wedding', true, true, ['bridal', 'silk', 'wedding']),
  p('w003', 'Ivory Wedding Grace', 'ivory-wedding-grace', 'wedding', 'bridal', 'Kanchipuram Silk', 250000, ['ivory', 'gold', 'pink'], 'wedding', true, false, ['bridal', 'kanjivaram', 'premium']),
  p('w004', 'Ruby Celebration Silk', 'ruby-celebration-silk', 'wedding', 'bridal', 'Pure Silk', 195000, ['red', 'gold', 'green'], 'wedding', false, false, ['bridal', 'silk', 'wedding']),
  p('w005', 'Golden Wedding Zari', 'golden-wedding-zari', 'wedding', 'traditional', 'Banarasi Silk', 175000, ['gold', 'ivory', 'red'], 'wedding', false, true, ['banarasi', 'zari', 'traditional']),
  p('w006', 'Peach Blossom Bridal', 'peach-blossom-bridal', 'wedding', 'bridal', 'Georgette', 145000, ['peach', 'gold', 'pink'], 'wedding', false, false, ['bridal', 'designer', 'georgette']),
  p('w007', 'Maroon Velvet Wedding', 'maroon-velvet-wedding', 'wedding', 'bridal', 'Velvet', 210000, ['maroon', 'gold', 'red'], 'wedding', true, false, ['velvet', 'bridal', 'premium']),
  p('w008', 'Sunrise Kanjivaram', 'sunrise-kanjivaram', 'wedding', 'bridal', 'Kanchipuram Silk', 235000, ['gold', 'orange', 'red'], 'wedding', false, true, ['kanjivaram', 'bridal', 'silk']),
  p('w009', 'Saffron Wedding Silk', 'saffron-wedding-silk', 'wedding', 'traditional', 'Pure Silk', 168000, ['orange', 'gold', 'red'], 'wedding', false, false, ['silk', 'traditional', 'festive']),
  p('w010', 'Rose Gold Bridal', 'rose-gold-bridal', 'wedding', 'bridal', 'Organza', 190000, ['pink', 'gold', 'ivory'], 'wedding', true, false, ['organza', 'bridal', 'designer']),
  p('w011', 'Royal Blue Wedding', 'royal-blue-wedding', 'wedding', 'traditional', 'Pure Silk', 178000, ['blue', 'gold', 'purple'], 'wedding', false, false, ['silk', 'traditional', 'wedding']),
  p('w012', 'Traditional Bridal Red', 'traditional-bridal-red', 'wedding', 'bridal', 'Banarasi Silk', 240000, ['red', 'gold', 'maroon'], 'wedding', true, false, ['banarasi', 'bridal', 'traditional']),

  // Silk Sarees
  p('silk001', 'Emerald Silk Grace', 'emerald-silk-grace', 'silk', 'silk', 'Pure Silk', 85000, ['green', 'gold', 'ivory'], 'festive', true, false, ['silk', 'festive', 'elegant']),
  p('silk002', 'Midnight Blue Silk', 'midnight-blue-silk', 'silk', 'silk', 'Pure Silk', 72000, ['blue', 'silver', 'purple'], 'party', false, false, ['silk', 'party', 'evening']),
  p('silk003', 'Blush Pink Silk', 'blush-pink-silk', 'silk', 'silk', 'Pure Silk', 68000, ['pink', 'gold', 'peach'], 'casual', false, true, ['silk', 'casual', 'summer']),
  p('silk004', 'Pearl White Silk', 'pearl-white-silk', 'silk', 'silk', 'Pure Silk', 78000, ['white', 'gold', 'ivory'], 'festive', false, false, ['silk', 'festive', 'classic']),
  p('silk005', 'Tangerine Silk Dream', 'tangerine-silk-dream', 'silk', 'silk', 'Pure Silk', 65000, ['orange', 'gold', 'red'], 'casual', false, false, ['silk', 'casual', 'summer']),
  p('silk006', 'Ocean Blue Silk', 'ocean-blue-silk', 'silk', 'silk', 'Pure Silk', 72000, ['blue', 'green', 'teal'], 'party', true, false, ['silk', 'party', 'evening']),
  p('silk007', 'Champagne Silk Saree', 'champagne-silk-saree', 'silk', 'silk', 'Pure Silk', 82000, ['gold', 'ivory', 'pink'], 'festive', false, true, ['silk', 'festive', 'champagne']),
  p('silk008', 'Lavender Silk Charm', 'lavender-silk-charm', 'silk', 'silk', 'Pure Silk', 69000, ['purple', 'silver', 'pink'], 'casual', false, false, ['silk', 'casual', 'summer']),
  p('silk009', 'Coral Silk Elegance', 'coral-silk-elegance', 'silk', 'silk', 'Pure Silk', 71000, ['pink', 'orange', 'gold'], 'party', false, false, ['silk', 'party', 'summer']),
  p('silk010', 'Silver Shadow Silk', 'silver-shadow-silk', 'silk', 'silk', 'Pure Silk', 88000, ['silver', 'grey', 'blue'], 'festive', true, false, ['silk', 'festive', 'evening']),

  // Banarasi Sarees
  p('b001', 'Golden Banarasi Treasure', 'golden-banarasi-treasure', 'banarasi', 'traditional', 'Banarasi Silk', 125000, ['gold', 'red', 'maroon'], 'wedding', true, false, ['banarasi', 'zari', 'traditional']),
  p('b002', 'Heritage Banarasi Weave', 'heritage-banarasi-weave', 'banarasi', 'traditional', 'Banarasi Silk', 135000, ['red', 'gold', 'green'], 'festive', false, false, ['banarasi', 'heritage', 'traditional']),
  p('b003', 'Pure Zari Banarasi', 'pure-zari-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 145000, ['maroon', 'gold', 'ivory'], 'wedding', true, true, ['banarasi', 'zari', 'bridal']),
  p('b004', 'Silk Brocade Banarasi', 'silk-brocade-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 118000, ['green', 'gold', 'red'], 'festive', false, false, ['banarasi', 'brocade', 'festive']),
  p('b005', 'Antique Gold Banarasi', 'antique-gold-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 138000, ['gold', 'ivory', 'brown'], 'wedding', false, false, ['banarasi', 'antique', 'traditional']),
  p('b006', 'Royal Ruby Banarasi', 'royal-ruby-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 142000, ['red', 'gold', 'maroon'], 'wedding', true, false, ['banarasi', 'bridal', 'premium']),
  p('b007', 'Emerald Banarasi Silk', 'emerald-banarasi-silk', 'banarasi', 'traditional', 'Banarasi Silk', 128000, ['green', 'gold', 'blue'], 'festive', false, true, ['banarasi', 'festive', 'silk']),
  p('b008', 'Peacock Blue Banarasi', 'peacock-blue-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 132000, ['blue', 'gold', 'green'], 'party', false, false, ['banarasi', 'party', 'evening']),
  p('b009', 'Sunset Gold Banarasi', 'sunset-gold-banarasi', 'banarasi', 'traditional', 'Banarasi Silk', 115000, ['gold', 'orange', 'red'], 'festive', false, false, ['banarasi', 'festive', 'traditional']),
  p('b010', 'Classic Banarasi Red', 'classic-banarasi-red', 'banarasi', 'traditional', 'Banarasi Silk', 120000, ['red', 'gold', 'maroon'], 'wedding', false, false, ['banarasi', 'classic', 'traditional']),

  // Cotton Sarees
  p('c001', 'Handwoven Cotton Classic', 'handwoven-cotton-classic', 'cotton', 'cotton', 'Pure Cotton', 28000, ['white', 'blue', 'green'], 'casual', true, false, ['cotton', 'handloom', 'summer']),
  p('c002', 'Bengal Cotton White', 'bengal-cotton-white', 'cotton', 'cotton', 'Pure Cotton', 22000, ['white', 'blue', 'red'], 'casual', false, false, ['cotton', 'bengal', 'summer']),
  p('c003', 'Summer Breeze Cotton', 'summer-breeze-cotton', 'cotton', 'cotton', 'Pure Cotton', 25000, ['pink', 'green', 'yellow'], 'casual', false, true, ['cotton', 'summer', 'casual']),
  p('c004', 'Printed Cotton Grace', 'printed-cotton-grace', 'cotton', 'cotton', 'Pure Cotton', 20000, ['blue', 'white', 'green'], 'office', false, false, ['cotton', 'printed', 'office']),
  p('c005', 'Organic Cotton Elegance', 'organic-cotton-elegance', 'cotton', 'cotton', 'Organic Cotton', 32000, ['ivory', 'brown', 'green'], 'casual', true, false, ['cotton', 'organic', 'eco']),
  p('c006', 'Kerala Cotton White', 'kerala-cotton-white', 'cotton', 'cotton', 'Pure Cotton', 24000, ['white', 'gold', 'ivory'], 'casual', false, false, ['cotton', 'kerala', 'traditional']),
  p('c007', 'Block Print Cotton', 'block-print-cotton', 'cotton', 'cotton', 'Pure Cotton', 26000, ['red', 'blue', 'yellow'], 'office', false, false, ['cotton', 'blockprint', 'artisan']),
  p('c008', 'Eco Cotton Natural', 'eco-cotton-natural', 'cotton', 'cotton', 'Organic Cotton', 29000, ['brown', 'green', 'ivory'], 'casual', false, true, ['cotton', 'eco', 'natural']),
  p('c009', 'Chanderi Cotton Silk', 'chanderi-cotton-silk', 'cotton', 'cotton', 'Cotton Silk', 35000, ['gold', 'white', 'green'], 'festive', true, false, ['cotton', 'chanderi', 'festive']),
  p('c010', 'Cotton Linen Blend', 'cotton-linen-blend', 'cotton', 'cotton', 'Cotton Linen', 18000, ['blue', 'grey', 'white'], 'office', false, false, ['cotton', 'linen', 'office']),

  // Designer Sarees
  p('d001', 'Modern Muse Saree', 'modern-muse-saree', 'designer', 'designer', 'Georgette', 58000, ['black', 'gold', 'red'], 'party', true, false, ['designer', 'georgette', 'evening']),
  p('d002', 'Ivory Organza Dream', 'ivory-organza-dream', 'designer', 'designer', 'Organza', 65000, ['ivory', 'gold', 'pink'], 'party', false, true, ['designer', 'organza', 'bridal']),
  p('d003', 'Midnight Star Designer', 'midnight-star-designer', 'designer', 'designer', 'Net', 48000, ['black', 'silver', 'blue'], 'cocktail', false, false, ['designer', 'net', 'evening']),
  p('d004', 'Blush Pink Organza', 'blush-pink-organza', 'designer', 'designer', 'Organza', 62000, ['pink', 'gold', 'ivory'], 'party', true, false, ['designer', 'organza', 'party']),
  p('d005', 'Golden Tissue Saree', 'golden-tissue-saree', 'designer', 'designer', 'Tissue', 72000, ['gold', 'ivory', 'pink'], 'festive', false, false, ['designer', 'tissue', 'festive']),

  // Handloom Sarees
  p('h001', 'Handloom Heritage Weave', 'handloom-heritage-weave', 'handloom', 'handloom', 'Handloom Cotton', 35000, ['red', 'blue', 'green'], 'casual', true, false, ['handloom', 'traditional', 'artisan']),
  p('h002', 'Tribal Art Handloom', 'tribal-art-handloom', 'handloom', 'handloom', 'Handloom Cotton', 28000, ['orange', 'black', 'red'], 'casual', false, false, ['handloom', 'tribal', 'artisan']),
  p('h003', 'Village Weave Story', 'village-weave-story', 'handloom', 'handloom', 'Handloom Cotton', 25000, ['green', 'yellow', 'red'], 'casual', false, true, ['handloom', 'story', 'artisan']),
  p('h004', 'Natural Dye Handloom', 'natural-dye-handloom', 'handloom', 'handloom', 'Handloom Cotton', 32000, ['brown', 'green', 'ivory'], 'casual', true, false, ['handloom', 'natural', 'eco']),
  p('h005', 'Artisan Weave Cotton', 'artisan-weave-cotton', 'handloom', 'handloom', 'Handloom Cotton', 30000, ['blue', 'white', 'red'], 'casual', false, false, ['handloom', 'artisan', 'cotton']),

  // Party Wear
  p('p001', 'Party Glam Georgette', 'party-glam-georgette', 'party', 'party', 'Georgette', 42000, ['black', 'gold', 'red'], 'party', true, false, ['party', 'georgette', 'evening']),
  p('p002', 'Celebration Silk Saree', 'celebration-silk-saree', 'party', 'party', 'Pure Silk', 55000, ['pink', 'gold', 'purple'], 'party', false, false, ['party', 'silk', 'celebration']),
  p('p003', 'Evening Star Chiffon', 'evening-star-chiffon', 'party', 'party', 'Chiffon', 38000, ['blue', 'silver', 'purple'], 'cocktail', false, true, ['party', 'chiffon', 'evening']),
  p('p004', 'Sparkling Night Saree', 'sparkling-night-saree', 'party', 'party', 'Net', 45000, ['black', 'gold', 'red'], 'cocktail', true, false, ['party', 'net', 'evening']),
  p('p005', 'Festival of Lights', 'festival-of-lights', 'party', 'party', 'Pure Silk', 52000, ['gold', 'red', 'green'], 'festive', false, false, ['party', 'silk', 'festive']),

  // Printed Sarees
  p('pr001', 'Floral Paradise Print', 'floral-paradise-print', 'printed', 'printed', 'Georgette', 24000, ['pink', 'green', 'white'], 'casual', true, false, ['printed', 'floral', 'summer']),
  p('pr002', 'Abstract Art Print', 'abstract-art-print', 'printed', 'printed', 'Georgette', 22000, ['blue', 'black', 'white'], 'office', false, false, ['printed', 'abstract', 'modern']),
  p('pr003', 'Tropical Leaf Print', 'tropical-leaf-print', 'printed', 'printed', 'Cotton', 18000, ['green', 'white', 'yellow'], 'casual', false, true, ['printed', 'tropical', 'summer']),
  p('pr004', 'Digital Floral Print', 'digital-floral-print', 'printed', 'printed', 'Chiffon', 26000, ['purple', 'pink', 'white'], 'office', false, false, ['printed', 'floral', 'office']),
  p('pr005', 'Batik Print Saree', 'batik-print-saree', 'printed', 'printed', 'Cotton', 20000, ['blue', 'white', 'brown'], 'casual', false, false, ['printed', 'batik', 'artisan']),

  // Bridal Collection
  p('br001', 'Ultimate Bridal Silk', 'ultimate-bridal-silk', 'bridal', 'bridal', 'Kanchipuram Silk', 280000, ['red', 'gold', 'maroon'], 'wedding', true, true, ['bridal', 'kanjivaram', 'premium']),
  p('br002', 'Bridal Blush Lehenga', 'bridal-blush-lehenga', 'bridal', 'bridal', 'Silk Velvet', 260000, ['pink', 'gold', 'ivory'], 'wedding', true, false, ['bridal', 'designer', 'premium']),
  p('br003', 'Temple Jewel Saree', 'temple-jewel-saree', 'bridal', 'bridal', 'Pure Silk', 310000, ['red', 'gold', 'green'], 'wedding', false, false, ['bridal', 'temple', 'premium']),
  p('br004', 'Golden Lotus Bridal', 'golden-lotus-bridal', 'bridal', 'bridal', 'Banarasi Silk', 295000, ['gold', 'red', 'ivory'], 'wedding', true, false, ['bridal', 'banarasi', 'premium']),
  p('br005', 'Royal Bridal Trousseau', 'royal-bridal-trousseau', 'bridal', 'bridal', 'Kanchipuram Silk', 350000, ['red', 'gold', 'maroon'], 'wedding', false, true, ['bridal', 'kanjivaram', 'premium']),
  p('br006', 'Mogra Bridal Silk', 'mogra-bridal-silk', 'bridal', 'bridal', 'Pure Silk', 240000, ['ivory', 'gold', 'pink'], 'wedding', false, false, ['bridal', 'silk', 'premium']),
  p('br007', 'Radiant Bride Kanjivaram', 'radiant-bride-kanjivaram', 'bridal', 'bridal', 'Kanchipuram Silk', 320000, ['red', 'gold', 'orange'], 'wedding', true, false, ['bridal', 'kanjivaram', 'premium']),
  p('br008', 'Classic Bridal Banarasi', 'classic-bridal-banarasi', 'bridal', 'bridal', 'Banarasi Silk', 270000, ['red', 'gold', 'maroon'], 'wedding', false, false, ['bridal', 'banarasi', 'traditional']),

  // Festive Sarees
  p('fv001', 'Diwali Gold Silk', 'diwali-gold-silk', 'festive', 'festive', 'Pure Silk', 48000, ['gold', 'red', 'orange'], 'festive', true, false, ['festive', 'diwali', 'silk']),
  p('fv002', 'Pongal Festive Cotton', 'pongal-festive-cotton', 'festive', 'festive', 'Pure Cotton', 22000, ['yellow', 'red', 'green'], 'festive', false, false, ['festive', 'cotton', 'traditional']),
  p('fv003', 'Navratri Special Silk', 'navratri-special-silk', 'festive', 'festive', 'Pure Silk', 52000, ['green', 'gold', 'red'], 'festive', true, false, ['festive', 'navratri', 'silk']),
  p('fv004', 'Eid Celebrations Silk', 'eid-celebrations-silk', 'festive', 'festive', 'Pure Silk', 45000, ['green', 'gold', 'white'], 'festive', false, true, ['festive', 'eid', 'silk']),
  p('fv005', 'Onam Festival Silk', 'onam-festival-silk', 'festive', 'festive', 'Pure Silk', 42000, ['white', 'gold', 'ivory'], 'festive', false, false, ['festive', 'onam', 'silk']),
  p('fv006', 'Holi Color Splash', 'holi-color-splash', 'festive', 'festive', 'Cotton', 18000, ['pink', 'yellow', 'green'], 'festive', false, false, ['festive', 'holi', 'cotton']),
  p('fv007', 'Durga Puja Silk', 'durga-puja-silk', 'festive', 'festive', 'Pure Silk', 58000, ['red', 'gold', 'white'], 'festive', true, false, ['festive', 'puja', 'silk']),
  p('fv008', 'Christmas Festive Red', 'christmas-festive-red', 'festive', 'festive', 'Silk Cotton', 28000, ['red', 'green', 'gold'], 'festive', false, false, ['festive', 'christmas', 'silk']),
  p('fv009', 'Rakhi Special Saree', 'rakhi-special-saree', 'festive', 'festive', 'Georgette', 32000, ['orange', 'gold', 'red'], 'festive', false, true, ['festive', 'rakhi', 'georgette']),
  p('fv010', 'Karakattam Silk', 'karakattam-silk', 'festive', 'festive', 'Pure Silk', 38000, ['red', 'gold', 'green'], 'festive', false, false, ['festive', 'traditional', 'silk']),
]

export function getSareesByCategory(category: string): Product[] {
  return SAREES.filter((p) => p.category === category)
}
