import { useRef, useState } from 'react'
import { MessageCircleHeart } from 'lucide-react'
import { whatsappLink } from '@/lib/whatsapp'

type Props = {
  label?: string
  message?: string
  variant?: 'primary' | 'soft' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  burst?: boolean
  className?: string
}

const variantClass = {
  primary:
    'bg-pink-deep text-warm-white hover:bg-ink/80 shadow-[0_10px_30px_-10px_rgba(201,168,168,0.6)]',
  soft: 'bg-pink-mist text-ink hover:bg-pink-dusty shadow-[0_8px_24px_-12px_rgba(201,168,168,0.55)]',
  ghost: 'bg-transparent text-ink ring-1 ring-pink-deep/40 hover:bg-pink-mist/50',
}

const sizeClass = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const burstColors = ['#FF9FB3', '#FFB0C4', '#F2C5CA', '#FFD6BA', '#FFEFC5', '#FBDDE0']

type Petal = { id: number; angle: number; dist: number; size: number; color: string; rot: number }

export function WhatsAppButton({
  label = 'Encomendar pelo WhatsApp',
  message,
  variant = 'primary',
  size = 'md',
  pulse = false,
  burst = true,
  className,
}: Props) {
  const [petals, setPetals] = useState<Petal[]>([])
  const idRef = useRef(0)

  const handleClick = () => {
    if (!burst) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const newPetals: Petal[] = Array.from({ length: 14 }, (_, i) => ({
      id: idRef.current++,
      angle: (i / 14) * 360 + Math.random() * 20,
      dist: 80 + Math.random() * 70,
      size: 10 + Math.random() * 10,
      color: burstColors[i % burstColors.length],
      rot: Math.random() * 360,
    }))
    setPetals((prev) => [...prev, ...newPetals])
    setTimeout(() => {
      setPetals((prev) => prev.filter((p) => !newPetals.find((np) => np.id === p.id)))
    }, 1100)
  }

  return (
    <span className="relative inline-block">
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`btn-lift inline-flex items-center gap-2 rounded-full font-medium ${variantClass[variant]} ${sizeClass[size]} ${pulse ? 'pulse-soft' : ''} ${className ?? ''}`}
      >
        <MessageCircleHeart className="h-5 w-5" strokeWidth={1.6} />
        {label}
      </a>

      {petals.length > 0 && (
        <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {petals.map((p) => (
            <svg
              key={p.id}
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              className="petal-burst absolute"
              style={{
                ['--burst-x' as string]: `${Math.cos((p.angle * Math.PI) / 180) * p.dist}px`,
                ['--burst-y' as string]: `${Math.sin((p.angle * Math.PI) / 180) * p.dist}px`,
                ['--burst-rot' as string]: `${p.rot}deg`,
              }}
            >
              <path d="M12 21s-7-4.5-9.5-9.5C0.5 7 3.5 3 7.5 3c2 0 3.5 1 4.5 2.5C13 4 14.5 3 16.5 3c4 0 7 4 5 8.5C19 16.5 12 21 12 21z" />
            </svg>
          ))}
        </span>
      )}
    </span>
  )
}
