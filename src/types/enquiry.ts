export type EnquiryType = 'PRODUCT' | 'CONSULTATION' | 'CONTACT' | 'BULK_ORDER' | 'CUSTOM_DESIGN' | 'CORPORATE'

export type ConsultationType = 'virtual' | 'store' | 'wedding' | 'designer' | 'video' | 'personal_shopper'

export type ContactMethod = 'email' | 'phone' | 'whatsapp'

export interface EnquiryFormValues {
  name: string
  phone: string
  email: string
  city: string
  preferredContact: ContactMethod
  eventType: string
  weddingDate: string
  budget: string
  interestedCollection: string
  productName: string
  preferredTime: string
  preferredStore: string
  message: string
  referralSource: string
  agreedToPrivacy: boolean
}

export interface EnquiryPayload {
  type: EnquiryType
  customer: {
    name: string
    phone: string
    email: string
    city: string
    preferredContact: ContactMethod
  }
  product?: {
    id?: string
    name?: string
    sku?: string
    brand?: string
    price?: number
  }
  consultation?: {
    type?: ConsultationType
    preferredTime?: string
    preferredStore?: string
  }
  event?: {
    occasion?: string
    weddingDate?: string
    budget?: string
    interestedCollection?: string
    referralSource?: string
    message?: string
  }
  source: {
    page: string
    url: string
    referrer: string
    utm: Record<string, string>
    browser: string
    device: string
    screenResolution: string
    timestamp: string
  }
  metadata: {
    agreedToPrivacy: boolean
    campaign?: string
  }
}

export interface EmailResponse {
  success: boolean
  message: string
  error?: string
}

export interface LeadSource {
  source: 'homepage' | 'collection' | 'product' | 'instagram' | 'direct' | 'whatsapp' | 'google' | 'facebook' | 'campaign' | 'other'
  medium?: string
  campaign?: string
  referrer: string
  url: string
  utm: Record<string, string>
}

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  timestamp: string
}

export const ENQUIRY_EVENT_TYPES = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'reception', label: 'Reception' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'cocktail', label: 'Cocktail Party' },
  { value: 'festival', label: 'Festival' },
  { value: 'casual', label: 'Casual Wear' },
  { value: 'office', label: 'Office Wear' },
  { value: 'other', label: 'Other' },
] as const

export const CONSULTATION_TYPES: { value: ConsultationType; label: string; description: string }[] = [
  { value: 'virtual', label: 'Virtual Consultation', description: 'Video call from the comfort of your home.' },
  { value: 'store', label: 'Store Visit', description: 'Visit our flagship store for a personal experience.' },
  { value: 'wedding', label: 'Wedding Styling', description: 'Complete bridal styling consultation.' },
  { value: 'designer', label: 'Designer Consultation', description: 'One-on-one with our design team.' },
  { value: 'video', label: 'Video Call', description: 'Quick video call to discuss your needs.' },
  { value: 'personal_shopper', label: 'Personal Shopper', description: 'Dedicated personal shopper assistance.' },
]

export const BUDGET_RANGES = [
  { value: '25000-50000', label: '₹25,000 — ₹50,000' },
  { value: '50000-100000', label: '₹50,000 — ₹1,00,000' },
  { value: '100000-200000', label: '₹1,00,000 — ₹2,00,000' },
  { value: '200000-500000', label: '₹2,00,000 — ₹5,00,000' },
  { value: '500000+', label: '₹5,00,000+' },
  { value: 'not-sure', label: 'Not Sure Yet' },
] as const

export const REFERRAL_SOURCES = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'google', label: 'Google Search' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'friend', label: 'Friend or Family' },
  { value: 'blog', label: 'Blog or Article' },
  { value: 'advertisement', label: 'Advertisement' },
  { value: 'other', label: 'Other' },
] as const

export const CONTACT_METHODS: { value: ContactMethod; label: string }[] = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'whatsapp', label: 'WhatsApp' },
]
