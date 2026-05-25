type Props = {
  count?: number
  className?: string
  color?: string
}

export function RingBinder({ count = 9, className, color = '#C9B392' }: Props) {
  const holes = Array.from({ length: count })

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-6 left-3 flex w-7 flex-col items-center justify-around ${className ?? ''}`}
    >
      {holes.map((_, i) => (
        <span
          key={i}
          className="block h-4 w-4 rounded-full"
          style={{
            backgroundColor: '#FFFBFC',
            boxShadow: `inset 0 2px 3px rgba(92,76,76,0.35), 0 0 0 1px ${color}55`,
          }}
        />
      ))}
    </div>
  )
}
