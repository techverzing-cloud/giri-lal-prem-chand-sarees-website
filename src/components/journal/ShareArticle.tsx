import { useState } from 'react'
import { MessageCircle, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { cn } from '@/utils/cn'

export function ShareArticle({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const url = `${siteConfig.seo.siteUrl}/journal/${slug}`
  const text = `${title} — ${siteConfig.company.name}`

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">Share</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex size-9 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all hover:border-[#25D366] hover:text-[#25D366]"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="size-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex size-9 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all hover:border-[#1877F2] hover:text-[#1877F2]"
        aria-label="Share on Facebook"
      >
        <Facebook className="size-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex size-9 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all hover:border-[#1DA1F2] hover:text-[#1DA1F2]"
        aria-label="Share on Twitter"
      >
        <Twitter className="size-4" />
      </a>
      <button
        onClick={handleCopy}
        className={cn(
          'flex size-9 items-center justify-center rounded-full border transition-all',
          copied ? 'border-green-500 text-green-500' : 'border-night/10 text-text-muted hover:border-night/30 hover:text-night'
        )}
        aria-label={copied ? 'Link copied' : 'Copy link'}
      >
        {copied ? <Check className="size-4" /> : <LinkIcon className="size-4" />}
      </button>
    </div>
  )
}
