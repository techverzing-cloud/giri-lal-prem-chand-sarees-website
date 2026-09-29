'use client'

import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import {
  Contents,
  LegalPage,
  List,
  ReviewNote,
  Section,
} from '@/components/privacy/LegalPage'
import {
  COOKIE_POLICY_ROUTE,
  PRIVACY_POLICY_ROUTE,
  PRIVACY_POLICY_VERSION,
} from '@/config/privacy'
import { siteConfig } from '@/config/site'

/**
 * The Terms page uses the same `LegalPage` shell as the Privacy Policy and the
 * Cookie Policy. That is deliberate: the shell owns the reading width
 * (`max-w-3xl`), the header block, the section spacing and the bottom padding,
 * so all three legal pages stay in step and the footer always follows the
 * content instead of landing inside it.
 *
 * The previous version of this page used `PageHeader` + `Container` with a
 * `prose` class. There is no `@tailwindcss/typography` plugin in this project,
 * so `prose` resolved to nothing, and because Tailwind's preflight zeroes every
 * margin and `globals.css` only restores heading font-family and weight, the
 * bare `<h2>` elements rendered at body size with no space above them and the
 * paragraphs sat flush against each other.
 */
const CONTENTS = [
  { id: 'about-these-terms', label: 'About these terms' },
  { id: 'using-the-website', label: 'Using this website' },
  { id: 'products-and-collections', label: 'Products and collections' },
  { id: 'enquiries', label: 'Enquiries and communication' },
  { id: 'intellectual-property', label: 'Intellectual property' },
  { id: 'external-links', label: 'External links and embedded content' },
  { id: 'availability', label: 'Website availability' },
  { id: 'your-data', label: 'Your data and privacy' },
  { id: 'changes', label: 'Changes to these terms' },
  { id: 'contact', label: 'How to contact us' },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', href: siteConfig.social.instagram },
  { label: 'Facebook', href: siteConfig.social.facebook },
  { label: 'YouTube', href: siteConfig.social.youtube },
  { label: 'Pinterest', href: siteConfig.social.pinterest },
]

export default function TermsPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Terms of Service | {siteConfig.seo.title}</title>
        <meta
          name="description"
          content="The terms that apply when you use the Giri Lal Prem Chand Sarees website, including how to browse, enquire and contact the studio."
        />
      </Helmet>

      <LegalPage
        title="Terms of Service"
        description="These terms apply when you use this website. They are written to match what the site actually does, so you can see exactly what you are agreeing to."
      >
        <Contents items={CONTENTS} />

        <Section id="about-these-terms" title="About these terms">
          <p>
            These terms apply to everyone who uses this website, which is operated
            by {siteConfig.company.name}. Please read them carefully before using
            this website.
          </p>
          <p>
            There is nothing to sign and no account to create. Using the site means
            you accept these terms; if you do not accept them, please stop using
            the site and contact us instead.
          </p>
          <p>
            We have written these terms to describe what this website actually
            does, based on its own code. Where something is not yet decided, we
            have said so rather than filling the gap with a guess. Items marked{' '}
            <span className="whitespace-nowrap font-medium text-primary">
              Client/legal review required
            </span>{' '}
            are deliberate placeholders and must be completed by the business
            before the site goes live.
          </p>
          <ReviewNote title="governing law and jurisdiction">
            <p>
              No governing law or jurisdiction is stated anywhere in this project.
              The registered legal entity, the law that applies to these terms, and
              the courts or forum a dispute would be settled in all need to be
              confirmed and written into this section. Nothing has been assumed
              here, because guessing a jurisdiction is not something a website
              template can do on the business&apos;s behalf.
            </p>
          </ReviewNote>
        </Section>

        <Section id="using-the-website" title="Using this website">
          <p>
            This website is for informational and showcase purposes. You can
            browse the collections, view individual products, read the journal,
            and get in touch through the enquiry, contact and book-a-consultation
            forms.
          </p>
          <p>There are some practical things worth knowing up front:</p>
          <List
            items={[
              'There is no account, no login and no password on this website, and we will never ask you for one.',
              'There is no checkout and no payment processing, so nothing can be ordered, reserved or paid for through the website.',
              'We do not ask for your Aadhaar, PAN, payment card or bank details, because we never need them.',
              'Please use the site only for lawful purposes, and leave the enquiry forms for genuine enquiries about our products and services.',
            ]}
          />
        </Section>

        <Section id="products-and-collections" title="Products and collections">
          <p>
            The website showcases two labels:{' '}
            {siteConfig.brand.girilal.name}, trading since{' '}
            {siteConfig.brand.girilal.since}, and {siteConfig.brand.arunima.name},
            trading since {siteConfig.brand.arunima.since}. The collections and
            individual pieces shown are there to show you what we make and to give
            you something concrete to enquire about.
          </p>
          <p>
            Product photography and descriptions are a guide to the piece. Fabrics,
            colours and weaves vary between batches, and a screen cannot show you
            how a fabric feels or drapes, which is why we would always rather talk
            you through a piece than have you judge it from a photograph.
          </p>
          <p>
            Because the site has no checkout, the only route to anything you see
            here is an enquiry. That keeps it simple: you tell us what you are
            interested in, and a member of the team comes back to you.
          </p>
          <ReviewNote title="pricing, availability, ordering and returns are not defined">
            <p>
              The project contains no pricing, stock, delivery, returns or
              cancellation rules, and this site takes no payments, so none of that
              is written into these terms. If the business wants to state prices,
              lead times, delivery areas, alteration, return or cancellation terms,
              they need to be agreed and added to this section. Until they are, the
              only thing that commits either of us to anything is a conversation
              with the studio.
            </p>
          </ReviewNote>
        </Section>

        <Section id="enquiries" title="Enquiries and communication">
          <p>
            Submitting an enquiry does not constitute a binding agreement. We will
            contact you to discuss your requirements.
          </p>
          <p>Here is what happens to one:</p>
          <List
            ordered
            items={[
              'You fill in an enquiry, contact or product enquiry form and tick the consent box. The box is never pre-ticked.',
              'Your browser sends the form to this website\'s own server, which checks it. Nothing is sent anywhere else first.',
              'The server emails your enquiry to our studio inbox, and refuses to send anything if the consent box was not ticked.',
              'A member of the team reads it and contacts you using the details you gave us.',
            ]}
          />
          <p>
            No copy of your enquiry is stored in a database by this website, and
            your enquiry is not shown on any public page. We will only use the
            details you gave us to answer you, and to send you the journal if you
            separately asked to receive it.
          </p>
          <ReviewNote title="what happens after an enquiry is answered">
            <p>
              Once an enquiry has been dealt with, the studio decides what to do
              with the email. Confirm the intended procedure, including whether the
              message is deleted from the studio mailbox and any backups, and add
              the answer to this section.
            </p>
          </ReviewNote>
        </Section>

        <Section id="intellectual-property" title="Intellectual property">
          <p>
            All content, including images and text, is the property of{' '}
            {siteConfig.company.name}. All content on this website is protected by
            applicable intellectual property laws.
          </p>
          <p>
            That covers the written copy, the photography, the product and
            collection names, and the brand names {siteConfig.brand.girilal.name}{' '}
            and {siteConfig.brand.arunima.name} with their logos. Please do not
            reproduce them commercially or present them as your own without
            written permission.
          </p>
          <p>
            This site is developed and maintained by {siteConfig.company.developer}.
            They built and look after the website; they are not the studio and are
            not a party to a conversation with you about a product.
          </p>
          <ReviewNote title="no written licence or reuse terms exist">
            <p>
              There is no written permission template, image-licensing position or
              reuse policy in this project. If the business wants to allow any
              press, blog or partner to reuse photography or copy, the terms of that
              permission need to be written down here. Nothing has been assumed
              about what is permitted.
            </p>
          </ReviewNote>
        </Section>

        <Section id="external-links" title="External links and embedded content">
          <p>
            Some parts of this website take you somewhere else. Opening one of them
            leaves this website, and the site you land on is run by somebody else
            under its own terms and privacy policy, which we do not control.
          </p>
          <List
            items={SOCIAL_LINKS.map(
              (link) =>
                `${link.label} — the social links in the footer take you to that platform. Nothing is loaded from it while you are on this site.`
            )}
          />
          <p>
            The Google map on the contact page is the only third-party embed on
            this website, and it is optional: nothing is requested from Google
            until you allow it, and you can change your mind at any time with the
            privacy control on the screen. Once it loads, Google's own terms apply
            to it.
          </p>
          <p>
            A link to {siteConfig.company.developer} appears in the footer as a
            development credit, and the share buttons in the journal open WhatsApp
            or X in a new tab when you use them.
          </p>
        </Section>

        <Section id="availability" title="Website availability">
          <p>
            We keep this website online so you can browse our collections and reach
            us. It can be unavailable during maintenance, or for reasons outside
            our control.
          </p>
          <p>
            Nothing on this site is time-critical. If it is down when you visit,
            the fastest way to reach us is by phone or email using the details at
            the end of these terms, and the enquiry form will be working again as
            soon as the site is.
          </p>
          <ReviewNote title="warranty, liability and availability wording">
            <p>
              There is no warranty, liability, disclaimer or acceptable-use
              wording written anywhere in this project, and none has been invented
              for this page. Disclaimers about fitness for purpose, limitation of
              liability, and any exclusion of indirect loss are exactly the kind of
              wording that has to come from a lawyer for this business. Please add
              them here, together with the formal acceptable-use rules, before
              launch.
            </p>
          </ReviewNote>
        </Section>

        <Section id="your-data" title="Your data and privacy">
          <p>
            What we collect through the forms, why we collect it and how long we
            keep it is set out in full in our{' '}
            <a
              href={PRIVACY_POLICY_ROUTE}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              Privacy Policy
            </a>
            , currently version {PRIVACY_POLICY_VERSION}. The browser storage this
            site uses, including the fact that it sets no cookies of its own, is
            covered in our{' '}
            <a
              href={COOKIE_POLICY_ROUTE}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              Cookie Policy
            </a>
            .
          </p>
          <p>
            The privacy control in the bottom-left corner of the screen, and the
            &ldquo;Manage Privacy Settings&rdquo; link in the footer, let you review
            or withdraw the choices you have made, including the Google map.
          </p>
        </Section>

        <Section id="changes" title="Changes to these terms">
          <p>
            We will update this page when these terms change. Every update carries
            a version number and a date at the top of the page, so you can always
            see which version you are reading.
          </p>
          <p>
            Continuing to use the website after a change means the updated terms
            apply from then on. If a change affects what you have already agreed
            to, the privacy notice will ask you again rather than carrying your old
            answer forward.
          </p>
          <ReviewNote title="no way to notify visitors of a change">
            <p>
              Nothing in this project emails visitors or shows them a notice when
              these terms are updated; the only signal is the version and date at
              the top of this page. If the business wants a stronger notice, that
              mechanism needs to be built and this section updated to describe it.
            </p>
          </ReviewNote>
        </Section>

        <Section id="contact" title="How to contact us">
          <p>
            For any questions, please contact us at{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              {siteConfig.contact.email}
            </a>
            , or call{' '}
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              {siteConfig.contact.phone}
            </a>
            . The studio is at {siteConfig.contact.address}, and we are open{' '}
            {siteConfig.contact.businessHours}.
          </p>
          <p>
            If your question is about your personal information rather than these
            terms, please say so in your message and it will be handled as a data
            protection request.
          </p>
        </Section>
      </LegalPage>
    </PageTransition>
  )
}
