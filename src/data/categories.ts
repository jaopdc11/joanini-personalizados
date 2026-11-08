import {
  Gift,
  BookOpen,
  Tag,
  Package,
  PackageOpen,
  Sparkles,
  KeyRound,
  Badge,
  NotebookPen,
  StickyNote,
  Sticker,
  Shirt,
  Bookmark,
  Calendar,
  BookHeart,
  Boxes,
  ChefHat,
  Album,
  type LucideIcon,
} from 'lucide-react'

export type Category = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const categories: Category[] = [
  {
    id: 'lembrancinhas',
    title: 'Lembrancinhas',
    description: 'Pequenos mimos pra agradecer com a mesma delicadeza do convite.',
    icon: Gift,
  },
  {
    id: 'cadernos',
    title: 'Cadernos & planners',
    description: 'Capas costuradas à mão pra registrar o que importa.',
    icon: BookOpen,
  },
  {
    id: 'cartoes',
    title: 'Cartões & tags',
    description: 'Pra acompanhar presente, agradecimento ou só um “pensei em você”.',
    icon: Tag,
  },
  {
    id: 'cartonagem',
    title: 'Cartonagem',
    description: 'Caixinhas, álbuns e estojos forrados à mão — papel, tecido e muito capricho.',
    icon: Package,
  },
  {
    id: 'embalagens',
    title: 'Embalagens',
    description: '',
    icon: PackageOpen,
  },
  {
    id: 'brindes',
    title: 'Brindes',
    description: '',
    icon: Sparkles,
  },
  {
    id: 'chaveiros',
    title: 'Chaveiros',
    description: '',
    icon: KeyRound,
  },
  {
    id: 'bottons',
    title: 'Bottons',
    description: '',
    icon: Badge,
  },
  {
    id: 'agendas',
    title: 'Agendas',
    description: '',
    icon: NotebookPen,
  },
  {
    id: 'blocos',
    title: 'Blocos',
    description: '',
    icon: StickyNote,
  },
  {
    id: 'etiquetas',
    title: 'Etiquetas',
    description: '',
    icon: Sticker,
  },
  {
    id: 'toalhas',
    title: 'Toalhas sublimadas',
    description: '',
    icon: Shirt,
  },
  {
    id: 'marca-paginas',
    title: 'Marca páginas',
    description: '',
    icon: Bookmark,
  },
  {
    id: 'calendarios',
    title: 'Calendários',
    description: '',
    icon: Calendar,
  },
  {
    id: 'caderneta-saude',
    title: 'Caderneta de Saúde',
    description: '',
    icon: BookHeart,
  },
  {
    id: 'kits',
    title: 'Kits',
    description: '',
    icon: Boxes,
  },
  {
    id: 'receitas',
    title: 'Receitas',
    description: '',
    icon: ChefHat,
  },
  {
    id: 'albuns',
    title: 'Álbuns',
    description: '',
    icon: Album,
  },
]
