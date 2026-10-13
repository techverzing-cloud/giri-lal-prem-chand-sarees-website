import type { Product } from '@/types'
import { p } from './product'

/**
 * Banarasi Sarees — ids `b001`, `b002`, … in list order.
 *
 * The three Banarasi heirlooms that headline the Traditional collection live in
 * `traditional.ts` (their primary category) and list `'banarasi'` in their
 * `collections`, so the Banarasi page still shows them without duplication.
 */
export const BANARASI_SAREES: Product[] = [
  p('b001', 'Mustard Gold Banarasi Bridal Elegance', '/Saree/banarasi-saree/banarasi2.png', 'mustard-gold-banarasi-bridal-elegance', 'banarasi', 'traditional', 'Banarasi Silk', 135000, ['mustard', 'gold', 'rani-pink', 'red'], 'festive', false, false, ['banarasi', 'heritage', 'traditional'], ['banarasi']),
  p('b002', 'Rose Pink Banarasi Bridal Elegance', '/Saree/banarasi-saree/banarasi1.png', 'rose-pink-banarasi-bridal-elegance', 'banarasi', 'traditional', 'Banarasi Silk', 118000, ['rose-pink', 'gold', 'silver', 'blush-pink'], 'festive', false, false, ['banarasi', 'brocade', 'festive'], ['banarasi']),
  p('b003', 'Rosewood Mauve Gold Banarasi Silk Saree', '/Saree/banarasi-saree/banarasi3.png', 'rosewood-mauve-gold-banarasi-silk-saree', 'banarasi', 'traditional', 'Banarasi Silk', 138000, ['rosewood', 'mauve', 'antique-gold', 'champagne'], 'wedding', false, false, ['banarasi', 'antique', 'traditional'], ['banarasi']),
  
]
