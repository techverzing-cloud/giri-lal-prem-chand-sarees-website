export interface TimelineEvent {
  year: number
  title: string
  description: string
  image: string
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: 1946,
    title: 'The Beginning',
    description: 'Giri Lal Prem Chand Sarees establishes a small textile shop in Chandni Chowk, Delhi, with a vision to provide the finest quality sarees to discerning customers.',
    image: '/about/timeline-1946.jpg',
  },
  {
    year: 1975,
    title: 'A Growing Reputation',
    description: 'The store becomes a trusted destination for bridal sarees across Delhi. Clients begin travelling from neighbouring states for our curated collections.',
    image: '/about/timeline-1975.jpg',
  },
  {
    year: 1995,
    title: 'The Second Generation',
    description: 'The founder\'s children take the reins, expanding the collection to include designer wear while maintaining the core values of quality and authenticity.',
    image: '/about/timeline-1995.jpg',
  },
  {
    year: 2017,
    title: 'Arunima Fashions',
    description: 'Launch of Arunima Fashions, a new brand dedicated to contemporary designer lehengas for the modern bride, blending tradition with global trends.',
    image: '/about/timeline-2010.jpg',
  },
  {
    year: 2025,
    title: 'A Digital Future',
    description: 'Embracing the digital era while preserving our heritage. We launch our online showcase to bring the GLPC experience to clients worldwide.',
    image: '/about/timeline-2025.jpg',
  },
]
