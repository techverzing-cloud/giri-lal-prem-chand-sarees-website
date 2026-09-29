import { Resend } from 'resend'
import type { EnquiryPayload } from '@/types/enquiry'
import {
  EnquiryNotificationEmail,
  enquiryNotificationText,
} from '@/emails/EnquiryNotificationEmail'

/**
 * Server-only Resend client.
 *
 * This module reads `RESEND_API_KEY` and must never be imported from a Client
 * Component. The only importer is the `/api/enquiry` route handler, which Next
 * runs exclusively on the server.
 *
 * Required environment variables:
 *   RESEND_API_KEY     API key from the Resend dashboard (secret)
 *   RESEND_FROM_EMAIL  A verified sender on your Resend account
 *   RESEND_TO_EMAIL    Where enquiries should be delivered
 *
 * Nothing here invents a default address: if a variable is missing the route
 * returns 503 rather than sending from a placeholder sender.
 */

const apiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.RESEND_FROM_EMAIL
const toEmail = process.env.RESEND_TO_EMAIL

const resend = apiKey ? new Resend(apiKey) : null

export type EmailConfigProblem = 'RESEND_API_KEY' | 'RESEND_FROM_EMAIL' | 'RESEND_TO_EMAIL'

export function getEmailConfigProblem(): EmailConfigProblem | null {
  if (!apiKey) return 'RESEND_API_KEY'
  if (!fromEmail) return 'RESEND_FROM_EMAIL'
  if (!toEmail) return 'RESEND_TO_EMAIL'
  return null
}

export function isEmailServiceConfigured(): boolean {
  return getEmailConfigProblem() === null
}

const TYPE_LABELS: Record<EnquiryPayload['type'], string> = {
  PRODUCT: 'Product enquiry',
  CONSULTATION: 'Consultation request',
  CONTACT: 'Contact form',
  BULK_ORDER: 'Bulk order',
  CUSTOM_DESIGN: 'Custom design',
  CORPORATE: 'Corporate enquiry',
}

function buildSubject(payload: EnquiryPayload): string {
  const label = TYPE_LABELS[payload.type] ?? 'Enquiry'
  const who = payload.customer.name?.trim() || 'Website visitor'
  const subject = `[${label}] ${who}`
  return subject.length > 150 ? `${subject.slice(0, 147)}...` : subject
}

export interface SendResult {
  id: string
}

/**
 * Sends the business notification. Throws `EmailConfigError` when the server is
 * not configured and `EmailDeliveryError` when Resend rejects the message.
 */
export async function sendEnquiryNotification(payload: EnquiryPayload): Promise<SendResult> {
  const problem = getEmailConfigProblem()
  if (problem || !resend || !fromEmail || !toEmail) {
    throw new EmailConfigError(problem ?? 'RESEND_API_KEY')
  }

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    // Replying goes straight to the customer, so the team can respond in-thread.
    replyTo: payload.customer.email || undefined,
    subject: buildSubject(payload),
    html: EnquiryNotificationEmail(payload),
    text: enquiryNotificationText(payload),
  })

  if (error) {
    throw new EmailDeliveryError(error.message)
  }

  if (!data?.id) {
    throw new EmailDeliveryError('Resend returned no message id')
  }

  return { id: data.id }
}

export class EmailConfigError extends Error {
  readonly variable: EmailConfigProblem
  constructor(variable: EmailConfigProblem) {
    super(`Email service is not configured: ${variable} is missing`)
    this.name = 'EmailConfigError'
    this.variable = variable
  }
}

export class EmailDeliveryError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailDeliveryError'
  }
}
