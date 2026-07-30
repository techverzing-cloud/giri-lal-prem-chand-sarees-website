import type { AdminEnquiry } from '@/types/admin'

const now = new Date().toISOString()

export const adminEnquiries: AdminEnquiry[] = [
  { id: 'enq-001', type: 'PRODUCT', customerName: 'Shreya Gupta', customerEmail: 'shreya@email.com', customerPhone: '+91 98765 43201', subject: 'Royal Banarasi Heritage enquiry', message: 'I am interested in the Royal Banarasi Heritage saree in gold color. Is it available for immediate delivery?', status: 'new', priority: 'high', notes: [], source: 'website', createdAt: new Date(Date.now() - 3600000).toISOString(), updatedAt: now },
  { id: 'enq-002', type: 'CONSULTATION', customerName: 'Ananya Kapoor', customerEmail: 'ananya@email.com', customerPhone: '+91 98765 43202', message: 'I would like to book a bridal consultation for my wedding in December.', status: 'new', priority: 'high', notes: [], source: 'website', createdAt: new Date(Date.now() - 7200000).toISOString(), updatedAt: now },
  { id: 'enq-003', type: 'CONTACT', customerName: 'Rahul Verma', customerEmail: 'rahul@email.com', customerPhone: '+91 98765 43203', subject: 'Bulk order enquiry', message: 'We are looking for 50 pieces of Banarasi sarees for a corporate event.', status: 'contacted', priority: 'high', assignedTo: 'usr-3', notes: ['Called customer, waiting for requirements list'], source: 'website', createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: now },
  { id: 'enq-004', type: 'PRODUCT', customerName: 'Priya Singh', customerEmail: 'priya@email.com', customerPhone: '+91 98765 43204', message: 'Looking for a red bridal lehenga under 2 lakhs.', status: 'contacted', priority: 'medium', assignedTo: 'usr-3', notes: ['Sent catalog', 'Follow up next week'], source: 'instagram', createdAt: new Date(Date.now() - 172800000).toISOString(), updatedAt: now },
  { id: 'enq-005', type: 'CUSTOM_DESIGN', customerName: 'Meera Joshi', customerEmail: 'meera@email.com', customerPhone: '+91 98765 43205', subject: 'Custom bridal lehenga design', message: 'I want a custom-designed bridal lehenga inspired by my mother\'s wedding saree.', status: 'qualified', priority: 'medium', assignedTo: 'usr-2', notes: ['Had design consultation call', 'Sketches shared', 'Awaiting approval'], source: 'website', createdAt: new Date(Date.now() - 259200000).toISOString(), updatedAt: now },
  { id: 'enq-006', type: 'CONSULTATION', customerName: 'Neha Patel', customerEmail: 'neha@email.com', customerPhone: '+91 98765 43206', message: 'Wedding consultation for May 2026.', status: 'qualified', priority: 'medium', assignedTo: 'usr-2', notes: ['Consultation booked for next week'], source: 'referral', createdAt: new Date(Date.now() - 345600000).toISOString(), updatedAt: now },
  { id: 'enq-007', type: 'BULK_ORDER', customerName: 'Deepak Sharma', customerEmail: 'deepak@email.com', customerPhone: '+91 98765 43207', subject: 'Bulk order for boutique', message: 'We would like to place a bulk order of assorted sarees for our boutique in Mumbai.', status: 'converted', priority: 'high', assignedTo: 'usr-1', notes: ['Order placed', 'Payment received', 'Shipping in 2 weeks'], source: 'website', createdAt: new Date(Date.now() - 604800000).toISOString(), updatedAt: now },
  { id: 'enq-008', type: 'CONTACT', customerName: 'Sneha Reddy', customerEmail: 'sneha@email.com', customerPhone: '+91 98765 43208', message: 'I visited your store yesterday and wanted to follow up on the Kanjivaram saree.', status: 'converted', priority: 'low', assignedTo: 'usr-4', notes: ['Purchase completed'], source: 'store', createdAt: new Date(Date.now() - 1209600000).toISOString(), updatedAt: now },
  { id: 'enq-009', type: 'PRODUCT', customerName: 'Kavita Iyer', customerEmail: 'kavita@email.com', customerPhone: '+91 98765 43209', message: 'Do you have silk sarees in pastel shades?', status: 'closed', priority: 'low', notes: ['Customer found what she wanted elsewhere'], source: 'website', createdAt: new Date(Date.now() - 1814400000).toISOString(), updatedAt: now },
  { id: 'enq-010', type: 'CORPORATE', customerName: 'Amit Khanna', customerEmail: 'amit@email.com', customerPhone: '+91 98765 43210', subject: 'Corporate gifting program', message: 'We are interested in your corporate gifting program for Diwali.', status: 'new', priority: 'medium', notes: [], source: 'website', createdAt: new Date(Date.now() - 1800000).toISOString(), updatedAt: now },
]

export function getAdminEnquiries(): AdminEnquiry[] {
  return adminEnquiries
}

export function getAdminEnquiryById(id: string): AdminEnquiry | undefined {
  return adminEnquiries.find((e) => e.id === id)
}
