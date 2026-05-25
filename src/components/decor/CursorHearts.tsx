import { useEffect, useRef, useState } from 'react'

type Heart = { id: number; x: number; y: number; size: number; color: string; rot: number }

const palette = ['#FF9FB3', '#FFB0C4', '#F2C5CA', '#FFD6BA', '#FBDDE0']

export function CursorHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const idRef = useRef(0)
  const lastSpawnRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const SPAWN_GAP = 80 // ms entre coraçõezinhos
    const LIFE = 900 // ms até remover

    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastSpawnRef.current < SPAWN_GAP) return
      lastSpawnRef.current = now

      const heart: Heart = {
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        size: 10 + Math.random() * 8,
        color: palette[Math.floor(Math.random() * palette.length)],
        rot: Math.random() * 30 - 15,
      }
      setHearts((prev) => [...prev, heart])
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== heart.id))
      }, LIFE)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (hearts.length === 0) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {hearts.map((h) => (
        <svg
          key={h.id}
          width={h.size}
          height={h.size}
          viewBox="0 0 24 24"
          fill={h.color}
          className="cursor-heart absolute"
          style={{
            left: h.x - h.size / 2,
            top: h.y - h.size / 2,
            transform: `rotate(${h.rot}deg)`,
          }}
        >
          <path d="M12 21s-7-4.5-9.5-9.5C0.5 7 3.5 3 7.5 3c2 0 3.5 1 4.5 2.5C13 4 14.5 3 16.5 3c4 0 7 4 5 8.5C19 16.5 12 21 12 21z" />
        </svg>
      ))}
    </div>
  )
}
