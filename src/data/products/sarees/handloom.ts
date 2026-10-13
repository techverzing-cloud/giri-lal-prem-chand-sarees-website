import type { Product } from '@/types'
import { p } from './product'

/** Handloom Sarees — ids `h001`, `h002`, … in list order. */
export const HANDLOOM_SAREES: Product[] = [
  p('h001', 'Handloom Heritage Weave', '/Saree/handloom-saree/handloomSaree1.png', 'handloom-heritage-weave', 'handloom', 'handloom', 'Handloom Cotton', 35000, ['red', 'blue', 'green'], 'casual', true, false, ['handloom', 'traditional', 'artisan'], ['handloom']),
  p('h002', 'Royal Red Banarasi Bridal', '/Saree/handloom-saree/handloomSaree2.png', 'royal-red-banarasi-bridal', 'handloom', 'handloom', 'Handloom Cotton', 28000, ['maroon-red', 'gold', 'crimson'], 'casual', false, false, ['handloom', 'tribal', 'artisan'], ['handloom']),
  p('h003', 'Rose Gold Banarasi Bridal Elegance', '/Saree/handloom-saree/handloomSaree3.png', 'rose-gold-banarasi-bridal-elegance', 'handloom', 'handloom', 'Handloom Cotton', 25000, ['rose-gold', 'maroon-red', 'crimson'], 'casual', false, true, ['handloom', 'story', 'artisan'], ['handloom']),
  
]
