import type { SEOMetadata } from '@/types/cms'
import { cn } from '@/utils/cn'

interface SeoPreviewProps {
  seo?: SEOMetadata
  defaultTitle?: string
  defaultDescription?: string
  path?: string
}

export function SeoPreview({ seo, defaultTitle, defaultDescription, path = '/' }: SeoPreviewProps) {
  const title = seo?.metaTitle ?? defaultTitle ?? 'Untitled'
  const description = seo?.metaDescription ?? defaultDescription ?? 'No description'
  const canonical = seo?.canonical ?? path

  return (
    <div className="rounded-lg border border-night/10 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-success" />
        <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
          Google Preview
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-night/10 bg-white">
        <div className="space-y-1 p-3">
          <p className="truncate font-body text-xs text-success/80">{canonical}</p>
          <p className="line-clamp-2 font-body text-lg text-[#1a0dab] hover:cursor-pointer hover:underline">
            {title}
          </p>
          <p className="line-clamp-2 font-body text-sm text-[#4d5156]">
            {description}
          </p>
        </div>

        {seo && (
          <div className="border-t border-night/5 bg-night/5 p-3">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
              {seo.robots && (
                <span className={cn(seo.robots === 'noindex' && 'text-error')}>
                  robots: {seo.robots}
                </span>
              )}
              {seo.ogTitle && <span>og: {seo.ogTitle}</span>}
              {seo.twitterCard && <span>twitter: {seo.twitterCard}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
