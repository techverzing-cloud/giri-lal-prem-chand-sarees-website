import { generateSitemap, generateSitemapEntries } from '@/utils/sitemap'
import { cn } from '@/utils/cn'
import { FileText, Globe, RefreshCw } from 'lucide-react'
import { useState, useCallback } from 'react'

export function SitemapPreview() {
  const [copied, setCopied] = useState(false)
  const sitemapXml = generateSitemap()
  const entries = generateSitemapEntries()

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(sitemapXml).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [sitemapXml])

  return (
    <div className="rounded-lg border border-night/10 bg-white">
      <div className="flex items-center justify-between border-b border-night/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading text-lg text-night">Sitemap Preview</h3>
            <p className="font-body text-xs text-text-muted">{entries.length} URLs indexed</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md border border-night/10 px-3 py-2 font-body text-xs font-medium text-night transition-colors hover:bg-night/5"
        >
          {copied ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 text-success" /> Copied
            </>
          ) : (
            <>
              <FileText className="h-3.5 w-3.5" /> Copy XML
            </>
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {entries.map((entry) => (
            <div key={entry.url} className="flex items-center justify-between rounded-md border border-night/5 px-3 py-2">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'h-2 w-2 rounded-full',
                  entry.priority >= 0.8 ? 'bg-success' : entry.priority >= 0.5 ? 'bg-warning' : 'bg-night/30'
                )} />
                <span className="font-body text-sm text-night">{entry.url}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-body text-xs text-text-muted">{entry.changefreq}</span>
                <span className="rounded bg-night/5 px-2 py-0.5 font-body text-xs font-medium text-text-muted">
                  {entry.priority.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <details className="mt-4">
          <summary className="cursor-pointer font-body text-xs font-medium text-text-muted hover:text-night">
            View raw XML
          </summary>
          <pre className="mt-2 max-h-60 overflow-auto rounded-lg bg-night p-4 font-body text-xs text-white/80">
            {sitemapXml}
          </pre>
        </details>
      </div>
    </div>
  )
}
