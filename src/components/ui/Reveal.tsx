import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'header' | 'footer'
}

export function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: '0px 0px -80px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style = delay ? ({ transitionDelay: `${delay * 1000}ms` } as const) : undefined

  const Tag = as
  return (
    <Tag
      ref={ref as never}
      style={style}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className ?? ''}`}
    >
      {children}
    </Tag>
  )
}
