import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const offsets = new Map<string, number>()

/** Fired whenever Next.js writes a new history entry. */
const URL_CHANGED = 'glpc:url-changed'

/**
 * The App Router has no `useNavigationType()`. Next.js pushes history entries
 * through `history.pushState` / `history.replaceState`, while back/forward always
 * arrives as a `popstate` event, so those signals are enough to tell POP from
 * PUSH.
 */
let popNavigation = false
let historyPatched = false

function patchHistory() {
  if (historyPatched || typeof window === 'undefined') return
  historyPatched = true

  const { pushState, replaceState } = window.history
  window.history.pushState = function (...args) {
    popNavigation = false
    const result = pushState.apply(this, args)
    window.dispatchEvent(new Event(URL_CHANGED))
    return result
  }
  window.history.replaceState = function (...args) {
    popNavigation = false
    const result = replaceState.apply(this, args)
    window.dispatchEvent(new Event(URL_CHANGED))
    return result
  }
  window.addEventListener('popstate', () => {
    popNavigation = true
    window.dispatchEvent(new Event(URL_CHANGED))
  })
}

/**
 * New navigations start at the top; back/forward return to where the user was.
 * Applied in layout effects so the jump happens before paint.
 *
 * The current URL is read from `window` rather than `useSearchParams()` on
 * purpose: `useSearchParams()` suspends during prerendering, which would force a
 * Suspense boundary around the entire site shell and defeat the static render.
 */
export function useScrollRestoration(): void {
  const pathname = usePathname()
  const [urlKey, setUrlKey] = useState('')

  const readUrl = useCallback(() => {
    setUrlKey(`${window.location.pathname}${window.location.search}`)
  }, [])

  useEffect(() => {
    patchHistory()
    readUrl()
    window.addEventListener(URL_CHANGED, readUrl)
    return () => window.removeEventListener(URL_CHANGED, readUrl)
  }, [readUrl])

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    if (!urlKey) return
    return () => {
      offsets.set(urlKey, window.scrollY)
    }
  }, [urlKey])

  useLayoutEffect(() => {
    if (!urlKey) return
    const top = popNavigation ? (offsets.get(urlKey) ?? 0) : 0
    window.scrollTo({ top, left: 0, behavior: 'instant' })
  }, [urlKey, pathname])
}
