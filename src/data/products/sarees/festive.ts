import type { Product } from '@/types'
import { p } from './product'

/** Festive Sarees — ids `f001`, `f002`, … in list order. */
export const FESTIVE_SAREES: Product[] = [
  p('f001', 'Diwali Moonlight Glamour Saree', '/Saree/festive-saree/festiveSaree1.png', 'diwali-moonlight-glamour-saree', 'festive', 'festive', 'Net', 48000, ['rose-gold', 'dusty-pink', 'silver'], 'festive', true, false, ['festive', 'diwali', 'silk'], ['festive']),
  p('f002', 'Diwali Golden Radiance Saree', '/Saree/festive-saree/festiveSaree2.png', 'diwali-golden-radiance-saree', 'festive', 'festive', 'Net', 22000, ['champagne-gold', 'beige', 'gold'], 'festive', false, false, ['festive', 'cotton', 'traditional'], ['festive']),
  p('f003', 'Navratri Special Silk', '/Saree/festive-saree/festiveSaree3.png', 'navratri-special-silk', 'festive', 'festive', 'Pure Silk', 52000, ['green', 'gold', 'red'], 'festive', true, false, ['festive', 'navratri', 'silk'], ['festive']),
  p('f004', 'Eid Celebrations Silk', '/Saree/festive-saree/festiveSaree4.png', 'eid-celebrations-silk', 'festive', 'festive', 'Pure Silk', 45000, ['green', 'gold', 'white'], 'festive', false, true, ['festive', 'eid', 'silk'], ['festive']),
  p('f005', 'Onam Festival Silk', '/Saree/festive-saree/festiveSaree5.png', 'onam-festival-silk', 'festive', 'festive', 'Pure Silk', 42000, ['white', 'gold', 'ivory'], 'festive', false, false, ['festive', 'onam', 'silk'], ['festive']),
  p('f006', 'Lavendar love Silk', '/Saree/festive-saree/festiveSaree6.png', 'lavendar-love-silk', 'festive', 'festive', 'Pure Silk', 50000, ['lavender', 'gold'], 'festive', true, false, ['festive', 'christmas', 'silk'], ['festive'])
]