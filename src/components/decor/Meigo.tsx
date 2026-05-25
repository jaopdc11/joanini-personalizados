import { type CSSProperties } from 'react'

type BaseProps = { className?: string; style?: CSSProperties; size?: number }

export function Daisy({
  className,
  style,
  size = 36,
  petalColor = '#FFFBFC',
  centerColor = '#FFEFC5',
  ringColor = '#F2C5CA',
  spin = true,
  delay = 0,
}: BaseProps & {
  petalColor?: string
  centerColor?: string
  ringColor?: string
  spin?: boolean
  delay?: number
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className ?? ''}`}
      style={{ width: size, height: size, ...style }}
    >
      <svg
        viewBox="0 0 40 40"
        width="100%"
        height="100%"
        className={spin ? 'daisy-spin' : undefined}
        style={spin ? { animationDelay: `${delay}s` } : undefined}
      >
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="20"
            cy="9"
            rx="4.2"
            ry="8"
            fill={petalColor}
            stroke={ringColor}
            strokeOpacity="0.6"
            strokeWidth="0.7"
            transform={`rotate(${deg} 20 20)`}
          />
        ))}
        <circle cx="20" cy="20" r="4.5" fill={centerColor} />
        <circle cx="20" cy="20" r="2" fill={ringColor} opacity="0.7" />
      </svg>
    </div>
  )
}

export function Bow({
  className,
  style,
  size = 80,
  color = '#FF9FB3',
  shadow = '#D89BA0',
  rotate = -8,
  wiggle = true,
}: BaseProps & { color?: string; shadow?: string; rotate?: number; wiggle?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${wiggle ? 'bow-wiggle' : ''} ${className ?? ''}`}
      style={{
        width: size,
        height: size * 0.7,
        transform: `rotate(${rotate}deg)`,
        ['--bow-rotate' as string]: `${rotate}deg`,
        ...style,
      }}
    >
      <svg viewBox="0 0 80 60" width="100%" height="100%">
        <path d="M40,28 C18,8 8,30 30,32 C36,33 38,30 40,28 Z" fill={color} stroke={shadow} strokeOpacity="0.5" strokeWidth="0.8" />
        <path d="M40,28 C62,8 72,30 50,32 C44,33 42,30 40,28 Z" fill={color} stroke={shadow} strokeOpacity="0.5" strokeWidth="0.8" />
        <path d="M38,32 Q30,46 26,58 L34,58 Q40,42 40,34 Z" fill={color} stroke={shadow} strokeOpacity="0.5" strokeWidth="0.8" />
        <path d="M42,32 Q50,46 54,58 L46,58 Q40,42 40,34 Z" fill={color} stroke={shadow} strokeOpacity="0.5" strokeWidth="0.8" />
        <ellipse cx="40" cy="29" rx="5" ry="7" fill={shadow} />
        <ellipse cx="40" cy="27" rx="2.4" ry="3.6" fill={color} opacity="0.6" />
      </svg>
    </div>
  )
}

export function TwinkleStar({
  className,
  style,
  size = 22,
  color = '#FFD6BA',
  delay = 0,
}: BaseProps & { color?: string; delay?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute twinkle-star ${className ?? ''}`}
      style={{ width: size, height: size, animationDelay: `${delay}s`, ...style }}
    >
      <path d="M12 1 L13.4 10.6 L23 12 L13.4 13.4 L12 23 L10.6 13.4 L1 12 L10.6 10.6 Z" fill={color} />
      <circle cx="12" cy="12" r="1.4" fill="#FFFBFC" />
    </svg>
  )
}

export function Butterfly({
  className,
  style,
  size = 40,
  color = '#FFB0C4',
  highlight = '#FFFBFC',
  path = 'flutter-right',
  delay = 0,
}: BaseProps & {
  color?: string
  highlight?: string
  path?: 'flutter-right' | 'flutter-left' | 'flutter-loop'
  delay?: number
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute butterfly butterfly-${path} ${className ?? ''}`}
      style={{
        width: size,
        height: size * 0.85,
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      <svg viewBox="0 0 40 32" width="100%" height="100%" className="butterfly-wings">
        <ellipse cx="11" cy="11" rx="9" ry="7" fill={color} />
        <ellipse cx="11" cy="22" rx="7" ry="5.5" fill={color} opacity="0.9" />
        <ellipse cx="29" cy="11" rx="9" ry="7" fill={color} />
        <ellipse cx="29" cy="22" rx="7" ry="5.5" fill={color} opacity="0.9" />
        <circle cx="11" cy="11" r="2.2" fill={highlight} opacity="0.85" />
        <circle cx="29" cy="11" r="2.2" fill={highlight} opacity="0.85" />
        <ellipse cx="20" cy="16" rx="1.6" ry="9" fill="#5C4C4C" />
        <circle cx="20" cy="6" r="1.8" fill="#5C4C4C" />
        <path d="M19 4 Q 17 1 18 0" stroke="#5C4C4C" strokeWidth="0.6" fill="none" />
        <path d="M21 4 Q 23 1 22 0" stroke="#5C4C4C" strokeWidth="0.6" fill="none" />
      </svg>
    </div>
  )
}

export function SakuraPetal({ className, style, size = 18, color = '#FFB0C4' }: BaseProps & { color?: string }) {
  const gradId = `sakuraG-${color.replace('#', '')}`
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      style={{ width: size, height: size, ...style }}
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFBFC" stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <path
        d="M12 2 C 17 6, 21 11, 18 19 C 16 22, 14 21, 12 18 C 10 21, 8 22, 6 19 C 3 11, 7 6, 12 2 Z"
        fill={`url(#${gradId})`}
        stroke="#D89BA0"
        strokeOpacity="0.4"
        strokeWidth="0.5"
      />
    </svg>
  )
}
