import { api } from '@/lib/api'
import type { SitePhoto } from '@/types/database'

export type SitePhotos = Record<string, SitePhoto | null>

// Uma requisição só pra todas as fotos: Hero e About montam juntos e cada um
// pediria a lista inteira de novo.
let emVoo: Promise<SitePhotos> | null = null

export function getSitePhotos(fresco = false): Promise<SitePhotos> {
  if (!emVoo || fresco) {
    emVoo = api.get<SitePhotos>('/fotos-site').catch((e) => {
      emVoo = null
      throw e
    })
  }
  return emVoo
}

// imagem_id null limpa o slot
export const setSitePhoto = (slot: string, imagem_id: string | null) =>
  api.put<unknown>(`/admin/fotos-site/${slot}`, { imagem_id })
