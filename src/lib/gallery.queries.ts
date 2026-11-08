import { api, idDaImagem } from '@/lib/api'
import type { GalleryItem, Span } from '@/types/database'

export type GalleryItemInput = {
  title: string
  category: string
  span: Span
  imagem_id: string | null
  sort_order: number
  published: boolean
}

export const listGalleryItems = () => api.get<GalleryItem[]>('/admin/galeria')
export const listPublishedGalleryItems = () => api.get<GalleryItem[]>('/galeria')

export const insertGalleryItem = (item: GalleryItemInput) => api.post<GalleryItem>('/admin/galeria', item)

export const updateGalleryItem = (id: string, item: GalleryItemInput) =>
  api.put<GalleryItem>(`/admin/galeria/${id}`, item)

export const removeGalleryItem = (id: string) => api.del(`/admin/galeria/${id}`)

export const reorderGalleryItems = (ids: string[]) => api.post('/admin/galeria/reordenar', { ids })

// PUT manda o item inteiro: assim um toggle não depende de a API aceitar parcial
export function galleryInput(item: GalleryItem): GalleryItemInput {
  return {
    title: item.title,
    category: item.category,
    span: item.span,
    imagem_id: item.imagem_id ?? idDaImagem(item.image_url),
    sort_order: item.sort_order,
    published: item.published,
  }
}
