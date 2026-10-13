import { useState } from 'react'
import { MessageCircle, Facebook, Link as LinkIcon, Check } from 'lucide-react'
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
        href={'https://www.facebook.com/people/Giri-Lal-Prem-Chand-Sarees-Pvt-Ltd/61594655375659/'}
        target="_blank" rel="noopener noreferrer"
        className="flex size-9 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all hover:border-[#1877F2] hover:text-[#1877F2]"
        aria-label="Share on Facebook"
      >
        <Facebook className="size-4" />
      </a>
      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex size-9 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all hover:border-night hover:text-night"
        aria-label="Share on X"
      >
        <svg className="size-4" aria-hidden="true" viewBox="0 0 19 19">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z"
            clipRule="evenodd"
          />
        </svg>
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
