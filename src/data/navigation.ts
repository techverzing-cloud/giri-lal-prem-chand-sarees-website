import type { NavigationConfig } from '@/types/cms'

export const navigationConfig: NavigationConfig = {
  main: [
    {
      id: 'nav-home',
      label: 'Home',
      url: '/',
      visible: true,
    },
    {
      id: 'nav-collections',
      label: 'Collections',
      url: '/collections',
      visible: true,
      children: [
        {
          id: 'nav-collections-sarees',
          label: 'Sarees',
          url: '/collections/sarees',
          visible: true,
          children: [
            { id: 'nav-collections-sarees-wedding', label: 'Wedding', url: '/collections/sarees/wedding', visible: true },
            { id: 'nav-collections-sarees-banarasi', label: 'Banarasi', url: '/collections/sarees/banarasi', visible: true },
            { id: 'nav-collections-sarees-silk', label: 'Silk', url: '/collections/sarees/silk', visible: true },
            { id: 'nav-collections-sarees-designer', label: 'Designer', url: '/collections/sarees/designer', visible: true },
          ],
        },
        {
          id: 'nav-collections-lehengas',
          label: 'Lehengas',
          url: '/collections/lehengas',
          visible: true,
          children: [
            { id: 'nav-collections-lehengas-bridal', label: 'Bridal', url: '/collections/lehengas/bridal', visible: true },
            { id: 'nav-collections-lehengas-designer', label: 'Designer', url: '/collections/lehengas/designer', visible: true },
            { id: 'nav-collections-lehengas-cocktail', label: 'Cocktail', url: '/collections/lehengas/cocktail', visible: true },
          ],
        },
      ],
    },
    {
      id: 'nav-about',
      label: 'Our World',
      url: '/about',
      visible: true,
      children: [
        { id: 'nav-about-story', label: 'Our Story', url: '/our-story', visible: true },
        { id: 'nav-about-craftsmanship', label: 'Craftsmanship', url: '/craftsmanship', visible: true },
        { id: 'nav-about-gallery', label: 'Gallery', url: '/about#gallery', visible: true },
      ],
    },
    {
      id: 'nav-journal',
      label: 'Journal',
      url: '/journal',
      visible: true,
    },
    {
      id: 'nav-enquiry',
      label: 'Enquire',
      url: '/enquiry',
      visible: true,
    },
    {
      id: 'nav-contact',
      label: 'Contact',
      url: '/contact',
      visible: true,
    },
  ],

  mobile: [
    { id: 'mob-home', label: 'Home', url: '/', visible: true },
    { id: 'mob-collections', label: 'Collections', url: '/collections', visible: true },
    { id: 'mob-sarees', label: 'Sarees', url: '/collections/sarees', visible: true },
    { id: 'mob-lehengas', label: 'Lehengas', url: '/collections/lehengas', visible: true },
    { id: 'mob-about', label: 'Our Story', url: '/about', visible: true },
    { id: 'mob-journal', label: 'Journal', url: '/journal', visible: true },
    { id: 'mob-enquiry', label: 'Book Consultation', url: '/book-consultation', visible: true },
    { id: 'mob-contact', label: 'Contact', url: '/contact', visible: true },
  ],

  footer: {
    columns: [
      {
        title: 'Collections',
        links: [
          { id: 'foot-col-sarees', label: 'All Sarees', url: '/collections/sarees', visible: true },
          { id: 'foot-col-lehengas', label: 'All Lehengas', url: '/collections/lehengas', visible: true },
          { id: 'foot-col-wedding', label: 'Wedding Collection', url: '/collections/sarees/wedding', visible: true },
          { id: 'foot-col-bridal', label: 'Bridal Lehengas', url: '/collections/lehengas/bridal', visible: true },
        ],
      },
      {
        title: 'Explore',
        links: [
          { id: 'foot-exp-story', label: 'Our Story', url: '/our-story', visible: true },
          { id: 'foot-exp-craft', label: 'Craftsmanship', url: '/craftsmanship', visible: true },
          { id: 'foot-exp-journal', label: 'Journal', url: '/journal', visible: true },
          { id: 'foot-exp-gallery', label: 'Gallery', url: '/about#gallery', visible: true },
        ],
      },
      {
        title: 'Support',
        links: [
          { id: 'foot-sup-enquiry', label: 'Make an Enquiry', url: '/enquiry', visible: true },
          { id: 'foot-sup-consult', label: 'Book Consultation', url: '/book-consultation', visible: true },
          { id: 'foot-sup-contact', label: 'Contact Us', url: '/contact', visible: true },
          { id: 'foot-sup-faq', label: 'FAQ', url: '/contact#faq', visible: true },
        ],
      },
      {
        title: 'Legal',
        links: [
          { id: 'foot-leg-privacy', label: 'Privacy Policy', url: '/privacy', visible: true },
          { id: 'foot-leg-terms', label: 'Terms of Service', url: '/terms', visible: true },
        ],
      },
    ],
  },

  quickLinks: [
    { id: 'ql-enquiry', label: 'Enquire Now', url: '/enquiry', visible: true, icon: 'MessageSquare' },
    { id: 'ql-whatsapp', label: 'WhatsApp', url: 'https://wa.me/919876543210', visible: true, icon: 'MessageCircle', openInNewTab: true },
    { id: 'ql-call', label: 'Call Us', url: 'tel:+919876543210', visible: true, icon: 'Phone' },
  ],

  social: [
    { id: 'soc-ig', label: 'Instagram', url: 'https://instagram.com/girilalpremchand', visible: true, icon: 'Instagram', openInNewTab: true },
    { id: 'soc-fb', label: 'Facebook', url: 'https://facebook.com/girilalpremchand', visible: true, icon: 'Facebook', openInNewTab: true },
    { id: 'soc-yt', label: 'YouTube', url: 'https://youtube.com/@girilalpremchand', visible: true, icon: 'Youtube', openInNewTab: true },
    { id: 'soc-pin', label: 'Pinterest', url: 'https://pinterest.com/girilalpremchand', visible: true, icon: 'Pinterest', openInNewTab: true },
  ],
}

export function getNavigation(): NavigationConfig {
  return navigationConfig
}
