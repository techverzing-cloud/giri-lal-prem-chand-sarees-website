import type { AdminEnquiry, EnquiryStatus, EnquiryPriority } from '@/types/admin'
import { getAdminEnquiries, getAdminEnquiryById } from '@/data/admin/enquiries'

export interface EnquiryQuery {
  search?: string
  status?: EnquiryStatus
  priority?: EnquiryPriority
  type?: string
  page?: number
  pageSize?: number
}

export function queryEnquiries(query: EnquiryQuery): { items: AdminEnquiry[]; total: number } {
  let items = getAdminEnquiries()

  if (query.search) {
    const q = query.search.toLowerCase()
    items = items.filter((e) => e.customerName.toLowerCase().includes(q) || e.customerEmail.toLowerCase().includes(q))
  }
  if (query.status) items = items.filter((e) => e.status === query.status)
  if (query.priority) items = items.filter((e) => e.priority === query.priority)
  if (query.type) items = items.filter((e) => e.type === query.type)

  return { items, total: items.length }
}

export function getEnquiry(id: string): AdminEnquiry | undefined {
  return getAdminEnquiryById(id)
}

export function getNewEnquiriesCount(): number {
  return getAdminEnquiries().filter((e) => e.status === 'new').length
}
