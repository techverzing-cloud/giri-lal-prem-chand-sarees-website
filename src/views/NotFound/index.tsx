import Link from 'next/link'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { SEOHead } from '@/components/seo'
import { generateBreadcrumb } from '@/utils/seo'

const breadcrumb = generateBreadcrumb([
  { label: 'Home', href: '/' },
  { label: '404 — Page Not Found' },
])

export default function NotFoundPage() {
  return (
    <PageTransition>
      <SEOHead
        title="404 — Page Not Found"
        description="The page you are looking for does not exist or has been moved."
        path="/404"
        structuredData={breadcrumb}
      />

      <section className="flex min-h-screen items-center justify-center">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <span className="font-heading text-8xl text-primary md:text-9xl">404</span>
            <h1 className="mt-4 font-heading text-3xl text-night md:text-4xl">
              Page Not Found
            </h1>
            <p className="mt-4 font-body text-text-secondary">
              The page you are looking for does not exist or has been moved.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/">
                <LuxuryButton variant="outline">Return Home</LuxuryButton>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}
