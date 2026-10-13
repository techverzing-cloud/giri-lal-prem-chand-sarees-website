import type { Product } from '@/types'
import { p } from './product'

/**
 * Wedding Sarees.
 *
 * Ids are sequential (`w001`, `w002`, …) in list order. To add a product, copy
 * an existing `p(...)` line, change its id to the next free number and edit its
 * details. `collections` is the only place membership is declared.
 *
 * "Royal Banarasi Heritage" is also a wedding piece but is filed under
 * Traditional (its primary category), so it lives in `traditional.ts` and lists
 * `'wedding'` in its `collections`.
 */
export const WEDDING_SAREES: Product[] = [
  p('w001', 'Crimson Gold Bridal Elegance', '/Saree/wedding-saree/weddingSaree1.png', 'crimson-gold-bridal-elegance', 'wedding', 'bridal', 'Kanchipuram Silk', 250000, ['maroon-red', 'gold', 'champagne'], 'wedding', true, false, ['bridal', 'kanjivaram', 'premium'], ['wedding']),
  p('w002', 'Royal Red Banarasi Bridal', '/Saree/wedding-saree/weddingSaree2.png', 'royal-red-banarasi-bridal', 'wedding', 'bridal', 'Banarasi Silk', 210000, ['maroon-red', 'gold', 'red'], 'wedding', true, false, ['banarasi', 'bridal', 'premium'], ['wedding']),
  p('w003', 'Rose Gold Banarasi Bridal Elegance', '/Saree/wedding-saree/weddingSaree3.png', 'rose-gold-banarasi-bridal-elegance', 'wedding', 'bridal', 'Banarasi Silk', 240000, ['rose-gold', 'champagne', 'maroon'], 'wedding', true, false, ['banarasi', 'bridal', 'traditional'], ['wedding']),
  p('w004', 'Mustard Gold Banarasi Bridal Elegance', '/Saree/wedding-saree/weddingSaree4.png', 'mustard-gold-banarasi-bridal-elegance', 'wedding', 'bridal', 'Banarasi Silk', 240000, ['mustard-gold', 'gold', 'rani-pink', 'red'], 'wedding', true, false, ['banarasi', 'bridal', 'traditional'], ['wedding']),
]
