import type { EnquiryPayload } from '@/types/enquiry'

/**
 * Shared theme for transactional emails.
 *
 * Kept in one module so the studio notification and the customer confirmation
 * never drift apart. Values mirror `src/styles/globals.css`.
 */

export const BRAND = {
  name2: 'Giri Lal Prem Chand Sarees Pvt. Ltd.',
  name: 'Giri Lal Prem Chand Sarees',
  tagline: 'Luxury sarees & designer lehengas since 1946',
  siteUrl: 'https://girilalpremchand.com',
  primary: '#8E2D29',
  primaryDark: '#6E201D',
  gold: '#C9A96E',
  cream: '#FFF8F3',
  night: '#111717',
  body: '#344646',
  muted: '#6B7B7B',
  border: '#E5D5CC',
  surface: '#FFFFFF',
  headingFont: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  bodyFont: "'Manrope', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
} as const

export const TYPE_LABELS: Record<EnquiryPayload['type'], string> = {
  PRODUCT: 'Product enquiry',
  CONSULTATION: 'Consultation request',
  CONTACT: 'Contact form',
  BULK_ORDER: 'Bulk order',
  CUSTOM_DESIGN: 'Custom design',
  CORPORATE: 'Corporate enquiry',
}

export const CONSULTATION_LABELS: Record<string, string> = {
  virtual: 'Virtual consultation',
  store: 'Store visit',
  wedding: 'Wedding styling',
  designer: 'Designer consultation',
  video: 'Video call',
  personal_shopper: 'Personal shopper',
}

export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function isPresent(value: unknown): boolean {
  return value !== null && value !== undefined && String(value).trim() !== ''
}
