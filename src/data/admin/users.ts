import type { AdminUser } from '@/types/admin'

export const adminUsers: AdminUser[] = [
  { id: 'usr-1', name: 'Mukesh Sharma', email: 'mukesh@girilalpremchand.com', avatar: '', role: 'super_admin', lastActive: new Date().toISOString(), status: 'active' },
  { id: 'usr-2', name: 'Priya Singh', email: 'priya@girilalpremchand.com', avatar: '', role: 'admin', lastActive: new Date(Date.now() - 3600000).toISOString(), status: 'active' },
  { id: 'usr-3', name: 'Rahul Verma', email: 'rahul@girilalpremchand.com', avatar: '', role: 'content_manager', lastActive: new Date(Date.now() - 7200000).toISOString(), status: 'active' },
  { id: 'usr-4', name: 'Ananya Gupta', email: 'ananya@girilalpremchand.com', avatar: '', role: 'editor', lastActive: new Date(Date.now() - 86400000).toISOString(), status: 'active' },
  { id: 'usr-5', name: 'Vikram Patel', email: 'vikram@girilalpremchand.com', avatar: '', role: 'marketing', lastActive: new Date(Date.now() - 172800000).toISOString(), status: 'inactive' },
  { id: 'usr-6', name: 'Neha Kapoor', email: 'neha@girilalpremchand.com', avatar: '', role: 'content_manager', lastActive: new Date(Date.now() - 43200000).toISOString(), status: 'active' },
  { id: 'usr-7', name: 'Arjun Mehta', email: 'arjun@girilalpremchand.com', avatar: '', role: 'editor', lastActive: new Date(Date.now() - 21600000).toISOString(), status: 'active' },
  { id: 'usr-8', name: 'Kavita Reddy', email: 'kavita@girilalpremchand.com', avatar: '', role: 'admin', lastActive: new Date(Date.now() - 604800000).toISOString(), status: 'inactive' },
]

export function getAdminUsers(): AdminUser[] {
  return adminUsers
}

export function getUserById(id: string): AdminUser | undefined {
  return adminUsers.find((u) => u.id === id)
}
