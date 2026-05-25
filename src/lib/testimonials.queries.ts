import { supabase } from '@/lib/supabase'
import type { Testimonial } from '@/types/database'

export async function listTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: true })
  return (data ?? []) as Testimonial[]
}

export async function listPublishedTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: true })
  return (data ?? []) as Testimonial[]
}

export async function insertTestimonial(
  values: Omit<Testimonial, 'id' | 'created_at'>
): Promise<void> {
  await supabase.from('testimonials').insert(values)
}

export async function updateTestimonial(
  id: string,
  values: Partial<Omit<Testimonial, 'id' | 'created_at'>>
): Promise<void> {
  await supabase.from('testimonials').update(values).eq('id', id)
}

export async function removeTestimonial(id: string): Promise<void> {
  await supabase.from('testimonials').delete().eq('id', id)
}
