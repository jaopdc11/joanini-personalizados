import { api } from '@/lib/api'
import type { Testimonial } from '@/types/database'

export type TestimonialInput = Omit<Testimonial, 'id' | 'created_at'>

export const listTestimonials = () => api.get<Testimonial[]>('/admin/depoimentos')
export const listPublishedTestimonials = () => api.get<Testimonial[]>('/depoimentos')
export const insertTestimonial = (v: TestimonialInput) => api.post<Testimonial>('/admin/depoimentos', v)
export const updateTestimonial = (id: string, v: TestimonialInput) =>
  api.put<Testimonial>(`/admin/depoimentos/${id}`, v)
export const removeTestimonial = (id: string) => api.del(`/admin/depoimentos/${id}`)

export function testimonialInput(t: Testimonial): TestimonialInput {
  const { id: _id, created_at: _c, ...resto } = t
  return resto
}
