import type { Product } from '@/types'

function p(
  id: string, name: string, slug: string, category: string, subcategory: string,
  fabric: string, price: number, colors: string[], occasion: string,
  featured: boolean, isNew: boolean, tags: string[]
): Product {
  return {
    id, name, slug, brand: 'arunima', category, subcategory, fabric, price,
    description: `Discover the exquisite ${name} from Arunima Fashions. Meticulously crafted from premium ${fabric}, this designer piece embodies contemporary elegance while honoring traditional craftsmanship. Perfect for ${occasion} occasions, it represents the pinnacle of luxury fashion for the modern woman.`,
    images: [
      `/products/lehengas/${category}/1.jpg`,
      `/products/lehengas/${category}/2.jpg`,
      `/products/lehengas/${category}/3.jpg`,
      `/products/lehengas/${category}/4.jpg`,
    ],
    colors, occasion, featured, new: isNew, available: true,
    sku: `AF-L-${id.toUpperCase()}`,
    tags,
  }
}

export const LEHENGAS: Product[] = [
  // Bridal Lehengas
  p('ab001', 'Royal Emerald Bridal', 'royal-emerald-bridal', 'bridal', 'bridal', 'Silk Velvet', 285000, ['green', 'gold', 'red'], 'wedding', true, true, ['bridal', 'velvet', 'premium']),
  p('ab002', 'Crimson Bridal Masterpiece', 'crimson-bridal-masterpiece', 'bridal', 'bridal', 'Pure Silk', 320000, ['red', 'gold', 'maroon'], 'wedding', true, false, ['bridal', 'silk', 'premium']),
  p('ab003', 'Ivory Gold Bridal', 'ivory-gold-bridal', 'bridal', 'bridal', 'Organza', 295000, ['ivory', 'gold', 'pink'], 'wedding', false, false, ['bridal', 'organza', 'premium']),
  p('ab004', 'Sunset Blush Lehenga', 'sunset-blush-lehenga', 'bridal', 'bridal', 'Net', 265000, ['pink', 'gold', 'peach'], 'wedding', true, false, ['bridal', 'net', 'designer']),
  p('ab005', 'Midnight Blue Bridal', 'midnight-blue-bridal', 'bridal', 'bridal', 'Silk Velvet', 310000, ['blue', 'silver', 'purple'], 'wedding', false, true, ['bridal', 'velvet', 'luxury']),
  p('ab006', 'Bridal Blush Pink', 'bridal-blush-pink', 'bridal', 'bridal', 'Georgette', 250000, ['pink', 'gold', 'ivory'], 'wedding', false, false, ['bridal', 'georgette', 'designer']),
  p('ab007', 'Rose Gold Dream Lehenga', 'rose-gold-dream-lehenga', 'bridal', 'bridal', 'Net', 280000, ['pink', 'gold', 'ivory'], 'wedding', true, false, ['bridal', 'net', 'designer']),
  p('ab008', 'Red Velvet Royalty', 'red-velvet-royalty', 'bridal', 'bridal', 'Velvet', 335000, ['red', 'gold', 'maroon'], 'wedding', false, false, ['bridal', 'velvet', 'premium']),
  p('ab009', 'Peach Belle Bridal', 'peach-belle-bridal', 'bridal', 'bridal', 'Silk', 245000, ['peach', 'gold', 'ivory'], 'wedding', false, true, ['bridal', 'silk', 'modern']),
  p('ab010', 'Golden Heritage Bridal', 'golden-heritage-bridal', 'bridal', 'bridal', 'Banarasi Silk', 350000, ['gold', 'red', 'maroon'], 'wedding', true, false, ['bridal', 'banarasi', 'heritage']),

  // Designer Lehengas
  p('ad001', 'Modern Muse Lehenga', 'modern-muse-lehenga', 'designer', 'designer', 'Georgette', 85000, ['black', 'gold', 'red'], 'cocktail', true, false, ['designer', 'georgette', 'modern']),
  p('ad002', 'Abstract Art Lehenga', 'abstract-art-lehenga', 'designer', 'designer', 'Net', 78000, ['blue', 'purple', 'silver'], 'party', false, false, ['designer', 'net', 'modern']),
  p('ad003', 'Minimalist Ivory Set', 'minimalist-ivory-set', 'designer', 'designer', 'Organza', 72000, ['ivory', 'gold', 'white'], 'casual', false, true, ['designer', 'organza', 'minimal']),
  p('ad004', 'Pastel Dream Lehenga', 'pastel-dream-lehenga', 'designer', 'designer', 'Chiffon', 65000, ['pink', 'blue', 'lavender'], 'party', true, false, ['designer', 'chiffon', 'pastel']),
  p('ad005', 'Tissue Gold Designer', 'tissue-gold-designer', 'designer', 'designer', 'Tissue', 92000, ['gold', 'ivory', 'pink'], 'festive', false, false, ['designer', 'tissue', 'festive']),
  p('ad006', 'Navy Blue Designer Set', 'navy-blue-designer-set', 'designer', 'designer', 'Net', 68000, ['blue', 'gold', 'white'], 'party', false, false, ['designer', 'net', 'evening']),
  p('ad007', 'Blush Pink Designer', 'blush-pink-designer', 'designer', 'designer', 'Georgette', 75000, ['pink', 'gold', 'peach'], 'party', true, false, ['designer', 'georgette', 'feminine']),
  p('ad008', 'Silver Shimmer Lehenga', 'silver-shimmer-lehenga', 'designer', 'designer', 'Net', 82000, ['silver', 'grey', 'blue'], 'cocktail', false, true, ['designer', 'net', 'shimmer']),
  p('ad009', 'Tropical Print Lehenga', 'tropical-print-lehenga', 'designer', 'designer', 'Georgette', 58000, ['green', 'yellow', 'white'], 'casual', false, false, ['designer', 'printed', 'summer']),
  p('ad010', 'Floral Garden Lehenga', 'floral-garden-lehenga', 'designer', 'designer', 'Chiffon', 62000, ['pink', 'green', 'white'], 'party', false, false, ['designer', 'floral', 'printed']),
  p('ad011', 'Bohemian Spirit Set', 'bohemian-spirit-set', 'designer', 'designer', 'Cotton Silk', 55000, ['orange', 'red', 'yellow'], 'casual', true, false, ['designer', 'bohemian', 'casual']),
  p('ad012', 'Contemporary Gold Lehenga', 'contemporary-gold-lehenga', 'designer', 'designer', 'Net', 88000, ['gold', 'black', 'red'], 'cocktail', false, false, ['designer', 'contemporary', 'evening']),

  // Reception Lehengas
  p('ar001', 'Reception Rose Gold', 'reception-rose-gold', 'reception', 'reception', 'Organza', 145000, ['pink', 'gold', 'ivory'], 'reception', true, false, ['reception', 'organza', 'elegant']),
  p('ar002', 'Ivory Reception Charm', 'ivory-reception-charm', 'reception', 'reception', 'Georgette', 128000, ['ivory', 'gold', 'white'], 'reception', false, true, ['reception', 'georgette', 'charming']),
  p('ar003', 'Midnight Reception Dream', 'midnight-reception-dream', 'reception', 'reception', 'Net', 135000, ['blue', 'silver', 'purple'], 'reception', true, false, ['reception', 'net', 'evening']),
  p('ar004', 'Peach Reception Beauty', 'peach-reception-beauty', 'reception', 'reception', 'Silk', 142000, ['peach', 'gold', 'pink'], 'reception', false, false, ['reception', 'silk', 'beauty']),
  p('ar005', 'Champagne Reception Set', 'champagne-reception-set', 'reception', 'reception', 'Organza', 155000, ['gold', 'ivory', 'pink'], 'reception', true, false, ['reception', 'organza', 'champagne']),
  p('ar006', 'Red Carpet Reception', 'red-carpet-reception', 'reception', 'reception', 'Velvet', 168000, ['red', 'gold', 'maroon'], 'reception', false, false, ['reception', 'velvet', 'glamour']),
  p('ar007', 'Blush Reception Lehenga', 'blush-reception-lehenga', 'reception', 'reception', 'Net', 132000, ['pink', 'gold', 'ivory'], 'reception', false, true, ['reception', 'net', 'blush']),
  p('ar008', 'Pearl Reception Ensemble', 'pearl-reception-ensemble', 'reception', 'reception', 'Silk', 158000, ['white', 'gold', 'ivory'], 'reception', true, false, ['reception', 'silk', 'pearl']),

  // Cocktail Lehengas
  p('ac001', 'Cocktail Black Magic', 'cocktail-black-magic', 'cocktail', 'cocktail', 'Net', 68000, ['black', 'gold', 'silver'], 'cocktail', true, false, ['cocktail', 'net', 'evening']),
  p('ac002', 'Gold Cocktail Glam', 'gold-cocktail-glam', 'cocktail', 'cocktail', 'Georgette', 72000, ['gold', 'black', 'red'], 'cocktail', false, false, ['cocktail', 'georgette', 'glam']),
  p('ac003', 'Crimson Cocktail Set', 'crimson-cocktail-set', 'cocktail', 'cocktail', 'Velvet', 75000, ['red', 'gold', 'black'], 'cocktail', true, true, ['cocktail', 'velvet', 'bold']),
  p('ac004', 'Emerald Cocktail Charm', 'emerald-cocktail-charm', 'cocktail', 'cocktail', 'Silk', 70000, ['green', 'gold', 'black'], 'cocktail', false, false, ['cocktail', 'silk', 'charm']),
  p('ac005', 'Sapphire Cocktail Night', 'sapphire-cocktail-night', 'cocktail', 'cocktail', 'Net', 65000, ['blue', 'silver', 'purple'], 'cocktail', false, false, ['cocktail', 'net', 'night']),
  p('ac006', 'Rose Cocktail Elegance', 'rose-cocktail-elegance', 'cocktail', 'cocktail', 'Chiffon', 62000, ['pink', 'gold', 'white'], 'cocktail', false, true, ['cocktail', 'chiffon', 'elegance']),

  // Engagement Lehengas
  p('ae001', 'Engagement Blush Dream', 'engagement-blush-dream', 'engagement', 'engagement', 'Georgette', 95000, ['pink', 'gold', 'ivory'], 'engagement', true, false, ['engagement', 'georgette', 'dream']),
  p('ae002', 'Gold Engagement Glow', 'gold-engagement-glow', 'engagement', 'engagement', 'Net', 88000, ['gold', 'ivory', 'pink'], 'engagement', false, false, ['engagement', 'net', 'glow']),
  p('ae003', 'Peach Engagement Set', 'peach-engagement-set', 'engagement', 'engagement', 'Organza', 102000, ['peach', 'gold', 'pink'], 'engagement', true, true, ['engagement', 'organza', 'peach']),
  p('ae004', 'Lavender Engagement Charm', 'lavender-engagement-charm', 'engagement', 'engagement', 'Chiffon', 85000, ['purple', 'silver', 'pink'], 'engagement', false, false, ['engagement', 'chiffon', 'charm']),
  p('ae005', 'Coral Engagement Beauty', 'coral-engagement-beauty', 'engagement', 'engagement', 'Georgette', 92000, ['coral', 'gold', 'peach'], 'engagement', false, false, ['engagement', 'georgette', 'coral']),
  p('ae006', 'Ivory Engagement Grace', 'ivory-engagement-grace', 'engagement', 'engagement', 'Silk', 98000, ['ivory', 'gold', 'white'], 'engagement', false, true, ['engagement', 'silk', 'grace']),
  p('ae007', 'Dawn Pink Engagement', 'dawn-pink-engagement', 'engagement', 'engagement', 'Net', 82000, ['pink', 'gold', 'white'], 'engagement', true, false, ['engagement', 'net', 'dawn']),

  // Luxury Couture
  p('al001', 'Haute Couture Gold', 'haute-couture-gold', 'luxury', 'luxury', 'Pure Silk', 450000, ['gold', 'red', 'maroon'], 'wedding', true, false, ['luxury', 'couture', 'premium']),
  p('al002', 'Designer Royal Ensemble', 'designer-royal-ensemble', 'luxury', 'luxury', 'Silk Velvet', 520000, ['blue', 'gold', 'silver'], 'wedding', false, true, ['luxury', 'couture', 'royal']),
  p('al003', 'Couture Bridal Masterpiece', 'couture-bridal-masterpiece', 'luxury', 'luxury', 'Organza', 580000, ['ivory', 'gold', 'pink'], 'wedding', true, false, ['luxury', 'couture', 'bridal']),
  p('al004', 'Luxury Velvet Dream', 'luxury-velvet-dream', 'luxury', 'luxury', 'Velvet', 480000, ['green', 'gold', 'red'], 'wedding', false, false, ['luxury', 'velvet', 'dream']),
  p('al005', 'The Grand Lehenga', 'the-grand-lehenga', 'luxury', 'luxury', 'Pure Silk', 650000, ['red', 'gold', 'maroon'], 'wedding', true, false, ['luxury', 'grand', 'premium']),

  // Wedding Collection
  p('aw001', 'Wedding Blush Silk', 'wedding-blush-silk', 'wedding', 'wedding', 'Pure Silk', 185000, ['pink', 'gold', 'ivory'], 'wedding', true, false, ['wedding', 'silk', 'blush']),
  p('aw002', 'Wedding Gold Elegance', 'wedding-gold-elegance', 'wedding', 'wedding', 'Organza', 195000, ['gold', 'ivory', 'white'], 'wedding', false, true, ['wedding', 'organza', 'elegance']),
  p('aw003', 'Coral Wedding Dream', 'coral-wedding-dream', 'wedding', 'wedding', 'Georgette', 168000, ['coral', 'gold', 'peach'], 'wedding', false, false, ['wedding', 'georgette', 'dream']),
  p('aw004', 'Wedding Night Navy', 'wedding-night-navy', 'wedding', 'wedding', 'Net', 175000, ['blue', 'silver', 'gold'], 'wedding', true, false, ['wedding', 'net', 'night']),
  p('aw005', 'Tissue Wedding Glow', 'tissue-wedding-glow', 'wedding', 'wedding', 'Tissue', 205000, ['gold', 'ivory', 'pink'], 'wedding', false, false, ['wedding', 'tissue', 'glow']),
  p('aw006', 'Wedding Red Velvet', 'wedding-red-velvet', 'wedding', 'wedding', 'Velvet', 215000, ['red', 'gold', 'maroon'], 'wedding', true, true, ['wedding', 'velvet', 'bold']),
  p('aw007', 'Peach Wedding Charm', 'peach-wedding-charm', 'wedding', 'wedding', 'Silk', 178000, ['peach', 'gold', 'pink'], 'wedding', false, false, ['wedding', 'silk', 'charm']),
  p('aw008', 'Ivory Wedding Couture', 'ivory-wedding-couture', 'wedding', 'wedding', 'Organza', 225000, ['ivory', 'gold', 'white'], 'wedding', true, false, ['wedding', 'organza', 'couture']),
  p('aw009', 'Rose Wedding Ensemble', 'rose-wedding-ensemble', 'wedding', 'wedding', 'Georgette', 172000, ['pink', 'gold', 'red'], 'wedding', false, false, ['wedding', 'georgette', 'rose']),

  // Premium Collection
  p('ap001', 'Premium Silk Gold', 'premium-silk-gold', 'premium', 'premium', 'Pure Silk', 280000, ['gold', 'red', 'maroon'], 'wedding', true, false, ['premium', 'silk', 'exclusive']),
  p('ap002', 'Exclusive Velvet Set', 'exclusive-velvet-set', 'premium', 'premium', 'Velvet', 310000, ['green', 'gold', 'blue'], 'wedding', false, true, ['premium', 'velvet', 'exclusive']),
  p('ap003', 'Designer Premium Lehenga', 'designer-premium-lehenga', 'premium', 'premium', 'Organza', 265000, ['ivory', 'gold', 'pink'], 'wedding', true, false, ['premium', 'organza', 'designer']),
  p('ap004', 'Royal Net Premium', 'royal-net-premium', 'premium', 'premium', 'Net', 250000, ['blue', 'gold', 'purple'], 'wedding', false, false, ['premium', 'net', 'royal']),
  p('ap005', 'Luxury Tissue Premium', 'luxury-tissue-premium', 'premium', 'premium', 'Tissue', 295000, ['gold', 'red', 'ivory'], 'wedding', true, false, ['premium', 'tissue', 'luxury']),
  p('ap006', 'Premium Bridal Couture', 'premium-bridal-couture', 'premium', 'premium', 'Pure Silk', 380000, ['red', 'gold', 'maroon'], 'wedding', false, true, ['premium', 'bridal', 'couture']),
]
