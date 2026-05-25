import { useEffect, useState } from 'react'
import { MessageCircleHeart } from 'lucide-react'
import { whatsappLink } from '@/lib/whatsapp'

export function StickyWhatsApp() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setShow(window.scrollY > 500))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Encomendar pelo WhatsApp"
      className={`fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-deep text-warm-white shadow-[0_18px_40px_-12px_rgba(201,168,168,0.8)] ring-2 ring-warm-white transition-all duration-300 hover:scale-110 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <MessageCircleHeart className="h-7 w-7" strokeWidth={1.6} />
      <span className="absolute inset-0 -z-10 rounded-full bg-pink-deep ping-soft" aria-hidden />
    </a>
  )
}
