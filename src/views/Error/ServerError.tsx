import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function ServerErrorPage() {
  const handleRefresh = () => window.location.reload()
  const handleGoHome = () => window.location.href = '/'

  return (
    <PageTransition>
      <Helmet>
        <title>500 — Server Error | Giri Lal Prem Chand Sarees</title>
      </Helmet>

      <section className="relative flex min-h-[80vh] items-center justify-center bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center" role="alert" aria-live="assertive">
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-error/5">
                <AlertTriangle className="h-12 w-12 text-error" />
              </div>
            </div>

            <h1 className="font-heading text-7xl font-light text-night sm:text-8xl">500</h1>
            <h2 className="mt-4 font-heading text-2xl text-night">Server Error</h2>
            <p className="mt-4 font-body text-base text-text-muted leading-relaxed">
              We apologise for the inconvenience. An unexpected error has occurred on our end. 
              Our team has been notified and is working to resolve the issue.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LuxuryButton
                variant="primary"
                onClick={handleRefresh}
                icon={<RefreshCw className="h-4 w-4" aria-hidden="true" />}
                aria-label="Try refreshing the page"
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
              If the problem persists, please contact our support team.
            </p>
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}
