export interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
  category: 'store' | 'craftsmanship' | 'collection' | 'event'
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g-1', src: '/girilal/bridal-lehenga/bridalLehenga3.png', alt: 'Our flagship store in Chandni Chowk', width: 800, height: 1000, category: 'store' },
  { id: 'g-2', src: '/girilal/party-wear/pw1.png', alt: 'Master weaver at the loom', width: 1000, height: 800, category: 'craftsmanship' },
  { id: 'g-3', src: '/girilal/bridal-lehenga/bridalLehenga1.png', alt: 'Bridal lehenga collection display', width: 800, height: 1000, category: 'collection' },
  { id: 'g-4', src: '/girilal/cocktail-lehenga/cocktail2.png', alt: 'Zardozi embroidery detail work', width: 1000, height: 800, category: 'craftsmanship' },
  { id: 'g-5', src: '/girilal/bridal-lehenga/bridalLehenga5.png', alt: 'Private consultation lounge', width: 1000, height: 800, category: 'store' },
  { id: 'g-6', src: '/girilal/bridal-lehenga/bridalLehenga6.png', alt: 'Premium silk saree collection', width: 800, height: 1000, category: 'collection' },
  { id: 'g-7', src: '/collections/wedding-sarees.jpg', alt: 'Bridal styling session', width: 1000, height: 800, category: 'event' },
  { id: 'g-8', src: '/collections/handloomSaree.jpg', alt: 'Traditional handloom weaving', width: 800, height: 1000, category: 'craftsmanship' },
  { id: 'g-9', src: '/girilal/engagement-lehenga/eg7.png', alt: 'Storefront heritage facade', width: 1000, height: 800, category: 'store' },
  { id: 'g-10', src: '/girilal/bridal-lehenga/bridalLehenga10.png', alt: 'Designer lehenga detail shot', width: 800, height: 1000, category: 'collection' },
  { id: 'g-11', src: '/collections/printedSaree.jpg', alt: 'Client fitting consultation', width: 1000, height: 800, category: 'event' },
  { id: 'g-12', src: '/collections/engagement.jpg', alt: 'Award ceremony recognition', width: 1000, height: 800, category: 'event' },
  { id: 'g-13', src: '/collections/cottonSaree.jpg', alt: 'Artisan handloom demonstration', width: 800, height: 1000, category: 'craftsmanship' },
  { id: 'g-14', src: '/collections/party-wear-saree.jpg', alt: 'Exclusive designer saree collection', width: 1000, height: 800, category: 'collection' },
  { id: 'g-15', src: '/collections/banarasi.jpg', alt: 'Colorful ethnic saree display', width: 800, height: 1000, category: 'collection' },
  { id: 'g-16', src: '/collections/festiveSaree.jpg', alt: 'Bridal lehenga collection display', width: 800, height: 1000, category: 'collection' },
  { id: 'g-17', src: '/collections/luxury.jpg', alt: 'Traditional handloom weaving', width: 800, height: 1000, category: 'craftsmanship' },
  { id: 'g-18', src: '/collections/patola.jpg', alt: 'Exclusive designer saree collection', width: 1000, height: 800, category: 'collection' },
  { id: 'g-19', src: '/collections/kanjivaram.jpg', alt: 'Colorful ethnic saree display', width: 800, height: 1000, category: 'collection' },
  { id: 'g-20', src: '/collections/premium.jpg', alt: 'Zardozi embroidery detail work', width: 1000, height: 800, category: 'craftsmanship' },
  
]

