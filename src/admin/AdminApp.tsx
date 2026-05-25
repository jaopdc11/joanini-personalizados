import { useAuth } from '@/hooks/useAuth'
import { LoginPage } from '@/admin/pages/LoginPage'
import { AdminLayout } from '@/admin/components/AdminLayout'
import { GalleryPage } from '@/admin/pages/GalleryPage'
import { ProductsPage } from '@/admin/pages/ProductsPage'
import { SitePhotosPage } from '@/admin/pages/SitePhotosPage'
import { TestimonialsPage } from '@/admin/pages/TestimonialsPage'
import { DevPage } from '@/admin/pages/DevPage'

type AdminPage = 'gallery' | 'products' | 'site-photos' | 'testimonials' | 'dev'

function currentPage(): AdminPage {
  const path = window.location.pathname
  if (path.includes('products')) return 'products'
  if (path.includes('site-photos')) return 'site-photos'
  if (path.includes('testimonials')) return 'testimonials'
  if (path.includes('dev')) return 'dev'
  return 'gallery'
}

export function AdminApp() {
  const { session, loading, isDev } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-400 text-sm">carregando…</p>
      </div>
    )
  }

  if (!session) return <LoginPage />

  const page = currentPage()

  return (
    <AdminLayout activePage={page} isDev={isDev}>
      {page === 'gallery' && <GalleryPage />}
      {page === 'products' && <ProductsPage />}
      {page === 'site-photos' && <SitePhotosPage />}
      {page === 'testimonials' && <TestimonialsPage />}
      {page === 'dev' && isDev && <DevPage />}
    </AdminLayout>
  )
}
