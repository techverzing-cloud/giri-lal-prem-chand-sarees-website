import { useState } from 'react'
import { MessageCircle, Facebook, Twitter, Link, Check } from 'lucide-react'
import type { Product } from '@/types'
import { getShareData, copyToClipboard } from '@/utils/share'
import { cn } from '@/utils/cn'

interface ShareProductProps {
  product: Product
}

export function ShareProduct({ product }: ShareProductProps) {
  const [copied, setCopied] = useState(false)
  const shareData = getShareData(product)

  async function handleCopy() {
    const success = await copyToClipboard(shareData.url)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div>
      <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
        Share This Product
      </span>
      <div className="mt-3 flex items-center gap-3">
        <a
          href={shareData.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-11 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all duration-300 hover:border-[#25D366] hover:text-[#25D366]"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="size-5" />
        </a>
        <a
          href={shareData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-11 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all duration-300 hover:border-[#1877F2] hover:text-[#1877F2]"
          aria-label="Share on Facebook"
        >
          <Facebook className="size-5" />
        </a>
        <a
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-11 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all duration-300 hover:border-[#1DA1F2] hover:text-[#1DA1F2]"
          aria-label="Share on Twitter"
        >
          <Twitter className="size-5" />
        </a>
        <button
          onClick={handleCopy}
          className={cn(
            'flex size-11 items-center justify-center rounded-full border transition-all duration-300',
            copied
              ? 'border-green-500 text-green-500'
              : 'border-night/10 text-text-muted hover:border-night/30 hover:text-night'
          )}
          aria-label={copied ? 'Link copied' : 'Copy link'}
        >
          {copied ? <Check className="size-5" /> : <Link className="size-5" />}
        </button>
      </div>
    </div>
  )
}
