import { type CSSProperties } from 'react'

type Props = {
  color?: string
  pattern?: 'plain' | 'dots' | 'stripes' | 'hearts'
  rotate?: number
  width?: number | string
  height?: number
  className?: string
  style?: CSSProperties
}

export function WashiTape({
  color = '#F2C5CA',
  pattern = 'plain',
  rotate = -8,
  width = 140,
  height = 28,
  className,
  style,
}: Props) {
  const overlay =
    pattern === 'dots'
      ? 'radial-gradient(circle at 6px 6px, rgba(255,255,255,0.7) 1.6px, transparent 2px) 0 0 / 14px 14px'
      : pattern === 'stripes'
        ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 4px, transparent 4px 12px)'
        : pattern === 'hearts'
          ? `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M12 18s-6-4-6-9c0-2 1.5-3 3-3 1 0 2 0.5 3 1.5C13 6.5 14 6 15 6c1.5 0 3 1 3 3 0 5-6 9-6 9z' fill='rgba(255,255,255,0.7)'/></svg>") 0 0 / 24px 24px`
          : 'none'

  return (
    <div
      aria-hidden
      className={`absolute select-none ${className ?? ''}`}
      style={{
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        backgroundColor: color,
        backgroundImage: overlay,
        backgroundBlendMode: 'multiply',
        boxShadow: '0 6px 18px -10px rgba(92,76,76,0.4)',
        opacity: 0.92,
        ...style,
      }}
    >
      <div
        className="absolute inset-y-0 left-0 w-2"
        style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.5), transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-2"
        style={{ background: 'linear-gradient(-90deg, rgba(255,255,255,0.5), transparent)' }}
      />
    </div>
  )
}
