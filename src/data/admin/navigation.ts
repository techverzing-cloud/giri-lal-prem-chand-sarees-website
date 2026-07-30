import type { AdminNavMenu, AdminNavItem } from '@/types/admin'

export const adminNavMenus: AdminNavMenu[] = [
  {
    id: 'nav-main',
    name: 'Main Navigation',
    items: [
      { id: 'nav-mi-1', label: 'Home', url: '/', displayOrder: 1, visible: true, openInNewTab: false },
      { id: 'nav-mi-2', label: 'Collections', url: '/collections', displayOrder: 2, visible: true, openInNewTab: false, children: [
        { id: 'nav-mi-2a', label: 'Sarees', url: '/collections/sarees', parentId: 'nav-mi-2', displayOrder: 1, visible: true, openInNewTab: false },
        { id: 'nav-mi-2b', label: 'Lehengas', url: '/collections/lehengas', parentId: 'nav-mi-2', displayOrder: 2, visible: true, openInNewTab: false },
      ]},
      { id: 'nav-mi-3', label: 'Our World', url: '/about', displayOrder: 3, visible: true, openInNewTab: false, children: [
        { id: 'nav-mi-3a', label: 'Our Story', url: '/our-story', parentId: 'nav-mi-3', displayOrder: 1, visible: true, openInNewTab: false },
        { id: 'nav-mi-3b', label: 'Craftsmanship', url: '/craftsmanship', parentId: 'nav-mi-3', displayOrder: 2, visible: true, openInNewTab: false },
      ]},
      { id: 'nav-mi-4', label: 'Journal', url: '/journal', displayOrder: 4, visible: true, openInNewTab: false },
      { id: 'nav-mi-5', label: 'Enquire', url: '/enquiry', displayOrder: 5, visible: true, openInNewTab: false },
      { id: 'nav-mi-6', label: 'Contact', url: '/contact', displayOrder: 6, visible: true, openInNewTab: false },
    ],
  },
  {
    id: 'nav-footer',
    name: 'Footer Navigation',
    items: [
      { id: 'nav-fi-1', label: 'Privacy Policy', url: '/privacy', displayOrder: 1, visible: true, openInNewTab: false },
      { id: 'nav-fi-2', label: 'Terms of Service', url: '/terms', displayOrder: 2, visible: true, openInNewTab: false },
      { id: 'nav-fi-3', label: 'FAQ', url: '/contact#faq', displayOrder: 3, visible: true, openInNewTab: false },
    ],
  },
  {
    id: 'nav-social',
    name: 'Social Links',
    items: [
      { id: 'nav-si-1', label: 'Instagram', url: 'https://instagram.com/girilalpremchand', displayOrder: 1, visible: true, openInNewTab: true, icon: 'Instagram' },
      { id: 'nav-si-2', label: 'Facebook', url: 'https://facebook.com/girilalpremchand', displayOrder: 2, visible: true, openInNewTab: true, icon: 'Facebook' },
      { id: 'nav-si-3', label: 'YouTube', url: 'https://youtube.com/@girilalpremchand', displayOrder: 3, visible: true, openInNewTab: true, icon: 'Youtube' },
    ],
  },
]

export function getAdminNavMenus(): AdminNavMenu[] {
  return adminNavMenus
}
