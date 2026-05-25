import { MiniHeart } from './FloatingHearts'

type Props = {
  text?: string
  className?: string
  variant?: 'tilde' | 'heart' | 'flower'
}

export function ScriptDivider({ text, className, variant = 'heart' }: Props) {
  const symbol = variant === 'heart' ? null : variant === 'flower' ? '✿ ✿ ✿' : '~ ~ ~'

  return (
    <div className={`flex items-center justify-center gap-4 py-6 text-pink-deep ${className ?? ''}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-pink-deep/40 to-pink-deep/60" />
      {variant === 'heart' ? (
        <span className="flex items-center gap-2">
          <MiniHeart color="#F2C5CA" size={12} />
          {text ? (
            <span className="font-script text-2xl text-pink-deep/80">{text}</span>
          ) : (
            <MiniHeart color="#FF9FB3" size={16} />
          )}
          <MiniHeart color="#F2C5CA" size={12} />
        </span>
      ) : (
        <span className="font-script text-3xl text-pink-deep/80">{text ?? symbol}</span>
      )}
      <span className="h-px w-16 bg-gradient-to-l from-transparent via-pink-deep/40 to-pink-deep/60" />
    </div>
  )
}
