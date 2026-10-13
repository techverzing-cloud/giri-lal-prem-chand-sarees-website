import type { Product } from '@/types'
import { p } from './product'

/**
 * Silk Sarees — ids `s001`, `s002`, … in list order.
 *
 * "Midnight Blue Silk" is party-wear too, so it lists `'party'` in its
 * `collections` and appears on both collection pages without being duplicated.
 */
export const SILK_SAREES: Product[] = [
  p('s001', 'Rose Gold Banarasi Bridal Elegance', '/Saree/silk-saree/silkSaree1.png', 'rose-gold-banarasi-bridal-elegance', 'silk', 'bridal', 'Pure Silk', 85000, ['rose-gold', 'gold', 'orange'], 'wedding', true, false, ['silk', 'wedding', 'elegant'], ['silk']),
  p('s002', 'Mustard Gold Banarasi Bridal Elegance', '/Saree/silk-saree/silkSaree2.png', 'mustard-gold-banarasi-bridal-elegance', 'silk', 'bridal', 'Pure Silk', 72000, ['mustard-gold', 'gold', 'rani-pink'], 'wedding', true, false, ['silk', 'wedding', 'elegant'], ['silk']),
  p('s003', 'Lavender Gold Silk Elegance', '/Saree/silk-saree/silkSaree3.png', 'lavender-gold-silk-elegance', 'silk', 'silk', 'Pure Silk', 68000, ['lavender', 'mauve', 'champagne-gold', 'beige'], 'casual', false, true, ['silk', 'casual', 'summer'], ['silk']),
  p('s004', 'Champagne Gold Bridal Elegance', '/Saree/silk-saree/silkSaree4.png', 'champagne-gold-bridal-elegance', 'silk', 'bridal', 'Pure Silk', 78000, ['champagne', 'ivory', 'antique-gold', 'beige'], 'wedding', true, false, ['silk', 'wedding', 'elegant'], ['silk']),
  p('s005', 'Mauve Gold Embroidered Silk Elegance', '/Saree/silk-saree/silkSaree5.png', 'mauve-gold-embroidered-silk-elegance', 'silk', 'silk', 'Pure Silk', 65000, ['mauve', 'lavender', 'antique-gold', 'rose-pink'], 'party', true, false, ['silk', 'party', 'vibrant'], ['silk']),
  p('s006', 'Champagne Ivory Peacock Zari Bridal Saree', '/Saree/silk-saree/silkSaree6.png', 'champagne-ivory-peacock-zari-bridal-saree', 'silk', 'bridal', 'Pure Silk', 90000, ['champagne', 'ivory', 'gold', 'blue'], 'wedding', true, false, ['silk', 'wedding', 'luxury'], ['silk']),
]
