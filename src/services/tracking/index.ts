import type { LeadSource } from '@/types/enquiry'

function getUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  for (const key of keys) {
    const val = params.get(key)
    if (val) utm[key] = val
  }
  return utm
}

function detectDevice(): string {
  if (navigator.userAgent.match(/android/i)) return 'android'
  if (navigator.userAgent.match(/iphone|ipad|ipod/i)) return 'ios'
  if (navigator.userAgent.match(/tablet/i)) return 'tablet'
  return 'desktop'
}

function detectSource(): LeadSource['source'] {
  const utm = getUtmParams()
  if (utm.utm_source) return 'campaign'
  const ref = document.referrer
  if (!ref) return 'direct'
  if (ref.includes('instagram')) return 'instagram'
  if (ref.includes('facebook')) return 'facebook'
  if (ref.includes('google')) return 'google'
  if (ref.includes('wa.me') || ref.includes('whatsapp')) return 'whatsapp'
  return 'other'
}

export function getLeadSource(): LeadSource {
  return {
    source: detectSource(),
    referrer: document.referrer,
    url: window.location.href,
    utm: getUtmParams(),
  }
}

export function getBrowserInfo(): string {
  return navigator.userAgent
}

export function getScreenResolution(): string {
  return `${window.innerWidth}x${window.innerHeight}`
}
