import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/database'

export async function listProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Product[]
}

export async function insertProduct(product: {
  name: string
  description: string | null
  category: string
  price_brl: number | null
  image_url: string | null
  storage_path: string | null
  available: boolean
}) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()
  if (error) throw error
  return data as Product
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const { error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
  if (error) throw error
}

export async function removeProduct(id: string, storagePath: string | null) {
  if (storagePath) {
    await supabase.storage.from('products').remove([storagePath])
  }
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function uploadProductImage(file: File): Promise<{ url: string; path: string }> {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from('products').upload(path, file)
  if (error) throw error

  const { data } = supabase.storage.from('products').getPublicUrl(path)
  return { url: data.publicUrl, path }
}
