import { type ReactNode } from 'react'
import { RingBinder } from '@/components/decor/RingBinder'

type Tone = 'cream' | 'kraft' | 'warm-white' | 'kraft-light'
type Edge = 'deckle' | 'clean'

type Props = {
  id?: string
  children: ReactNode
  binder?: 'left' | false
  edge?: Edge
  tone?: Tone
  className?: string
  innerClassName?: string
  lined?: boolean
}

const toneClass: Record<Tone, string> = {
  cream: 'bg-cream',
  kraft: 'bg-kraft',
  'kraft-light': 'bg-kraft-light',
  'warm-white': 'bg-warm-white',
}

export function NotebookPage({
  id,
  children,
  binder = false,
  edge = 'clean',
  tone = 'warm-white',
  className,
  innerClassName,
  lined = false,
}: Props) {
  return (
    <section
      id={id}
      className={`relative isolate mx-auto w-[min(100%,76rem)] my-10 md:my-14 ${className ?? ''}`}
    >
      {edge === 'deckle' && (
        <div
          aria-hidden
          className={`deckle-edge-top absolute -top-[1px] left-0 right-0 h-8 ${toneClass[tone]}`}
        />
      )}

      <div
        className={`relative overflow-hidden ${toneClass[tone]} shadow-page ring-1 ring-pink-deep/10`}
        style={{
          borderRadius: '28px',
        }}
      >
        {lined && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 notebook-lines opacity-60"
          />
        )}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 mix-blend-multiply opacity-30 ${
            tone === 'kraft' || tone === 'kraft-light' ? 'bg-kraft-fiber' : 'bg-paper-texture'
          }`}
        />

        {binder === 'left' && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-black/5 to-transparent"
            />
            <RingBinder />
          </>
        )}

        <div
          className={`relative ${binder === 'left' ? 'pl-16 md:pl-20' : ''} px-6 md:px-12 py-16 md:py-20 ${innerClassName ?? ''}`}
        >
          {children}
        </div>
      </div>

      {edge === 'deckle' && (
        <div
          aria-hidden
          className={`deckle-edge-bottom absolute -bottom-[1px] left-0 right-0 h-8 ${toneClass[tone]}`}
        />
      )}
    </section>
  )
}
