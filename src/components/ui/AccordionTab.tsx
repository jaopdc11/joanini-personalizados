import { useState } from 'react'
import { Plus } from 'lucide-react'

export type AccordionItem = {
  q: string
  a: string
}

type Props = {
  items: AccordionItem[]
  className?: string
}

const tabColors = ['bg-sticky-pink', 'bg-sticky-yellow', 'bg-sticky-mint', 'bg-sticky-blue']

export function AccordionTab({ items, className }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <ul className={`flex flex-col gap-3 ${className ?? ''}`}>
      {items.map((item, idx) => {
        const isOpen = openIdx === idx
        const tabColor = tabColors[idx % tabColors.length]

        return (
          <li
            key={idx}
            className="relative overflow-hidden rounded-2xl bg-warm-white shadow-page ring-1 ring-pink-deep/10"
          >
            <span aria-hidden className={`absolute left-0 top-0 h-full w-2 ${tabColor}`} />

            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8"
            >
              <span className="font-serif text-lg text-ink md:text-xl">{item.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-mist text-pink-deep transition-transform duration-200 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </span>
            </button>

            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="px-6 pb-6 text-pretty text-ink-soft md:px-8 md:text-lg">{item.a}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
