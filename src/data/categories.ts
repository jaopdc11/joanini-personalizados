import {
  Mail,
  Gift,
  BookOpen,
  Cake,
  Tag,
  Package,
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
    id: 'convites',
    title: 'Convites personalizados',
    description: 'Casamento, batizado, chá de bebê e aniversário com identidade só sua.',
    icon: Mail,
  },
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
    id: 'topo',
    title: 'Topo de bolo',
    description: 'Aquele detalhe que arremata a foto e a memória do dia.',
    icon: Cake,
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
]
