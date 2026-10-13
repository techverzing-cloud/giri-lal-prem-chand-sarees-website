import { Fragment } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { siteConfig } from '@/config/site'
import { requestConsentPanel } from '@/lib/consent'
import { FOOTER_LINKS } from '@/constants'
import { Instagram, Facebook, Youtube } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-night text-white" role="contentinfo">
      <Container className="py-16 md:py-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block" aria-label={`${siteConfig.company.name} - Home`}>
              {/* <Link
            href="/"
            className="relative z-10"
            aria-label={`${siteConfig.company.name} - Home`}
          > */}
            <img
              src="/logos/landscape_logo_without_back.png"
              alt={`${siteConfig.company.name} - Home`}
              className="h-16 w-auto object-contain  md:h-30 md:w-auto"
            />
          {/* </Link> */}
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-white/60">
              {siteConfig.company.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="size-4" />
              </a>
              <a
                href={siteConfig.social.x || siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
                aria-label="Follow us on X"
              >
                <svg className="size-4" aria-hidden="true" viewBox="0 0 19 19">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              Quick Links
            </h2>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              Collections
            </h2>
            <ul className="space-y-3">
              {FOOTER_LINKS.collections.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              Contact
            </h2>
            <ul className="space-y-3">
              <li>
                <span className="font-body text-sm text-white/60">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="font-body text-sm text-white/60 transition-colors hover:text-white"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-body text-sm text-white/60 transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="pt-2">
                <span className="font-body text-[11px] uppercase tracking-[0.15em] text-white/40">
                  {siteConfig.contact.businessHours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-body text-xs text-white/40">
              &copy; 1946-{currentYear} - {siteConfig.company.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {/* Rendered from `FOOTER_LINKS.legal` so there is one list of legal
                  routes. The version used to be hardcoded here, which meant the
                  footer and `src/constants` could drift apart. */}
              {FOOTER_LINKS.legal.map((link, index) => (
                <Fragment key={link.href}>
                  {index > 0 && (
                    <span aria-hidden="true" className="text-white/20">
                      |
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className="font-body text-xs text-white/40 transition-colors hover:text-white/60"
                  >
                    {link.label}
                  </Link>
                </Fragment>
              ))}
              <span aria-hidden="true" className="text-white/20">
                |
              </span>
              <button
                type="button"
                onClick={requestConsentPanel}
                className="font-body text-xs text-white/40 transition-colors hover:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Manage Privacy Settings
              </button>
            </div>
            <p className="font-body text-xs text-white/30">
              Developed by{' '}
              <a
                href="https://techverzing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white/60"
                aria-label="Visit Techverzing website"
              >
                {siteConfig.company.developer}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
