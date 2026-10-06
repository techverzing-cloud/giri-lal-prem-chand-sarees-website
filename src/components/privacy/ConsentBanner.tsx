
'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, X } from 'lucide-react'
import { useConsent } from '@/hooks/useConsent'
import {
  getConsent,
  getPanelRequestCount,
  subscribeToPanelRequests,
} from '@/lib/consent'
import {
  CONSENT_CATEGORIES,
  CONSENT_STORAGE_KEY,
  COOKIE_POLICY_ROUTE,
  PRIVACY_POLICY_ROUTE,
  PRIVACY_POLICY_VERSION,
  type ConsentCategory,
} from '@/config/privacy'
import { siteConfig } from '@/config/site'
import { cn } from '@/utils/cn'

/**
 * Privacy notice, bottom-left.
 *
 * Two deliberate choices here:
 *
 *   - It is a `role="dialog"` with `aria-modal="false"` rather than a modal.
 *     It never traps focus and never blocks the page, because nothing on this
 *     site requires consent to be granted before you can use it.
 *   - "Essential only" is a first-class, equal-weight outcome, not a rejection.
 *     The only thing it turns off is the Google map, which is the only genuinely
 *     optional processing on the site.
 */
export function ConsentBanner() {
  const { hasDecided, allGranted, decide, withdraw } = useConsent()

  const [isOpen, setIsOpen] = useState(false)
  const [isCustomising, setIsCustomising] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [draft, setDraft] = useState<ConsentCategory[]>([])

  const panelRef = useRef<HTMLDivElement>(null)
  const acceptRef = useRef<HTMLButtonElement>(null)

  /**
   * Only move focus into the panel when the visitor opened it deliberately.
   * Auto-focusing the automatic first-visit prompt would yank focus away from
   * the page they actually asked for, which is disorienting and is a common
   * accessibility complaint about consent banners.
   */
  const focusOnOpen = useRef(false)

  /**
   * Prevent server/client markup differences caused by consent state that may
   * come from browser storage.
   */
  useEffect(() => {
    setIsMounted(true)
  }, [])

  /** Open the panel as a direct result of a user action, and move focus to it. */
  function openFromUserAction() {
    setDraft(allGranted ? CONSENT_CATEGORIES.map((c) => c.id) : [])
    focusOnOpen.current = true
    setIsCustomising(true)
    setIsOpen(true)
  }

  // Opens the panel whenever the footer's "Manage Privacy Settings" asks for it.
  const panelRequest = useSyncExternalStore(
    subscribeToPanelRequests,
    getPanelRequestCount,
    () => 0
  )

  const lastHandledRequest = useRef(0)

  useEffect(() => {
    if (panelRequest === 0 || panelRequest === lastHandledRequest.current) return

    lastHandledRequest.current = panelRequest
    openFromUserAction()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelRequest])

  // Show on first visit of this policy version.
  useEffect(() => {
    if (!hasDecided && getConsent().status === 'undecided') setIsOpen(true)
  }, [hasDecided])

  // If the version is bumped while the tab is open, ask again.
  useEffect(() => {
    const onVersionChange = (event: StorageEvent) => {
      if (event.key !== null && event.key !== CONSENT_STORAGE_KEY) return
      if (getConsent().status === 'undecided') setIsOpen(true)
    }

    window.addEventListener('storage', onVersionChange)

    return () => window.removeEventListener('storage', onVersionChange)
  }, [])

  // Escape closes. The decision is the user's to make, not to postpone forever.
  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setIsCustomising(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // Move focus into the panel only when the visitor opened it deliberately.
  useEffect(() => {
    if (!isOpen || !focusOnOpen.current) return

    acceptRef.current?.focus()
    focusOnOpen.current = false
  }, [isOpen])

  function choose(categories: ConsentCategory[]) {
    decide(categories)
    setIsOpen(false)
    setIsCustomising(false)
  }

  const optionalCategories = CONSENT_CATEGORIES.filter((c) => !c.required)

  return (
    <>
      {/* Re-entry point, rendered only after a decision exists. */}
      {isMounted && !isOpen && hasDecided && (
        <button
          type="button"
          onClick={openFromUserAction}
          className="fixed bottom-[5.5rem] left-4 z-[60] inline-flex items-center gap-2 rounded-full border border-night/10 bg-white/90 px-3 py-2 font-body text-xs text-night shadow-sm backdrop-blur-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:left-6"
          aria-label="Manage privacy settings"
        >
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Privacy</span>
        </button>
      )}

      <AnimatePresence>
        {isMounted && isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-labelledby="consent-banner-title"
            aria-describedby="consent-banner-description"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={cn(
              // Bottom-left, stacked above BackToTop (bottom-6, size-12) so it
              // never covers that control. Full width on small screens, with an
              // internal scroll guard so it cannot grow past the viewport.
              'fixed inset-x-4 bottom-[5.5rem] z-[60] max-h-[70vh] overflow-y-auto sm:inset-x-auto sm:left-6 sm:w-[22rem]',
              'rounded-lg border border-night/10 bg-white p-5 shadow-xl'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  className="size-4 flex-shrink-0 text-primary"
                  aria-hidden="true"
                />

                <h2
                  id="consent-banner-title"
                  className="font-heading text-base text-night"
                >
                  Your privacy choices
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setIsCustomising(false)
                }}
                className="-mr-1 -mt-1 flex size-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-night/5 hover:text-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Close privacy notice"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <p
              id="consent-banner-description"
              className="mt-3 font-body text-sm leading-relaxed text-text-secondary"
            >
              We use your information only to answer your enquiry and, if you
              ask for it, to send you the journal. We do not use advertising
              trackers or sell your data.
              {optionalCategories.length > 0 && (
                <>
                  {' '}
                  With your permission we would also load the Google map on our
                  contact page, which shares your IP address with Google.
                </>
              )}
            </p>

            <p className="mt-3 font-body text-xs text-text-muted">
              Read the{' '}
              <Link
                href={PRIVACY_POLICY_ROUTE}
                className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Privacy Policy
              </Link>{' '}
              and the{' '}
              <Link
                href={COOKIE_POLICY_ROUTE}
                className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Cookie Policy
              </Link>
              .
            </p>

            {isCustomising ? (
              <fieldset className="mt-4 space-y-3">
                <legend className="sr-only">Optional permissions</legend>

                {optionalCategories.map((category) => (
                  <label
                    key={category.id}
                    htmlFor={`consent-${category.id}`}
                    className="flex cursor-pointer items-start gap-3 rounded-md bg-night/[0.02] p-2"
                  >
                    <input
                      id={`consent-${category.id}`}
                      type="checkbox"
                      checked={draft.includes(category.id)}
                      onChange={(event) =>
                        setDraft((current) =>
                          event.target.checked
                            ? [...current, category.id]
                            : current.filter((id) => id !== category.id)
                        )
                      }
                      className="mt-0.5 size-4 flex-shrink-0 cursor-pointer rounded-sm accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    />

                    <span className="font-body text-sm leading-relaxed text-text-secondary">
                      <span className="font-medium text-night">
                        {category.label}
                      </span>

                      <span className="mt-0.5 block text-xs text-text-muted">
                        {category.purpose} Provided by {category.provider}.
                      </span>
                    </span>
                  </label>
                ))}

                <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => choose(draft)}
                    className="flex-1 rounded-md bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Save choices
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCustomising(false)}
                    className="rounded-md border border-night/15 px-4 py-2.5 font-body text-sm text-text-secondary transition-colors hover:bg-night/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Back
                  </button>
                </div>
              </fieldset>
            ) : (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button
                  ref={acceptRef}
                  type="button"
                  onClick={() =>
                    choose(CONSENT_CATEGORIES.map((c) => c.id))
                  }
                  className="flex-1 rounded-md bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Accept
                </button>

                <button
                  type="button"
                  onClick={() => choose([])}
                  className="rounded-md border border-night/15 px-4 py-2.5 font-body text-sm text-text-secondary transition-colors hover:bg-night/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Essential only
                </button>
              </div>
            )}

            {hasDecided && (
              <button
                type="button"
                onClick={() => {
                  withdraw()
                  setIsOpen(true)
                }}
                className="mt-3 font-body text-xs text-text-muted underline underline-offset-2 transition-colors hover:text-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Withdraw my consent and decide again
              </button>
            )}

            <p className="mt-4 border-t border-night/5 pt-3 font-body text-[11px] leading-relaxed text-text-muted">
              Or contact us on{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="underline underline-offset-2 hover:text-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {siteConfig.contact.email}
              </a>
              . Policy version {PRIVACY_POLICY_VERSION}.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

