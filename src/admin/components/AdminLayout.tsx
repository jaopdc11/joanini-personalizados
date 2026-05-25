import { Images, Package, LogOut, LayoutTemplate, Terminal, ExternalLink, MessageSquareHeart } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Page = 'gallery' | 'products' | 'site-photos' | 'testimonials' | 'dev'

type Props = {
  activePage: Page
  isDev?: boolean
  children: React.ReactNode
}

const navItems: { id: Page; label: string; hint: string; icon: React.ElementType; href: string }[] = [
  {
    id: 'gallery',
    label: 'Galeria de trabalhos',
    hint: 'Fotos dos seus trabalhos que aparecem no site',
    icon: Images,
    href: '/admin',
  },
  {
    id: 'products',
    label: 'Catálogo',
    hint: 'Produtos que você oferece, com preço e descrição',
    icon: Package,
    href: '/admin/products',
  },
  {
    id: 'site-photos',
    label: 'Fotos do site',
    hint: 'Sua foto de apresentação e a foto principal',
    icon: LayoutTemplate,
    href: '/admin/site-photos',
  },
  {
    id: 'testimonials',
    label: 'Depoimentos',
    hint: 'Postits das clientes que aparecem no site',
    icon: MessageSquareHeart,
    href: '/admin/testimonials',
  },
]

export function AdminLayout({ activePage, isDev, children }: Props) {
  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/admin'
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside className="flex w-64 flex-col border-r border-stone-200 bg-white">
        <div className="border-b border-stone-100 px-5 py-5">
          <p className="font-semibold text-stone-800">Joanini Personalizados</p>
          <p className="text-xs text-stone-400">painel de gerenciamento</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map(({ id, label, hint, icon: Icon, href }) => (
            <a
              key={id}
              href={href}
              className={`flex flex-col rounded-lg px-3 py-2.5 text-sm transition ${
                activePage === id
                  ? 'bg-rose-50 text-rose-700'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span className="flex items-center gap-2 font-medium">
                <Icon size={15} />
                {label}
              </span>
              <span className={`ml-[23px] mt-0.5 text-xs leading-tight ${activePage === id ? 'text-rose-400' : 'text-stone-400'}`}>
                {hint}
              </span>
            </a>
          ))}

          {isDev && (
            <a
              href="/admin/dev"
              className={`mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                activePage === 'dev'
                  ? 'bg-violet-50 font-medium text-violet-600'
                  : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600'
              }`}
            >
              <Terminal size={15} />
              Dev
            </a>
          )}
        </nav>

        <div className="border-t border-stone-100 p-3 flex flex-col gap-1">
          <a
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-500 transition hover:bg-stone-50 hover:text-stone-700"
          >
            <ExternalLink size={15} />
            Ver o site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-400 transition hover:bg-stone-50 hover:text-stone-600"
          >
            <LogOut size={15} />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
