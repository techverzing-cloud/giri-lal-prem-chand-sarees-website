export interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
  category: 'store' | 'craftsmanship' | 'collection' | 'event'
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g-1', src: 'collections/receptionLehenga.jpg', alt: 'Our flagship store in Chandni Chowk', width: 800, height: 1000, category: 'store' },
  { id: 'g-2', src: '/collections/bandhej.jpg', alt: 'Master weaver at the loom', width: 1000, height: 800, category: 'craftsmanship' },
  { id: 'g-3', src: '/collections/bridalLehenga.jpg', alt: 'Bridal lehenga collection display', width: 800, height: 1000, category: 'collection' },
  { id: 'g-4', src: '/collections/cocktailLehengas.jpg', alt: 'Zardozi embroidery detail work', width: 1000, height: 800, category: 'craftsmanship' },
  { id: 'g-5', src: '/collections/kanjivaram.jpg', alt: 'Private consultation lounge', width: 1000, height: 800, category: 'store' },
  { id: 'g-6', src: '/collections/luxury.jpg', alt: 'Premium silk saree collection', width: 800, height: 1000, category: 'collection' },
  { id: 'g-7', src: '/collections/wedding-sarees.jpg', alt: 'Bridal styling session', width: 1000, height: 800, category: 'event' },
  { id: 'g-8', src: '/collections/handloomSaree.jpg', alt: 'Traditional handloom weaving', width: 800, height: 1000, category: 'craftsmanship' },
  { id: 'g-9', src: '/collections/Intricate-Embroidery.jpg', alt: 'Storefront heritage facade', width: 1000, height: 800, category: 'store' },
  { id: 'g-10', src: '/collections/designerLehenga.jpg', alt: 'Designer lehenga detail shot', width: 800, height: 1000, category: 'collection' },
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

