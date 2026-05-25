import { Instagram } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { WashiTape } from '@/components/decor/WashiTape'
import { WatercolorBlob } from '@/components/decor/WatercolorBlob'
import { FloatingHearts, MiniHeart } from '@/components/decor/FloatingHearts'
import { Fireflies } from '@/components/decor/Fireflies'
import { Daisy, Bow, TwinkleStar, Butterfly } from '@/components/decor/Meigo'
import { contact, finalCta } from '@/data/content'

export function FinalCta() {
  return (
    <section
      id="vamos-celebrar"
      className="relative isolate overflow-hidden py-28 md:py-36"
    >
      <FloatingHearts count={8} className="z-0" />
      <Fireflies count={12} className="z-0" />

      <WatercolorBlob color="#FBDDE0" size={520} opacity={0.5} blur={60} className="-left-24 -top-16" />
      <WatercolorBlob color="#FFE4D6" size={420} opacity={0.45} blur={50} className="right-[-100px] bottom-0" variant="splash" rotate={20} />

      <Daisy size={48} className="left-6 top-12 md:left-16" delay={0.1} />
      <Daisy size={36} className="right-10 bottom-20 md:right-20" delay={0.6} petalColor="#FFE5D2" centerColor="#FFD6BA" />
      <Daisy size={28} className="left-1/4 bottom-10 hidden md:block" delay={1} />
      <TwinkleStar className="right-1/3 top-16" color="#FFB0C4" size={20} delay={0.3} />
      <TwinkleStar className="left-1/3 bottom-1/3 hidden md:block" color="#FFD6BA" size={16} delay={0.9} />
      <Butterfly size={40} className="right-1/4 top-1/3 hidden md:block" path="flutter-left" delay={1.2} color="#FF9FB3" />

      <Reveal>
        <div className="relative mx-auto max-w-4xl px-6">
          {/* envelope/carta-convite */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-warm-white/95 p-10 shadow-page ring-1 ring-pink-deep/20 md:p-16">
            {/* deckle interno via gradient/border-image suave */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[2.5rem]"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(216,155,160,0.25), inset 0 0 60px rgba(255,232,230,0.5)',
              }}
            />
            <Bow size={84} className="-left-6 -top-8 z-10" rotate={-14} color="#FF9FB3" />
            <Bow size={68} className="-right-4 -bottom-6 z-10" rotate={20} color="#FFB0C4" />

            {/* washi tapes nos cantos como se segurando o papel */}
            <WashiTape color="#FFB0C4" pattern="dots" rotate={-22} width={160} height={26} className="-left-6 top-12 z-10" />
            <WashiTape color="#FFD6BA" pattern="hearts" rotate={18} width={140} height={26} className="-right-6 top-20 z-10" />

            {/* selo redondo */}
            <div
              className="absolute right-6 top-6 z-10 flex h-20 w-20 -rotate-12 items-center justify-center rounded-full bg-pink-deep text-warm-white shadow-md md:right-10 md:top-10 md:h-24 md:w-24"
              aria-hidden
            >
              <span className="text-center font-script text-base leading-tight md:text-lg">
                feito<br />à mão<br />♡
              </span>
            </div>

            <div className="relative text-center">
              <p className="font-script text-2xl text-pink-deep md:text-3xl">{finalCta.eyebrow}</p>
              <h2 className="title-shimmer mt-3 font-serif text-4xl text-balance md:text-6xl">
                {finalCta.title}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-ink-soft md:text-lg">
                {finalCta.subtitle}
              </p>

              <div className="mt-10 flex flex-col items-center gap-4">
                <WhatsAppButton size="lg" label={finalCta.whatsappLabel} pulse />
                <p className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="font-script text-lg">{finalCta.altLine}</span>
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-pink-deep underline-offset-4 hover:underline"
                  >
                    <Instagram className="h-4 w-4" strokeWidth={1.6} />
                    {contact.instagramHandle}
                  </a>
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3 font-script text-xl text-pink-deep/80">
                <MiniHeart color="#FF9FB3" size={14} />
                <span>com tempo, papel e carinho</span>
                <MiniHeart color="#FF9FB3" size={14} />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
