import { useEffect, useState } from 'react'
import { listPublishedGalleryItems } from '@/lib/gallery.queries'
import type { GalleryItem } from '@/types/database'

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listPublishedGalleryItems()
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  return { items, loading }
}
