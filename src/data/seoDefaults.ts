import type { SEODefaults } from '@/types/cms'
import { siteSettings } from './siteSettings'

export const seoDefaults: SEODefaults = {
  separator: '—',
  siteName: 'Giri Lal Prem Chand Sarees',
  home: {
    title: 'Giri Lal Prem Chand Sarees — Luxury Sarees & Designer Lehengas Since 1946',
    description: 'Discover exquisite luxury sarees from Giri Lal Prem Chand Sarees and designer lehengas from Arunima Fashions. Heritage craftsmanship since 1946.',
  },
  collections: {
    title: 'Collections — Luxury Sarees & Designer Lehengas',
    description: 'Explore our exquisite collections of luxury sarees and designer lehengas. From bridal to casual, discover timeless elegance.',
  },
  products: {
    title: 'Products — Handcrafted Luxury',
    description: 'Browse our curated collection of handcrafted sarees and lehengas, each piece a masterpiece of Indian craftsmanship.',
  },
  journal: {
    title: 'Journal — Luxury Fashion & Craftsmanship',
    description: 'Explore the world of luxury fashion, bridal inspiration, and craftsmanship through our editorial journal.',
  },
  about: {
    title: 'Our Story — A Legacy of Luxury Since 1946',
    description: 'Discover the rich heritage of Giri Lal Prem Chand Sarees, master weavers and purveyors of luxury sarees since 1946.',
  },
  contact: {
    title: 'Contact Us — Get in Touch',
    description: 'Visit our store in Chandni Chowk or get in touch for a personalised consultation.',
  },
  enquiry: {
    title: 'Enquire — Personalised Luxury Consultation',
    description: 'Book a personal consultation for bridal wear, custom designs, or bulk orders. Experience luxury, redefined.',
  },
  notFound: {
    title: 'Page Not Found — 404',
    description: 'The page you are looking for does not exist or has been moved.',
  },
  ogImage: siteSettings.meta.defaultOgImage,
  twitterHandle: siteSettings.meta.twitterHandle ?? '',
  siteUrl: siteSettings.meta.siteUrl,
  locale: 'en_IN',
}

export function getSEODefaults(): SEODefaults {
  return seoDefaults
}
