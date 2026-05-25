import { Image as ImageIcon } from 'lucide-react'
import { type CSSProperties } from 'react'

type Aspect = '1/1' | '4/5' | '3/4' | '5/4' | '3/2'
type Variant = 'frame' | 'polaroid' | 'plain'

type Props = {
  src?: string
  alt: string
  aspect?: Aspect
  variant?: Variant
  caption?: string
  className?: string
  imgClassName?: string
  rotate?: number
  loading?: 'lazy' | 'eager'
}

const aspectStyle: Record<Aspect, string> = {
  '1/1': 'aspect-square',
  '4/5': 'aspect-[4/5]',
  '3/4': 'aspect-[3/4]',
  '5/4': 'aspect-[5/4]',
  '3/2': 'aspect-[3/2]',
}

export function PhotoSlot({
  src,
  alt,
  aspect = '4/5',
  variant = 'frame',
  caption,
  className,
  imgClassName,
  rotate = 0,
  loading = 'lazy',
}: Props) {
  const style: CSSProperties = rotate ? { transform: `rotate(${rotate}deg)` } : {}

  if (variant === 'polaroid') {
    return (
      <figure
        className={`relative block w-full bg-warm-white p-3 pb-12 shadow-page ring-1 ring-ink/5 ${className ?? ''}`}
        style={style}
      >
        <div className={`relative w-full overflow-hidden bg-cream ${aspectStyle[aspect]}`}>
          {src ? (
            <img src={src} alt={alt} loading={loading} className={`h-full w-full object-cover ${imgClassName ?? ''}`} />
          ) : (
            <PlaceholderArt alt={alt} />
          )}
        </div>
        {caption && (
          <figcaption className="absolute inset-x-0 bottom-2 text-center font-script text-xl text-ink-soft">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  if (variant === 'plain') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-cream ${aspectStyle[aspect]} ${className ?? ''}`}
        style={style}
      >
        {src ? (
          <img src={src} alt={alt} loading={loading} className={`h-full w-full object-cover ${imgClassName ?? ''}`} />
        ) : (
          <PlaceholderArt alt={alt} />
        )}
      </div>
    )
  }

  // frame (default) — moldura suave inspirada no hero original
  return (
    <div className={`relative ${className ?? ''}`} style={style}>
      <div className="absolute inset-0 -rotate-2 rounded-[2.5rem] bg-pink-mist/70 shadow-[0_30px_60px_-30px_rgba(216,155,160,0.55)]" />
      <div className={`relative w-full overflow-hidden rounded-[2.5rem] bg-cream ring-1 ring-pink-deep/20 shadow-[0_30px_70px_-30px_rgba(92,76,76,0.35)] ${aspectStyle[aspect]}`}>
        {src ? (
          <img src={src} alt={alt} loading={loading} className={`h-full w-full object-cover ${imgClassName ?? ''}`} />
        ) : (
          <PlaceholderArt alt={alt} />
        )}
      </div>
    </div>
  )
}

function PlaceholderArt({ alt }: { alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-cream to-pink-mist/60 text-pink-deep/50"
    >
      <ImageIcon strokeWidth={1.2} className="h-12 w-12" />
      <span className="font-script text-base text-ink-soft/60">{alt}</span>
    </div>
  )
}
