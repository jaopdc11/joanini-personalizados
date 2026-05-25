export type Span = 'tall' | 'wide' | 'normal'

export type GalleryItem = {
  id: string
  title: string
  category: string
  span: Span
  image_url: string | null
  storage_path: string | null
  sort_order: number
  published: boolean
  created_at: string
}

export type Product = {
  id: string
  name: string
  description: string | null
  category: string
  price_brl: number | null
  image_url: string | null
  storage_path: string | null
  available: boolean
  created_at: string
}

export type StickyColor = 'yellow' | 'pink' | 'mint' | 'blue'

export type Testimonial = {
  id: string
  text: string
  name: string
  occasion: string
  color: StickyColor
  rotate: number
  published: boolean
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      gallery_items: {
        Row: GalleryItem
        Insert: Omit<GalleryItem, 'id' | 'created_at'>
        Update: Partial<Omit<GalleryItem, 'id' | 'created_at'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at'>>
      }
    }
  }
}
