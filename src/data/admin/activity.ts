import type { AdminActivity } from '@/types/admin'

const now = Date.now()

export const adminActivities: AdminActivity[] = [
  { id: 'act-001', user: 'Mukesh Sharma', action: 'created', resource: 'product', resourceId: 'prod-050', timestamp: new Date(now - 600000).toISOString() },
  { id: 'act-002', user: 'Priya Singh', action: 'published', resource: 'article', resourceId: 'art-010', timestamp: new Date(now - 1800000).toISOString() },
  { id: 'act-003', user: 'Rahul Verma', action: 'updated', resource: 'enquiry', resourceId: 'enq-003', timestamp: new Date(now - 3600000).toISOString() },
  { id: 'act-004', user: 'Ananya Gupta', action: 'uploaded', resource: 'media', resourceId: 'med-030', timestamp: new Date(now - 7200000).toISOString() },
  { id: 'act-005', user: 'Neha Kapoor', action: 'updated', resource: 'homepage', resourceId: 'hp-hero', timestamp: new Date(now - 14400000).toISOString() },
  { id: 'act-006', user: 'Priya Singh', action: 'created', resource: 'collection', resourceId: 'col-012', timestamp: new Date(now - 28800000).toISOString() },
  { id: 'act-007', user: 'Mukesh Sharma', action: 'updated', resource: 'settings', resourceId: 'feature-flags', timestamp: new Date(now - 86400000).toISOString() },
  { id: 'act-008', user: 'Rahul Verma', action: 'deleted', resource: 'product', resourceId: 'prod-023', timestamp: new Date(now - 172800000).toISOString() },
]

export function getAdminActivities(): AdminActivity[] {
  return adminActivities
}
