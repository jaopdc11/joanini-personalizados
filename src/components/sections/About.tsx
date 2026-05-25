import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PhotoSlot } from '@/components/ui/PhotoSlot'
import { WatercolorBlob } from '@/components/decor/WatercolorBlob'
import { WashiTape } from '@/components/decor/WashiTape'
import { MiniHeart } from '@/components/decor/FloatingHearts'
import { Daisy, Bow, TwinkleStar, Butterfly } from '@/components/decor/Meigo'
import { about } from '@/data/content'
import { useSitePhoto } from '@/hooks/useSitePhoto'

export function About() {
  const { photo } = useSitePhoto('about')
  return (
    <Section id="sobre" eyebrow={about.eyebrow} bg="cream">
      <WatercolorBlob
        color="#F8D7DA"
        size={360}
        opacity={0.4}
        blur={50}
        className="-top-12 right-[-80px]"
      />

      <Daisy size={42} className="left-6 top-12 md:left-12" delay={0.1} />
      <Daisy size={28} className="left-1/4 top-32 hidden md:block" delay={0.6} petalColor="#FFE5D2" centerColor="#FFD6BA" />
      <Daisy size={36} className="right-8 bottom-16 md:right-12" delay={1} />
      <TwinkleStar className="right-1/4 top-20 hidden md:block" color="#FFB0C4" size={18} delay={0.4} />
      <TwinkleStar className="left-12 bottom-32 hidden md:block" color="#FFD6BA" size={14} delay={1.2} />
      <Butterfly size={36} className="right-1/3 top-12 hidden md:block" path="flutter-loop" delay={1.5} color="#FF9FB3" />

      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="relative w-full">
            <PhotoSlot
              variant="polaroid"
              aspect="4/5"
              src={photo?.image_url ?? undefined}
              alt="Foto"
              rotate={-2}
            />
            <WashiTape color="#FFB0C4" pattern="stripes" rotate={-18} width={130} className="-left-4 -top-3 z-10" />
            <Bow size={56} className="-right-6 -top-6 z-10" rotate={14} color="#FF9FB3" />
            <Daisy size={28} className="-left-6 bottom-1/3 z-10" delay={0.3} />
            <div className="absolute -bottom-4 -right-4 z-10 flex items-center gap-1 rotate-3 rounded-md bg-cream px-3 py-1 font-script text-lg text-ink shadow-md">
              <MiniHeart color="#FF9FB3" size={12} /> feito à mão <MiniHeart color="#FF9FB3" size={12} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-serif text-3xl text-ink text-balance md:text-4xl">
            {about.title}
          </h2>

          <div className="mt-6 space-y-4 text-pretty text-ink-soft md:text-lg">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <blockquote className="mt-8 flex items-start gap-3 border-l-2 border-pink-candy/60 pl-6 font-script text-2xl text-pink-deep md:text-3xl">
            <MiniHeart color="#FF9FB3" size={18} className="mt-3 shrink-0" />
            <span>"{about.pullQuote}"</span>
          </blockquote>
        </Reveal>
      </div>
    </Section>
  )
}
