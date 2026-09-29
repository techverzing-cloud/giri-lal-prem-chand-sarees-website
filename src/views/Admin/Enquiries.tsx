import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { DataTable, type Column } from '@/components/admin/common/DataTable'
import { SearchBar } from '@/components/admin/common/SearchBar'
import { StatusBadge } from '@/components/admin/common/StatusBadge'
import { FilterPanel } from '@/components/admin/common/FilterPanel'
import { queryEnquiries } from '@/services/admin/enquiryService'
import type { AdminEnquiry, EnquiryStatus, EnquiryPriority } from '@/types/admin'
import { Download, MessageSquare } from 'lucide-react'

export default function AdminEnquiriesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)

  const { items } = queryEnquiries({
    search: search || undefined,
    status: statusFilter as EnquiryStatus | undefined,
    priority: priorityFilter as EnquiryPriority | undefined,
  })

  const columns: Column<AdminEnquiry>[] = [
    { key: 'customer', label: 'Customer', render: (e) => (
      <div>
        <p className="font-medium text-night">{e.customerName}</p>
        <p className="text-xs text-text-muted">{e.customerEmail}</p>
      </div>
    )},
    { key: 'type', label: 'Type', className: 'capitalize', hideOnMobile: true },
    { key: 'status', label: 'Status', render: (e) => <StatusBadge status={e.status} /> },
    { key: 'priority', label: 'Priority', hideOnMobile: true, render: (e) => <StatusBadge status={e.priority as EnquiryPriority} /> },
    { key: 'createdAt', label: 'Date', hideOnMobile: true, render: (e) => new Date(e.createdAt).toLocaleDateString() },
  ]

  return (
    <div>
      <Helmet><title>Enquiries — Admin</title></Helmet>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-night">Enquiries</h1>
          <p className="font-body text-sm text-text-muted">{items.length} total • {items.filter((e) => e.status === 'new').length} new</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night transition-colors hover:bg-night/5">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full max-w-sm"><SearchBar value={search} onChange={setSearch} placeholder="Search enquiries..." /></div>
        <FilterPanel groups={[
          { label: 'Status', options: [
            { label: 'New', value: 'new' }, { label: 'Contacted', value: 'contacted' },
            { label: 'Qualified', value: 'qualified' }, { label: 'Converted', value: 'converted' }, { label: 'Closed', value: 'closed' },
          ], selected: statusFilter, onChange: setStatusFilter },
          { label: 'Priority', options: [
            { label: 'Low', value: 'low' }, { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' }, { label: 'Urgent', value: 'urgent' },
          ], selected: priorityFilter, onChange: setPriorityFilter },
        ]} />
      </div>

      <DataTable columns={columns} data={items} keyExtractor={(e) => e.id} emptyMessage="No enquiries found." />
    </div>
  )
}
