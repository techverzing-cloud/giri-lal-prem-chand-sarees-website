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
    question: 'What types of sarees do you offer?',
    answer: 'We showcase a wide range of sarees, including traditional, festive, bridal, party-wear, designer, and contemporary styles. Availability may vary by collection.',
  },
  {
    question: 'What types of lehengas do you offer?',
    answer: 'Our lehenga collection includes bridal, cocktail, festive, and designer lehengas. Each piece is crafted with attention to detail and quality.',
  },
  {
    question: 'How can I enquire about a particular saree or lehenga?',
    answer: 'You can enquire about any product directly through our website by clicking the "Enquire" button on the product page. Alternatively, you can reach out to us via WhatsApp or email with the product details.',
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
    question: 'Do you provide blouse customization or stitching?',
    answer: 'Stitching and customization options may be available depending on the saree or lehenga. Please contact us for details regarding your specific requirement.',
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
