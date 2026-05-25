import { supabase } from '@/lib/supabase'

export type SitePhoto = {
  slot: string
  image_url: string | null
  storage_path: string | null
  updated_at: string
}

export async function getSitePhoto(slot: string): Promise<SitePhoto | null> {
  const { data, error } = await supabase
    .from('site_photos')
    .select('*')
    .eq('slot', slot)
    .single()
  if (error) return null
  return data as SitePhoto
}

export async function updateSitePhoto(slot: string, image_url: string, storage_path: string) {
  const { error } = await supabase
    .from('site_photos')
    .update({ image_url, storage_path, updated_at: new Date().toISOString() })
    .eq('slot', slot)
  if (error) throw error
}

export async function uploadSiteImage(file: File): Promise<{ url: string; path: string }> {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('site').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('site').getPublicUrl(path)
  return { url: data.publicUrl, path }
}

export async function clearSitePhoto(slot: string, storagePath: string | null) {
  if (storagePath) {
    await supabase.storage.from('site').remove([storagePath])
  }
  const { error } = await supabase
    .from('site_photos')
    .update({ image_url: null, storage_path: null, updated_at: new Date().toISOString() })
    .eq('slot', slot)
  if (error) throw error
}
