export interface Artisan {
  id: string
  name: string
  role: string
  experience: string
  specialty: string
  quote: string
  image: string
}

export const ARTISANS: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Rajesh Kumar',
    role: 'Master Weaver',
    experience: '35 years',
    specialty: 'Banarasi Brocade',
    quote: 'Every thread I weave carries the blessings of my ancestors. This is not just a craft — it is our living heritage.',
    image: '/artisans/artisan-1.jpg',
  },
  {
    id: 'artisan-2',
    name: 'Meera Devi',
    role: 'Zardozi Artisan',
    experience: '28 years',
    specialty: 'Gold Embroidery',
    quote: 'When a bride wears my work on her wedding day, I feel like I am part of her family\'s joy. That feeling never gets old.',
    image: '/artisans/artisan-2.jpg',
  },
  {
    id: 'artisan-3',
    name: 'Vikram Singh',
    role: 'Master Dyer',
    experience: '40 years',
    specialty: 'Natural Dyes',
    quote: 'Colour is emotion. Getting the perfect shade of red for a bridal saree is an art that takes a lifetime to master.',
    image: '/artisans/artisan-3.jpg',
  },
  {
    id: 'artisan-4',
    name: 'Sunita Verma',
    role: 'Resham Specialist',
    experience: '22 years',
    specialty: 'Silk Thread Work',
    quote: 'Patience is the most important tool in my kit. Some motifs take weeks, but the result is always worth the wait.',
    image: '/artisans/artisan-4.jpg',
  },
  {
    id: 'artisan-5',
    name: 'Ramesh Gupta',
    role: 'Quality Master',
    experience: '30 years',
    specialty: 'Finishing & Inspection',
    quote: 'If a piece does not meet my standards, it does not leave this room. Our customers deserve nothing less than perfection.',
    image: '/artisans/artisan-5.jpg',
  },
  {
    id: 'artisan-6',
    name: 'Priya Sharma',
    role: 'Design Consultant',
    experience: '15 years',
    specialty: 'Contemporary Design',
    quote: 'Bridging tradition with modernity is my passion. I love helping brides find pieces that honour their roots while feeling fresh and personal.',
    image: '/artisans/artisan-6.jpg',
  },
]
