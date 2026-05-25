import { Section } from '@/components/ui/Section'
import { PhotoSlot } from '@/components/ui/PhotoSlot'
import { WashiTape } from '@/components/decor/WashiTape'
import { MiniHeart } from '@/components/decor/FloatingHearts'
import { Daisy, TwinkleStar, Bow, Butterfly } from '@/components/decor/Meigo'
import { useGallery } from '@/hooks/useGallery'
import type { GalleryItem } from '@/types/database'

export function Gallery() {
  const { items, loading } = useGallery()

  return (
    <Section
      id="galeria"
      eyebrow="álbum"
      title="Trabalhos que já saíram pelo mundo"
      subtitle="Uma amostrinha pra te inspirar — quase tudo aqui é único, então o seu pode ficar do jeitinho que faz sentido pra você."
    >
      <Daisy size={42} className="left-2 top-12 md:left-8" />
      <Daisy size={32} className="right-2 top-1/4 md:right-12" petalColor="#FFE5D2" centerColor="#FFD6BA" />
      <TwinkleStar className="right-1/3 top-20 hidden md:block" color="#FFB0C4" size={18} delay={0.3} />
      <Bow size={56} className="right-12 bottom-12 hidden md:block" rotate={14} color="#FF9FB3" />
      <Butterfly size={36} className="left-1/2 top-1/3 hidden md:block" path="flutter-loop" delay={2} color="#FF9FB3" />

      {!loading && items.length > 0 && (
        <div className="columns-1 gap-7 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {items.map((item, idx) => (
            <GalleryCard key={item.id} item={item} idx={idx} />
          ))}
        </div>
      )}

      <p className="mt-14 flex items-center justify-center gap-3 text-center font-script text-2xl text-pink-deep/80">
        <MiniHeart color="#FF9FB3" size={16} />
        pode passear, todos foram feitos com cuidado
        <MiniHeart color="#FF9FB3" size={16} />
      </p>
    </Section>
  )
}

type CardProps = { item: GalleryItem; idx: number }

const aspectFor = (span: GalleryItem['span']) =>
  span === 'tall' ? '3/4' : span === 'wide' ? '5/4' : '1/1'


const rotations = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5, -1]
const tapeColors = ['#FFB0C4', '#FFD6BA', '#C9E5C8', '#BDD9E8']

function GalleryCard({ item, idx }: CardProps) {
  const rotate = rotations[idx % rotations.length]
  const showWashi = idx % 2 === 0
  const tapeColor = tapeColors[idx % tapeColors.length]
  const tapePattern = (['plain', 'dots', 'stripes', 'hearts'] as const)[idx % 4]
  const caption = item.title.split('·')[0].trim()

  return (
    <div className="relative mb-7 break-inside-avoid">
      <div className="polaroid-wiggle group relative">
        {showWashi && (
          <WashiTape
            color={tapeColor}
            pattern={tapePattern}
            rotate={rotate * -3}
            width={120}
            height={22}
            className="left-1/2 -top-3 z-10 -translate-x-1/2"
          />
        )}
        <PhotoSlot
          variant="polaroid"
          aspect={aspectFor(item.span) as '1/1' | '3/4' | '5/4'}
          src={item.image_url ?? undefined}
          alt={item.title}
          caption={`~ ${caption} ~`}
          rotate={rotate}
        />
      </div>
    </div>
  )
}
