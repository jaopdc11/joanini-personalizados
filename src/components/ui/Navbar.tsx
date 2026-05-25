import { useEffect, useState } from 'react'
import { Menu, X, MessageCircleHeart } from 'lucide-react'
import { brand, nav } from '@/data/content'
import { whatsappLink } from '@/lib/whatsapp'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-warm-white/95 shadow-[0_8px_24px_-20px_rgba(92,76,76,0.45)]' : 'bg-warm-white/0'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <a
          href="#hero"
          className="font-serif text-xl italic text-ink md:text-2xl"
          aria-label={`${brand.name} — início`}
        >
          {brand.shortName.toLowerCase()}
          <span className="text-pink-deep">.</span>
        </a>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-sm text-ink-soft transition-colors hover:bg-pink-mist/50 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/admin"
            className="hidden lg:block text-[11px] tracking-widest text-ink-soft/30 transition-colors hover:text-ink-soft/60"
          >
            admin
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift hidden md:inline-flex items-center gap-2 rounded-full bg-pink-deep px-5 py-2 text-sm font-medium text-warm-white shadow-[0_8px_20px_-10px_rgba(216,155,160,0.7)] hover:bg-ink"
          >
            <MessageCircleHeart className="h-4 w-4" strokeWidth={1.6} />
            {nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/80 text-ink shadow-sm ring-1 ring-pink-deep/15"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-pink-deep/10 bg-warm-white/98">
          <ul className="mx-auto flex max-w-6xl flex-col gap-0.5 px-5 py-4">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base text-ink-soft transition-colors hover:bg-pink-mist/40 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-pink-deep px-5 py-3 text-sm font-medium text-warm-white shadow-md"
              >
                <MessageCircleHeart className="h-4 w-4" strokeWidth={1.6} />
                {nav.cta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
