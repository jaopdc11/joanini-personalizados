import { type ReactNode, type CSSProperties } from 'react'
import { WashiTape } from '@/components/decor/WashiTape'

type StickyColor = 'yellow' | 'pink' | 'mint' | 'blue'
type Accent = 'tape' | 'pin' | 'none'

type Props = {
  color?: StickyColor
  rotate?: number
  accent?: Accent
  children: ReactNode
  className?: string
}

const bgClass: Record<StickyColor, string> = {
  yellow: 'bg-sticky-yellow',
  pink: 'bg-sticky-pink',
  mint: 'bg-sticky-mint',
  blue: 'bg-sticky-blue',
}

const tapeColor: Record<StickyColor, string> = {
  yellow: '#FFD6BA',
  pink: '#FF9FB3',
  mint: '#B8C5B0',
  blue: '#BDD9E8',
}

export function Sticky({
  color = 'pink',
  rotate = -2,
  accent = 'tape',
  children,
  className,
}: Props) {
  const style: CSSProperties = {
    transform: `rotate(${rotate}deg)`,
  }

  return (
    <div
      className={`relative inline-block w-full ${bgClass[color]} shadow-sticky ${className ?? ''}`}
      style={style}
    >
      {accent === 'tape' && (
        <WashiTape
          color={tapeColor[color]}
          pattern="plain"
          rotate={-rotate * 0.5}
          width={90}
          height={20}
          className="left-1/2 -top-2 -translate-x-1/2 z-10"
        />
      )}
      {accent === 'pin' && (
        <span
          aria-hidden
          className="absolute left-1/2 -top-2 z-10 h-4 w-4 -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #fff 0%, #FF6F8A 60%, #B23A55 100%)',
            boxShadow: '0 2px 4px rgba(92,76,76,0.45)',
          }}
        />
      )}
      <div className="relative px-5 py-6">{children}</div>
    </div>
  )
}
