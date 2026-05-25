import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { AccordionTab } from '@/components/ui/AccordionTab'
import { WatercolorBlob } from '@/components/decor/WatercolorBlob'
import { Daisy, TwinkleStar, Bow } from '@/components/decor/Meigo'
import { faq } from '@/data/content'

export function Faq() {
  return (
    <Section
      id="faq"
      eyebrow={faq.eyebrow}
      title={faq.title}
      subtitle={faq.subtitle}
    >
      <WatercolorBlob color="#FFE4D6" size={360} opacity={0.32} blur={60} className="-left-20 top-1/3" />
      <WatercolorBlob color="#F8D7DA" size={280} opacity={0.3} blur={50} className="right-[-60px] bottom-10" variant="splash" rotate={14} />

      <Daisy size={38} className="left-4 top-12 md:left-10" delay={0.1} />
      <Daisy size={28} className="right-6 bottom-16 md:right-12" delay={0.6} petalColor="#FFE5D2" centerColor="#FFD6BA" />
      <TwinkleStar className="right-1/4 top-12 hidden md:block" color="#FFB0C4" size={18} delay={0.4} />
      <Bow size={48} className="left-1/3 top-10 hidden md:block" rotate={-10} color="#FF9FB3" wiggle />

      <Reveal>
        <div className="mx-auto max-w-3xl">
          <AccordionTab items={faq.items} />
        </div>
      </Reveal>
    </Section>
  )
}
