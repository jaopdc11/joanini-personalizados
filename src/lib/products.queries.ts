import { api, idDaImagem } from '@/lib/api'
import type { Product, ProductImage } from '@/types/database'

export type ProductInput = {
  name: string
  description: string | null
  category: string
  price_brl: number | null
  imagem_ids: string[]
  available: boolean
}

export const listProducts = () => api.get<Product[]>('/admin/produtos')
export const listAvailableProducts = () => api.get<Product[]>('/produtos')

export const insertProduct = (p: ProductInput) => api.post<Product>('/admin/produtos', p)
export const updateProduct = (id: string, p: ProductInput) => api.put<Product>(`/admin/produtos/${id}`, p)
export const removeProduct = (id: string) => api.del(`/admin/produtos/${id}`)

export function imageId(img: ProductImage): string | null {
  return img.id ?? idDaImagem(img.url)
}

export function productInput(p: Product): ProductInput {
  return {
    name: p.name,
    description: p.description,
    category: p.category,
    price_brl: p.price_brl,
    imagem_ids: (p.images ?? []).map(imageId).filter((x): x is string => !!x),
    available: p.available,
  }
}
