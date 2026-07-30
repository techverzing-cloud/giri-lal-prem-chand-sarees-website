import { Helmet } from 'react-helmet-async'
import { useAdmin } from '@/state/AdminContext'
import { User, Mail, Shield, Calendar, Save } from 'lucide-react'

export default function AdminProfilePage() {
  const { currentUser } = useAdmin()

  return (
    <div>
      <Helmet><title>Profile — Admin</title></Helmet>

      <div className="mb-6">
        <h1 className="font-heading text-2xl text-night">Profile</h1>
        <p className="font-body text-sm text-text-muted">Manage your account settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-night/10 bg-white p-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mt-4 font-heading text-xl text-night">{currentUser.name}</h2>
            <p className="font-body text-sm text-text-muted capitalize">{currentUser.role.replace('_', ' ')}</p>
            <div className="mt-6 space-y-3 text-left">
              <div className="flex items-center gap-3 rounded-lg bg-night/[0.02] p-3">
                <Mail className="h-4 w-4 text-primary/60" />
                <div>
                  <p className="font-body text-xs text-text-muted">Email</p>
                  <p className="font-body text-sm text-night">{currentUser.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-night/[0.02] p-3">
                <Shield className="h-4 w-4 text-primary/60" />
                <div>
                  <p className="font-body text-xs text-text-muted">Role</p>
                  <p className="font-body text-sm text-night capitalize">{currentUser.role.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-night/[0.02] p-3">
                <Calendar className="h-4 w-4 text-primary/60" />
                <div>
                  <p className="font-body text-xs text-text-muted">Last Active</p>
                  <p className="font-body text-sm text-night">{new Date(currentUser.lastActive).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-night/10 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-lg text-night">Personal Information</h2>
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Full Name</label>
                <input type="text" defaultValue={currentUser.name} className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Email</label>
                <input type="email" defaultValue={currentUser.email} className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Phone</label>
                <input type="tel" className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Timezone</label>
                <select className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                  <option>Asia/Kolkata (IST)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Change Password</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Current Password</label>
                <input type="password" className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">New Password</label>
                <input type="password" className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
