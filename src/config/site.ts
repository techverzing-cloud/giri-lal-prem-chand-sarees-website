import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  brand: {
    girilal: {
      name: 'Giri Lal Prem Chand Sarees',
      tagline: 'Luxury Sarees Since 1946',
      since: '1946',
      description: 'For over six decades, Giri Lal Prem Chand Sarees has been synonymous with exquisite luxury sarees, weaving tradition with timeless elegance.',
      collections: [
        {
          id: 'girilal-sarees',
          name: 'Signature Sarees',
          slug: '/collections/sarees',
          description: 'Handcrafted luxury sarees from the house of Giri Lal Prem Chand Sarees',
          image: '/collections/placeholder.jpg',
          brand: 'girilal',
        },
      ],
    },
    arunima: {
      name: 'Arunima Fashions',
      tagline: 'Designer Lehengas',
      since: '2017',
      description: 'Arunima Fashions redefines bridal and occasion wear with contemporary designer lehengas crafted for the modern woman.',
      collections: [
        {
          id: 'arunima-lehengas',
          name: 'Designer Lehengas',
          slug: '/collections/lehengas',
          description: 'Exclusive designer lehengas for weddings and celebrations',
          image: '/collections/placeholder.jpg',
          brand: 'arunima',
        },
      ],
    },
  },
  company: {
    name: 'Giri Lal Prem Chand Sarees Pvt. Ltd.',
    founded: '1946',
    developer: 'Techverzing Technologies',
    description: 'A legacy of luxury textiles spanning generations.',
  },
  contact: {
    email: 'info@girilalpremchand.com',
    phone: '+918750032358',
    whatsapp: '+919876543210',
    address: 'Gali Jutte Wali, 1st Floor, Nai Sarak, Chandni Chowk, Delhi, 110006',
    googleMapsUrl: 'https://maps.app.goo.gl/oKVTu8w7juU9t4pHA',
    businessHours: 'Mon–Sat: 11:00 AM – 07:30 PM | Sun: Closed',
  },
  social: {
    instagram: 'https://instagram.com/girilalpremchand',
    facebook: 'https://facebook.com/girilalpremchand',
    youtube: 'https://youtube.com/@girilalpremchand',
    pinterest: 'https://pinterest.com/girilalpremchand',
  },
  seo: {
    title: 'Giri Lal Prem Chand Sarees | Luxury Sarees & Designer Lehengas Since 1946',
    description: 'Discover luxury sarees from Giri Lal Prem Chand Sarees (Since 1946) and designer lehengas from Arunima Fashions. Premium Indian textiles crafted for timeless elegance.',
    ogImage: '/social/og-image.jpg',
    siteUrl: 'https://girilalpremchand.com',
    twitterHandle: '@girilalpremchand',
  },
}
