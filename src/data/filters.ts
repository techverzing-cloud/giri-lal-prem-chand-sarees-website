import type { FilterGroup, SortOption } from '@/types'

export const FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'fabric',
    label: 'Fabric',
    type: 'checkbox',
    options: [
      { id: 'f-silk', label: 'Silk', value: 'silk', count: 45 },
      { id: 'f-banarasi', label: 'Banarasi', value: 'banarasi', count: 20 },
      { id: 'f-cotton', label: 'Cotton', value: 'cotton', count: 18 },
      { id: 'f-organza', label: 'Organza', value: 'organza', count: 12 },
      { id: 'f-velvet', label: 'Velvet', value: 'velvet', count: 8 },
      { id: 'f-chiffon', label: 'Chiffon', value: 'chiffon', count: 10 },
      { id: 'f-georgette', label: 'Georgette', value: 'georgette', count: 14 },
      { id: 'f-net', label: 'Net', value: 'net', count: 6 },
      { id: 'f-satin', label: 'Satin', value: 'satin', count: 8 },
      { id: 'f-tissue', label: 'Tissue', value: 'tissue', count: 5 },
    ],
  },
  {
    id: 'occasion',
    label: 'Occasion',
    type: 'checkbox',
    options: [
      { id: 'o-wedding', label: 'Wedding', value: 'wedding', count: 35 },
      { id: 'o-festive', label: 'Festive', value: 'festive', count: 28 },
      { id: 'o-party', label: 'Party', value: 'party', count: 22 },
      { id: 'o-casual', label: 'Casual', value: 'casual', count: 15 },
      { id: 'o-office', label: 'Office Wear', value: 'office', count: 12 },
      { id: 'o-engagement', label: 'Engagement', value: 'engagement', count: 18 },
      { id: 'o-cocktail', label: 'Cocktail', value: 'cocktail', count: 10 },
      { id: 'o-reception', label: 'Reception', value: 'reception', count: 14 },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    type: 'checkbox',
    options: [
      { id: 'c-red', label: 'Red', value: 'red', count: 30 },
      { id: 'c-gold', label: 'Gold', value: 'gold', count: 25 },
      { id: 'c-green', label: 'Green', value: 'green', count: 20 },
      { id: 'c-blue', label: 'Blue', value: 'blue', count: 18 },
      { id: 'c-pink', label: 'Pink', value: 'pink', count: 22 },
      { id: 'c-white', label: 'White', value: 'white', count: 15 },
      { id: 'c-ivory', label: 'Ivory', value: 'ivory', count: 12 },
      { id: 'c-maroon', label: 'Maroon', value: 'maroon', count: 16 },
      { id: 'c-purple', label: 'Purple', value: 'purple', count: 10 },
      { id: 'c-peach', label: 'Peach', value: 'peach', count: 8 },
    ],
  },
  {
    id: 'availability',
    label: 'Availability',
    type: 'checkbox',
    options: [
      { id: 'a-instock', label: 'In Stock', value: 'instock', count: 120 },
      { id: 'a-madeorder', label: 'Made to Order', value: 'madeorder', count: 30 },
    ],
  },
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'featured', label: 'Featured' },

  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
]

export const PAGE_SIZES = [12, 24, 48]
