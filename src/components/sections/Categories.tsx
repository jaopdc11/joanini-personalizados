import { Section } from '@/components/ui/Section'
import { WatercolorBlob } from '@/components/decor/WatercolorBlob'
import { MiniHeart } from '@/components/decor/FloatingHearts'
import { Daisy, TwinkleStar, Bow, Butterfly } from '@/components/decor/Meigo'
import { categories } from '@/data/categories'

export function Categories() {
  return (
    <Section
      id="categorias"
      eyebrow="o que faço"
      title="Tudo que sai daqui é feito com a mesma calma"
      subtitle="Cada peça vai pra casa carregando uma historinha — me conta a sua que a gente desenha junta."
    >
      <WatercolorBlob color="#F8D7DA" size={360} opacity={0.32} className="left-[-100px] top-1/3" />

      <Daisy size={44} className="left-4 top-16 md:left-10" />
      <Daisy size={32} className="right-6 bottom-12 md:right-16" petalColor="#FFE5D2" centerColor="#FFD6BA" />
      <TwinkleStar className="right-1/4 top-32 hidden md:block" color="#FFB0C4" size={20} delay={0.3} />
      <Bow size={56} className="left-1/3 top-10 hidden md:block" rotate={-10} color="#FF9FB3" />
      <Butterfly size={32} className="right-1/3 bottom-32 hidden md:block" path="flutter-right" delay={2} color="#FFB0C4" />

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ id, title, description, icon: Icon }) => (
          <li key={id}>
            <article className="card-lift group relative h-full rounded-[2rem] bg-warm-white p-7 ring-1 ring-pink-deep/15 shadow-[0_18px_40px_-25px_rgba(216,155,160,0.45)]">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-pink-mist to-peach text-pink-deep transition-transform group-hover:rotate-[-6deg]">
                <Icon strokeWidth={1.4} className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl text-ink">{title}</h3>
              <p className="mt-2 text-ink-soft text-pretty">{description}</p>
              <MiniHeart
                className="absolute right-6 top-6 opacity-40 transition-opacity group-hover:opacity-100"
                color="#FF9FB3"
                size={18}
              />
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
