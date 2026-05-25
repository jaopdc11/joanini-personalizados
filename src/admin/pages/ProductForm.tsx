import { useState } from 'react'
import { ImageUploader } from '@/admin/components/ImageUploader'
import { uploadProductImage, insertProduct, updateProduct } from '@/lib/products.queries'
import type { Product } from '@/types/database'
import { categories } from '@/data/categories'

type Props = {
  product?: Product
  onSaved: () => void
  onCancel: () => void
}

export function ProductForm({ product, onSaved, onCancel }: Props) {
  const [name, setName] = useState(product?.name ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [category, setCategory] = useState(product?.category ?? categories[0].id)
  const [priceStr, setPriceStr] = useState(product?.price_brl != null ? String(product.price_brl) : '')
  const [available, setAvailable] = useState(product?.available ?? true)
  const [file, setFile] = useState<File | null>(null)
  const [clearImage, setClearImage] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      let image_url = product?.image_url ?? null
      let storage_path = product?.storage_path ?? null

      if (file) {
        const uploaded = await uploadProductImage(file)
        image_url = uploaded.url
        storage_path = uploaded.path
      } else if (clearImage) {
        image_url = null
        storage_path = null
      }

      const price_brl = priceStr.trim() === '' ? null : parseFloat(priceStr.replace(',', '.'))

      if (product) {
        await updateProduct(product.id, { name, description: description || null, category, price_brl, available, image_url, storage_path })
      } else {
        await insertProduct({ name, description: description || null, category, price_brl, available, image_url, storage_path })
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
          currentUrl={product?.image_url}
          onFile={f => { setFile(f); setClearImage(false) }}
          onClear={() => { setFile(null); setClearImage(true) }}
        />

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-600">Nome do produto</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="ex: Convite de batizado personalizado"
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
              <label className="text-sm font-medium text-stone-600">Preço (R$)</label>
              <input
                value={priceStr}
                onChange={e => setPriceStr(e.target.value)}
                placeholder="deixe vazio = sob consulta"
                type="text"
                inputMode="decimal"
                className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-stone-600">
            <input
              type="checkbox"
              checked={available}
              onChange={e => setAvailable(e.target.checked)}
              className="accent-rose-400"
            />
            Disponível
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-600">Descrição</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          placeholder="Descreva o produto, materiais, tamanho, etc."
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
        />
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
          {saving ? 'Salvando…' : product ? 'Salvar alterações' : 'Adicionar'}
        </button>
      </div>
    </form>
  )
}
