import type { EnquiryPayload } from '@/types/enquiry'

/**
 * Business notification email for website enquiries.
 *
 * The markup is assembled as a string and every style is inline, because most
 * email clients strip <style> blocks and external CSS. Sections are plain
 * functions returning strings so the template stays easy to edit and needs no
 * extra dependency.
 *
 * To customise: edit the BRAND object below, then the section order. Each
 * section is independent, so you can drop, reorder or replace any one of them
 * without touching the rest.
 *
 * NOTE: this is the notification the studio receives. It is not sent to the
 * customer; the customer's address is used as `replyTo` on the API route.
 */

// ---------------------------------------------------------------------------
// BRAND - single place to change colours, fonts and the studio name
// ---------------------------------------------------------------------------
const BRAND = {
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isPresent(value: unknown): boolean {
  return value !== null && value !== undefined && String(value).trim() !== ''
}

const TYPE_LABELS: Record<EnquiryPayload['type'], string> = {
  PRODUCT: 'Product enquiry',
  CONSULTATION: 'Consultation request',
  CONTACT: 'Contact form',
  BULK_ORDER: 'Bulk order',
  CUSTOM_DESIGN: 'Custom design',
  CORPORATE: 'Corporate enquiry',
}

const CONTACT_LABELS: Record<string, string> = {
  email: 'Email',
  phone: 'Phone call',
  whatsapp: 'WhatsApp',
}

const CONSULTATION_LABELS: Record<string, string> = {
  virtual: 'Virtual consultation',
  store: 'Store visit',
  wedding: 'Wedding styling',
  designer: 'Designer consultation',
  video: 'Video call',
  personal_shopper: 'Personal shopper',
}

/** A label/value row. Renders nothing when the value is empty. */
function row(label: string, value: unknown, options?: { href?: string }): string {
  if (!isPresent(value)) return ''
  const safe = escapeHtml(String(value).trim())
  const rendered = options?.href
    ? `<a href="${escapeHtml(options.href)}" style="color:${BRAND.primary};text-decoration:underline;">${safe}</a>`
    : safe

  return `
        <tr>
          <td style="padding:8px 16px 8px 0;width:38%;vertical-align:top;font-size:13px;line-height:20px;color:${BRAND.muted};font-family:${BRAND.bodyFont};">
            ${escapeHtml(label)}
          </td>
          <td style="padding:8px 0;vertical-align:top;font-size:14px;line-height:20px;color:${BRAND.body};font-family:${BRAND.bodyFont};font-weight:600;">
            ${rendered}
          </td>
        </tr>`
}

/** A titled block of rows. Skipped entirely when every row is empty. */
function section(title: string, rows: string, accent: string = BRAND.gold): string {
  if (!rows.trim()) return ''
  return `
      <tr>
        <td style="padding:20px 28px;background:${BRAND.cream};border-left:3px solid ${accent};">
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${accent};font-family:${BRAND.bodyFont};font-weight:700;">
            ${escapeHtml(title)}
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
            ${rows}
          </table>
        </td>
      </tr>
      <tr><td style="height:8px;line-height:8px;font-size:0;">&nbsp;</td></tr>`
}

/** Free-text block, preserving the customer's line breaks. */
function messageBlock(message: unknown): string {
  if (!isPresent(message)) return ''
  return `
      <tr>
        <td style="padding:20px 28px;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.gold};font-family:${BRAND.bodyFont};font-weight:700;">
            Message
          </p>
          <div style="padding:14px 16px;background:${BRAND.cream};border-radius:6px;font-size:14px;line-height:22px;color:${BRAND.body};font-family:${BRAND.bodyFont};white-space:pre-wrap;word-break:break-word;">
            ${escapeHtml(String(message).trim())}
          </div>
        </td>
      </tr>
      <tr><td style="height:8px;line-height:8px;font-size:0;">&nbsp;</td></tr>`
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------
function header(payload: EnquiryPayload): string {
  const label = TYPE_LABELS[payload.type] ?? 'Enquiry'
  const submitted = payload.source?.timestamp
    ? new Date(payload.source.timestamp).toUTCString()
    : new Date().toUTCString()

  return `
      <tr>
        <td style="padding:28px;background:${BRAND.night};">
          <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.gold};font-family:${BRAND.bodyFont};font-weight:600;">
            ${escapeHtml(label)}
          </p>
          <h1 style="margin:10px 0 6px;font-size:26px;line-height:32px;color:#FFFFFF;font-family:${BRAND.headingFont};font-weight:600;">
            New enquiry from ${escapeHtml(payload.customer?.name?.trim() || 'a website visitor')}
          </h1>
          <p style="margin:0;font-size:12px;line-height:18px;color:rgba(255,255,255,0.55);font-family:${BRAND.bodyFont};">
            Received ${escapeHtml(submitted)}
          </p>
        </td>
      </tr>`
}

function alert(payload: EnquiryPayload): string {
  const contact = payload.customer?.preferredContact
  const label = CONTACT_LABELS[contact] ?? ''
  if (!label) return ''

  return `
      <tr>
        <td style="padding:14px 28px;background:${BRAND.primary};">
          <p style="margin:0;font-size:13px;line-height:20px;color:#FFFFFF;font-family:${BRAND.bodyFont};">
            <strong style="font-weight:700;">Preferred contact:</strong>
            ${escapeHtml(label)} &middot; respond within 24 hours.
          </p>
        </td>
      </tr>
      <tr><td style="height:8px;line-height:8px;font-size:0;">&nbsp;</td></tr>`
}

function customerSection(payload: EnquiryPayload): string {
  const c = payload.customer ?? ({} as EnquiryPayload['customer'])
  const rows =
    row('Name', c.name) +
    row('Email', c.email, { href: c.email ? `mailto:${c.email}` : undefined }) +
    row('Phone', c.phone, { href: c.phone ? `tel:${String(c.phone).replace(/[^+\d]/g, '')}` : undefined }) +
    row('City', c.city)
  return section('Customer', rows, BRAND.primary)
}

function productSection(payload: EnquiryPayload): string {
  const p = payload.product
  if (!p) return ''
  const rows =
    row('Product', p.name) +
    row('SKU', p.sku) +
    row('Brand', p.brand) +
    row('Price', isPresent(p.price) ? `₹${Number(p.price).toLocaleString('en-IN')}` : '')
  return section('Product', rows)
}

function consultationSection(payload: EnquiryPayload): string {
  const c = payload.consultation
  if (!c) return ''
  const rows =
    row('Type', c.type ? CONSULTATION_LABELS[c.type] ?? c.type : '') +
    row('Preferred time', c.preferredTime) +
    row('Preferred store', c.preferredStore)
  return section('Consultation', rows)
}

function eventSection(payload: EnquiryPayload): string {
  const e = payload.event
  if (!e) return ''
  const rows =
    row('Occasion', e.occasion) +
    row('Wedding date', e.weddingDate) +
    row('Budget', e.budget) +
    row('Interested in', e.interestedCollection) +
    row('Heard about us via', e.referralSource)
  return section('Event & preferences', rows)
}

function trackingSection(payload: EnquiryPayload): string {
  const s = payload.source
  if (!s) return ''
  const utm = s.utm ?? {}
  const utmPairs = Object.entries(utm)
    .filter(([, v]) => isPresent(v))
    .map(([k, v]) => row(k.replace(/_/g, ' '), v))
    .join('')

  const rows =
    row('Page', s.page) +
    row('Full URL', s.url, { href: s.url }) +
    row('Came from', s.referrer) +
    row('Browser', s.browser) +
    row('Device', s.device) +
    row('Screen', s.screenResolution) +
    utmPairs
  return section('Attribution', rows, BRAND.muted)
}

function footer(payload: EnquiryPayload): string {
  const name = payload.customer?.name?.trim()
  return `
      <tr>
        <td style="padding:20px 28px;border-top:1px solid ${BRAND.border};">
          <p style="margin:0 0 4px;font-size:12px;line-height:18px;color:${BRAND.muted};font-family:${BRAND.bodyFont};">
            ${
              name
                ? `Reply directly to this email to reach ${escapeHtml(name)}.`
                : 'Reply directly to this email to reach the customer.'
            }
          </p>
          <p style="margin:0;font-size:11px;line-height:18px;color:${BRAND.muted};font-family:${BRAND.bodyFont};">
            ${escapeHtml(BRAND.name)} &middot; <a href="${escapeHtml(BRAND.siteUrl)}" style="color:${BRAND.primary};text-decoration:underline;">${escapeHtml(BRAND.siteUrl)}</a>
          </p>
        </td>
      </tr>`
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns the full HTML document for the notification email. */
export function EnquiryNotificationEmail(payload: EnquiryPayload): string {
  const title = `${TYPE_LABELS[payload.type] ?? 'Enquiry'} | ${BRAND.name}`

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#F6EFEA;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:#F6EFEA;padding:24px 0;">
<tr>
<td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;border-collapse:collapse;background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:10px;overflow:hidden;">
${header(payload)}${alert(payload)}${customerSection(payload)}${messageBlock(
    payload.event?.message,
  )}${productSection(payload)}${consultationSection(payload)}${eventSection(
    payload,
  )}${trackingSection(payload)}${footer(payload)}
</table>
</td>
</tr>
</table>
</body>
</html>`
}

/** Plain-text alternative, used as the email's `text` part. */
export function enquiryNotificationText(payload: EnquiryPayload): string {
  const c = payload.customer ?? ({} as EnquiryPayload['customer'])
  const e = payload.event
  const p = payload.product
  const k = payload.consultation
  const s = payload.source

  const lines: string[] = [
    `New ${(TYPE_LABELS[payload.type] ?? 'enquiry').toLowerCase()}`,
    `Received ${s?.timestamp ? new Date(s.timestamp).toUTCString() : new Date().toUTCString()}`,
    '',
    'CUSTOMER',
    `  Name:    ${c.name ?? ''}`,
    `  Email:   ${c.email ?? ''}`,
    `  Phone:   ${c.phone ?? ''}`,
    `  City:    ${c.city ?? ''}`,
    `  Prefers contact by: ${CONTACT_LABELS[c.preferredContact] ?? c.preferredContact ?? ''}`,
  ]

  if (isPresent(e?.message)) {
    lines.push('', 'MESSAGE', String(e!.message).trim())
  }

  if (p) {
    lines.push(
      '',
      'PRODUCT',
      `  Name:    ${p.name ?? ''}`,
      `  SKU:     ${p.sku ?? ''}`,
      `  Brand:   ${p.brand ?? ''}`,
      `  Price:   ${isPresent(p.price) ? `₹${Number(p.price).toLocaleString('en-IN')}` : ''}`,
    )
  }

  if (k) {
    lines.push(
      '',
      'CONSULTATION',
      `  Type:    ${k.type ? CONSULTATION_LABELS[k.type] ?? k.type : ''}`,
      `  Time:    ${k.preferredTime ?? ''}`,
      `  Store:   ${k.preferredStore ?? ''}`,
    )
  }

  if (e) {
    lines.push(
      '',
      'EVENT & PREFERENCES',
      `  Occasion:     ${e.occasion ?? ''}`,
      `  Wedding date: ${e.weddingDate ?? ''}`,
      `  Budget:       ${e.budget ?? ''}`,
      `  Interested:  ${e.interestedCollection ?? ''}`,
      `  Referral:     ${e.referralSource ?? ''}`,
    )
  }

  if (s) {
    lines.push(
      '',
      'ATTRIBUTION',
      `  Page:     ${s.page ?? ''}`,
      `  URL:      ${s.url ?? ''}`,
      `  Referrer: ${s.referrer ?? ''}`,
      `  Browser:  ${s.browser ?? ''} / ${s.device ?? ''} / ${s.screenResolution ?? ''}`,
    )
  }

  return lines.join('\n')
}
