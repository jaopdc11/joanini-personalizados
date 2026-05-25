import { SakuraPetal } from './Meigo'

const palette = ['#FFB0C4', '#F2C5CA', '#FFD6BA', '#FBDDE0', '#FF9FB3']

type Props = { count?: number; opacity?: number }

export function SakuraRain({ count = 5, opacity = 0.55 }: Props) {
  const petals = Array.from({ length: count }, (_, i) => {
    const left = (i * 19 + 7) % 100
    const delay = (i * 1.7) % 8
    const duration = 14 + ((i * 2.1) % 6)
    const size = 14 + ((i * 5) % 12)
    const color = palette[i % palette.length]
    const sway = (i % 2 === 0 ? 1 : -1) * (30 + ((i * 11) % 40))
    return { left, delay, duration, size, color, sway, id: i }
  })

  return (
    <div
      aria-hidden
      className="sakura-rain pointer-events-none fixed inset-0 z-[1] overflow-hidden motion-reduce:hidden"
    >
      {petals.map(p => (
        <span
          key={p.id}
          className="sakura-petal absolute"
          style={{
            left: `${p.left}%`,
            top: `-10%`,
            opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ['--sway' as string]: `${p.sway}px`,
          }}
        >
          <SakuraPetal size={p.size} color={p.color} />
        </span>
      ))}
    </div>
  )
}
