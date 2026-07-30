import { generateRobots } from '@/utils/sitemap'
import { FileText, Copy, Check } from 'lucide-react'
import { useState, useCallback } from 'react'

export function RobotsPreview() {
  const [copied, setCopied] = useState(false)
  const robotsTxt = generateRobots()

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(robotsTxt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [robotsTxt])

  return (
    <div className="rounded-lg border border-night/10 bg-white">
      <div className="flex items-center justify-between border-b border-night/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading text-lg text-night">robots.txt</h3>
            <p className="font-body text-xs text-text-muted">Search engine crawling rules</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md border border-night/10 px-3 py-2 font-body text-xs font-medium text-night transition-colors hover:bg-night/5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>

      <div className="p-4">
        <pre className="max-h-80 overflow-auto rounded-lg bg-night p-4 font-body text-sm text-white/80 leading-relaxed">
          {robotsTxt}
        </pre>
      </div>
    </div>
  )
}
