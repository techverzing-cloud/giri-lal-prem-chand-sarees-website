import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminProvider } from '@/state/AdminContext'
import { NotificationProvider } from '@/state/NotificationContext'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { ToastContainer } from '@/components/admin/common/ToastContainer'

export function AdminLayout() {
  return (
    <NotificationProvider>
      <AdminProvider>
        <div className="flex h-screen overflow-hidden bg-night/[0.02]">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
              <Outlet />
            </main>
          </div>
        </div>
        <ToastContainer />
      </AdminProvider>
    </NotificationProvider>
  )
}
