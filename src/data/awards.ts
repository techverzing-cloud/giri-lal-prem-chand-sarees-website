export interface Award {
  id: string
  title: string
  year: string
  description: string
  image: string
}

export const AWARDS: Award[] = [
  {
    id: 'award-1',
    title: 'Best Heritage Textile Store',
    year: '2024',
    description: 'Recognised for preserving and promoting India\'s traditional weaving heritage at the National Textile Awards.',
    image: '/awards/award-1.jpg',
  },
  {
    id: 'award-2',
    title: 'Excellence in Bridal Wear',
    year: '2023',
    description: 'Awarded for outstanding contribution to bridal fashion at the Indian Fashion Excellence Forum.',
    image: '/awards/award-2.jpg',
  },
  {
    id: 'award-3',
    title: 'Customer Trust Award',
    year: '2022',
    description: 'Recognised for exceptional customer service and trustworthiness by the Delhi Retail Association.',
    image: '/awards/award-3.jpg',
  },
  {
    id: 'award-4',
    title: 'Craftsmanship Preservation',
    year: '2021',
    description: 'Honoured for our work in supporting and sustaining traditional handloom weavers across India.',
    image: '/awards/award-4.jpg',
  },
  {
    id: 'award-5',
    title: 'Luxury Retail Excellence',
    year: '2020',
    description: 'Awarded for providing a world-class luxury shopping experience while maintaining Indian values.',
    image: '/awards/award-5.jpg',
  },
  {
    id: 'award-6',
    title: 'Family Business of the Year',
    year: '2019',
    description: 'Celebrated as one of Delhi\'s most respected multi-generational family businesses in retail.',
    image: '/awards/award-6.jpg',
  },
]
