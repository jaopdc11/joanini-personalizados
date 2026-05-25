type Props = {
  count?: number
  className?: string
  palette?: string[]
}

const defaultPalette = ['#FFD6BA', '#FBDDE0', '#FFEFC5', '#FFB0C4']

export function Fireflies({ count = 8, className, palette = defaultPalette }: Props) {
  const flies = Array.from({ length: count }, (_, i) => {
    const left = (i * 17 + 5) % 100
    const top = (i * 23 + 8) % 90
    const size = 3 + ((i * 5) % 5)
    const delay = (i * 0.6) % 4
    const duration = 4 + ((i * 1.7) % 4)
    const color = palette[i % palette.length]
    return { left, top, size, delay, duration, color, id: i }
  })

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}>
      {flies.map((f) => (
        <span
          key={f.id}
          className="firefly absolute rounded-full"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
            background: f.color,
            boxShadow: `0 0 ${f.size * 3}px ${f.size}px ${f.color}55`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
