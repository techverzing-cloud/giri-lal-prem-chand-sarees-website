import type { AnalyticsEvent } from '@/types/enquiry'

const EVENTS_KEY = 'glpc-analytics-events'

function getSessionId(): string {
  let id = sessionStorage.getItem('glpc-session-id')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('glpc-session-id', id)
  }
  return id
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  const event: AnalyticsEvent = {
    name,
    properties,
    timestamp: new Date().toISOString(),
  }

  if (import.meta.env.DEV) {
    console.debug('[Analytics]', event)
  }

  try {
    const stored = localStorage.getItem(EVENTS_KEY)
    const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : []
    events.push(event)
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-100)))
  } catch {}

  return event
}

export const AnalyticsEvents = {
  formOpen: (type: string) => trackEvent('form_open', { type }),
  formSubmit: (type: string, success: boolean) => trackEvent('form_submit', { type, success }),
  whatsappClick: (source: string) => trackEvent('whatsapp_click', { source }),
  emailSent: (type: string) => trackEvent('email_sent', { type }),
  thankYouViewed: (type: string) => trackEvent('thank_you_viewed', { type }),
  bookConsultation: (type: string) => trackEvent('book_consultation', { type }),
  phoneClick: () => trackEvent('phone_click'),
  faqToggle: (question: string) => trackEvent('faq_toggle', { question }),
  enquiryModalOpen: (productId?: string) => trackEvent('enquiry_modal_open', { productId }),
  enquiryModalClose: (productId?: string) => trackEvent('enquiry_modal_close', { productId }),
}

export function getStoredEvents(): AnalyticsEvent[] {
  try {
    const stored = localStorage.getItem(EVENTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}
