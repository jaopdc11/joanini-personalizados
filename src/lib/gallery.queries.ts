import { supabase } from '@/lib/supabase'
import type { GalleryItem } from '@/types/database'

export async function listGalleryItems() {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as GalleryItem[]
}

export async function listPublishedGalleryItems() {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as GalleryItem[]
}

export async function insertGalleryItem(item: {
  title: string
  category: string
  span: 'tall' | 'wide' | 'normal'
  image_url: string | null
  storage_path: string | null
  sort_order: number
  published: boolean
}) {
  const { data, error } = await supabase
    .from('gallery_items')
    .insert(item)
    .select()
    .single()
  if (error) throw error
  return data as GalleryItem
}

export async function updateGalleryItem(id: string, item: Partial<GalleryItem>) {
  const { error } = await supabase
    .from('gallery_items')
    .update(item)
    .eq('id', id)
  if (error) throw error
}

export async function removeGalleryItem(id: string, storagePath: string | null) {
  if (storagePath) {
    await supabase.storage.from('gallery').remove([storagePath])
  }
  const { error } = await supabase.from('gallery_items').delete().eq('id', id)
  if (error) throw error
}

export async function uploadGalleryImage(file: File): Promise<{ url: string; path: string }> {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from('gallery').upload(path, file)
  if (error) throw error

  const { data } = supabase.storage.from('gallery').getPublicUrl(path)
  return { url: data.publicUrl, path }
}
