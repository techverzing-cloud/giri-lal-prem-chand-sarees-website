'use client'

import { Suspense } from 'react'
import SearchPage from '@/views/Search'

/** `SearchPage` reads `?q=` / `?fabric=` / `?occasion=` via `useSearchParams()`. */
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <SearchPage />
    </Suspense>
  )
}
