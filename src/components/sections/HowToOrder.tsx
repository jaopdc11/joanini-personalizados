import { Section } from '@/components/ui/Section'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { MiniHeart } from '@/components/decor/FloatingHearts'
import { Daisy, TwinkleStar, Bow } from '@/components/decor/Meigo'
import { howToOrder } from '@/data/content'

export function HowToOrder() {
  return (
    <Section
      id="como-encomendar"
      eyebrow={howToOrder.eyebrow}
      title={howToOrder.title}
      subtitle={howToOrder.subtitle}
      bg="cream"
    >
      <Daisy size={42} className="left-4 top-12 md:left-10" />
      <Daisy size={32} className="right-6 bottom-10 md:right-16" petalColor="#FFE5D2" centerColor="#FFD6BA" />
      <TwinkleStar className="right-1/3 top-12 hidden md:block" color="#FFB0C4" size={18} delay={0.4} />
      <TwinkleStar className="left-1/3 bottom-20 hidden md:block" color="#FFEFC5" size={14} delay={1.1} />
      <Bow size={48} className="right-12 top-12 hidden md:block" rotate={-14} color="#FF9FB3" />

      <div className="relative">
        <DashedTrack />

        <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          {howToOrder.steps.map((step) => (
            <li key={step.n} className="relative flex flex-col items-center text-center md:items-start md:text-left">
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-warm-white to-pink-mist ring-2 ring-pink-candy/40 shadow-[0_18px_30px_-18px_rgba(216,155,160,0.6)]">
                <span className="font-script text-4xl text-pink-deep">{step.n}</span>
                <MiniHeart className="absolute -right-1 -top-1 sparkle-pulse" color="#FF9FB3" size={16} />
              </div>
              <h3 className="font-serif text-xl text-ink md:text-2xl">{step.title}</h3>
              <p className="mt-2 max-w-xs text-pretty text-ink-soft">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 flex justify-center">
        <WhatsAppButton size="lg" label="Começar minha encomenda" pulse />
      </div>
    </Section>
  )
}

function DashedTrack() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 top-10 hidden h-12 w-full md:block"
      viewBox="0 0 1000 50"
      preserveAspectRatio="none"
    >
      <path
        d="M40,25 Q260,0 500,25 T960,25"
        fill="none"
        stroke="#C9A8A8"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
    </svg>
  )
}
