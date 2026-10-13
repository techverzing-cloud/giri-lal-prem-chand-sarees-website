export interface GalleryImage {
  id: string
  src: string
  alt: string

  width: number
  height: number
  category: 'store' | 'craftsmanship' | 'collection' | 'event'
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g-1', src: '/girilal/bridal-lehenga/bridalLehenga3.png', width: 800, height: 1000, category: 'store', alt: 'Bridal Lehenga Collection' },
  { id: 'g-2', src: '/girilal/party-wear/pw1.png', width: 1000, height: 800, category: 'craftsmanship', alt: 'Party Wear Collection' },
  { id: 'g-3', src: '/girilal/bridal-lehenga/bridalLehenga1.png', width: 800, height: 1000, category: 'collection', alt: 'Bridal Lehenga Collection' },
  { id: 'g-4', src: '/girilal/cocktail-lehenga/cocktail2.png', width: 1000, height: 800, category: 'craftsmanship', alt: 'Cocktail Lehenga Collection' },
  { id: 'g-5', src: '/girilal/bridal-lehenga/bridalLehenga5.png', width: 1000, height: 800, category: 'store', alt: 'Bridal Lehenga Collection' },
  { id: 'g-6', src: '/girilal/bridal-lehenga/bridalLehenga6.png', width: 800, height: 1000, category: 'collection', alt: 'Bridal Lehenga Collection' },
  { id: 'g-7', src: '/Saree/wedding-saree/weddingSaree1.png', width: 1000, height: 800, category: 'event', alt: 'Wedding Saree Collection' },
  { id: 'g-8', src: '/Saree/handloom-saree/handloomSaree1.png', width: 800, height: 1000, category: 'craftsmanship', alt: 'Handloom Saree Collection' },
  { id: 'g-9', src: '/girilal/engagement-lehenga/eg7.png', width: 1000, height: 800, category: 'store', alt: 'Engagement Lehenga Collection' },
  { id: 'g-10', src: '/girilal/bridal-lehenga/bridalLehenga10.png', width: 800, height: 1000, category: 'collection', alt: 'Bridal Lehenga Collection' },
  { id: 'g-11', src: '/Saree/printed-saree/printedSaree1.png', width: 1000, height: 800, category: 'event', alt: 'Printed Saree Collection' },
  { id: 'g-12', src: '/collections/engagement.jpg', width: 1000, height: 800, category: 'event', alt: 'Engagement Collection' },
  { id: 'g-13', src: '/Saree/cotton-saree/cottonSaree1.png', width: 800, height: 1000, category: 'craftsmanship', alt: 'Cotton Saree Collection' },
  { id: 'g-14', src: '/Saree/party-wear/partyWear1.png', width: 1000, height: 800, category: 'collection', alt: 'Party Wear Collection' },
  { id: 'g-15', src: '/Saree/banarasi-saree/banarasi1.png', width: 800, height: 1000, category: 'collection', alt: 'Banarasi Saree Collection' },
  { id: 'g-16', src: '/Saree/festive-saree/festiveSaree1.png', width: 800, height: 1000, category: 'collection', alt: 'Festive Saree Collection' },
  { id: 'g-17', src: '/collections/luxury.jpg', width: 800, height: 1000, category: 'craftsmanship', alt: 'Luxury Collection' },
  { id: 'g-18', src: '/collections/patola.jpg', width: 1000, height: 800, category: 'collection', alt: 'Patola Collection' },
  { id: 'g-19', src: '/collections/kanjivaram.jpg', width: 800, height: 1000, category: 'collection', alt: 'Kanjivaram Collection' },
  // { id: 'g-20', src: '/collections/premium.jpg', width： 1000, height： 800, category： 'craftsmanship', alt： 'Premium Collection' }

]

