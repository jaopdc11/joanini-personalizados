import { type ReactNode, type CSSProperties } from 'react'

type StickerColor = 'pink' | 'butter' | 'mint' | 'peach'

type Props = {
  color?: StickerColor
  rotate?: number
  size?: number
  children: ReactNode
  className?: string
}

const palette: Record<StickerColor, { fill: string; ring: string; text: string }> = {
  pink: { fill: '#FFB8C5', ring: '#FF9FB3', text: '#5C4C4C' },
  butter: { fill: '#FFEFC5', ring: '#FFD96A', text: '#5C4C4C' },
  mint: { fill: '#C9E5C8', ring: '#7E8F73', text: '#3F4F38' },
  peach: { fill: '#FFD6BA', ring: '#FFB388', text: '#5C4C4C' },
}

export function Sticker({
  color = 'pink',
  rotate = -3,
  size = 200,
  children,
  className,
}: Props) {
  const c = palette[color]
  const style: CSSProperties = {
    width: size,
    height: size,
    transform: `rotate(${rotate}deg)`,
    backgroundColor: c.fill,
    color: c.text,
    boxShadow: `0 16px 30px -16px rgba(92,76,76,0.35), inset 0 0 0 6px #FFFBFC, inset 0 0 0 7px ${c.ring}33`,
  }

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full text-center ${className ?? ''}`}
      style={style}
    >
      <div className="px-4">{children}</div>
    </div>
  )
}
