'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-night px-6 text-center">
      <p className="font-heading text-sm tracking-[0.4em] text-gold uppercase">Something went wrong</p>
      <h1 className="mt-4 font-heading text-4xl text-white sm:text-5xl">We hit an unexpected snag</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
        An error occurred while loading this page. Please try again, and if the problem continues, get in
        touch with us and we will be happy to help.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-gold px-6 py-3 text-sm font-medium tracking-wider text-night transition-colors hover:bg-gold-light"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium tracking-wider text-white transition-colors hover:border-white/50"
        >
          Back to home
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-8 text-xs tracking-wider text-white/25">Reference: {error.digest}</p>
      ) : null}
    </div>
  )
}
