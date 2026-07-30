import type { NavItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'All Collections', href: '/collections' },
      { label: 'Giri Lal Prem Chand Sarees — Sarees', href: '/collections/sarees', brand: 'girilal' },
      { label: 'Arunima Fashions — Lehengas', href: '/collections/lehengas', brand: 'arunima' },
    ],
  },
  {
    label: 'Our Legacy',
    href: '/about',
  },
  { label: 'Contact', href: '/contact' },
]

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  collections: [
    { label: 'All Collections', href: '/collections' },
    { label: 'Luxury Sarees', href: '/collections/sarees' },
    { label: 'Designer Lehengas', href: '/collections/lehengas' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
}

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}
