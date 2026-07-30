import type { EnquiryPayload, EmailResponse, EnquiryFormValues } from '@/types/enquiry'
import { sendEnquiryEmail, isEmailJSConfigured } from '@/services/email'
import { trackEvent } from '@/services/analytics'
import { getLeadSource, getBrowserInfo, getScreenResolution } from '@/services/tracking'

export function buildEnquiryPayload(
  type: EnquiryPayload['type'],
  data: EnquiryFormValues,
  product?: EnquiryPayload['product'],
  consultation?: EnquiryPayload['consultation'],
): EnquiryPayload {
  const source = getLeadSource()

  return {
    type,
    customer: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      city: data.city,
      preferredContact: data.preferredContact,
    },
    product,
    consultation,
    event: {
      occasion: data.eventType || undefined,
      weddingDate: data.weddingDate || undefined,
      budget: data.budget || undefined,
      interestedCollection: data.interestedCollection || undefined,
      referralSource: data.referralSource || undefined,
    },
    source: {
      page: window.location.pathname,
      url: window.location.href,
      referrer: source.referrer,
      utm: source.utm,
      browser: getBrowserInfo(),
      device: navigator.platform,
      screenResolution: getScreenResolution(),
      timestamp: new Date().toISOString(),
    },
    metadata: {
      agreedToPrivacy: data.agreedToPrivacy ?? true,
      campaign: source.utm.utm_campaign || undefined,
    },
  }
}

export async function submitEnquiry(
  type: EnquiryPayload['type'],
  data: EnquiryFormValues,
  options?: {
    product?: EnquiryPayload['product']
    consultation?: EnquiryPayload['consultation']
  },
): Promise<EmailResponse> {
  const payload = buildEnquiryPayload(type, data, options?.product, options?.consultation)

  trackEvent('form_submit', { type, success: true })

  if (!isEmailJSConfigured()) {
    console.warn('EmailJS not configured. Payload:', payload)
    return {
      success: true,
      message: 'Thank you for your enquiry. Our team will contact you shortly.',
    }
  }

  return sendEnquiryEmail(payload)
}

export { isEmailJSConfigured }
