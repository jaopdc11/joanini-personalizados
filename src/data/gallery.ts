export type GalleryItem = {
  id: string
  title: string
  category: string
  hue: string
  span: 'tall' | 'wide' | 'normal'
}

export const gallery: GalleryItem[] = [
  { id: 'g1', title: 'Convite de batizado · Helena', category: 'convites', hue: '#F8D7DA', span: 'tall' },
  { id: 'g2', title: 'Lembrancinha chá de bebê', category: 'lembrancinhas', hue: '#FFE4D6', span: 'normal' },
  { id: 'g3', title: 'Caderno costurado floral', category: 'cadernos', hue: '#E8C4C8', span: 'normal' },
  { id: 'g4', title: 'Topo de bolo "1 aninho"', category: 'topo', hue: '#FFF0F5', span: 'wide' },
  { id: 'g5', title: 'Cartões de agradecimento', category: 'cartoes', hue: '#F8D7DA', span: 'normal' },
  { id: 'g6', title: 'Caixinha rosé com fita', category: 'caixinhas', hue: '#E8C4C8', span: 'tall' },
  { id: 'g7', title: 'Convite casamento aquarela', category: 'convites', hue: '#FFFBFC', span: 'normal' },
  { id: 'g8', title: 'Tags artesanais — kit 12', category: 'cartoes', hue: '#FFE4D6', span: 'normal' },
  { id: 'g9', title: 'Planner mensal capa rosé', category: 'cadernos', hue: '#F8D7DA', span: 'normal' },
]
