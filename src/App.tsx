import { useEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppRoutes } from '@/routes'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'
import { BackToTop } from '@/components/ui/BackToTop'
import { Cursor } from '@/components/ui/Cursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Loader } from '@/components/ui/Loader'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  if (isAdmin) return <>{children}</>
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AppShell() {
  const [showLoader, setShowLoader] = useState(true)
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

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
          <PageTransition>
            <AppRoutes />
          </PageTransition>
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
      <FloatingWhatsApp />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </HelmetProvider>
  )
}
