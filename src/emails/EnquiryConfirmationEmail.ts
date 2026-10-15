import type { EnquiryPayload } from '@/types/enquiry'
import { siteConfig } from '@/config/site'
import { CONSULTATION_LABELS, TYPE_LABELS, escapeHtml, isPresent } from '@/emails/theme'

/**
 * Customer confirmation email.
 *
 * Sent to the visitor who submitted an enquiry, so they have written proof the
 * studio received it. It deliberately echoes back only what the visitor typed —
 * never internal fields such as price, device or attribution.
 *
 * Layout notes
 * ------------
 * - Table-based, inline CSS, explicit widths: required for Gmail/Outlook.
 * - A single <style> block in the head carries only the responsive rules;
 *   everything needed to lay the email out is inline so it survives clients
 *   that strip <style>.
 * - No JavaScript, no flex/grid, no SVG (stripped by Gmail). Icons are Unicode
 *   glyphs inside a tinted circle, which degrade to plain text if unsupported.
 * - The hero and logo are hosted images with a solid background fallback, so
 *   the email stays readable when images are blocked.
 */

// ---------------------------------------------------------------------------
// Assets and palette
// ---------------------------------------------------------------------------
const SITE = 'https://www.girilalpremchand.com'
const LOGO_URL = `${SITE}/logos/landscape_logo_without_back.png`
/** Rich maroon silk with gold embroidery — swapped by editing this one URL. */
const HERO_IMAGE_URL = `${SITE}/collections/banarasi.jpg`

const CONTACT = siteConfig.contact

const P = {
  maroon: '#3B1017',
  burgundy: '#4A121C',
  gold: '#B18A43',
  goldLight: '#D8BB82',
  goldTint: '#F1E4CB',
  cream: '#F7F1E8',
  creamCard: '#FCF8F2',
  creamInset: '#F3EADB',
  white: '#FFFFFF',
  text: '#292525',
  muted: '#77716E',
  border: '#E7DCC9',
  heroSub: '#C9B49B',
} as const

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = 'Arial, Helvetica, sans-serif'

const BRAND_LABEL = 'GIRILAL PREM CHAND SAREES'
const ORNAMENT = '&#10086;' // ❦ floral heart

const digits = (value: string): string => value.replace(/[^+\d]/g, '')

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------
function ornament(size: number, color: string = P.gold, opacity = '0.5'): string {
  return `<span style="font-size:${size}px;line-height:1;color:${color};opacity:${opacity};">${ORNAMENT}</span>`
}

/** A short gold rule used under card titles. */
function goldRule(width: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:10px 0 0;">
        <tr><td style="width:${width};height:2px;line-height:2px;font-size:0;background:${P.gold};">&nbsp;</td></tr>
      </table>`
}

/** A Unicode glyph inside a rounded gold-tinted circle. */
function iconCircle(glyph: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td width="40" height="40" align="center" valign="middle" style="width:40px;height:40px;background:${P.goldTint};border-radius:20px;font-family:${SANS};font-size:17px;line-height:40px;color:${P.gold};text-align:center;mso-line-height-rule:exactly;">
            ${glyph}
          </td>
        </tr>
      </table>`
}

/** One label/value row. Renders nothing when the value is empty. */
function cardRow(
  label: string,
  value: unknown,
  options?: { href?: string; linkColor?: string; breakAll?: boolean },
): string {
  if (!isPresent(value)) return ''
  const safe = escapeHtml(String(value).trim())
  const rendered = options?.href
    ? `<a href="${escapeHtml(options.href)}" style="color:${options.linkColor ?? P.text};text-decoration:none;">${safe}</a>`
    : safe
  const wrap = options?.breakAll
    ? 'word-break:break-word;overflow-wrap:anywhere;'
    : 'word-break:break-word;'

  return `
        <tr>
          <td class="row-label" width="110" valign="top" style="width:110px;padding:0 16px 12px 0;font-size:13px;line-height:20px;color:${P.muted};font-family:${SANS};">
            ${escapeHtml(label)}
          </td>
          <td class="row-value" valign="top" style="padding:0 0 12px;font-size:14px;line-height:20px;color:${P.text};font-family:${SANS};font-weight:bold;${wrap}">
            ${rendered}
          </td>
        </tr>`
}

/** A rounded soft-cream card with an icon, title, gold rule and body. */
function card(title: string, icon: string, body: string): string {
  return `
      <tr>
        <td class="px" style="padding:0 32px 18px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;background:${P.creamCard};border:1px solid ${P.border};border-radius:12px;">
            <tr>
              <td class="card-pad" style="padding:24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                  <tr>
                    <td width="40" valign="middle" style="width:40px;padding:0 14px 0 0;">${iconCircle(icon)}</td>
                    <td valign="middle" style="font-family:${SANS};">
                      <p style="margin:0;font-size:12px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:${P.gold};font-weight:bold;">
                        ${escapeHtml(title)}
                      </p>
                    </td>
                  </tr>
                </table>
                ${goldRule('44px')}
                ${body}
              </td>
            </tr>
          </table>
        </td>
      </tr>`
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------
function logoBlock(): string {
  return `
      <tr>
        <td align="center" style="padding:8px 20px 22px;">
          <a href="${escapeHtml(SITE)}" style="text-decoration:none;border:0;">
            <img class="logo-img" src="${escapeHtml(LOGO_URL)}" width="280" alt="Giri Lal Prem Chand Sarees" style="display:block;width:280px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;" />
          </a>
        </td>
      </tr>`
}

/** Wide burgundy hero: copy on the left, saree photograph on the right. */
function hero(payload: EnquiryPayload): string {
  const name = payload.customer?.name?.trim()
  const label = TYPE_LABELS[payload.type] ?? 'Enquiry'
  const heading = name ? `Thank you, ${escapeHtml(name)}` : 'Thank you for your enquiry'

  return `
      <tr>
        <td style="background:${P.maroon};">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
            <tr>
              <td class="hero-text" valign="middle" style="padding:44px 40px;background:${P.maroon};">
                <p style="margin:0 0 14px;font-size:11px;line-height:16px;letter-spacing:3px;text-transform:uppercase;color:${P.gold};font-family:${SANS};font-weight:bold;">
                  ${escapeHtml(BRAND_LABEL)}
                </p>
                <h1 class="hero-heading" style="margin:0 0 14px;font-size:34px;line-height:42px;color:${P.white};font-family:${SERIF};font-weight:normal;">
                  ${heading}
                </h1>
                <p style="margin:0;font-size:13px;line-height:20px;color:${P.heroSub};font-family:${SANS};">
                  ${escapeHtml(label)} &middot; We usually respond within 24 hours
                </p>
              </td>
              <td class="hero-image" width="300" valign="top" style="width:300px;background:${P.burgundy};font-size:0;line-height:0;">
                <img src="${escapeHtml(HERO_IMAGE_URL)}" width="300" alt="Maroon silk saree with intricate gold embroidery" style="display:block;width:300px;max-width:300px;height:auto;border:0;outline:none;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>`
}

function intro(payload: EnquiryPayload): string {
  switch (payload.type) {
    case 'PRODUCT': {
      const product = payload.product?.name?.trim()
      return product
        ? `Thank you for your interest in <strong>${escapeHtml(product)}</strong>. Your enquiry has reached our team and we will share the details with you shortly.`
        : 'Thank you for your interest. Your enquiry has reached our team and we will share the details with you shortly.'
    }
    case 'CONSULTATION':
      return 'Thank you for requesting a consultation. Our team has received your request and will confirm the appointment with you shortly.'
    case 'BULK_ORDER':
      return 'Thank you for your bulk order enquiry. Our team has received it and will get back to you with the details shortly.'
    case 'CUSTOM_DESIGN':
      return 'Thank you for your custom design request. Our design team has received it and will reach out to you shortly.'
    case 'CORPORATE':
      return 'Thank you for your corporate enquiry. Our team has received it and will contact you shortly.'
    case 'CONTACT':
    default:
      return 'Thank you for writing to us. Your message has reached our team and we will get back to you shortly.'
  }
}

function messageSection(payload: EnquiryPayload): string {
  return `
      <tr>
        <td class="px" style="padding:0 32px 24px;">
          <p style="margin:0 0 14px;font-size:15px;line-height:24px;color:${P.text};font-family:${SANS};">
            ${intro(payload)}
          </p>
          <p style="margin:0;font-size:15px;line-height:24px;color:${P.muted};font-family:${SANS};">
            A member of our team will contact you soon. If you would like to speak with us in the meantime, you can reach the store using the details below.
          </p>
        </td>
      </tr>`
}

function submittedCard(payload: EnquiryPayload): string {
  const c = payload.customer ?? ({} as EnquiryPayload['customer'])
  const p = payload.product
  const k = payload.consultation
  const e = payload.event

  const rows =
    cardRow('Name', c.name) +
    cardRow('Email', c.email, { href: c.email ? `mailto:${c.email}` : undefined, breakAll: true }) +
    cardRow('Phone', c.phone, { href: c.phone ? `tel:${digits(String(c.phone))}` : undefined }) +
    cardRow('City', c.city) +
    cardRow('Product', p?.name) +
    cardRow('Consultation', k?.type ? CONSULTATION_LABELS[k.type] ?? k.type : '') +
    cardRow('Preferred time', k?.preferredTime) +
    cardRow('Occasion', e?.occasion) +
    cardRow('Wedding date', e?.weddingDate)

  return card('What you sent us', '&#128196;', `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-top:16px;">${rows}</table>`)
}

function yourMessageCard(payload: EnquiryPayload): string {
  const message = payload.event?.message
  if (!isPresent(message)) return ''

  const body = `
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-top:16px;">
                  <tr>
                    <td style="background:${P.creamInset};border-radius:8px;padding:16px 18px;font-size:14px;line-height:22px;color:${P.text};font-family:${SANS};white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;">
                      ${escapeHtml(String(message).trim())}
                    </td>
                  </tr>
                </table>`

  return card('Your message', '&#9993;', body)
}

function contactCard(): string {
  const whatsapp = digits(CONTACT.whatsapp).replace(/^\+/, '')
  const rows =
    cardRow('Phone', CONTACT.phone, { href: `tel:${digits(CONTACT.phone)}`, linkColor: P.gold }) +
    cardRow('WhatsApp', CONTACT.whatsapp, { href: `https://wa.me/${whatsapp}`, linkColor: P.gold }) +
    cardRow('Email', CONTACT.email, { href: `mailto:${CONTACT.email}`, linkColor: P.gold, breakAll: true }) +
    cardRow('Store', CONTACT.address) +
    cardRow('Hours', CONTACT.businessHours)

  return card('Need us sooner?', '&#9742;', `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-top:16px;">${rows}</table>`)
}

function footer(): string {
  const year = new Date().getFullYear()
  return `
      <tr>
        <td style="background:${P.burgundy};border-top:3px solid ${P.gold};padding:28px 32px;text-align:center;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
            <tr>
              <td align="center" style="padding:0 0 10px;">${ornament(16, P.goldLight, '0.7')}</td>
            </tr>
          </table>
          <p style="margin:0 0 10px;font-size:12px;line-height:19px;color:#EDE0CE;font-family:${SANS};">
            This is an automated confirmation email &mdash; no reply is needed.
          </p>
          <p style="margin:0 0 10px;font-size:11px;line-height:18px;color:${P.heroSub};font-family:${SANS};">
            &copy; ${year} Girilal Premchand Sarees. All rights reserved.
          </p>
          <p style="margin:0 0 10px;font-size:11px;line-height:18px;color:${P.heroSub};font-family:${SANS};">
            Website managed by <a href="https://www.techverzing.com/" style="color:${P.goldLight};text-decoration:underline;">Techverzing Technologies</a>
          </p>
          <p style="margin:0;font-size:11px;line-height:18px;font-family:${SANS};">
            <a href="${escapeHtml(SITE)}" style="color:${P.goldLight};text-decoration:underline;">girilalpremchand.com</a>
          </p>
        </td>
      </tr>`
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function enquiryConfirmationSubject(payload: EnquiryPayload): string {
  if (payload.type === 'CONTACT') return 'Thank you for contacting Giri Lal Prem Chand Sarees'
  return 'Thank you for your enquiry — Giri Lal Prem Chand Sarees'
}

/** Returns the full HTML document for the customer confirmation email. */
export function EnquiryConfirmationEmail(payload: EnquiryPayload): string {
  const title = 'Thank you — Giri Lal Prem Chand Sarees'

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(title)}</title>
<style>
  body { margin:0; padding:0; width:100% !important; background:${P.cream}; }
  table { border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; }
  a { text-decoration:none; }
  @media only screen and (max-width:640px) {
    .container { width:100% !important; max-width:100% !important; border-radius:0 !important; }
    .px { padding-left:20px !important; padding-right:20px !important; }
    .card-pad { padding:20px !important; }
    .logo-img { width:200px !important; }
    .hero-text { display:block !important; width:100% !important; padding:32px 22px !important; }
    .hero-heading { font-size:26px !important; line-height:34px !important; }
    .hero-image { display:block !important; width:100% !important; }
    .hero-image img { width:100% !important; max-width:100% !important; height:auto !important; }
    .row-label, .row-value { display:block !important; width:100% !important; padding:0 0 2px 0 !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${P.cream};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:${P.cream};">
<tr>
<td align="center" style="padding:34px 12px 10px;">
  ${ornament(15, P.gold, '0.45')}
</td>
</tr>
<tr>
<td align="center" style="padding:0 12px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="880" class="container" style="width:880px;max-width:880px;border-collapse:separate;background:${P.white};border:1px solid ${P.border};border-radius:14px;overflow:hidden;">
    ${logoBlock()}
    ${hero(payload)}
    <tr><td style="height:26px;line-height:26px;font-size:0;">&nbsp;</td></tr>
    ${messageSection(payload)}
    ${submittedCard(payload)}
    ${yourMessageCard(payload)}
    ${contactCard()}
  </table>
</td>
</tr>
<tr>
<td align="center" style="padding:0 12px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="880" class="container" style="width:880px;max-width:880px;border-collapse:separate;">
    <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
    <tr>
      <td style="border-radius:14px;overflow:hidden;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
          ${footer()}
        </table>
      </td>
    </tr>
  </table>
</td>
</tr>
<tr>
<td align="center" style="padding:14px 12px 34px;">
  ${ornament(15, P.gold, '0.45')}
</td>
</tr>
</table>
</body>
</html>`
}

/** Plain-text alternative, used as the email's `text` part. */
export function enquiryConfirmationText(payload: EnquiryPayload): string {
  const c = payload.customer ?? ({} as EnquiryPayload['customer'])
  const p = payload.product
  const k = payload.consultation
  const e = payload.event
  const name = c.name?.trim()

  const introPlain =
    payload.type === 'PRODUCT' && p?.name
      ? `Thank you for your interest in ${p.name}. Your enquiry has reached our team and we will share the details with you shortly.`
      : payload.type === 'CONTACT'
        ? 'Thank you for writing to us. Your message has reached our team and we will get back to you shortly.'
        : 'Thank you. Your enquiry has reached our team and we will get back to you shortly.'

  const lines: string[] = [
    'GIRILAL PREM CHAND SAREES',
    '',
    name ? `Dear ${name},` : 'Hello,',
    '',
    introPlain,
    'A member of our team will contact you soon. If you would like to speak with us in the meantime, you can reach the store using the details below.',
    '',
    'WHAT YOU SENT US',
    `  Name:    ${c.name ?? ''}`,
    `  Email:   ${c.email ?? ''}`,
    `  Phone:   ${c.phone ?? ''}`,
  ]

  if (isPresent(c.city)) lines.push(`  City:    ${c.city}`)
  if (p?.name) lines.push(`  Product: ${p.name}`)
  if (k?.type) lines.push(`  Consultation: ${CONSULTATION_LABELS[k.type] ?? k.type}`)
  if (isPresent(k?.preferredTime)) lines.push(`  Preferred time: ${k!.preferredTime}`)
  if (isPresent(e?.occasion)) lines.push(`  Occasion: ${e!.occasion}`)
  if (isPresent(e?.weddingDate)) lines.push(`  Wedding date: ${e!.weddingDate}`)

  if (isPresent(e?.message)) {
    lines.push('', 'YOUR MESSAGE', String(e!.message).trim())
  }

  lines.push(
    '',
    'NEED US SOONER?',
    `  Phone:    ${CONTACT.phone}`,
    `  WhatsApp: ${CONTACT.whatsapp}`,
    `  Email:    ${CONTACT.email}`,
    `  Store:    ${CONTACT.address}`,
    `  Hours:    ${CONTACT.businessHours}`,
    '',
    'This is an automated confirmation email - no reply is needed.',
    `(c) ${new Date().getFullYear()} Girilal Premchand Sarees. All rights reserved.`,
    'Website managed by Techverzing Technologies - https://www.techverzing.com/',
    SITE,
  )

  return lines.join('\n')
}
