import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { AdminNotification, AdminUser } from '@/types/admin'
import { adminUsers } from '@/data/admin/users'
import { adminNotifications, getAdminDashboardStats } from '@/data/admin/dashboard'
import type { AdminDashboardStats } from '@/types/admin'

interface AdminState {
  currentUser: AdminUser
  notifications: AdminNotification[]
  sidebarOpen: boolean
  dashboardStats: AdminDashboardStats
  unreadNotifications: number
  toggleSidebar: () => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
}

const AdminContext = createContext<AdminState | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState(adminNotifications)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const currentUser = adminUsers[0]
  const dashboardStats = getAdminDashboardStats()
  const unreadNotifications = notifications.filter((n) => !n.read).length

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  return (
    <AdminContext.Provider
      value={{
        currentUser,
        notifications,
        sidebarOpen,
        dashboardStats,
        unreadNotifications,
        toggleSidebar,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within AdminProvider')
  return context
}
