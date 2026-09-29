import { Suspense } from 'react'
import type { Metadata } from 'next'
import { LoginForm } from '@/components/admin/auth/LoginForm'

/**
 * A server component so it can export Next.js `metadata`. The root layout sets
 * `robots: { index: true, follow: true }`, and `react-helmet-async` cannot
 * override metadata in the App Router, so the sign-in page declares its own
 * `noindex` here instead.
 *
 * The disable below is for `only-export-components`: exporting `metadata`
 * alongside a page component is the required App Router pattern, but that rule
 * only understands files that export components alone.
 */
// oxlint-disable-next-line react/only-export-components
export const metadata: Metadata = {
  title: 'Admin Sign In',
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-night/[0.02] px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <span className="font-heading text-lg font-bold text-white">G</span>
          </div>
          <h1 className="mt-5 font-heading text-2xl text-night">Admin Sign In</h1>
          <p className="mt-2 font-body text-sm text-text-muted">
            Enter your credentials to manage the store.
          </p>
        </div>

        <div className="rounded-lg border border-night/10 bg-white p-6 shadow-sm md:p-8">
          {/* LoginForm reads ?next=, which opts this subtree out of static rendering. */}
          <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center font-body text-xs text-text-muted/60">
          Protected area. Access is restricted to authorised staff.
        </p>
      </div>
    </div>
  )
}
