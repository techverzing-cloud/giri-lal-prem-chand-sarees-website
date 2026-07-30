export interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
  category: 'store' | 'craftsmanship' | 'collection' | 'event'
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g-1', src: '/gallery/gallery-1.jpg', alt: 'Our flagship store in Chandni Chowk', width: 800, height: 1000, category: 'store' },
  { id: 'g-2', src: '/gallery/gallery-2.jpg', alt: 'Master weaver at the loom', width: 1000, height: 800, category: 'craftsmanship' },
  { id: 'g-3', src: '/gallery/gallery-3.jpg', alt: 'Bridal lehenga collection display', width: 800, height: 1000, category: 'collection' },
  { id: 'g-4', src: '/gallery/gallery-4.jpg', alt: 'Zardozi embroidery detail work', width: 1000, height: 800, category: 'craftsmanship' },
  { id: 'g-5', src: '/gallery/gallery-5.jpg', alt: 'Private consultation lounge', width: 1000, height: 800, category: 'store' },
  { id: 'g-6', src: '/gallery/gallery-6.jpg', alt: 'Premium silk saree collection', width: 800, height: 1000, category: 'collection' },
  { id: 'g-7', src: '/gallery/gallery-7.jpg', alt: 'Bridal styling session', width: 1000, height: 800, category: 'event' },
  { id: 'g-8', src: '/gallery/gallery-8.jpg', alt: 'Traditional handloom weaving', width: 800, height: 1000, category: 'craftsmanship' },
  { id: 'g-9', src: '/gallery/gallery-9.jpg', alt: 'Storefront heritage facade', width: 1000, height: 800, category: 'store' },
  { id: 'g-10', src: '/gallery/gallery-10.jpg', alt: 'Designer lehenga detail shot', width: 800, height: 1000, category: 'collection' },
  { id: 'g-11', src: '/gallery/gallery-11.jpg', alt: 'Client fitting consultation', width: 1000, height: 800, category: 'event' },
  { id: 'g-12', src: '/gallery/gallery-12.jpg', alt: 'Award ceremony recognition', width: 1000, height: 800, category: 'event' },
]
