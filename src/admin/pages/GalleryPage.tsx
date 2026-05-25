import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { listGalleryItems, removeGalleryItem, updateGalleryItem } from '@/lib/gallery.queries'
import { GalleryItemForm } from '@/admin/pages/GalleryItemForm'
import { ConfirmDialog } from '@/admin/components/ConfirmDialog'
import type { GalleryItem } from '@/types/database'

export function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [deleting, setDeleting] = useState<GalleryItem | null>(null)

  async function load() {
    setLoading(true)
    const data = await listGalleryItems()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleTogglePublished(item: GalleryItem) {
    await updateGalleryItem(item.id, { published: !item.published })
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, published: !i.published } : i))
  }

  async function handleDelete() {
    if (!deleting) return
    await removeGalleryItem(deleting.id, deleting.storage_path)
    setItems(prev => prev.filter(i => i.id !== deleting.id))
    setDeleting(null)
  }

  function handleEdit(item: GalleryItem) {
    setEditing(item)
    setShowForm(true)
  }

  function handleNew() {
    setEditing(null)
    setShowForm(true)
  }

  function handleSaved() {
    setShowForm(false)
    setEditing(null)
    load()
  }

  const spanLabel = { normal: 'Normal', tall: 'Alto', wide: 'Largo' }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">Galeria de trabalhos</h1>
          <p className="mt-1 max-w-lg text-sm text-stone-400">
            Aqui ficam as fotos dos seus trabalhos que aparecem no site. Adicione uma foto, escolha a categoria e ela vai aparecer automaticamente pra quem visitar a página.
          </p>
          <p className="mt-1 text-xs text-stone-400">{items.length} foto{items.length !== 1 ? 's' : ''} cadastrada{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={handleNew}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500"
        >
          <Plus size={16} />
          Adicionar foto
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <h2 className="mb-1 text-sm font-semibold text-stone-700">
            {editing ? 'Editar foto' : 'Adicionar nova foto'}
          </h2>
          <p className="mb-4 text-xs text-stone-400">
            {editing ? 'Altere as informações e salve.' : 'Escolha a foto do seu trabalho, dê um título e selecione a categoria.'}
          </p>
          <GalleryItemForm
            item={editing ?? undefined}
            onSaved={handleSaved}
            onCancel={() => { setShowForm(false); setEditing(null) }}
          />
        </div>
      )}

      {loading ? (
        <p className="text-sm text-stone-400">Carregando…</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center text-stone-400">
          <p className="text-sm font-medium">Nenhuma foto ainda</p>
          <p className="mt-1 text-xs">Clique em "Adicionar foto" para colocar seu primeiro trabalho no site.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-xs font-medium uppercase tracking-wide text-stone-400">
                <th className="px-4 py-3">Foto</th>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Formato</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50">
                  <td className="px-4 py-3">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-stone-100" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-stone-700">{item.title}</td>
                  <td className="px-4 py-3 text-stone-500">{item.category}</td>
                  <td className="px-4 py-3 text-stone-500">{spanLabel[item.span]}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${item.published ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-400'}`}>
                      {item.published ? 'Publicado' : 'Oculto'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => handleTogglePublished(item)}
                        title={item.published ? 'Ocultar' : 'Publicar'}
                        className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
                      >
                        {item.published ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        title="Editar"
                        className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleting(item)}
                        title="Deletar"
                        className="rounded-lg p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleting && (
        <ConfirmDialog
          message={`Deletar "${deleting.title}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}
