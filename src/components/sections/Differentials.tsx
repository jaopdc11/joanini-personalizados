import { Heart, MessageCircle, MapPin, Sparkles, type LucideIcon } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { WashiTape } from '@/components/decor/WashiTape'
import { WatercolorBlob } from '@/components/decor/WatercolorBlob'
import { Daisy, TwinkleStar, Bow } from '@/components/decor/Meigo'
import { differentials } from '@/data/content'

const iconMap: Record<string, LucideIcon> = {
  Heart,
  MessageCircle,
  MapPin,
  Sparkles,
}

const cardBg: Record<string, string> = {
  pink: 'bg-sticky-pink',
  butter: 'bg-sticky-yellow',
  mint: 'bg-sticky-mint',
  peach: 'bg-peach',
}

const tapeFor: Record<string, string> = {
  pink: '#FF9FB3',
  butter: '#FFD96A',
  mint: '#7E8F73',
  peach: '#FFB388',
}

export function Differentials() {
  return (
    <Section
      id="diferenciais"
      eyebrow={differentials.eyebrow}
      title={differentials.title}
      subtitle={differentials.subtitle}
    >
      <WatercolorBlob color="#FFE4D6" size={320} opacity={0.32} className="-left-20 top-1/2" />
      <WatercolorBlob color="#F8D7DA" size={260} opacity={0.3} className="-right-16 top-10" variant="splash" rotate={-12} />

      <Daisy size={42} className="left-4 top-10 md:left-12" />
      <Daisy size={30} className="right-6 bottom-12 md:right-16" delay={0.6} petalColor="#FFE5D2" centerColor="#FFD6BA" />
      <TwinkleStar className="right-1/4 top-16 hidden md:block" color="#FFB0C4" size={18} delay={0.4} />
      <TwinkleStar className="left-1/3 bottom-8 hidden md:block" color="#FFEFC5" size={14} delay={1.1} />
      <Bow size={48} className="right-12 top-12 hidden md:block" rotate={14} color="#FF9FB3" />

      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {differentials.items.map((d) => {
          const Icon = iconMap[d.icon] ?? Heart
          return (
            <li
              key={d.title}
              style={{ ['--rot' as string]: `${d.rotate}deg`, transform: `rotate(${d.rotate}deg)` }}
              className={`sticker-card relative ${cardBg[d.color]} rounded-[1.4rem] p-6 shadow-sticky`}
            >
              <WashiTape
                color={tapeFor[d.color]}
                pattern="plain"
                rotate={d.rotate * -2}
                width={110}
                height={22}
                className="left-1/2 -top-3 -translate-x-1/2"
              />
              <div className="mt-4 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-white/70 text-ink shadow-sm">
                <Icon strokeWidth={1.5} className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl text-ink">{d.title}</h3>
              <p className="mt-2 text-pretty text-sm text-ink/80 md:text-base">{d.desc}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
