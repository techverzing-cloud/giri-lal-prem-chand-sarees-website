import type { SiteSettings } from '@/types/cms'

export const siteSettings: SiteSettings = {
  companyName: 'Giri Lal Prem Chand Sarees Pvt. Ltd.',
  tagline: 'Luxury Redefined Since 1946',
  description: 'India\'s premier luxury fashion house, offering exquisite sarees from Giri Lal Prem Chand Sarees and designer lehengas from Arunima Fashions.',
  logo: '/media/logo.svg',
  favicon: '/favicon.svg',
  faviconApple: '/favicon/apple-touch-icon.png',
  address: 'Chandni Chowk, New Delhi, India',
  phone: '+918750032358',
  whatsapp: '+919876543210',
  email: 'hello@girilalpremchand.com',
  businessHours: 'Mon–Sat: 10:00 AM – 8:00 PM | Sun: 11:00 AM – 6:00 PM',
  googleMapsUrl: 'https://maps.app.goo.gl/oKVTu8w7juU9t4pHA',
  socialLinks: {
    instagram: 'https://instagram.com/girilalpremchand',
    facebook: 'https://facebook.com/girilalpremchand',
    youtube: 'https://youtube.com/@girilalpremchand',
    pinterest: 'https://pinterest.com/girilalpremchand',
  },
  copyright: `© ${new Date().getFullYear()} Giri Lal Prem Chand Sarees Pvt. Ltd. All rights reserved.`,
  theme: {
    primaryColor: '#8E2D29',
    secondaryColor: '#FFE4D1',
    accentColor: '#E3A2A0',
    darkColor: '#344646',
    fontHeading: 'Cormorant Garamond',
    fontBody: 'Manrope',
  },
  analytics: {
    googleAnalyticsId: '',
    googleTagManagerId: '',
    metaPixelId: '',
    clarityId: '',
  },
  meta: {
    defaultTitle: 'Giri Lal Prem Chand Sarees — Luxury Sarees & Designer Lehengas Since 1946',
    defaultDescription: 'Discover exquisite luxury sarees from Giri Lal Prem Chand Sarees and designer lehengas from Arunima Fashions. Heritage craftsmanship since 1946.',
    defaultOgImage: '/seo/og-default.jpg',
    siteUrl: 'https://girilalpremchand.com',
    twitterHandle: '@girilalpremchand',
  },
}

export function getSiteSettings(): SiteSettings {
  return siteSettings
}
