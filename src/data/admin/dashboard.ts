import type { AdminDashboardStats, AdminNotification } from '@/types/admin'

export const adminDashboardStats: AdminDashboardStats = {
  totalProducts: 155,
  publishedProducts: 98,
  draftProducts: 32,
  totalCollections: 18,
  totalArticles: 25,
  publishedArticles: 20,
  totalMedia: 30,
  totalEnquiries: 48,
  newEnquiries: 12,
  totalUsers: 8,
  featuredProducts: 16,
  monthlyGrowth: 12.5,
}

export const adminNotifications: AdminNotification[] = [
  { id: 'not-001', type: 'info', title: 'New enquiry received', message: 'Shreya Gupta enquired about Royal Banarasi Heritage', timestamp: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: 'not-002', type: 'success', title: 'Article published', message: 'The Ultimate Guide to Bridal Lehengas is now live', timestamp: new Date(Date.now() - 7200000).toISOString(), read: false },
  { id: 'not-003', type: 'warning', title: 'Low stock alert', message: 'Royal Banarasi Heritage (SKU: GLP-S-W001) has only 2 units left', timestamp: new Date(Date.now() - 14400000).toISOString(), read: false },
  { id: 'not-004', type: 'info', title: 'Bulk order enquiry', message: 'Rahul Verma enquired about 50 Banarasi sarees', timestamp: new Date(Date.now() - 28800000).toISOString(), read: true },
  { id: 'not-005', type: 'error', title: 'Image upload failed', message: 'hero-banner-new.jpg exceeded the maximum file size', timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
]

export function getAdminDashboardStats(): AdminDashboardStats {
  return adminDashboardStats
}

export function getAdminNotifications(): AdminNotification[] {
  return adminNotifications
}
