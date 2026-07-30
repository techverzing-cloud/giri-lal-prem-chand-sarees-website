import type { EnquiryPayload, EmailResponse } from '@/types/enquiry'
import { trackEvent } from '@/services/analytics'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ''

async function loadEmailJS(): Promise<boolean> {
  try {
    const emailjs = await import('@emailjs/browser')
    emailjs.init(PUBLIC_KEY)
    return true
  } catch {
    return false
  }
}

function flattenPayload(p: EnquiryPayload): Record<string, unknown> {
  return {
    enquiry_type: p.type,
    customer_name: p.customer.name,
    customer_phone: p.customer.phone,
    customer_email: p.customer.email,
    customer_city: p.customer.city,
    preferred_contact: p.customer.preferredContact,
    product_id: p.product?.id ?? '',
    product_name: p.product?.name ?? '',
    product_sku: p.product?.sku ?? '',
    product_brand: p.product?.brand ?? '',
    product_price: p.product?.price ?? '',
    consultation_type: p.consultation?.type ?? '',
    consultation_time: p.consultation?.preferredTime ?? '',
    consultation_store: p.consultation?.preferredStore ?? '',
    occasion: p.event?.occasion ?? '',
    wedding_date: p.event?.weddingDate ?? '',
    budget: p.event?.budget ?? '',
    interested_collection: p.event?.interestedCollection ?? '',
    referral_source: p.event?.referralSource ?? '',
    message: p.event?.referralSource ?? '',
    source_page: p.source.page,
    source_url: p.source.url,
    source_referrer: p.source.referrer,
    utm_source: p.source.utm?.utm_source ?? '',
    utm_medium: p.source.utm?.utm_medium ?? '',
    utm_campaign: p.source.utm?.utm_campaign ?? '',
    browser: p.source.browser,
    device: p.source.device,
    screen_resolution: p.source.screenResolution,
    timestamp: p.source.timestamp,
    agreed_to_privacy: p.metadata.agreedToPrivacy,
    campaign: p.metadata.campaign ?? '',
  }
}

export async function sendEnquiryEmail(payload: EnquiryPayload): Promise<EmailResponse> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn(
      'EmailJS not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env'
    )
    console.debug('[EmailJS] Payload:', payload)
    return {
      success: true,
      message: 'Thank you for your enquiry. Our team will contact you shortly.',
    }
  }

  try {
    const initialized = await loadEmailJS()
    if (!initialized) {
      return { success: false, message: 'Failed to initialize email service.' }
    }

    const emailjs = await import('@emailjs/browser')
    const templateParams = flattenPayload(payload)

    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)

    trackEvent('email_sent', { type: payload.type, status: result.status })

    return {
      success: result.status === 200,
      message: result.status === 200
        ? 'Thank you for your enquiry. Our team will contact you shortly.'
        : 'Something went wrong. Please try again.',
    }
  } catch (error) {
    console.error('EmailJS error:', error)
    return {
      success: false,
      message: 'Unable to send your enquiry. You can reach us directly on WhatsApp.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export function isEmailJSConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)
}
