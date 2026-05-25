import { Section } from '@/components/ui/Section'
import { Sticky } from '@/components/ui/Sticky'
import { WatercolorBlob } from '@/components/decor/WatercolorBlob'
import { MiniHeart } from '@/components/decor/FloatingHearts'
import { Daisy, TwinkleStar, Butterfly } from '@/components/decor/Meigo'
import { Fireflies } from '@/components/decor/Fireflies'
import { testimonials as meta } from '@/data/content'
import { useTestimonials } from '@/hooks/useTestimonials'

export function Testimonials() {
  const { items, loading } = useTestimonials()

  if (!loading && items.length === 0) return null

  return (
    <Section
      id="depoimentos"
      eyebrow={meta.eyebrow}
      title={meta.title}
      subtitle={meta.subtitle}
      bg="cream"
    >
      <WatercolorBlob color="#FBDDE0" size={360} opacity={0.32} className="-right-20 top-10" />
      <WatercolorBlob color="#FFE4D6" size={280} opacity={0.3} className="-left-12 bottom-20" variant="flower" rotate={20} />
      <Fireflies count={10} />

      <Daisy size={40} className="left-4 top-12 md:left-10" />
      <Daisy size={32} className="right-6 top-1/2 hidden md:block" delay={0.7} petalColor="#FFE5D2" centerColor="#FFD6BA" />
      <TwinkleStar className="right-1/4 top-12 hidden md:block" color="#FFB0C4" size={18} delay={0.4} />
      <Butterfly size={36} className="right-1/3 top-1/3 hidden md:block" path="flutter-loop" delay={2} color="#FF9FB3" />

      {!loading && items.length > 0 && (
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {items.map((t, idx) => (
            <div key={t.id} className="mb-6 break-inside-avoid">
              <Sticky color={t.color} rotate={t.rotate} accent={idx % 2 === 0 ? 'tape' : 'pin'}>
                <p className="font-script text-2xl leading-snug text-ink md:text-[1.6rem]">
                  <span className="select-none align-top text-3xl text-ink/40">"</span>
                  {t.text}
                  <span className="select-none align-bottom text-3xl text-ink/40">"</span>
                </p>
                <div className="mt-4 flex items-center gap-2 border-t border-ink/10 pt-3">
                  <MiniHeart color="#FF6F8A" size={14} />
                  <span className="font-serif text-base text-ink">{t.name}</span>
                  {t.occasion && <span className="text-xs text-ink/60">· {t.occasion}</span>}
                </div>
              </Sticky>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
