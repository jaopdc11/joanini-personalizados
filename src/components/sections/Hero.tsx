import { ChevronDown } from 'lucide-react'
import { hero, brand, heroSocialProof } from '@/data/content'
import { WatercolorBlob } from '@/components/decor/WatercolorBlob'
import { FloatingHearts } from '@/components/decor/FloatingHearts'
import { WashiTape } from '@/components/decor/WashiTape'
import { Daisy, Bow, TwinkleStar } from '@/components/decor/Meigo'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { PhotoSlot } from '@/components/ui/PhotoSlot'
import { useSitePhoto } from '@/hooks/useSitePhoto'

const avatarHues = ['#FFB8C5', '#FFD6BA', '#C9E5C8', '#BDD9E8']

export function Hero() {
  const { photo } = useSitePhoto('hero')

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-36 md:pt-40"
      id="hero"
      style={{ contentVisibility: 'visible' }}
    >
      <WatercolorBlob color="#F8D7DA" size={460} opacity={0.55} className="-left-32 -top-24" />
      <WatercolorBlob color="#E8C4C8" size={360} opacity={0.45} className="right-[-100px] top-32" variant="splash" rotate={20} />

      <FloatingHearts className="z-0" count={4} />

      <Daisy size={48} className="left-6 top-28 md:left-12" />
      <Daisy size={36} className="right-10 top-24 md:right-20" petalColor="#FFE5D2" centerColor="#FFD6BA" ringColor="#FFB0C4" />
      <TwinkleStar className="left-1/4 top-1/3" color="#FFB0C4" size={22} />
      <TwinkleStar className="right-12 top-36" color="#FFEFC5" size={20} />
      <Bow size={70} className="right-12 top-12 md:right-20 md:top-16" rotate={-12} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <p className="fade-up mb-3 font-script text-3xl text-pink-deep md:text-4xl" style={{ animationDelay: '0.05s' }}>
            {hero.greeting}
          </p>

          <h1 className="fade-up font-serif text-5xl leading-[1.05] text-ink text-balance md:text-7xl" style={{ animationDelay: '0.18s' }}>
            {hero.title}{' '}
            <span className="gradient-text-shine font-script text-5xl sm:text-6xl md:text-8xl">{hero.highlight}</span>
          </h1>

          <p className="fade-up mt-6 max-w-lg text-pretty text-lg text-ink-soft md:text-xl" style={{ animationDelay: '0.32s' }}>
            {hero.subtitle}
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: '0.46s' }}>
            <WhatsAppButton size="lg" label={hero.ctaPrimary} pulse />
            <a
              href="#galeria"
              className="rounded-full px-6 py-4 text-ink underline-offset-4 transition-colors hover:text-pink-deep hover:underline"
            >
              {hero.ctaSecondary} →
            </a>
          </div>

          <div className="fade-up mt-8 flex items-center gap-4" style={{ animationDelay: '0.6s' }}>
            <div className="flex -space-x-3">
              {avatarHues.map((hue, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="avatar-breathe inline-block h-9 w-9 rounded-full ring-2 ring-warm-white shadow-sm"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, #ffffffaa, ${hue} 75%)`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
            <div className="leading-tight">
              <p className="font-script text-xl text-pink-deep">{heroSocialProof.text}</p>
              <p className="text-xs text-ink-soft">{heroSocialProof.subtext}</p>
            </div>
          </div>

          <p className="fade-up mt-10 font-script text-2xl text-pink-deep/80" style={{ animationDelay: '0.75s' }}>
            {brand.tagline}
          </p>
        </div>

        <div className="fade-up relative mx-auto w-full max-w-md" style={{ animationDelay: '0.3s' }}>
          <PhotoSlot
            src={photo?.image_url ?? '/joanini.jpeg'}
            alt="Trabalho artesanal da Joanini"
            aspect="4/5"
            variant="frame"
            loading="eager"
          />
          <WashiTape color="#FFB0C4" pattern="dots" rotate={-22} width={150} className="-left-6 -top-3" />
          <WashiTape color="#FFD6BA" pattern="hearts" rotate={14} width={120} className="-right-4 top-6" />
          <div className="absolute -bottom-6 -left-6 rotate-[-6deg] rounded-md bg-pink-mist px-4 py-2 font-script text-xl text-ink shadow-md">
            feito à mão ♡
          </div>
          <Bow size={64} className="-right-6 -top-6" rotate={18} color="#FF9FB3" />
          <Daisy size={36} className="-right-10 -bottom-4" />
        </div>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-pink-deep/80 transition-colors hover:text-pink-deep"
      >
        <ChevronDown className="h-8 w-8 scroll-hint" strokeWidth={1.4} />
      </a>
    </section>
  )
}
