import { type ReactNode } from 'react'

type Props = {
  id?: string
  children: ReactNode
  eyebrow?: string
  title?: ReactNode
  subtitle?: string
  className?: string
  contentClassName?: string
  bg?: 'warm-white' | 'cream' | 'transparent'
}

const bgClass = {
  'warm-white': 'bg-warm-white/80',
  cream: 'bg-cream/70',
  transparent: 'bg-transparent',
}

export function Section({
  id,
  children,
  eyebrow,
  title,
  subtitle,
  className,
  contentClassName,
  bg = 'transparent',
}: Props) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden py-24 md:py-32 ${bgClass[bg]} ${className ?? ''}`}
    >
      <div className={`relative z-10 mx-auto w-full max-w-6xl px-6 ${contentClassName ?? ''}`}>
        {(eyebrow || title || subtitle) && (
          <header className="mb-12 text-center md:mb-16">
            {eyebrow && (
              <p className="mb-3 font-script text-2xl text-pink-deep">{eyebrow}</p>
            )}
            {title && (
              <h2 className="font-serif text-4xl text-ink text-balance md:text-5xl">{title}</h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-ink-soft text-pretty md:text-lg">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
