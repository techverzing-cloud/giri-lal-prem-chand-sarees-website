import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminLayout as AdminPortalLayout } from '@/components/admin/layout/AdminLayout'
import { Loader } from '@/components/ui/Loader'

const HomePage = lazy(() => import('@/pages/Home'))
const AboutPage = lazy(() => import('@/pages/About'))
const OurStoryPage = lazy(() => import('@/pages/OurStory'))
const CraftsmanshipPage = lazy(() => import('@/pages/Craftsmanship'))
const CollectionsPage = lazy(() => import('@/pages/Collections'))
const SareesPage = lazy(() => import('@/pages/Collections/Sarees'))
const LehengasPage = lazy(() => import('@/pages/Collections/Lehengas'))
const CategoryDetailPage = lazy(() => import('@/pages/Collections/CategoryDetail'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetail'))
const ContactPage = lazy(() => import('@/pages/Contact'))
const EnquiryPage = lazy(() => import('@/pages/Enquiry'))
const BookConsultationPage = lazy(() => import('@/pages/BookConsultation'))
const EnquirySuccessPage = lazy(() => import('@/pages/EnquirySuccess'))
const ThankYouPage = lazy(() => import('@/pages/ThankYou'))
const SearchPage = lazy(() => import('@/pages/Search'))
const NotFoundPage = lazy(() => import('@/pages/NotFound'))
const PrivacyPage = lazy(() => import('@/pages/Privacy'))
const TermsPage = lazy(() => import('@/pages/Terms'))
const ServerErrorPage = lazy(() => import('@/pages/Error/ServerError'))
const OfflinePage = lazy(() => import('@/pages/Error/Offline'))

const AdminDashboardPage = lazy(() => import('@/pages/Admin/Dashboard'))
const AdminContentPage = lazy(() => import('@/pages/Admin/Content'))
const AdminProductsListPage = lazy(() => import('@/pages/Admin/Products/List'))
const AdminProductsFormPage = lazy(() => import('@/pages/Admin/Products/Form'))
const AdminCollectionsListPage = lazy(() => import('@/pages/Admin/Collections/List'))
const AdminCollectionsFormPage = lazy(() => import('@/pages/Admin/Collections/Form'))
const AdminHomepagePage = lazy(() => import('@/pages/Admin/Homepage'))
const AdminAboutPage = lazy(() => import('@/pages/Admin/About'))
const AdminJournalListPage = lazy(() => import('@/pages/Admin/Journal/List'))
const AdminJournalFormPage = lazy(() => import('@/pages/Admin/Journal/Form'))
const AdminMediaPage = lazy(() => import('@/pages/Admin/Media'))
const AdminNavigationPage = lazy(() => import('@/pages/Admin/Navigation'))
const AdminSEOPage = lazy(() => import('@/pages/Admin/SEO'))
const AdminSettingsPage = lazy(() => import('@/pages/Admin/Settings'))
const AdminEnquiriesPage = lazy(() => import('@/pages/Admin/Enquiries'))
const AdminUsersPage = lazy(() => import('@/pages/Admin/Users'))
const AdminProfilePage = lazy(() => import('@/pages/Admin/Profile'))

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-night">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-white" />
        <p className="font-heading text-xl tracking-widest text-white/40">Giri Lal Prem Chand Sarees</p>
      </div>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/sarees" element={<SareesPage />} />
        <Route path="/collections/lehengas" element={<LehengasPage />} />
        <Route path="/collections/sarees/:category" element={<CategoryDetailPage />} />
        <Route path="/collections/lehengas/:category" element={<CategoryDetailPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route path="/book-consultation" element={<BookConsultationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/enquiry-success" element={<EnquirySuccessPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="/offline" element={<OfflinePage />} />

        <Route path="/admin-preview" element={<Navigate to="/admin" replace />} />
        <Route path="/admin-preview/content" element={<AdminContentPage />} />
        <Route path="/admin-preview/media" element={<Navigate to="/admin/media" replace />} />
        <Route path="/admin-preview/navigation" element={<Navigate to="/admin/navigation" replace />} />
        <Route path="/admin-preview/seo" element={<Navigate to="/admin/seo" replace />} />
        <Route path="/admin-preview/settings" element={<Navigate to="/admin/settings" replace />} />

        <Route element={<AdminPortalLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/products" element={<AdminProductsListPage />} />
          <Route path="/admin/products/new" element={<AdminProductsFormPage />} />
          <Route path="/admin/products/:id/edit" element={<AdminProductsFormPage />} />
          <Route path="/admin/collections" element={<AdminCollectionsListPage />} />
          <Route path="/admin/collections/new" element={<AdminCollectionsFormPage />} />
          <Route path="/admin/homepage" element={<AdminHomepagePage />} />
          <Route path="/admin/about" element={<AdminAboutPage />} />
          <Route path="/admin/journal" element={<AdminJournalListPage />} />
          <Route path="/admin/journal/new" element={<AdminJournalFormPage />} />
          <Route path="/admin/journal/:id/edit" element={<AdminJournalFormPage />} />
          <Route path="/admin/media" element={<AdminMediaPage />} />
          <Route path="/admin/navigation" element={<AdminNavigationPage />} />
          <Route path="/admin/seo" element={<AdminSEOPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/enquiries" element={<AdminEnquiriesPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
