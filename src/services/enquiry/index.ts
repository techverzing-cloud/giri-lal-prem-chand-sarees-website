import type { EnquiryPayload, EmailResponse, EnquiryFormValues } from '@/types/enquiry'
import { sendEnquiryEmail } from '@/services/email'
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
      message: data.message || undefined,
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
      // Pass the user's actual answer through. Previously this was
      // `data.agreedToPrivacy ?? true`, which silently recorded consent on
      // behalf of a visitor who was never asked. The server now rejects the
      // request outright if this is not literally `true`.
      agreedToPrivacy: data.agreedToPrivacy,
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

  // The enquiry always goes to the server. There is deliberately no "email
  // service not configured, so report success anyway" branch: that silently
  // discarded leads while telling the customer they had been received.
  const result = await sendEnquiryEmail(payload)

  trackEvent('form_submit', { type, success: result.success })

  return result
}
