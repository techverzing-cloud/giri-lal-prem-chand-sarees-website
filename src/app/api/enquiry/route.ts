import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEnquiryNotification, EmailConfigError, EmailDeliveryError } from '@/lib/resend'
import type { EnquiryPayload } from '@/types/enquiry'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Server-side validation, deliberately independent of the React Hook Form +
 * Zod schemas in the client components: a request can be posted directly, so
 * the endpoint must not trust its input. Field names mirror `EnquiryPayload`.
 */
const enquirySchema = z.object({
  type: z.enum(['PRODUCT', 'CONSULTATION', 'CONTACT', 'BULK_ORDER', 'CUSTOM_DESIGN', 'CORPORATE']),
  customer: z.object({
    name: z.string().trim().min(1, 'Name is required').max(120),
    phone: z.string().trim().max(30).default(''),
    email: z.union([z.string().trim().email('Enter a valid email address'), z.literal('')]).default(''),
    city: z.string().trim().max(120).default(''),
    preferredContact: z.enum(['email', 'phone', 'whatsapp']).default('email'),
  }),
  product: z
    .object({
      id: z.string().trim().max(80).optional(),
      name: z.string().trim().max(200).optional(),
      sku: z.string().trim().max(80).optional(),
      brand: z.string().trim().max(80).optional(),
      price: z.number().nonnegative().max(1e9).optional(),
    })
    .optional(),
  consultation: z
    .object({
      type: z.enum(['virtual', 'store', 'wedding', 'designer', 'video', 'personal_shopper']).optional(),
      preferredTime: z.string().trim().max(120).optional(),
      preferredStore: z.string().trim().max(160).optional(),
    })
    .optional(),
  event: z
    .object({
      occasion: z.string().trim().max(120).optional(),
      weddingDate: z.string().trim().max(60).optional(),
      budget: z.string().trim().max(80).optional(),
      interestedCollection: z.string().trim().max(160).optional(),
      referralSource: z.string().trim().max(120).optional(),
      message: z.string().trim().max(5000).optional(),
    })
    .optional(),
  source: z
    .object({
      page: z.string().trim().max(300).default(''),
      url: z.string().trim().max(1000).default(''),
      referrer: z.string().trim().max(1000).default(''),
      utm: z.record(z.string(), z.string().max(300)).default({}),
      browser: z.string().trim().max(200).default(''),
      device: z.string().trim().max(200).default(''),
      screenResolution: z.string().trim().max(60).default(''),
      timestamp: z.string().trim().max(60).default(''),
    })
    .default({ page: '', url: '', referrer: '', utm: {}, browser: '', device: '', screenResolution: '', timestamp: '' }),
  metadata: z.object({
    // Consent is enforced, not merely recorded. `z.boolean()` would accept an
    // explicit `false`, and `.default(false)` would accept the field being
    // missing entirely, so a direct POST without the checkbox would sail
    // through. `z.literal(true)` is the only version that rejects both, and it
    // also makes `metadata` itself mandatory.
    agreedToPrivacy: z.literal(true, {
      errorMap: () => ({ message: 'Consent to the Privacy Policy is required' }),
    }),
    campaign: z.string().trim().max(200).optional(),
  }),
})

const SUCCESS_MESSAGE = 'Thank you for your enquiry. Our team will contact you shortly.'
const GENERIC_FAILURE = 'Something went wrong. Please try again.'
const DELIVERY_FAILURE = 'Unable to send your enquiry. You can reach us directly on WhatsApp.'
const CONSENT_REQUIRED_MESSAGE = 'Please agree to the Privacy Policy before sending your enquiry.'

/** Never echo provider or server internals back to the browser. */
function failure(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status })
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return failure('Invalid request body.', 400)
  }

  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) {
    // Consent gets its own message rather than the generic
    // "field.path + zod message" format, which reads as developer-speak and
    // leaks an internal object path into the UI. A missing or null `metadata`
    // is the same problem as a false consent: nothing was asserted.
    const isConsentProblem = parsed.error.issues.some(
      (issue) =>
        issue.path.includes('agreedToPrivacy') ||
        (issue.path.length === 1 && issue.path[0] === 'metadata')
    )
    if (isConsentProblem) return failure(CONSENT_REQUIRED_MESSAGE, 400)

    const first = parsed.error.issues[0]
    const field = first?.path.join('.') || 'payload'
    return failure(`Invalid enquiry: ${field} ${first?.message ?? 'is invalid'}`.trim(), 400)
  }

  const payload = parsed.data as EnquiryPayload

  try {
    const { id } = await sendEnquiryNotification(payload)
    return NextResponse.json({ success: true, message: SUCCESS_MESSAGE, id })
  } catch (error) {
    if (error instanceof EmailConfigError) {
      // Log which variable is missing server-side; the client only sees a 503.
      console.error(`[enquiry] email service not configured (${error.variable})`)
      return failure(DELIVERY_FAILURE, 503)
    }

    if (error instanceof EmailDeliveryError) {
      console.error(`[enquiry] delivery failed: ${error.message}`)
      return failure(DELIVERY_FAILURE, 502)
    }

    console.error('[enquiry] unexpected error while sending', error)
    return failure(GENERIC_FAILURE, 500)
  }
}
