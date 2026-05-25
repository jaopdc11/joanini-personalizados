import { useState } from 'react'
import { ImageUploader } from '@/admin/components/ImageUploader'
import { uploadGalleryImage, insertGalleryItem, updateGalleryItem } from '@/lib/gallery.queries'
import type { GalleryItem, Span } from '@/types/database'
import { categories } from '@/data/categories'

type Props = {
  item?: GalleryItem
  onSaved: () => void
  onCancel: () => void
}

export function GalleryItemForm({ item, onSaved, onCancel }: Props) {
  const [title, setTitle] = useState(item?.title ?? '')
  const [category, setCategory] = useState(item?.category ?? categories[0].id)
  const [span, setSpan] = useState<Span>(item?.span ?? 'normal')
  const [published, setPublished] = useState(item?.published ?? true)
  const [file, setFile] = useState<File | null>(null)
  const [clearImage, setClearImage] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      let image_url = item?.image_url ?? null
      let storage_path = item?.storage_path ?? null

      if (file) {
        const uploaded = await uploadGalleryImage(file)
        image_url = uploaded.url
        storage_path = uploaded.path
      } else if (clearImage) {
        image_url = null
        storage_path = null
      }

      if (item) {
        await updateGalleryItem(item.id, { title, category, span, published, image_url, storage_path })
      } else {
        await insertGalleryItem({ title, category, span, published, image_url, storage_path, sort_order: 0 })
      }

      onSaved()
    } catch {
      setError('Erro ao salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex gap-6">
        <ImageUploader
          currentUrl={item?.image_url}
          onFile={f => { setFile(f); setClearImage(false) }}
          onClear={() => { setFile(null); setClearImage(true) }}
        />

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-600">Título</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="ex: Convite de batizado · Helena"
              className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-sm font-medium text-stone-600">Categoria</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <label className="text-sm font-medium text-stone-600">Formato</label>
              <select
                value={span}
                onChange={e => setSpan(e.target.value as Span)}
                className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
              >
                <option value="normal">Normal (quadrado)</option>
                <option value="tall">Alto (retrato)</option>
                <option value="wide">Largo (paisagem)</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-stone-600">
            <input
              type="checkbox"
              checked={published}
              onChange={e => setPublished(e.target.checked)}
              className="accent-rose-400"
            />
            Publicado no site
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm text-stone-500 hover:bg-stone-50">
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-rose-400 px-5 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-50"
        >
          {saving ? 'Salvando…' : item ? 'Salvar alterações' : 'Adicionar'}
        </button>
      </div>
    </form>
  )
}
