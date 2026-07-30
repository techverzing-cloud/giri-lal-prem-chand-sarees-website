import type { AdminUser } from '@/types/admin'
import { getAdminUsers } from '@/data/admin/users'

export function getUsers(): AdminUser[] {
  return getAdminUsers()
}

export function getUser(id: string): AdminUser | undefined {
  return getAdminUsers().find((u) => u.id === id)
}

export function getActiveUsers(): AdminUser[] {
  return getAdminUsers().filter((u) => u.status === 'active')
}
