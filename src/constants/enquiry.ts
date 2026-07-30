export const CONSULTATION_STEPS = [
  { step: 1, label: 'Personal Details', description: 'Tell us about yourself' },
  { step: 2, label: 'Event Details', description: 'Share your occasion' },
  { step: 3, label: 'Preferences', description: 'Your preferences' },
  { step: 4, label: 'Review', description: 'Review and submit' },
] as const

export const BENEFITS = [
  {
    title: 'Personal Stylist',
    description: 'Get one-on-one attention from our expert stylists who understand your taste.',
    icon: 'user',
  },
  {
    title: 'Premium Collection',
    description: 'Access our exclusive collection of handcrafted luxury sarees and lehengas.',
    icon: 'crown',
  },
  {
    title: 'Exclusive Designs',
    description: 'Discover designs you will not find anywhere else, curated just for you.',
    icon: 'sparkles',
  },
  {
    title: 'Expert Guidance',
    description: 'From fabric selection to styling, our experts guide you every step of the way.',
    icon: 'gem',
  },
  {
    title: 'Bridal Specialists',
    description: 'Our bridal specialists ensure your wedding look is nothing short of perfection.',
    icon: 'flower2',
  },
  {
    title: 'Private Consultation',
    description: 'Enjoy a private, no-obligation consultation at your convenience.',
    icon: 'handshake',
  },
] as const

export const FAQ_ITEMS = [
  {
    question: 'How long before someone contacts me?',
    answer: 'Our team typically responds within 24 hours during business days. For urgent enquiries, please reach out to us on WhatsApp for a faster response.',
  },
  {
    question: 'Can I request custom designs?',
    answer: 'Absolutely. We specialize in custom designs tailored to your preferences. Our design team will work with you to create a piece that reflects your personal style.',
  },
  {
    question: 'Do you provide bridal styling?',
    answer: 'Yes, we offer complete bridal styling consultations. From the saree or lehenga to accessories and draping, our bridal specialists ensure every detail is perfect.',
  },
  {
    question: 'Can I visit the showroom?',
    answer: 'Certainly. We invite you to visit our flagship store for a personal shopping experience. Please book a consultation in advance so we can prepare our collection for you.',
  },
  {
    question: 'Can I book online?',
    answer: 'Yes, you can book a consultation directly through our website. Choose your preferred consultation type and our team will confirm your appointment.',
  },
  {
    question: 'What is your return policy?',
    answer: 'Each piece is handcrafted and made to order. Please discuss any concerns with our team during the consultation, and we will ensure your complete satisfaction.',
  },
  {
    question: 'Can I get a piece embroidered with my name?',
    answer: 'Custom embroidery including names, initials, or special dates is available as part of our bespoke services. Please mention this during your consultation.',
  },
] as const

export const WHATSAPP_TEMPLATES = {
  product: (productName: string, sku: string) =>
    [
      `Hello, I am interested in a product.`,
      ``,
      `Product: ${productName}`,
      `SKU: ${sku}`,
      ``,
      `Kindly share more details.`,
      `Thank you.`,
    ].join('\n'),

  consultation: (name: string, weddingDate?: string, budget?: string, contact?: string) =>
    [
      `Hello,`,
      ``,
      `I would like to book a bridal consultation.`,
      ``,
      `Name: ${name}`,
      weddingDate ? `Wedding Date: ${weddingDate}` : '',
      budget ? `Budget: ${budget}` : '',
      contact ? `Preferred Contact: ${contact}` : '',
      ``,
      `Thank you.`,
    ].filter(Boolean).join('\n'),

  general: (message: string) =>
    [
      `Hello,`,
      ``,
      message,
      ``,
      `Thank you.`,
    ].join('\n'),
}
