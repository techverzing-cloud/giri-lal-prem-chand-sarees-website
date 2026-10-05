import { imageZoom } from "@/utils/animations"

export const HERO = {
  headline: 'Timeless Elegance Since 1946',
  subheading:
    'Celebrating generations of Indian craftsmanship through exquisite sarees and designer couture.',
  cta: [
    { label: 'Explore Collection', href: '/collections', variant: 'primary' as const },
    { label: 'Enquire Now', href: '/contact', variant: 'outlineLight' as const },
  ],
  media: {
    video: '/hero/hero.mp4',
    image: '/hero/hero.jpg',
    imageMobile: '/hero/hero-mobile.jpg',
    overlay: '/hero/hero-overlay.png',
  },
}

export const LEGACY = {
  headline: 'A Heritage Woven Since 1946',
  description:
    'For over six decades, Giri Lal Prem Chand Sarees has been synonymous with the finest Indian textiles. What began as a modest venture in Chandni Chowk has blossomed into a destination for connoisseurs of luxury sarees and designer couture.',
  image: '/legacy/vintage-workshop.jpg',
  timeline: [
    { year: 1946, label: 'The Beginning', description: 'Founded in the heart of Old Delhi' },
    { year: 1980, label: 'Golden Era', description: 'Became the preferred destination for bridal couture' },
    { year: 2000, label: 'New Horizons', description: 'Expanded into designer lehengas with Arunima Fashions' },
    { year: 2026, label: 'Today', description: 'A legacy of trust spanning three generations' },
  ],
  stats: [
    { value: 70, suffix: '+', label: 'Years of Legacy' },
    { value: 50, suffix: 'K+', label: 'Happy Clients' },
    { value: 5, suffix: 'K+', label: 'Unique Designs' },
    { value: 3, suffix: ' Gens', label: 'Family Legacy' },
  ],
}

export const FEATURED_COLLECTIONS = [
  {
    id: 'wedding-sarees',
    title: 'Wedding Sarees',
    description: 'Exquisite bridal sarees adorned with intricate zari and hand-embroidered details.',
    image: '/collections/Wedding-saree.jpg',
    href: '/collections/sarees',
    tag: 'Bridal',
  },
  {
    id: 'banarasi',
    title: 'Banarasi',
    description: 'Timeless Banarasi silk sarees woven with pure gold and silver zari.',
    image: '/collections/banarasi.jpg',
    href: '/collections/sarees',
    tag: 'Silk',
  },
  {
    id: 'kanjivaram',
    title: 'Kanjivaram',
    description: 'Luxurious Kanjivaram silk sarees known for their durability and rich textures.',
    image: '/collections/kanjivaram.jpg',
    href: '/collections/sarees',
    tag: 'Silk',
  },
  {
    id: 'designer-sarees',
    title: 'Designer Sarees',
    description: 'Contemporary designer sarees blending tradition with modern aesthetics.',
    image: '/collections/designer-saree.jpg',
    href: '/collections/sarees',
    tag: 'Designer',
  },
  {
    id: 'party-wear',
    title: 'Party Wear',
    description: 'Elegant sarees and lehengas crafted for celebrations and special occasions.',
    image: '/collections/partywear.jpg',
    href: '/collections/sarees',
    tag: 'Celebration',
  },
]

export const BRANDS = [
  {
    id: 'girilal',
    name: 'Giri Lal Prem Chand Sarees',
    tagline: 'Luxury Sarees',
    since: 'Since 1946',
    description:
      'Discover handcrafted luxury sarees woven with tradition, heritage, and timeless elegance.',
    href: '/collections/sarees',
    image: '/collections/girilal-showcase.png',
    gradient: 'from-[#8E2D29] via-[#6E201D] to-[#4A1412]',
    accent: '#8E2D29',
    ctaLabel: 'Explore Sarees',
  },
  {
    id: 'arunima',
    name: 'Arunima Fashions',
    tagline: 'Designer Lehengas',
    since: 'Designer Label',
    description:
      'Contemporary designer lehengas crafted for the modern woman, redefining bridal and occasion wear.',
    href: '/collections/lehengas',
    image: '/collections/arunima.png',
    gradient: 'from-[#344646] via-[#232E2E] to-[#1A2222]',
    accent: '#344646',
    ctaLabel: 'Explore Lehengas',
  },
]

export const FABRICS = [
  {
    id: 'silk',
    label: 'Pure Silk',
    description: 'The finest mulberry and tussar silk sourced from India\'s premier silk belts.',
    image : 'collections/Pure-silk.jpg',
  },
  {
    id: 'cotton',
    label: 'Premium Cotton',
    description: 'Handwoven cotton fabrics with exceptional breathability and comfort.',
    image : 'collections/pure-cotton.jpg',
  },
  {
    id: 'banarasi',
    label: 'Banarasi',
    description: 'Masterfully designed with real zari, a craft passed down through generations.',
    image : 'collections/banarasi-fabric.jpg',
  },
  {
    id: 'handloom',
    label: 'Bandhej',
    description: 'Each piece is a unique creation of master weavers from across India.',
    image: 'collections/bandhej.jpg',
  },
  {
    id: 'embroidery',
    label: 'Intricate Embroidery',
    description: 'Zardozi, gota patti, and resham work by skilled artisans.',
    image : 'collections/Intricate-Embroidery.jpg',
  },
  {
    id: 'weaving',
    label: 'Patola',
    description: 'Traditional techniques preserved and celebrated in every weave.',
    image : 'collections/patola.jpg',
  },
]

// The homepage "Featured Products" rail used to be declared here as a
// hand-written list of five products. Every slug in it was absent from the
// catalogue, so all five cards linked to the product-not-found state. The rail
// now derives from the real catalogue via
// `getFeaturedProductsForRail()` in `src/data/products`, which is the single
// source of product data and types.

export const WHY_CHOOSE_US = [
  {
    id: 'legacy',
    title: 'Since 1946',
    description: 'Over six decades of trust and excellence in luxury textiles.',
    icon: 'history',
  },
  {
    id: 'quality',
    title: 'Premium Quality',
    description: 'Handpicked fabrics with rigorous quality standards.',
    icon: 'quality',
  },
  {
    id: 'curated',
    title: 'Handpicked Collection',
    description: 'Each piece selected by our team of textile experts.',
    icon: 'curated',
  },
  {
    id: 'shipping',
    title: 'Worldwide Clients',
    description: 'Satisfaction to clients across the globe.',
    icon: 'shipping',
  },
  {
    id: 'trust',
    title: 'Trusted Clientele',
    description: 'Preferred by discerning families for generations.',
    icon: 'trust',
  },
  {
    id: 'experience',
    title: 'Luxury Experience',
    description: 'Personalized attention from enquiry to delivery.',
    icon: 'experience',
  },
]

export const PROCESS_STEPS = [
  {
    id: 'explore',
    step: '01',
    title: 'Explore',
    description: 'Browse our curated collections from the comfort of your home.',
  },
  {
    id: 'select',
    step: '02',
    title: 'Select',
    description: 'Choose the pieces that speak to your aesthetic.',
  },
  {
    id: 'enquire',
    step: '03',
    title: 'Enquire',
    description: 'Reach out to us with your selections and preferences.',
  },
  {
    id: 'connect',
    step: '04',
    title: 'We Contact You',
    description: 'Our team reaches out personally to assist you further.',
  },
]

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'The craftsmanship of the Banarasi saree I purchased is beyond compare. Every time I wear it, I receive endless compliments. Truly a heirloom piece.',
    image: '/testimonials/client-1.jpg',
    product: 'Banarasi Silk Saree',
  },
  {
    id: 't2',
    name: 'Ananya Gupta',
    location: 'Delhi',
    rating: 5,
    text: 'My wedding lehenga from Arunima Fashions was a dream come true. The attention to detail, the fit, the fabric — everything was perfect. Thank you for making my day so special.',
    image: '/testimonials/client-2.jpg',
    product: 'Bridal Lehenga',
  },
  {
    id: 't3',
    name: 'Riya Mehta',
    location: 'Bangalore',
    rating: 5,
    text: 'I have been a loyal customer for over a decade. The consistency in quality and the warmth of the team keeps me coming back. Giri Lal Prem Chand Sarees is not just a store — it is a legacy.',
    image: '/testimonials/client-3.jpg',
    product: 'Kanjivaram Saree',
  },
  {
    id: 't4',
    name: 'Neha Kapoor',
    location: 'London',
    rating: 5,
    text: 'Even from across the world, the team made sure I found the perfect saree for my sister\'s wedding. Seamless experience and exceptional quality.',
    image: '/testimonials/client-4.jpg',
    product: 'Designer Saree',
  },
]

export const INSTAGRAM_POSTS = [
  { id: 'ig1', image: 'collections/receptionLehenga.jpg', likes: 2847 },
  { id: 'ig2', image: 'collections/bridalLehenga.jpg', likes: 1932 },
  { id: 'ig3', image: '/collections/handloomSaree.jpg', likes: 3521 },
  { id: 'ig4', image: '/collections/designerSaree.jpg', likes: 2156 },
  { id: 'ig5', image: '/collections/cottonSaree.jpg', likes: 4123 },
  { id: 'ig6', image: '/collections/cocktailLehengas.jpg', likes: 1678 },
]

export const CTA = {
  headline: 'Looking For Something Exclusive?',
  subtext:
    'Connect with our experts for personalized assistance in finding the perfect piece.',
  buttons: [
    { label: 'WhatsApp Us', href: '/', variant: 'primary' as const, icon: 'message-circle' },
    { label: 'Contact Us', href: '/contact', variant: 'outlineLight' as const },
  ],
}
