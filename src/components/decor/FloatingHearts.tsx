type HeartProps = {
  className?: string
  count?: number
  palette?: string[]
}

const defaultPalette = ['#FF9FB3', '#F2C5CA', '#FFD6BA', '#FBDDE0']

export function FloatingHearts({ className, count = 6, palette = defaultPalette }: HeartProps) {
  const hearts = Array.from({ length: count }, (_, i) => {
    const left = 6 + ((i * 14.7) % 88)
    const size = 12 + ((i * 7) % 16)
    const delay = (i * 0.8) % 5.5
    const duration = 6 + ((i * 1.3) % 4)
    const color = palette[i % palette.length]
    return { left, size, delay, duration, color, id: i }
  })

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}>
      {hearts.map((h) => (
        <svg
          key={h.id}
          width={h.size}
          height={h.size}
          viewBox="0 0 24 24"
          fill={h.color}
          className="absolute bottom-0 heart-float"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            opacity: 0.8,
          }}
        >
          <path d="M12 21s-7-4.5-9.5-9.5C0.5 7 3.5 3 7.5 3c2 0 3.5 1 4.5 2.5C13 4 14.5 3 16.5 3c4 0 7 4 5 8.5C19 16.5 12 21 12 21z" />
        </svg>
      ))}
    </div>
  )
}

type SparkleProps = { className?: string; color?: string; size?: number }

export function Sparkle({ className, color = '#FFD6BA', size = 18 }: SparkleProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`sparkle-pulse ${className ?? ''}`}
    >
      <path
        d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill={color}
      />
    </svg>
  )
}

type HeartProps2 = { className?: string; color?: string; size?: number }

export function MiniHeart({ className, color = '#FF9FB3', size = 14 }: HeartProps2) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path d="M12 21s-7-4.5-9.5-9.5C0.5 7 3.5 3 7.5 3c2 0 3.5 1 4.5 2.5C13 4 14.5 3 16.5 3c4 0 7 4 5 8.5C19 16.5 12 21 12 21z" />
    </svg>
  )
}
