'use client'

import { Suspense } from 'react'
import EnquiryPage from '@/views/Enquiry'

/**
 * `EnquiryPage` reads `?product=` via `useSearchParams()`, which suspends during
 * prerendering because search params are only known at request time. Next.js
 * requires a Suspense boundary above any client component that reads URL data.
 */
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <EnquiryPage />
    </Suspense>
  )
}
