'use client'

import { HelmetProvider } from 'react-helmet-async'
import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { ADMIN_LOGIN_PATH } from '@/lib/adminSession'
import { AdminProvider } from '@/state/AdminContext'
import { NotificationProvider } from '@/state/NotificationContext'
import { Sidebar } from '@/components/admin/layout/Sidebar'
import { Topbar } from '@/components/admin/layout/Topbar'
import { ToastContainer } from '@/components/admin/common/ToastContainer'

/**
 * The admin shell. It keeps the original `AdminLayout` structure and providers,
 * with `<Outlet />` replaced by Next.js's `children` prop.
 *
 * The sign-in page is the one route that must render bare: it sits inside
 * `/admin`, so without this guard it would be drawn inside the very shell it is
 * meant to gate, and `currentUser` would fall back to a placeholder identity.
 */
export default function AdminRouteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname === ADMIN_LOGIN_PATH) {
    return <>{children}</>
  }

  return (
    <HelmetProvider>
      <NotificationProvider>
        <AdminProvider>
          <div className="flex h-screen overflow-hidden bg-night/[0.02]">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <Topbar />
              <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
            </div>
          </div>
          <ToastContainer />
        </AdminProvider>
      </NotificationProvider>
    </HelmetProvider>
  )
}
