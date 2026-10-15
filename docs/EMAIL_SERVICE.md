# Email Service (Resend)

Website enquiries are delivered by [Resend](https://resend.com) from a Next.js
route handler. The API key never reaches the browser.

## How it works

```
Form (React Hook Form + Zod)
  └─ useEnquiry / useConsultationForm / EnquiryModal
       └─ buildEnquiryPayload()      src/services/enquiry/index.ts
            └─ submitEnquiry()
                 └─ sendEnquiryEmail()   src/services/email/index.ts
                      └─ POST /api/enquiry   src/app/api/enquiry/route.ts
                           ├─ Zod validation (server-side, independent of the form)
                           └─ src/lib/resend.ts
                                ├─ sendEnquiryNotification()  →  studio inbox
                                │     └─ HTML  src/emails/EnquiryNotificationEmail.ts
                                └─ sendEnquiryConfirmation()  →  customer (best-effort)
                                      └─ HTML  src/emails/EnquiryConfirmationEmail.ts
```

| Concern | Where |
| --- | --- |
| Payload shape | `src/types/enquiry.ts` |
| Form → payload mapping | `src/services/enquiry/index.ts` |
| Browser → API transport | `src/services/email/index.ts` |
| Validation, HTTP status codes | `src/app/api/enquiry/route.ts` |
| Resend client, env handling | `src/lib/resend.ts` |
| Shared theme, colours, label maps | `src/emails/theme.ts` |
| Studio notification markup | `src/emails/EnquiryNotificationEmail.ts` |
| Customer confirmation markup | `src/emails/EnquiryConfirmationEmail.ts` |

### Two emails per enquiry

1. **Studio notification** — sent to `RESEND_TO_EMAIL`, with `replyTo` set to the
   visitor so replying reaches them directly.
2. **Customer confirmation** — sent to the visitor when they left an email
   address, with `replyTo` set to `RESEND_TO_EMAIL` so replies land in the
   studio inbox. Skipped when the email field is blank.

The confirmation is **best-effort**: if Resend rejects it the enquiry is still
returned as a success (the studio already has it) and the failure is logged
server-side. It never echoes internal data — no price, no device, screen or
attribution fields.

## Environment variables

Server-side only. Never prefix any of these with `NEXT_PUBLIC_`.

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend dashboard → API Keys |
| `RESEND_FROM_EMAIL` | yes | A verified sender on your Resend account |
| `RESEND_TO_EMAIL` | yes | The studio inbox that should be alerted |

```bash
cp .env.example .env.local
```

Then fill in real values. **No placeholder addresses are shipped.** If any
variable is missing the endpoint returns `503` and logs which one is absent
server-side, rather than sending from a fake sender.

`.env` and `.env.*` are git-ignored (`.env.example` is committed as a template).
`RESEND_API_KEY` must never be committed, logged, or returned from the API.

## Verifying the sender

Resend will reject mail from an unverified domain.

1. Resend dashboard → **Domains** → add your sending domain.
2. Add the DNS records Resend shows (SPF, DKIM, and a DMARC record).
3. Wait for verification, then set `RESEND_FROM_EMAIL` to an address on that
   domain.

For a quick test before DNS is set up, Resend offers an onboarding sender
address that works without a verified domain. Use it only for testing.

## Customising the email

`src/emails/theme.ts` is the single place for colours, fonts, the studio name,
the site URL and the enquiry label maps. Change values there to re-skin both
emails at once.

`src/emails/EnquiryNotificationEmail.ts` (studio) and
`src/emails/EnquiryConfirmationEmail.ts` (customer) are each built from small
independent section functions (`header`, `summarySection`, `contactSection`,
`messageBlock`, …). Reorder or drop any of them in the composition at the
bottom of the exported function. Every template also exports a plain-text
alternative (`enquiryNotificationText`, `enquiryConfirmationText`) — update it
alongside any markup change so both parts stay in sync.

Colours currently match `src/styles/globals.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--color-primary` | `#8E2D29` | Preferred-contact banner, links |
| `--color-night` | `#111717` | Header background |
| `--color-gold` | `#C9A96E` | Section labels |
| `--color-cream` | `#FFF8F3` | Section backgrounds |
| `--color-border` | `#E5D5CC` | Rules and table borders |
| heading | Cormorant Garamond | Headings |
| body | Manrope | Everything else |

All styles are inline and the markup is table-based, because email clients strip
`<style>` blocks. Web fonts are referenced by name only; clients without them
fall back to Georgia/Helvetica via the stacks in `BRAND`.

## Status codes

| Status | Meaning | Client sees |
| --- | --- | --- |
| `200` | Delivered to Resend | success message, redirects to `/thank-you` |
| `400` | Body was not valid JSON, or failed Zod validation | "Invalid enquiry: …" |
| `502` | Resend rejected the message | "…reach us directly on WhatsApp." |
| `503` | A required env var is missing | "…reach us directly on WhatsApp." |
| `500` | Unexpected server error | "Something went wrong. Please try again." |

Provider errors are logged server-side and never returned to the browser.

## Testing

```bash
npm run dev
```

1. Start the dev server.
2. Submit the contact form at `/contact`, or a product enquiry from any product
   page.
3. Confirm the API responds `200`, the notification arrives in
   `RESEND_TO_EMAIL`, and — when an email address was entered — the customer
   receives the confirmation.
4. Reply to the notification and confirm it goes to the customer's address
   (`replyTo`); reply to the confirmation and confirm it goes to the studio.

To confirm failures are surfaced rather than swallowed, temporarily unset
`RESEND_TO_EMAIL` and submit again: the form must show the failure state and
must not navigate to the thank-you page.

Resend also exposes a delivery log (dashboard → **Logs**) for confirming the
`replyTo` and the final recipient.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| Form reports failure, server logs `email service not configured` | A required variable is missing |
| `403`/`550` from Resend | Sender domain not verified |
| Email arrives but `Reply` goes to the studio | `replyTo` was empty, i.e. the customer left the email field blank |
| Link previews or styles look wrong | Email client stripped CSS; expected for `background-image`, and some clients strip `border-radius` |

## Local scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # oxlint
```
