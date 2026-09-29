'use client'

import Link from 'next/link'
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
import {
  CLIENT_INPUT_REQUIRED,
  COOKIE_POLICY_ROUTE,
  PERSONAL_DATA_COLLECTED,
  THIRD_PARTIES,
} from '@/config/privacy'
import { siteConfig } from '@/config/site'

const CONTENTS = [
  { id: 'who-we-are', label: 'Who is responsible for your data' },
  { id: 'what-we-collect', label: 'What we collect' },
  { id: 'why-we-collect', label: 'Why we collect it' },
  { id: 'necessity', label: 'When your information is necessary' },
  { id: 'enquiries', label: 'How enquiries are processed' },
  { id: 'cookies', label: 'Cookies and browser storage' },
  { id: 'third-parties', label: 'Who else receives your data' },
  { id: 'sharing', label: 'Who we share your data with' },
  { id: 'retention', label: 'How long we keep it' },
  { id: 'security', label: 'How we protect it' },
  { id: 'your-rights', label: 'Your rights' },
  { id: 'consent', label: 'Consent and withdrawing it' },
  { id: 'grievance', label: 'Raising a grievance' },
  { id: 'children', label: 'Use by children' },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'How to contact us' },
]

export default function PrivacyPolicyPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Privacy Policy | {siteConfig.seo.title}</title>
        <meta
          name="description"
            content="How Giri Lal Prem Chand Sarees collects, uses and protects your personal information when you make an enquiry or contact us."
        />
      </Helmet>

      <LegalPage
        title="Privacy Policy"
        description="This policy explains what personal information this website collects, why it collects it, and what you can ask us to do with it."
      >
        <Contents items={CONTENTS} />

        <Section id="who-we-are" title="Who is responsible for your data">
          <p>
            This website is operated by {siteConfig.company.name}, which is the
            entity responsible for deciding why and how your personal
            information is used when you use this site.
          </p>
          <p>
            You can reach us at {siteConfig.contact.address}, or by email on{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
          <ReviewNote title="registered legal entity and registered address">
            <p>
              The site displays a trading name and a store address. Please
              confirm the exact registered legal entity name and its registered
              address, and replace this section with the registered details.
            </p>
          </ReviewNote>
        </Section>

        <Section id="what-we-collect" title="What we collect">
          <p>
            We only collect information through this website when you choose to
            give it to us by filling in a form. The table below is the complete
            list.
          </p>
          <DataTable
            caption="Personal information collected by this website"
            columns={['Information', 'Where you give it', 'Why', 'Required?']}
            rows={PERSONAL_DATA_COLLECTED.map((item) => [
              <span key="item" className="font-medium text-night">
                {item.item}
              </span>,
              item.where,
              item.purpose,
              item.required ? 'Yes' : 'No',
            ])}
          />

          <SubHeading>Collected automatically</SubHeading>
          <p>
            When you send an enquiry, the website also attaches some technical
            context to it: the page you were on, the site you came from, any
            campaign parameters in the link, your browser and screen information,
            and the time. This helps us answer you and understand which pages
            people find useful.
          </p>

          <SubHeading>Newsletter</SubHeading>
          <p>
            A newsletter sign-up form is included in this website&apos;s code and
            would collect your name and email address to send you the GLPC
            Journal. It is not currently shown on any page, so no newsletter
            information is being collected at the moment. If it is switched on,
            it will ask for your permission separately, because subscribing to a
            newsletter is a different decision from making an enquiry.
          </p>

          <SubHeading>What we do not collect</SubHeading>
          <List
            items={[
              'We do not ask for a password, and there is no account or login on this website.',
              'We do not ask for your Aadhaar, PAN, payment card or bank details. This site has no checkout or payment processing.',
              'We do not set advertising cookies and we do not run advertising pixels.',
            ]}
          />
        </Section>

        <Section id="why-we-collect" title="Why we collect it">
          <p>
            We process the information above for three purposes, and nothing
            beyond them:
          </p>
          <List
            ordered
            items={[
              'To answer your enquiry, including contacting you by phone, email or WhatsApp if you have asked us to.',
              'To prepare for a consultation, store visit or order by suggesting relevant pieces.',
              'To send you the GLPC Journal, but only if you have separately asked to receive it. This form is not currently active on the site, so nothing is being sent today.',
            ]}
          />
          <p>
            We do not use your information for advertising, and we do not sell or
            rent it to anyone.
          </p>
        </Section>

        <Section id="necessity" title="When your information is necessary">
          <p>
            For the enquiry forms, the name, email address, phone number, your
            message and the consent tick are needed for us to be able to reply
            at all, so those fields must be filled in. Everything else on the
            enquiry forms is optional.
          </p>
          <p>
            On the product enquiry form the city and the occasion are also
            currently required fields. Those are not strictly needed in order to
            reply to you, and we have flagged that below.
          </p>
          <ReviewNote title="confirm the fields that should be mandatory">
            <ul className="list-disc space-y-1 pl-4">
              {PERSONAL_DATA_COLLECTED.filter((item) => item.review).map((item) => (
                <li key={item.item}>
                  <span className="font-medium text-night">{item.item}:</span>{' '}
                  {item.review}
                </li>
              ))}
            </ul>
          </ReviewNote>
          <p>
            At the moment every enquiry form requires a phone number, so there
            is no way to leave it out on screen. If you would rather not give a
            phone number, you can still reach us by email using the address at
            the end of this policy, or by visiting the studio. We would welcome
            your decision on whether phone should become optional, because
            requiring it is more data than answering an enquiry strictly needs.
          </p>
        </Section>

        <Section id="enquiries" title="How enquiries are processed">
          <ol className="space-y-3 pl-4 list-decimal">
            <li>
              You fill in an enquiry, contact or product enquiry form and tick
              the consent box.
            </li>
            <li>
              Your browser sends the form to this website&apos;s own server. It
              is not sent anywhere else first.
            </li>
            <li>
              The server checks the form, including that the consent box was
              ticked. If it was not, the enquiry is rejected and nothing is
              sent. This check happens on the server as well as in your browser,
              so it cannot be skipped.
            </li>
            <li>
              The server emails the enquiry to our studio inbox using Resend, our
              email delivery provider. The email is sent from us to us.
            </li>
            <li>
              A member of the team reads it and contacts you using the details
              you gave.
            </li>
          </ol>
          <p>
            No copy of the enquiry is stored in a database by this website, and
            your enquiry is not visible on any public page.
          </p>
          <ReviewNote title="what happens after an enquiry is answered">
            <p>
              Once an enquiry has been dealt with, the studio decides what to do
              with the email. Confirm the intended procedure, including whether
              the message is deleted from the studio mailbox and any backups, and
              add the answer to this section.
            </p>
          </ReviewNote>
        </Section>

        <Section id="cookies" title="Cookies and browser storage">
          <p>
            This website does not set any cookies. It uses your browser&apos;s
            local storage and session storage for a small number of things, which
            are listed in our{' '}
            <Link
              href={COOKIE_POLICY_ROUTE}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              Cookie Policy
            </Link>
            . None of it contains your name, contact details or message.
          </p>
          <p>
            The one thing that is optional is the Google map on the contact page.
            Until you agree to it, the map is not requested from Google at all,
            so nothing is sent to Google when you load that page.
          </p>
        </Section>

        <Section id="third-parties" title="Who else receives your data">
          <p>
            Three external services are involved. This is the complete list.
          </p>
          <DataTable
            caption="Third-party services that receive data from this website"
            columns={['Service', 'Role', 'What they receive']}
            rows={THIRD_PARTIES.map((party) => [
              <span key="name" className="font-medium text-night">
                {party.name}
              </span>,
              party.role,
              party.data,
            ])}
          />
          {THIRD_PARTIES.filter((p) => p.verifyWithVendor).map((party) => (
            <ReviewNote key={party.name} title={`${party.name}: verify before launch`}>
              <p>{party.verifyWithVendor}</p>
            </ReviewNote>
          ))}
          <p>
            Social media links in the footer take you to Instagram, Facebook,
            YouTube and Pinterest. Those are ordinary outbound links: opening one
            takes you to that platform, which has its own privacy policy, and
            nothing is loaded from them while you are on this site. The share
            buttons in the journal open WhatsApp or X in a new tab only when you
            use them.
          </p>
        </Section>

        <Section id="sharing" title="Who we share your data with">
          <p>
            We share personal information only with the service providers needed
            to make the website work, and only to the extent needed for them to
            do their job:
          </p>
          <List
            items={[
              'Resend, which delivers our enquiry emails.',
              'Google, for the map on the contact page, and only if you have agreed to it.',
              'Our hosting provider, which serves the website and necessarily sees the technical request data involved in loading a page.',
            ]}
          />
          <p>
            We would also disclose information where the law requires it, or
            where we need to do so to establish or defend a legal claim.
          </p>
        </Section>

        <Section id="retention" title="How long we keep it">
          <p>
            We have not yet set a retention period for enquiry emails or
            newsletter subscriptions, and we are not going to invent one in this
            policy. Until that decision is made and written down, the practical
            position is that an enquiry is kept for as long as the studio
            mailbox keeps it.
          </p>
          <ReviewNote title="retention periods are not yet set">
            <p>
              Please confirm how long enquiry records and newsletter
              subscriptions should be kept, what triggers deletion, and whether a
              shorter period applies to different kinds of enquiry. This section
              must be completed before launch — an absent retention period is
              itself a compliance problem, so this is the most urgent gap on the
              page.
            </p>
          </ReviewNote>
        </Section>

        <Section id="security" title="How we protect it">
          <p>
            The technical measures actually in place on this website are:
          </p>
          <List
            items={[
              'Enquiries travel over an encrypted connection.',
              'The email provider API key is held on the server only. It is never part of the code sent to your browser, and it cannot be read from the page.',
              'Every enquiry is checked on the server before it is forwarded, so an incomplete or malformed submission is rejected rather than emailed.',
              'The server refuses to send anything if the consent box was not ticked, and it never reports internal errors back to the page in a way that would expose configuration.',
              'Contact details are not written into the page address bar or into any link, so they are not leaked through the browser history or to other sites through the address.',
            ]}
          />
          <p>
            These are baseline measures for a small website, not a certified
            security programme. Access to the studio mailbox is what actually
            protects the enquiry data, and that sits outside this codebase.
          </p>
        </Section>

        <Section id="your-rights" title="Your rights">
          <p>
            Under the Digital Personal Data Protection Act, 2023 you have the
            right to:
          </p>
          <List
            items={[
              'Ask what personal information we hold about you, and get a copy of it.',
              'Ask us to correct information that is wrong or incomplete.',
              'Ask us to erase information we no longer have a reason to keep.',
              'Ask us to stop processing your information, or to withdraw consent where consent was the basis for processing.',
              'Ask us to stop direct marketing to you.',
              'Nominate someone to exercise your rights on your behalf.',
              'Ask for a summary of the complaints you have raised about your data.',
            ]}
          />
          <p>
            To use any of these, email{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              {siteConfig.contact.email}
            </a>{' '}
            or call {siteConfig.contact.phone}. Tell us which right you want to
            exercise and how we can identify you. We will not ask you for
            anything you have not already sent us.
          </p>
          <ReviewNote title="privacy contact and response times">
            <p>
              This site only has a general enquiry address, and no response
              timeframe is defined anywhere. Confirm which address should be used
              for data-protection requests, who handles them, and the response
              period to commit to, then update this section.
            </p>
          </ReviewNote>
          <ReviewNote title="erasure may need more than deleting an email">
            <p>
              Enquiry details are held in a mailbox provided by an email provider.
              Deleting the message locally may not remove provider-side copies or
              backups. Confirm the real procedure for honouring an erasure
              request, including what can and cannot be deleted, and be
              transparent about any limits.
            </p>
          </ReviewNote>
        </Section>

        <Section id="consent" title="Consent and withdrawing it">
          <p>
            Asking us to reply to your enquiry is what we use your details for.
            That is why the enquiry forms have a consent box which is never
            pre-ticked: we will not record your consent unless you tick it
            yourself.
          </p>
          <p>
            Separately, the small privacy notice in the corner of the screen
            lets you decide whether to allow the Google map. Choosing{' '}
            <strong className="font-semibold text-night">Essential only</strong>{' '}
            is a complete answer, not a rejection: everything else on the website
            keeps working, and the map simply shows a placeholder instead.
          </p>
          <p>
            Your choice is remembered in your own browser, and never sent to us.
            Nothing about it is linked to you.
          </p>
          <p>
            To change your mind at any time, use the{' '}
            <strong className="font-semibold text-night">Privacy</strong> control
            in the bottom-left corner of any page, or the{' '}
            <strong className="font-semibold text-night">
              Manage Privacy Settings
            </strong>{' '}
            link in the footer. That reopens the same choices, and withdrawing
            removes the map immediately.
          </p>
          <p>
            Withdrawing consent does not affect processing that already happened
            before you withdrew it.
          </p>
        </Section>

        <Section id="grievance" title="Raising a grievance">
          <p>
            If you are unhappy with how we have handled your information, contact
            us on{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              {siteConfig.contact.email}
            </a>{' '}
            or call {siteConfig.contact.phone}, and we will look into it. Please
            include enough detail for us to find the relevant enquiry.
          </p>
          <ReviewNote title="grievance officer">
            <p>
              No Grievance Officer is identified anywhere in this project. If one
              has been appointed, add their name, role and contact details here. If
              not, confirm who is accountable for handling grievances before
              launch.
            </p>
          </ReviewNote>
        </Section>

        <Section id="children" title="Use by children">
          <p>
            This website is a fashion showcase and enquiry site, and we have not
            designed it for children.
          </p>
          <ReviewNote title="intended age of users">
            <p>
              The forms ask for a phone number, an occasion and a wedding date,
              which identify a specific person. Please confirm whether the site is
              intended for anyone under 18, and if so what the position is on
              parental consent. This cannot be determined from the code.
            </p>
          </ReviewNote>
        </Section>

        <Section id="changes" title="Changes to this policy">
          <p>
            We will update this page when our processing changes. Every update
            carries a version number and a date at the top. If a change alters
            what we ask you to agree to, the privacy notice will ask you again
            rather than carrying your old answer forward.
          </p>
        </Section>

        <Section id="contact" title="How to contact us">
          <p>
            Write to us at {siteConfig.contact.address}, email{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              {siteConfig.contact.email}
            </a>
            , or call {siteConfig.contact.phone}. Business hours are{' '}
            {siteConfig.contact.businessHours}.
          </p>
          <p>
            This site is developed and maintained by{' '}
            <a
              href="https://techverzing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              {siteConfig.company.developer}
            </a>
            . They build the website and are not the party responsible for your
            personal information.
          </p>
        </Section>

        <section aria-labelledby="open-items">
          <h2 id="open-items" className="font-heading text-xl text-night md:text-2xl">
            Open items awaiting client input
          </h2>
          <p className="mt-3">
            The following could not be answered from the codebase and have been
            left explicitly unanswered above rather than guessed at.
          </p>
          <DataTable
            caption="Business and legal information still required"
            columns={['What we need', 'Why it matters']}
            rows={CLIENT_INPUT_REQUIRED.map((item) => [
              <span key="q" className="font-medium text-night">
                {item.question}
              </span>,
              item.why,
            ])}
          />
        </section>
      </LegalPage>
    </PageTransition>
  )
}
