import { type CSSProperties } from 'react'

type Props = {
  color?: string
  size?: number
  blur?: number
  opacity?: number
  className?: string
  style?: CSSProperties
  motionStyle?: never
  variant?: 'blob' | 'splash' | 'flower'
  rotate?: number
}

export function WatercolorBlob({
  color = '#F8D7DA',
  size = 320,
  opacity = 0.5,
  className,
  style,
  variant = 'blob',
  rotate = 0,
}: Props) {
  const baseStyle: CSSProperties = {
    width: size,
    height: size,
    opacity,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    background: `radial-gradient(closest-side, ${color}cc 0%, ${color}77 45%, ${color}22 75%, ${color}00 100%)`,
    borderRadius:
      variant === 'splash'
        ? '60% 40% 55% 45% / 50% 60% 40% 50%'
        : variant === 'flower'
          ? '50% 50% 50% 50% / 60% 40% 60% 40%'
          : '50%',
    ...style,
  }

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className ?? ''}`}
      style={baseStyle}
    />
  )
}
