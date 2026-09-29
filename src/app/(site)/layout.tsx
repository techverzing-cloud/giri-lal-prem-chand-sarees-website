'use client'

import { useEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'
import { BackToTop } from '@/components/ui/BackToTop'
import { Cursor } from '@/components/ui/Cursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import { Loader } from '@/components/ui/Loader'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { ConsentBanner } from '@/components/privacy/ConsentBanner'

/**
 * This layout is the client boundary for the whole public site.
 *
 * Under the App Router a `'use client'` boundary pulls everything imported
 * beneath it into the client bundle, which is what this site needs: it is an
 * entirely client-side experience (framer-motion, GSAP, Lenis, a custom cursor
 * and scroll effects). Declaring the boundary once here means the 137 existing
 * components keep working unmodified rather than each needing their own
 * `'use client'` directive.
 *
 * The structure below is a direct port of the previous `AppShell` in
 * `src/App.tsx`; the only change is `useLocation()` -> `usePathname()`.
 */
function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) return <>{children}</>
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SiteShell({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true)
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  useScrollRestoration()

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showLoader && <Loader minimumDuration={2400} />}
      <Cursor />
      <ScrollProgress />
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <main id="main-content" role="main" tabIndex={-1}>
        <ErrorBoundary>
          <PageTransition>{children}</PageTransition>
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
        <FloatingWhatsApp />
        <BackToTop />
        <ConsentBanner />
      </>
    )
  }

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <SiteShell>{children}</SiteShell>
    </HelmetProvider>
  )
}
