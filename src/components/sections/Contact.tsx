import { Instagram, Mail } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { WatercolorBlob } from '@/components/decor/WatercolorBlob'
import { MiniHeart } from '@/components/decor/FloatingHearts'
import { Daisy, TwinkleStar, Bow, Butterfly } from '@/components/decor/Meigo'
import { contact } from '@/data/content'

export function Contact() {
  return (
    <Section id="contato" eyebrow={contact.eyebrow} title={contact.title} subtitle={contact.subtitle}>
      <WatercolorBlob color="#F8D7DA" size={460} opacity={0.45} blur={60} className="-bottom-20 left-1/2 -translate-x-1/2" />
      <WatercolorBlob color="#FFE4D6" size={300} opacity={0.4} blur={50} className="right-[-60px] top-0" variant="splash" rotate={-10} />

      <Daisy size={48} className="left-6 top-16 md:left-16" delay={0.1} />
      <Daisy size={36} className="right-8 top-24 md:right-20" delay={0.5} petalColor="#FFE5D2" centerColor="#FFD6BA" />
      <Daisy size={32} className="left-1/3 bottom-12 hidden md:block" delay={1} />
      <Daisy size={28} className="right-1/4 bottom-20 hidden md:block" delay={1.4} petalColor="#FBDDE0" centerColor="#FFEFC5" />
      <TwinkleStar className="left-1/4 top-1/2" color="#FF9FB3" size={20} delay={0.3} />
      <TwinkleStar className="right-1/4 top-1/3 hidden md:block" color="#FFD6BA" size={18} delay={0.9} />
      <TwinkleStar className="left-12 bottom-1/3 hidden md:block" color="#FFB0C4" size={14} delay={1.5} />
      <Butterfly size={40} className="right-12 bottom-32 hidden md:block" path="flutter-left" delay={1.5} color="#FFB0C4" />

      <Reveal>
        <div className="relative mx-auto max-w-2xl rounded-[2.5rem] bg-warm-white p-10 ring-1 ring-pink-candy/30 shadow-[0_30px_60px_-30px_rgba(216,155,160,0.5)] md:p-14">
          <Bow size={84} className="-left-6 -top-8" rotate={-14} color="#FF9FB3" />
          <Bow size={64} className="-right-4 -bottom-6" rotate={20} color="#FFB0C4" />
          <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-pink-candy px-5 py-2 font-script text-lg text-warm-white shadow-md">
            <MiniHeart color="#FFFBFC" size={14} /> com carinho <MiniHeart color="#FFFBFC" size={14} />
          </div>
          <div className="flex flex-col items-center gap-6 text-center">
            <WhatsAppButton size="lg" label={`WhatsApp · ${contact.whatsappLabel}`} pulse />

            <p className="font-script text-2xl text-pink-deep/80">~ ou ~</p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-ink-soft">
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-pink-deep"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
                {contact.instagramHandle}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-pink-deep"
              >
                <Mail className="h-5 w-5" strokeWidth={1.5} />
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
