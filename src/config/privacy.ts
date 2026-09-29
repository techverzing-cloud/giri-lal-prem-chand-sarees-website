/**
 * Privacy & consent configuration — single source of truth.
 *
 * Everything in this file is derived from what the code in `src/` actually
 * does. Nothing here is aspirational: if you add a new third-party script or a
 * new cookie, add it to the tables below *and* to the matching privacy page in
 * the same change, otherwise the published policy drifts from reality.
 *
 * Business/legal facts that are not present in the codebase are collected in
 * `CLIENT_INPUT_REQUIRED` so they can never be silently invented.
 */

/**
 * Bump this when the consent wording or the categories change in a way that
 * would reasonably change a user's decision. Stored consent records carry the
 * version they were given under, so a bump re-prompts instead of silently
 * grandfathering an old choice.
 *
 * Patch/minor: copy edits only. Major: a new category, or new purposes.
 */
export const PRIVACY_POLICY_VERSION = '1.0'

/**
 * When this policy text was last meaningfully changed.
 *
 * A fixed date, on purpose. `new Date()` would stamp the *build* date on every
 * page, which silently rewrites the history of the policy on every deploy and
 * would claim the wording had been reviewed far more often than it has. The
 * human-readable form is written out rather than formatted at runtime so the
 * server and client markup can never disagree.
 *
 * Set this to today's real date only when a lawyer or the business has actually
 * approved the current wording. Until then it marks the draft's first issue.
 */
export const POLICY_LAST_UPDATED = '2026-09-28'
export const POLICY_LAST_UPDATED_LABEL = '28 September 2026'

/** Key used for the consent record in `localStorage`. */
export const CONSENT_STORAGE_KEY = 'glpc-consent'

/** Route for the privacy policy. The legacy `/privacy` path redirects here. */
export const PRIVACY_POLICY_ROUTE = '/privacy-policy'

/** Route for the cookie / storage notice. */
export const COOKIE_POLICY_ROUTE = '/cookie-policy'

/** Route for the existing terms page, referenced from the legal pages. */
export const TERMS_ROUTE = '/terms'

/**
 * Consent categories.
 *
 * `necessary` is not a choice — it is the storage the site needs to function at
 * all, and it is never gated. `maps` is the only genuinely optional item,
 * because it is the only thing on the site that loads a third party.
 */
export type ConsentCategory = 'maps'

export const CONSENT_CATEGORIES: {
  id: ConsentCategory
  label: string
  purpose: string
  /** Who receives the data, and what they get. */
  provider: string
  required: boolean
}[] = [
  {
    id: 'maps',
    label: 'Store location map',
    purpose:
      'To display the embedded Google map showing our store location on the Contact page. Loading the map shares your IP address, browser information and the page you came from with Google.',
    provider: 'Google LLC (Google Maps embed)',
    required: false,
  },
]

/**
 * Browser storage actually used by the site.
 *
 * Note there is no `document.cookie` usage anywhere in `src/`, and no
 * advertising or cross-site tracking pixel. The entries below are
 * localStorage/sessionStorage only, and none of them contain personal data.
 */
export const BROWSER_STORAGE: {
  name: string
  technology: 'localStorage' | 'sessionStorage' | 'Cookie'
  purpose: string
  contents: string
  duration: string
  category: 'necessary' | ConsentCategory
}[] = [
  {
    name: 'Recently viewed products',
    technology: 'localStorage',
    purpose: 'Remembers which products you looked at so the site can show them back to you on your next visit.',
    contents: 'A list of product identifiers only. No name, contact details or free text.',
    duration: 'Until you clear it in your browser.',
    category: 'necessary',
  },
  {
    name: 'First-party interaction log',
    technology: 'localStorage',
    purpose:
      'Stores which pages and buttons you interacted with, in your own browser only, so the site can be improved. These events are never uploaded anywhere and are not linked to your identity.',
    contents:
      'An event name, a timestamp, and non-identifying values such as the enquiry type, a product id or a button name. The referring page URL is also recorded when you arrive from a link, which can include the campaign parameters in that link. No contact details and no message text are recorded.',
    duration: 'The most recent 100 events, until you clear them in your browser.',
    category: 'necessary',
  },
  {
    name: 'Anonymous session identifier',
    technology: 'sessionStorage',
    purpose: 'Keeps a single visit grouped together so the interaction log is not split across every page load. It is a random identifier generated in your browser and is not linked to you.',
    contents: 'A randomly generated identifier. No personal data.',
    duration: 'Until you close the browser tab.',
    category: 'necessary',
  },
  {
    name: 'Your privacy choices',
    technology: 'localStorage',
    purpose: 'Remembers your consent decisions so we do not ask you again on every page.',
    contents: 'Your consent choices, the policy version they apply to, and the date you made them. No personal data.',
    duration: 'Until you clear it in your browser, or until the policy version changes.',
    category: 'necessary',
  },
]

/**
 * Third parties that receive personal data.
 *
 * This is the complete list of providers this repository can prove are in use.
 * If it does not appear here, the site does not send data to it.
 *
 * The hosting provider is deliberately absent. No deployment target is chosen
 * in this repository, so naming one would be a guess. It cannot be left out of
 * the policy altogether either — a host necessarily receives the technical
 * request data for every page — so it is described in plain words in the
 * "who we share your data with" section and tracked in
 * `CLIENT_INPUT_REQUIRED` under "hosting-region".
 */
export const THIRD_PARTIES: {
  name: string
  role: string
  data: string
  /** Set when the detail must be confirmed against the vendor's own current terms. */
  verifyWithVendor?: string
}[] = [
  {
    name: 'Resend',
    role: 'Transactional email delivery — sends your enquiry to our studio inbox.',
    data: 'Your name, email address, phone number, city, the product or occasion you asked about, your message, and the page and referrer the enquiry came from.',
    verifyWithVendor:
      'Resend\'s own data processing terms, hosting locations and international transfer arrangements. These are not asserted anywhere in the policy and should be confirmed before launch.',
  },
  {
    name: 'Google LLC',
    role: 'Embedded Google map on the Contact page, only after you consent to the optional map category.',
    data: 'Your IP address, browser information and the referring page, as normally disclosed to any website you load content from.',
    verifyWithVendor:
      'Which Google products the embed actually contacts, and what storage those products set once you have allowed the map. No claim about specific Google cookies is made in the policy, because the embed\'s behaviour has not been inspected in a live browser session.',
  },
]

/**
 * Personal data this site collects, as implemented in `src/`.
 *
 * Kept as data rather than prose so the privacy page and the documentation
 * cannot disagree with each other.
 */
export const PERSONAL_DATA_COLLECTED: {
  item: string
  where: string
  purpose: string
  required: boolean
  /** Set where necessity is arguable and the client should confirm. */
  review?: string
}[] = [
  {
    item: 'Name',
    where: 'Enquiry, contact and product enquiry forms',
    purpose: 'To address you and reply to your enquiry.',
    required: true,
  },
  {
    item: 'Email address',
    where: 'Enquiry, contact and product enquiry forms',
    purpose: 'To reply to you. Used as the reply-to address on enquiry emails.',
    required: true,
  },
  {
    item: 'Phone number',
    where: 'Enquiry, contact and product enquiry forms',
    purpose: 'To reach you by phone or WhatsApp about your enquiry, if you ask us to.',
    required: true,
    review:
      'Every enquiry form marks the phone number as required, so a visitor cannot currently leave it out. Confirm whether it really is necessary to answer an enquiry, because if it is not, it should be optional.',
  },
  {
    item: 'Subject line',
    where: 'Contact form only',
    purpose:
      'A short summary you type to describe what your contact is about. It is validated as required.',
    required: true,
    review:
      'The field is collected and validated, but it is NOT included in the enquiry payload, the API request, the database or the email. It is currently typed by the visitor and then discarded. Either carry it through to the studio or remove the field — asking someone to type a required field and then throwing it away is a data-minimisation problem, and it means the policy cannot claim it is processed.',
  },
  {
    item: 'City',
    where: 'Enquiry and product enquiry forms',
    purpose: 'To judge logistics and shipping, and to invite you to a relevant store.',
    required: false,
    review:
      'Not required to answer an enquiry. Confirm whether it is genuinely needed for the delivery and store-invitation purposes before it stays mandatory.',
  },
  {
    item: 'Your message',
    where: 'Enquiry, contact and product enquiry forms',
    purpose: 'To understand and answer what you asked.',
    required: true,
  },
  {
    item: 'Occasion, wedding date, budget range and collection of interest',
    where: 'Enquiry and product enquiry forms',
    purpose: 'To recommend relevant pieces and prepare for your consultation.',
    required: false,
    review:
      'Wedding date in particular identifies a specific individual event. Confirm it is needed for the stated purpose.',
  },
  {
    item: 'Product you enquired about',
    where: 'Product enquiry form',
    purpose: 'To answer the enquiry about that product.',
    required: false,
  },
  {
    item: 'Page URL, referring page and campaign parameters',
    where: 'Attached automatically to every enquiry',
    purpose: 'To understand which pages and campaigns bring enquiries.',
    required: false,
    review:
      'The full referring URL is captured rather than just the referring domain, and it is emailed to the studio inbox. Consider whether the referring domain alone is sufficient.',
  },
  {
    item: 'Browser and screen information',
    where: 'Attached automatically to every enquiry',
    purpose: 'To spot layout problems that stop people from enquiring.',
    required: false,
    review:
      'The full user-agent string is captured. A coarser device category would very likely serve the same purpose.',
  },
  {
    item: 'Newsletter subscription',
    where: 'The GLPC Journal newsletter form — see the note below',
    purpose: 'To send you the journal and style updates you asked for.',
    required: false,
    review:
      'The NewsletterSignup component exists in the codebase and collects a name and email address, but it is NOT currently rendered on any page, so the live site does not collect newsletter data today. Either wire it up behind the consent control that has been added, or delete it. Do not describe the site as sending a newsletter while it is unused.',
  },
]

/**
 * Business and legal facts that are NOT in the codebase.
 *
 * These are rendered in the privacy policy as visible "client input required"
 * markers rather than being filled in with plausible-looking guesses. Remove an
 * entry only once the real detail is written into this file.
 */
export const CLIENT_INPUT_REQUIRED: {
  id: string
  question: string
  why: string
}[] = [
  {
    id: 'legal-entity',
    question: 'Confirm the exact registered legal entity name and its registered address.',
    why: 'A Data Fiduciary must be identifiable. The site displays a trading name and a store address, which is not the same as a registered entity and address.',
  },
  {
    id: 'privacy-contact',
    question: 'Confirm which email address should receive data-protection requests.',
    why: 'The site only has a general enquiry address. A privacy-specific address is expected under the DPDP framework and the two should not be assumed to be the same.',
  },
  {
    id: 'grievance-officer',
    question: 'Confirm whether a Grievance Officer has been appointed, their name, and their contact details.',
    why: 'A grievance contact is a specific requirement. No such role appears anywhere in the project.',
  },
  {
    id: 'retention',
    question: 'Confirm how long enquiry records and newsletter subscriptions are kept, and what happens to them afterwards.',
    why: 'No retention period is implemented in code and none has been supplied. The policy states this gap rather than inventing a figure.',
  },
  {
    id: 'newsletter',
    question: 'Decide whether to publish the newsletter. The sign-up form exists in the code but is not shown on any page.',
    why: 'The component collects a name and email address but is never rendered, and the service behind it is a stub that does not transmit anything. Either publish it with the consent control now in place, or remove it. Until then the policy says no newsletter data is collected, which is the accurate position.',
  },
  {
    id: 'resend-terms',
    question: 'Confirm Resend\'s hosting locations, retention and international transfer arrangements against their current published terms.',
    why: 'The policy deliberately does not assert these. They must come from the vendor, not from this codebase.',
  },
  {
    id: 'hosting-region',
    question: 'Confirm the hosting region and any log-retention configuration for the deployment platform.',
    why: 'Not configured in this repository, so the policy does not state it.',
  },
  {
    id: 'deletion-process',
    question: 'Confirm the practical process and expected turnaround for honouring an erasure or correction request, and who operates it.',
    why: 'Enquiry emails are handed to a third-party mail provider. Deleting them from the studio mailbox may not be sufficient on its own, and the client should confirm the real procedure.',
  },
  {
    id: 'minor-use',
    question: 'Confirm whether the site is intended to be used by anyone under 18.',
    why: 'Verifying parental consent for a user below 18 is a distinct obligation, and the site collects phone numbers and event dates. Nothing in the code indicates the intended age policy.',
  },
]
