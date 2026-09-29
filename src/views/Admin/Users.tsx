import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { DataTable, type Column } from '@/components/admin/common/DataTable'
import { StatusBadge } from '@/components/admin/common/StatusBadge'
import { getUsers } from '@/services/admin/userService'
import { ROLE_PERMISSIONS, type AdminUser, type AdminRole } from '@/types/admin'
import { User, Shield } from 'lucide-react'

export default function AdminUsersPage() {
  const [users] = useState(getUsers())
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const filtered = selectedRole ? users.filter((u) => u.role === selectedRole) : users

  const columns: Column<AdminUser>[] = [
    { key: 'user', label: 'User', render: (u) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
          <User className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="font-medium text-night">{u.name}</p>
          <p className="text-xs text-text-muted">{u.email}</p>
        </div>
      </div>
    )},
    { key: 'role', label: 'Role', render: (u) => (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/5 px-2.5 py-1 font-body text-xs font-medium text-primary capitalize">
        <Shield className="h-3 w-3" />
        {u.role.replace('_', ' ')}
      </span>
    )},
    { key: 'status', label: 'Status', render: (u) => <StatusBadge status={u.status} /> },
    { key: 'lastActive', label: 'Last Active', hideOnMobile: true, render: (u) => {
      const diff = Date.now() - new Date(u.lastActive).getTime()
      const hours = Math.floor(diff / 3600000)
      return <span className="font-body text-sm text-text-muted">{hours < 1 ? 'Just now' : hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`}</span>
    }},
  ]

  const roles: AdminRole[] = ['super_admin', 'admin', 'content_manager', 'editor', 'marketing']

  return (
    <div>
      <Helmet><title>Users — Admin</title></Helmet>

      <div className="mb-6">
        <h1 className="font-heading text-2xl text-night">Users</h1>
        <p className="font-body text-sm text-text-muted">{users.length} users • {users.filter((u) => u.status === 'active').length} active</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={() => setSelectedRole(null)} className={`rounded-lg border px-3 py-1.5 font-body text-xs transition-colors ${!selectedRole ? 'border-primary bg-primary/10 text-primary' : 'border-night/10 text-text-muted hover:bg-night/5'}`}>All Roles</button>
        {roles.map((role) => (
          <button key={role} onClick={() => setSelectedRole(role)} className={`rounded-lg border px-3 py-1.5 font-body text-xs transition-colors capitalize ${selectedRole === role ? 'border-primary bg-primary/10 text-primary' : 'border-night/10 text-text-muted hover:bg-night/5'}`}>{role.replace('_', ' ')}</button>
        ))}
      </div>

      <DataTable columns={columns} data={filtered} keyExtractor={(u) => u.id} />

      <div className="mt-8 rounded-xl border border-night/10 bg-white p-6">
        <h2 className="mb-4 font-heading text-lg text-night">Permission Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-night/10">
                <th className="px-3 py-2 font-body text-xs font-medium uppercase text-text-muted">Resource</th>
                {roles.map((role) => (
                  <th key={role} className="px-3 py-2 font-body text-xs font-medium uppercase text-text-muted capitalize">{role.replace('_', ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-night/5">
              {['products', 'collections', 'journal', 'media', 'homepage', 'about', 'seo', 'navigation', 'settings', 'enquiries'].map((resource) => (
                <tr key={resource}>
                  <td className="px-3 py-2 font-body text-sm text-night capitalize">{resource}</td>
                  {roles.map((role) => {
                    const perms = ROLE_PERMISSIONS[role].find((p) => p.resource === resource || p.resource === 'all')
                    const hasAccess = perms?.actions.length ?? 0 > 0
                    return (
                      <td key={role} className="px-3 py-2">
                        {hasAccess ? (
                          <span className="text-success font-body text-xs">{perms!.actions.length} actions</span>
                        ) : (
                          <span className="text-text-muted/40 font-body text-xs">—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
