import { useEffect, useState } from 'react'
import { getSitePhotos } from '@/lib/site-photos.queries'
import type { SitePhoto } from '@/types/database'

export function useSitePhoto(slot: string) {
  const [photo, setPhoto] = useState<SitePhoto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSitePhotos()
      .then(fotos => setPhoto(fotos[slot] ?? null))
      .catch(() => setPhoto(null))
      .finally(() => setLoading(false))
  }, [slot])

  return { photo, loading }
}
