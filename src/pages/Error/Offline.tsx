import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { WifiOff, RefreshCw, Home } from 'lucide-react'

export default function OfflinePage() {
  const handleRefresh = () => window.location.reload()
  const handleGoHome = () => window.location.href = '/'

  return (
    <PageTransition>
      <Helmet>
        <title>Offline — No Internet Connection | Giri Lal Prem Chand Sarees</title>
      </Helmet>

      <section className="relative flex min-h-[80vh] items-center justify-center bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center" role="alert" aria-live="assertive">
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-warning/10">
                <WifiOff className="h-12 w-12 text-warning" aria-hidden="true" />
              </div>
            </div>

            <h1 className="font-heading text-5xl font-light text-night sm:text-6xl">No Connection</h1>
            <p className="mt-6 font-body text-base text-text-muted leading-relaxed">
              It appears you have lost your internet connection. Please check your network settings 
              and try again. Your cart and preferences are saved locally.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LuxuryButton
                variant="primary"
                onClick={handleRefresh}
                icon={<RefreshCw className="h-4 w-4" aria-hidden="true" />}
                aria-label="Try reloading the page"
              >
                Try Again
              </LuxuryButton>
              <LuxuryButton
                variant="outline"
                onClick={handleGoHome}
                icon={<Home className="h-4 w-4" aria-hidden="true" />}
                aria-label="Return to homepage"
              >
                Return Home
              </LuxuryButton>
            </div>

            <p className="mt-8 font-body text-xs text-text-muted/60">
              Some content may be available offline once fully loaded. You can also check your network cables, Wi-Fi switch, or router.
            </p>
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}
