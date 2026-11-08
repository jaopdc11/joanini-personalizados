import { Images, Package, LogOut, LayoutTemplate, KeyRound, ExternalLink, MessageSquareHeart } from 'lucide-react'
import { sair } from '@/lib/api'

type Page = 'gallery' | 'products' | 'site-photos' | 'testimonials' | 'senha'

type Props = {
  activePage: Page
  email?: string
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

export function AdminLayout({ activePage, email, children }: Props) {
  async function handleLogout() {
    await sair().catch(() => {})
    window.location.href = '/admin'
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 md:flex-row">

      {/* Sidebar — só desktop */}
      {/* fixa na altura da tela: com muita foto a página rola, a sidebar não (e "Ver o site"/"Sair" ficam na base) */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-stone-200 bg-white md:sticky md:top-0 md:h-screen">
        <div className="border-b border-stone-100 px-5 py-5">
          <p className="font-semibold text-stone-800">Joanini Personalizados</p>
          <p className="text-xs text-stone-400">painel de gerenciamento</p>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3">
          {navItems.map(({ id, label, hint, icon: Icon, href }) => (
            <a
              key={id}
              href={href}
              className={`flex flex-col rounded-lg px-3 py-2.5 text-sm transition ${
                activePage === id ? 'bg-rose-50 text-rose-700' : 'text-stone-600 hover:bg-stone-50'
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

          <a
            href="/admin/senha"
            className={`mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
              activePage === 'senha'
                ? 'bg-violet-50 font-medium text-violet-600'
                : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600'
            }`}
          >
            <KeyRound size={15} />
            Trocar senha
          </a>
        </nav>

        <div className="border-t border-stone-100 p-3 flex flex-col gap-1">
          {email && <p className="truncate px-3 pb-1 text-xs text-stone-400">{email}</p>}
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

      {/* Top bar — só mobile */}
      <header className="md:hidden flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
        <p className="font-semibold text-sm text-stone-800">Joanini Personalizados</p>
        <div className="flex items-center gap-2">
          <a href="/" className="rounded-lg p-2 text-stone-400 hover:bg-stone-50">
            <ExternalLink size={16} />
          </a>
          <button onClick={handleLogout} className="rounded-lg p-2 text-stone-400 hover:bg-stone-50">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Nav horizontal — só mobile */}
      <nav className="md:hidden flex overflow-x-auto border-b border-stone-200 bg-white px-2">
        {navItems.map(({ id, label, icon: Icon, href }) => (
          <a
            key={id}
            href={href}
            className={`flex shrink-0 flex-col items-center gap-1 px-4 py-3 text-xs transition ${
              activePage === id ? 'border-b-2 border-rose-400 text-rose-600' : 'text-stone-400'
            }`}
          >
            <Icon size={18} />
            <span className="whitespace-nowrap">{label.split(' ')[0]}</span>
          </a>
        ))}
        <a
          href="/admin/senha"
          className={`flex shrink-0 flex-col items-center gap-1 px-4 py-3 text-xs transition ${
            activePage === 'senha' ? 'border-b-2 border-violet-400 text-violet-600' : 'text-stone-400'
          }`}
        >
          <KeyRound size={18} />
          <span>Senha</span>
        </a>
      </nav>

      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
