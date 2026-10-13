import type { Product } from '@/types'
import { p } from './product'

/**
 * Party Wear Sarees — ids `p001`, `p002`, … in list order.
 *
 * "Midnight Blue Silk" is a party piece too but is filed under Silk, so it
 * lives in `silk.ts` and lists `'party'` in its `collections`.
 */
export const PARTY_SAREES: Product[] = [
  p('p001', 'Party Glam Georgette', '/Saree/party-wear/partyWear1.png', 'party-glam-georgette', 'party', 'party', 'Net', 42000, ['yellow', 'gold',], 'party', true, false, ['party', 'georgette', 'evening'], ['party']),
  p('p002', 'Celebration Silk Saree', '/Saree/party-wear/partyWear2.png', 'celebration-silk-saree', 'party', 'party', 'Net', 55000, ['pink', 'gold', ], 'party', false, false, ['party', 'silk', 'celebration'], ['party']),
  p('p003', 'Evening Star Silk', '/Saree/party-wear/partyWear3.png', 'evening-star-silk', 'party', 'party', 'Silk', 38000, ['cream', 'silver', 'ivory'], 'cocktail', false, true, ['party', 'silk', 'evening'], ['party']),
  p('p004', 'Sparkling Night Saree', '/Saree/party-wear/partyWear4.png', 'sparkling-night-saree', 'party', 'party', 'Cotton Silk', 45000, ['blue','teal blue'], 'cocktail', true, false, ['party', 'net', 'evening'], ['party']),
  
]
