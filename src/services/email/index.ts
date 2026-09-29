import type { EnquiryPayload, EmailResponse } from '@/types/enquiry'
import { trackEvent } from '@/services/analytics'

/**
 * Client-side transport for enquiry notifications.
 *
 * The message itself is never composed or sent from the browser: this posts the
 * payload to the `/api/enquiry` route, which validates it and hands delivery to
 * Resend on the server. That is what keeps `RESEND_API_KEY` out of the browser
 * bundle.
 */

const ENDPOINT = '/api/enquiry'
const SUCCESS_MESSAGE = 'Thank you for your enquiry. Our team will contact you shortly.'
const GENERIC_FAILURE = 'Something went wrong. Please try again.'
const DELIVERY_FAILURE = 'Unable to send your enquiry. You can reach us directly on WhatsApp.'

export async function sendEnquiryEmail(payload: EnquiryPayload): Promise<EmailResponse> {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    let body: Partial<EmailResponse> & { id?: string } = {}
    try {
      body = await response.json()
    } catch {
      body = {}
    }

    if (!response.ok) {
      // 503 means the server is missing its Resend configuration. That is a
      // deployment problem, not something the visitor can fix, so it must not
      // be reported as success.
      return {
        success: false,
        message: response.status === 503 ? DELIVERY_FAILURE : body.message || GENERIC_FAILURE,
      }
    }

    trackEvent('email_sent', { type: payload.type, status: response.status })

    return {
      success: true,
      message: body.message || SUCCESS_MESSAGE,
    }
  } catch (error) {
    console.error('[enquiry] request to /api/enquiry failed:', error)
    return { success: false, message: DELIVERY_FAILURE }
  }
}
