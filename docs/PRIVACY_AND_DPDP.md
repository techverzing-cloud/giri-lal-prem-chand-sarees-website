# Privacy & DPDP Implementation

Development documentation for the privacy and personal-data-protection layer added
to the Giri Lal Prem Chand Sarees website.

> **This is a technical document, not legal advice.** It records what the code
> actually does. It does not claim the site is DPDP compliant, and several items
> in it are deliberately left blank because the information does not exist in the
> project. See [Legal Review](#legal-review).

---

## Personal Data Collected

Derived from an audit of `src/`, not from assumption. The authoritative list is
`PERSONAL_DATA_COLLECTED` in `src/config/privacy.ts`.

| Data | Source | Required? |
| --- | --- | --- |
| Name | contact form, consultation, product enquiry | Yes |
| Email address | contact form, consultation, product enquiry | Yes |
| Phone number | contact form, consultation, product enquiry | Yes |
| City | consultation, product enquiry | No |
| Message | contact form, consultation, product enquiry | Yes |
| Occasion, wedding date, budget, collection | consultation, product enquiry | No |
| Product enquired about | product enquiry modal | No |
| Page URL, referrer, UTM parameters | attached automatically to every enquiry | No |
| Browser user-agent, screen size | attached automatically to every enquiry | No |
| Event timestamp | attached automatically to every enquiry | No |

**Newsletter:** `NewsletterSignup` collects a name and email address, but it is
**not rendered on any page** and the service behind it is a stub that transmits
nothing. The privacy policy therefore states that no newsletter data is
collected today. The consent control has been added to the component so it is
compliant if it is ever published, and the service no longer logs the submitted
name and email. See [Client Information Required](#client-information-required).

**Explicitly not collected anywhere in the project:** passwords, accounts,
payment card details, Aadhaar/PAN, national ID numbers, and social-media login
data. There is no checkout, no login and no registration on this site.

### Data minimisation flags

Three fields are collected but are not strictly needed to answer an enquiry. They
are **flagged, not removed** — deleting a field the business depends on is not a
privacy decision to make unilaterally:

- **City** — also required on the product enquiry form.
- **Wedding date** — identifies a specific individual event.
- **Full referring URL** — the referring *domain* alone would likely serve the
  same purpose, and the full URL is currently emailed to the studio inbox.
- **Full user-agent string** — a coarser device category would probably do.

---

## Processing Purposes

Three, and nothing beyond them:

1. Responding to enquiries, by email, phone or WhatsApp as requested.
2. Preparing for a consultation, store visit or order.
3. Sending the GLPC Journal — **only** where separately and explicitly opted in.

Not done: advertising, profiling, or selling/renting data to anyone.

---

## Consent Mechanism

Two independent consent mechanisms, because they answer different questions.

### 1. In-form consent (per submission)

Every form that sends personal data has an unticked, required checkbox
immediately before the submit button, linked to `/privacy-policy`. This is the
consent to process that specific enquiry.

Implemented once in `src/components/privacy/ConsentCheckbox.tsx` and used by:

| Form | File |
| --- | --- |
| Contact form | `src/components/enquiry/ContactForm.tsx` |
| Product enquiry modal | `src/components/product/EnquiryModal.tsx` |
| Multi-step consultation | `src/components/enquiry/ConsultationForm.tsx` |
| Journal newsletter | `src/components/journal/NewsletterSignup.tsx` — **not rendered on any page**, and there is no `/journal` route |

### 2. Site-level privacy preferences (once per browser)

A bottom-left notice, `src/components/privacy/ConsentBanner.tsx`, offering:

- **Accept** — grants the optional categories.
- **Essential only** — a first-class outcome, not a rejection. The site is fully
  usable either way; this choice only determines whether the Google map loads.
- **Manage** — per-category checkboxes via the footer's *Manage Privacy
  Settings* link or the `Privacy` control in the corner.

The notice is `role="dialog"` with `aria-modal="false"`: it never traps focus and
never blocks the page, because nothing here requires consent before the site can
be used.

### What was actually wrong before this work

- `ContactForm` and `EnquiryModal` had **no consent checkbox at all** and passed
  `agreedToPrivacy: true` unconditionally — consent was fabricated for the user.
- `buildEnquiryPayload()` used `data.agreedToPrivacy ?? true`, so a missing value
  was silently upgraded to consent.
- The server schema used `z.boolean().default(false)`, which accepted an explicit
  `false` and accepted the field being absent. Consent was recorded but never
  enforced.

---

## Contact Form Consent

Enforced at three independent layers.

**1. Client-side schema** — `z.literal(true)` with a custom message, in each
form's Zod schema. `z.literal` is used rather than `z.boolean()` because a boolean
type accepts `false`.

**2. Default state** — `defaultValues.agreedToPrivacy` is `false` in
`EnquiryModal`. The checkbox is never pre-checked anywhere.

**3. Server-side** — `src/app/api/enquiry/route.ts` validates with:

```ts
metadata: z.object({
  agreedToPrivacy: z.literal(true, {
    errorMap: () => ({ message: 'Consent to the Privacy Policy is required' }),
  }),
  campaign: z.string().trim().max(200).optional(),
})
```

`z.literal(true)` also makes `metadata` itself mandatory, so consent cannot be
bypassed by omitting the object. Verified against a running server:

| Request | Result |
| --- | --- |
| `agreedToPrivacy: true` | 200 |
| `agreedToPrivacy: false` | 400 + consent message |
| `agreedToPrivacy: "true"` (string) | 400 |
| `agreedToPrivacy: 1` | 400 |
| `agreedToPrivacy` absent | 400 |
| `metadata: {}` | 400 |
| `metadata` absent | 400 |
| `metadata: null` | 400 |

The endpoint returns `400` with a plain-language message and never forwards an
unconsented enquiry.

---

## Consent Storage

`localStorage`, key `glpc-consent` (defined in `src/config/privacy.ts`).

```json
{ "granted": ["maps"], "version": "1.0", "timestamp": "2026-09-28T10:00:00.000Z" }
```

- No server-side consent record: there is no account system and nothing
  identifies a visitor server-side, so a server record would be unjustified.
- **No personal data is stored** — booleans, a version string and a timestamp
  only. Verified by test.
- Corruption-safe: malformed or hand-edited values are discarded and the visitor
  is re-asked, rather than being trusted.
- Categories are validated against the live `CONSENT_CATEGORIES` list, so a stale
  value cannot smuggle in a category that no longer exists.
- Cross-tab: a `storage` listener keeps open tabs consistent.
- Fails open: if storage is unavailable (private browsing) the site still works
  and the notice simply reappears next visit.

### Other storage on the site (unchanged by this work)

| Key | Type | Contents |
| --- | --- | --- |
| `glpc-recently-viewed` | localStorage | product ids only |
| `glpc-analytics-events` | localStorage | up to 100 interaction events |
| `glpc-session-id` | sessionStorage | random UUID, cleared with the tab |

None of these contain personal data, and none of them are transmitted.

---

## Consent Withdrawal

Practical, and it actually does something:

1. **Footer → "Manage Privacy Settings"** reopens the panel with the current
   choices pre-selected.
2. **The `Privacy` control** in the bottom-left corner does the same, and appears
   only after a decision exists.
3. **"Withdraw my consent and decide again"** inside the panel clears the record.
4. **Per-category withdrawal** on the contact page — "Hide the map and withdraw
   this permission" removes the map immediately and unloads the iframe.

Implemented through a small request bus in `src/lib/consent.ts`
(`requestConsentPanel()` / `subscribeToPanelRequests`), so the footer can open
the banner without threading React context through the tree.

Withdrawing does not undo processing that already happened — stated plainly in
the policy rather than glossed over.

---

## Privacy Policy

- **Route:** `/privacy-policy`
- **View:** `src/views/PrivacyPolicy/index.tsx`
- **Legacy path:** `/privacy` uses Next's `redirect()`, which returns **307**,
  not 301. This was verified against the running server. 307 is correct here and
  is better than 301 for a redirect: the browser and search engines are told to
  re-evaluate at the new URL rather than cache a permanent mapping. Existing
  links and any indexed URL keep working. If a hard 301 is required later, set
  the status explicitly and update this line and the test below.

Content is generated from the config tables in `src/config/privacy.ts`, so the
page cannot drift out of sync with the audit. Sections: who is responsible, what
is collected, why, when necessary, how enquiries are processed, cookies, third
parties, sharing, retention, security, rights, consent, grievance, children,
changes, contact, and a table of open client items.

Anything unknown is rendered as a visible `role="note"` block reading
**Client/legal review required** — never as a plausible-sounding guess.

---

## Cookie Policy

- **Route:** `/cookie-policy`
- **View:** `src/views/CookiePolicy/index.tsx`

Created because the site does use browser storage that is worth documenting
alongside consent, even though it sets **no cookies at all**. There is no
`document.cookie` usage in `src/` and the policy says so directly rather than
padding out a fictional cookie list.

Contents: a plain summary; the "no cookies" statement; the four storage entries
that genuinely exist; the absence of any analytics or ad tech; the Google map;
and how to clear or change everything.

---

## Third-Party Services

The complete list. Anything not here does not receive data.

| Service | Role | Notes |
| --- | --- | --- |
| **Resend** | Delivers enquiry email | Real, configured, verified working |
| **Google LLC** | Embedded map on `/contact` | Consent-gated; not requested until allowed |
| **Hosting provider** | Serves the site | **Unnamed on purpose** — no deployment target is set in this repository, so naming one would be a guess. Described in plain words in the policy; region and log retention are open questions. |

The earlier draft of this document listed Vercel as a confirmed processor. That
was removed: nothing in the repository selects a host, and naming a vendor that
may not be the one in use is exactly the kind of invented fact this document
exists to prevent.
| **Vercel** | Hosting | **Not configured in this repository** — flagged for verification |

Facebook, Instagram, YouTube and Pinterest appear in the footer as ordinary
outbound links only. Nothing is loaded from them.

### What is *not* present (verified by searching `src/`)

Google Analytics · Google Tag Manager · Meta Pixel · Facebook tracking ·
Microsoft Clarity · Hotjar · any advertising or retargeting pixel · any
server-side tracking script.

`siteSettings.googleTagManagerId` is an empty string and no tag container is ever
loaded, so GTM is not running. The admin UI lists a GTM field, but nothing reads
it at runtime.

---

## Resend

```
Browser form
  └─> POST /api/enquiry        (JSON, HTTPS)
        ├─> Zod validation     (schema duplicated server-side, not trusted)
        ├─> consent check      (z.literal(true), rejects the request if false)
        └─> Resend API         (server-to-server, key never leaves the server)
              └─> studio inbox
```

- Recipient unchanged: `RESEND_TO_EMAIL`.
- `replyTo` set to the customer's email, so replying reaches them directly.
- The customer receives no automatic confirmation. The enquiry is an internal
  notification, as originally specified.
- API key read only in `src/lib/resend.ts`, whose sole importer is the route
  handler. Verified absent from every file in `.next/static`.
- The only thing that can fail is delivery: 503 if a variable is missing, 502 if
  Resend rejects, 400 for a bad or unconsented payload. Provider messages are
  logged server-side and never returned to the browser.

### Resend facts deliberately not asserted

Hosting locations, data retention and international transfer arrangements are
**not** stated in the policy. They must come from Resend's current published
terms, not from this codebase. The policy carries a *Client/legal review
required* marker instead.

---

## Analytics/Tracking

`src/services/analytics/index.ts` is **first-party and local-only**. It writes
to `localStorage` and never makes a network request. There is no third-party
analytics to gate, so no analytics consent-gating logic was added — inventing a
gate for a service that does not exist would be noise.

Its contents were audited call-site by call-site: enquiry type, success flag,
product id, button name, FAQ question (site copy), lead source, referrer, HTTP
status. No name, email, phone number or message text.

The referrer URL *is* recorded, and the cookie policy says so explicitly rather
than describing the log as purely non-identifying.

Because it never leaves the browser it cannot build a profile, so it is
classified `necessary` and is not gated. The policy explains this reasoning
instead of silently omitting it.

---

## User Rights

Explained in the policy: access, correction, erasure, withdrawal of consent,
cessation of processing and direct marketing, nomination of a representative,
and a summary of complaints.

Request route: the general contact email and phone, which already exist in
`src/config/site.ts`. **No dedicated privacy address has been invented.**

Not implemented, deliberately:

- No self-service rights portal. The project has no account system or backend
  user store to attach one to, so it would be theatre.
- No identity verification flow. Inventing a KYC-style check for a
  six-field enquiry would be disproportionate.

Two gaps are flagged rather than papered over: the privacy contact and response
times are unconfirmed, and erasure is harder than deleting an email because the
studio mailbox is a third-party provider.

---

## Security Measures

Actual measures, not aspirations:

| Measure | Where |
| --- | --- |
| `RESEND_API_KEY` server-only, absent from client bundle | `src/lib/resend.ts` |
| Independent server-side Zod validation | `src/app/api/enquiry/route.ts` |
| Server-side consent enforcement | same |
| HTML-escaped email template, no `dangerouslySetInnerHTML` | `src/emails/EnquiryNotificationEmail.ts` |
| Provider errors logged, never returned | route handler |
| No personal data in URLs or query strings | forms POST to a route handler |
| Newsletter no longer logs the submitted payload | `src/services/newsletter/index.ts` |
| `.env` untracked, `NEXT_PUBLIC_` never used for secrets | `.gitignore`, `.env.example` |

`RESEND_API_KEY` was verified absent from all client assets after a production
build. The one pre-existing `console.debug` in the newsletter service that
printed the full submitted name and email has been removed.

Not claimed: no certifications, no encryption-at-rest claim, no security audit.
Access control on the studio mailbox sits outside this codebase.

---

## Client Information Required

None of the following is in the project, so none of it was invented. The full
list with rationale is in `CLIENT_INPUT_REQUIRED` in `src/config/privacy.ts` and
is rendered on the privacy page itself.

1. **Registered legal entity name and registered address** — the site shows a
   trading name and a store address, which is not the same thing.
2. **Which email receives data-protection requests** — only a general enquiry
   address exists.
3. **Grievance Officer name and contact details** — no such role appears anywhere.
4. **Retention periods** — not implemented, and **not invented**. *This is the
   most urgent gap: an absent retention period is itself a problem.*
5. **The newsletter sign-up** — `NewsletterSignup` is **not rendered on any
   page** and the service behind it transmits nothing. The policy now says no
   newsletter data is collected, which is the accurate position. Either publish
   it with the consent control now in place, or delete the component.
6. **Resend's hosting, retention and transfer arrangements** — from the vendor.
7. **Hosting region and log retention** — not configured in the repository.
8. **Erasure procedure and turnaround** — including provider-side limits.
9. **Intended minimum age / parental consent position** — the forms collect phone
   numbers and wedding dates.

---

## Legal Review

The following should be reviewed by the business's legal or privacy advisor
before launch:

- **All nine items above.** Especially the retention period.
- **The whole of `/privacy-policy` and `/cookie-policy` as wording.** The
  structure and accuracy are technical work; the phrasing is not.
- **Whether consent is the correct legal basis** for the enquiry forms, or
  whether processing should instead rest on the steps taken at the request of
  the Data Principal. The implementation supports consent, but the choice of
  basis is a legal judgement, and the two produce different obligations on
  withdrawal.
- **The mandatory fields.** The contact form makes email, phone and message
  required. If a visitor may contact you without a phone number, that needs
  revisiting.
- **A retention period, and the process that enforces it.** The policy currently
  states honestly that none has been set. That sentence should not survive
  launch.
- **Whether a Data Protection Officer or Grievance Officer must be appointed**,
  and their details added.
- **The newsletter.** `NewsletterSignup` is currently dead code — no page
  renders it. Decide whether to publish it or delete it, and do not describe the
  site as sending a journal until a real provider is connected.
- **The contact form's `subject` field.** It is marked required and validated,
  but it never reaches the payload, the API, the database or the email, so the
  visitor types it and it is silently discarded. Either carry it through to the
  studio or drop the field. It is disclosed in the policy's data table in the
  meantime, marked as collected-but-not-processed.

### What is deliberately absent from this implementation

No consent-management platform, no cookie-consent SDK, no analytics gateway, no
rights-request portal, no data inventory database, no server-side consent ledger.
The site's actual data flows are small enough that these would add cost and
complexity without improving compliance. If analytics or ad tech is added later,
the category list in `src/config/privacy.ts` is the place to extend, and those
scripts must not load before the corresponding consent exists.
