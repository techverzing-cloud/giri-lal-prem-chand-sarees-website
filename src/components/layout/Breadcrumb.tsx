import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/utils/cn'

interface BreadcrumbProps {
  variant?: 'light' | 'dark'
}

export function Breadcrumb({ variant = 'light' }: BreadcrumbProps) {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  if (pathSegments.length === 0) return null

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
    const isLast = index === pathSegments.length - 1

    return { label, href, isLast }
  })

  return (
    <nav aria-label="Breadcrumb" className="font-body text-xs">
      <ol className="flex items-center gap-2">
        <li>
          <Link
            href="/"
            className={cn(
              'flex items-center gap-1 transition-colors',
              variant === 'dark' ? 'text-white/50 hover:text-white' : 'text-text-muted hover:text-night'
            )}
            aria-label="Home"
          >
            <Home className="size-3" />
          </Link>
        </li>
        {breadcrumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <ChevronRight
              className={cn(
                'size-3',
                variant === 'dark' ? 'text-white/30' : 'text-text-muted/50'
              )}
            />
            {crumb.isLast ? (
              <span
                className={cn(
                  'font-medium',
                  variant === 'dark' ? 'text-white' : 'text-night'
                )}
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className={cn(
                  'transition-colors',
                  variant === 'dark' ? 'text-white/50 hover:text-white' : 'text-text-muted hover:text-night'
                )}
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
