import { useEffect, useState } from 'react'
import { getSitePhoto, type SitePhoto } from '@/lib/site-photos.queries'

export function useSitePhoto(slot: string) {
  const [photo, setPhoto] = useState<SitePhoto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSitePhoto(slot)
      .then(setPhoto)
      .finally(() => setLoading(false))
  }, [slot])

  return { photo, loading }
}
