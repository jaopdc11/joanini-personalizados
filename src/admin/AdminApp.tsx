import { useAuth } from '@/hooks/useAuth'
import { LoginPage } from '@/admin/pages/LoginPage'
import { AdminLayout } from '@/admin/components/AdminLayout'
import { GalleryPage } from '@/admin/pages/GalleryPage'
import { ProductsPage } from '@/admin/pages/ProductsPage'
import { SitePhotosPage } from '@/admin/pages/SitePhotosPage'
import { TestimonialsPage } from '@/admin/pages/TestimonialsPage'
import { SenhaPage } from '@/admin/pages/SenhaPage'

type AdminPage = 'gallery' | 'products' | 'site-photos' | 'testimonials' | 'senha'

function currentPage(): AdminPage {
  const path = window.location.pathname
  if (path.includes('products')) return 'products'
  if (path.includes('site-photos')) return 'site-photos'
  if (path.includes('testimonials')) return 'testimonials'
  if (path.includes('senha')) return 'senha'
  return 'gallery'
}

export function AdminApp() {
  const { usuario, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-400 text-sm">carregando…</p>
      </div>
    )
  }

  if (!usuario) return <LoginPage />

  const page = currentPage()

  return (
    <AdminLayout activePage={page} email={usuario.email}>
      {page === 'gallery' && <GalleryPage />}
      {page === 'products' && <ProductsPage />}
      {page === 'site-photos' && <SitePhotosPage />}
      {page === 'testimonials' && <TestimonialsPage />}
      {page === 'senha' && <SenhaPage />}
    </AdminLayout>
  )
}
