'use client'

import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import {
  Contents,
  DataTable,
  LegalPage,
  List,
  ReviewNote,
  Section,
  SubHeading,
} from '@/components/privacy/LegalPage'
import { BROWSER_STORAGE, CONSENT_CATEGORIES, PRIVACY_POLICY_ROUTE } from '@/config/privacy'
import { siteConfig } from '@/config/site'

const CONTENTS = [
  { id: 'summary', label: 'The short version' },
  { id: 'no-cookies', label: 'We set no cookies' },
  { id: 'storage', label: 'What we store in your browser' },
  { id: 'no-tracking', label: 'No advertising or third-party analytics' },
  { id: 'maps', label: 'The Google map' },
  { id: 'control', label: 'Clearing or controlling this storage' },
  { id: 'questions', label: 'Questions' },
]

export default function CookiePolicyPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Cookie Policy | {siteConfig.seo.title}</title>
        <meta
          name="description"
            content="This website sets no cookies of its own. This page explains exactly what browser storage it uses, and the one third-party embed you can choose to allow."
        />
      </Helmet>

      <LegalPage
        title="Cookie Policy"
          description="The short version: this website sets no cookies of its own and runs no third-party analytics. This page lists the browser storage it does use, why, and the one optional third-party embed."
      >
        <Contents items={CONTENTS} />

        <Section id="summary" title="The short version">
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span aria-hidden="true" className="font-semibold text-primary">
                &#10003;
              </span>
              <span>No cookies are set by this website.</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="font-semibold text-primary">
                &#10003;
              </span>
              <span>No Google Analytics, Meta Pixel, or any other advertising or analytics tracker.</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="font-semibold text-primary">
                &#10003;
              </span>
              <span>No cross-site advertising cookies and nothing sold to third parties.</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="font-semibold text-primary">
                &#10003;
              </span>
              <span>Some local and session storage is used, none of it containing your name, contact details or message.</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="font-semibold text-primary">
                &#10003;
              </span>
              <span>One optional third-party item exists — the Google map — and it does not load unless you allow it.</span>
            </li>
          </ul>
        </Section>

        <Section id="no-cookies" title="We set no cookies">
          <p>
            There is no <code className="rounded bg-cream px-1 py-0.5 text-[13px]">document.cookie</code>{' '}
            usage anywhere in this website&apos;s code. This site sets no cookies of
            its own, and its own pages load no script that sets one.
          </p>
          <p>
            We are telling you this plainly because most cookie banners describe a
            long list of tracking cookies. This site does not have one, and a
            policy that pretended otherwise would be inaccurate.
          </p>
          <p>
            One caveat, stated honestly rather than buried: if you choose to allow
            the Google map, the map is loaded from Google, and a third party
            embedded in a page is free to set its own cookies. That is outside
            our control and outside our code, so we have not listed specific
            Google cookie names here, because we have not verified them and we
            will not guess. If you would rather no third party can set anything
            at all, leave the map switched off.
          </p>
          <ReviewNote title="the map embed has not been inspected in a live browser">
            <p>
              The claim above is limited to what this repository does. Before
              launch, load the contact page with the map allowed and record which
              Google domains are contacted and what storage they set. Until that
              has been done, no specific Google cookie should be named in this
              policy, and none is named.
            </p>
          </ReviewNote>
        </Section>

        <Section id="storage" title="What we store in your browser">
          <p>
            Your browser has two storage facilities that work without cookies.
            This website uses all three of the entries below and nothing else.
          </p>
          <DataTable
            caption="Browser storage used by this website"
            columns={['What', 'Type', 'Why', 'What is inside it', 'How long']}
            rows={BROWSER_STORAGE.map((entry) => [
              <span key="name" className="font-medium text-night">
                {entry.name}
              </span>,
              entry.technology,
              entry.purpose,
              entry.contents,
              entry.duration,
            ])}
          />
          <p>
            None of these entries is sent to us or to anyone else. They exist only
            in your own browser, and we cannot read them from our side.
          </p>
          <ReviewNote title="confirm these purposes still apply">
            <p>
              If you add a feature that stores more — a saved address, a wish
              list, a currency or language preference — it must be added to this
              table and to the privacy policy in the same change.
            </p>
          </ReviewNote>
        </Section>

        <Section id="no-tracking" title="No advertising or third-party analytics">
          <p>
            This website contains no Google Analytics, no Google Tag Manager, no
            Meta or Facebook Pixel, no Microsoft Clarity, no Hotjar, and no
            advertising or retargeting tag of any kind. The
            <span className="whitespace-nowrap"> Google Tag Manager </span>
            identifier field exists in the site settings, but it is empty and no
            tag container is ever loaded.
          </p>
          <SubHeading>The one measurement feature that does exist</SubHeading>
          <p>
            The site keeps a small log of interactions — which buttons you
            clicked, which enquiry form you opened — in your browser&apos;s local
            storage. It records an event name, a timestamp and non-identifying
            values such as the type of enquiry or a product id. If you arrive
            from a link, the referring page URL and its campaign parameters are
            recorded too. It never records your name, email, phone number or
            message, it is never uploaded anywhere, and we cannot see it.
          </p>
          <p>
            We are describing this openly rather than quietly leaving it out,
            because it is technically a form of measurement. In practice it
            cannot identify you, and because it never leaves your browser it
            cannot be used to build a profile about you.
          </p>
        </Section>

        <Section id="maps" title="The Google map">
          <p>
            The contact page has an embedded Google map showing the store. This
            is the only part of the website that contacts a third party, and it
            is optional.
          </p>
          <p>
            Until you agree, nothing is requested from Google at all — the map
            area shows a placeholder with a &ldquo;Show the map&rdquo; button, and
            no request reaches Google, so your IP address and referring page are
            not disclosed when you load the page. If you agree, the map loads and
            Google receives the data any website receives from a third-party
            embed, including your IP address and browser information.
          </p>
          <p>
            You can change your mind either way using the &ldquo;Hide the map and
            withdraw this permission&rdquo; link under the map, or the privacy
            control in the corner of the screen.
          </p>
          {CONSENT_CATEGORIES.filter((c) => !c.required).map((category) => (
            <p key={category.id}>
              <span className="font-medium text-night">{category.label}:</span>{' '}
              {category.purpose} Provided by {category.provider}.
            </p>
          ))}
        </Section>

        <Section id="control" title="Clearing or controlling this storage">
          <p>You can remove all of it at any time, in any of these ways:</p>
          <List
            items={[
              'Use the privacy control in the bottom-left corner of the screen, or the "Manage Privacy Settings" link in the footer, to change or withdraw your choices.',
              'Clear site data for this domain in your browser settings. The site works normally afterwards; you will simply be shown the privacy notice again and your recently viewed list will be empty.',
              'Block or clear storage for this site in your browser privacy settings.',
            ]}
          />
          <p>
            Because nothing is stored on our servers, we cannot delete this
            storage for you — but equally, it is not linked to you on our side, so
            there is nothing for us to hold.
          </p>
        </Section>

        <Section id="questions" title="Questions">
          <p>
            If anything here is unclear, or you want to know something about your
            data, email{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              {siteConfig.contact.email}
            </a>{' '}
            or call {siteConfig.contact.phone}.
          </p>
          <p>
            This page should be read alongside our{' '}
            <a
              href={PRIVACY_POLICY_ROUTE}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              Privacy Policy
            </a>
            , which covers the personal information you give us through the forms.
          </p>
        </Section>
      </LegalPage>
    </PageTransition>
  )
}
