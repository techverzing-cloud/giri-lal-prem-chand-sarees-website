import { getAdminDashboardStats, getAdminNotifications } from '@/data/admin/dashboard'
import { getAdminActivities } from '@/data/admin/activity'
import { getAdminEnquiries } from '@/data/admin/enquiries'

export function getDashboardStats() {
  return getAdminDashboardStats()
}

export function getRecentActivities(limit = 5) {
  return getAdminActivities().slice(0, limit)
}

export function getLatestEnquiries(limit = 5) {
  return getAdminEnquiries().slice(0, limit)
}

export function getNotifications() {
  return getAdminNotifications()
}
