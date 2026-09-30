'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useScrollRestoration() {
  const [urlKey, setUrlKey] = useState(() => {
    if (typeof window === 'undefined') return ''
    return `${window.location.pathname}${window.location.search}`
  })

  const scrollPositions = useRef<Record<string, number>>({})
  const isPopState = useRef(false)

  const saveScrollPosition = useCallback(() => {
    if (typeof window === 'undefined') return

    const key = `${window.location.pathname}${window.location.search}`

    scrollPositions.current[key] = window.scrollY
  }, [])

  const readUrl = useCallback(() => {
    if (typeof window === 'undefined') return

    const nextUrlKey = `${window.location.pathname}${window.location.search}`

    // Do not update React state synchronously from history callbacks.
    queueMicrotask(() => {
      setUrlKey((current) =>
        current === nextUrlKey ? current : nextUrlKey
      )
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handlePopState = () => {
      isPopState.current = true
      readUrl()
    }

    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState

    window.history.pushState = function (
      data: any,
      unused: string,
      url?: string | URL | null
    ) {
      originalPushState.call(window.history, data, unused, url)

      // Defer React state update until after the history operation.
      queueMicrotask(() => {
        readUrl()
      })
    }

    window.history.replaceState = function (
      data: any,
      unused: string,
      url?: string | URL | null
    ) {
      originalReplaceState.call(window.history, data, unused, url)

      queueMicrotask(() => {
        readUrl()
      })
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
      window.removeEventListener('popstate', handlePopState)
    }
  }, [readUrl])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const save = () => {
      saveScrollPosition()
    }

    window.addEventListener('scroll', save, { passive: true })

    return () => {
      window.removeEventListener('scroll', save)
    }
  }, [saveScrollPosition])

  useEffect(() => {
    if (typeof window === 'undefined' || !urlKey) return

    const key = urlKey
    const savedPosition = scrollPositions.current[key]

    const restore = () => {
      if (isPopState.current && savedPosition !== undefined) {
        window.scrollTo({
          top: savedPosition,
          behavior: 'auto',
        })

        isPopState.current = false
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        })
      }
    }

    // Allow Next.js navigation/rendering to complete first.
    requestAnimationFrame(() => {
      requestAnimationFrame(restore)
    })
  }, [urlKey])

  return {
    urlKey,
    saveScrollPosition,
  }
}
