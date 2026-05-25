import { useEffect, useState } from 'react'
import { listPublishedTestimonials } from '@/lib/testimonials.queries'
import type { Testimonial } from '@/types/database'

export function useTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listPublishedTestimonials().then(data => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  return { items, loading }
}
