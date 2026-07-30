import { useEffect, useState } from 'react'
import type { LeadSource } from '@/types/enquiry'
import { getLeadSource } from '@/services/tracking'
import { trackEvent } from '@/services/analytics'

export function useLeadTracking() {
  const [source, setSource] = useState<LeadSource | null>(null)

  useEffect(() => {
    const lead = getLeadSource()
    setSource(lead)
    trackEvent('lead_detected', { source: lead.source, referrer: lead.referrer })
  }, [])

  return source
}
