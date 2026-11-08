export type Span = 'tall' | 'wide' | 'normal'

export type GalleryItem = {
  id: string
  title: string
  category: string
  span: Span
  image_url: string | null
  mini_url?: string | null
  imagem_id?: string | null
  sort_order: number
  published: boolean
  created_at: string
}

export type ProductImage = {
  id?: string
  url: string
  mini_url: string
}

export type Product = {
  id: string
  name: string
  description: string | null
  category: string
  price_brl: number | null
  images: ProductImage[]
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

export type SitePhoto = { url: string; mini_url: string }
