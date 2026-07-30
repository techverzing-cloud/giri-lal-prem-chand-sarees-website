import type { AdminCollection } from '@/types/admin'
import { getAdminCollections, getAdminCollectionById } from '@/data/admin/collections'

export function queryCollections(): AdminCollection[] {
  return getAdminCollections()
}

export function getCollection(id: string): AdminCollection | undefined {
  return getAdminCollectionById(id)
}

export function getCollectionsByType(type: string): AdminCollection[] {
  return getAdminCollections().filter((c) => c.type === type)
}

export function getVisibleCollections(): AdminCollection[] {
  return getAdminCollections().filter((c) => c.visible)
}
