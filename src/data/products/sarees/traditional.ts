import type { Product } from '@/types'
import { p } from './product'

/**
 * Traditional Sarees — ids `t001`, `t002`, … in list order.
 *
 * These are the pieces the Traditional page headlines. Their `category` is
 * `'traditional'`, while `collections` keeps each one on every other page it
 * genuinely belongs to: "Royal Banarasi Heritage" is also a wedding heirloom,
 * and the Banarasi trio also appears under Banarasi.
 */
export const TRADITIONAL_SAREES: Product[] = [
  
  p('t001', 'Champagne Gold Bridal Elegance', '/Saree/traditional-saree/traditionalSaree1.png', 'champagne-gold-bridal-elegance', 'traditional', 'traditional', 'Banarasi Silk', 175000, ['champagne', 'ivory', 'antique-gold', 'beige'], 'wedding', false, true, ['banarasi', 'zari', 'traditional'], ['traditional']),
  p('t002', 'Lavender Gold Silk Elegance', '/Saree/traditional-saree/traditionalSaree2.png', 'lavender-gold-silk-elegance', 'traditional', 'traditional', 'Banarasi Silk', 185000, ['lavender', 'mauve', 'champagne-gold', 'beige'], 'wedding', true, false, ['banarasi', 'heritage', 'traditional'], ['traditional']),
  p('t003', 'Mustard Gold Banarasi Bridal Elegance', '/Saree/traditional-saree/traditionalSaree3.png', 'mustard-gold-banarasi-bridal-elegance', 'traditional', 'traditional', 'Banarasi Silk', 138000, ['mustard', 'gold', 'rani-pink', 'red'], 'festive', false, false, ['banarasi', 'heritage', 'traditional'], ['traditional']),
  p('t004', 'Rose Gold Banarasi Bridal Elegance', '/Saree/traditional-saree/traditionalSaree4.png', 'rose-gold-banarasi-bridal-elegance', 'traditional', 'traditional', 'Banarasi Silk', 128000, ['rose-gold', 'mauve', 'champagne-gold', 'beige'], 'festive', false, true, ['banarasi', 'festive', 'silk'], ['traditional']),
  
]
