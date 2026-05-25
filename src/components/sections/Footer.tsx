import { Instagram, Mail, MessageCircleHeart } from 'lucide-react'
import { brand, contact, footer, nav } from '@/data/content'
import { MiniHeart } from '@/components/decor/FloatingHearts'
import { whatsappLink } from '@/lib/whatsapp'

export function Footer() {
  return (
    <footer className="relative border-t border-pink-candy/20 bg-warm-white/70 pt-14 pb-8">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 font-serif text-2xl text-ink">
            <MiniHeart color="#FF9FB3" size={16} /> {brand.name}
          </p>
          <p className="mt-2 max-w-sm text-pretty text-sm text-ink-soft">{brand.shortDescription}</p>
          <p className="mt-3 font-script text-lg text-pink-deep/80">{brand.tagline}</p>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-ink-soft/80">navegar</p>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-ink-soft">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-pink-deep">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contato" className="transition-colors hover:text-pink-deep">contato</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-ink-soft/80">conversar</p>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-pink-deep"
              >
                <MessageCircleHeart className="h-4 w-4" strokeWidth={1.6} />
                {contact.whatsappLabel}
              </a>
            </li>
            <li>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-pink-deep"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.6} />
                {contact.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-pink-deep"
              >
                <Mail className="h-4 w-4" strokeWidth={1.6} />
                {contact.email}
              </a>
            </li>
            <li className="text-xs text-ink-soft/80">{brand.city} · atendimento local</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-pink-candy/15 px-6 pt-6 text-xs text-ink-soft md:flex-row">
        <p>{footer.rights}</p>
        <p className="font-script text-base text-pink-deep/80">{footer.madeWith}</p>
        <a
          href="https://tree.jaopd.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-ink-soft transition-colors hover:text-pink-deep"
        >
          desenvolvido por jaopd
        </a>
      </div>
    </footer>
  )
}
