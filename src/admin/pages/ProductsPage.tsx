import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { listProducts, removeProduct, updateProduct } from '@/lib/products.queries'
import { ProductForm } from '@/admin/pages/ProductForm'
import { ConfirmDialog } from '@/admin/components/ConfirmDialog'
import type { Product } from '@/types/database'

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState<Product | null>(null)

  async function load() {
    setLoading(true)
    const data = await listProducts()
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleToggleAvailable(product: Product) {
    await updateProduct(product.id, { available: !product.available })
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, available: !p.available } : p))
  }

  async function handleDelete() {
    if (!deleting) return
    await removeProduct(deleting.id, deleting.storage_path)
    setProducts(prev => prev.filter(p => p.id !== deleting.id))
    setDeleting(null)
  }

  function handleEdit(product: Product) {
    setEditing(product)
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

  function formatPrice(price: number | null) {
    if (price === null) return 'Sob consulta'
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">Catálogo de produtos</h1>
          <p className="mt-1 max-w-lg text-sm text-stone-400">
            Liste os produtos que você faz, com descrição e preço. Se o preço variar conforme o pedido, deixe em branco — vai aparecer como "sob consulta".
          </p>
          <p className="mt-1 text-xs text-stone-400">{products.length} produto{products.length !== 1 ? 's' : ''} cadastrado{products.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={handleNew}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500"
        >
          <Plus size={16} />
          Novo produto
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-semibold text-stone-700">
            {editing ? 'Editar produto' : 'Novo produto'}
          </h2>
          <ProductForm
            product={editing ?? undefined}
            onSaved={handleSaved}
            onCancel={() => { setShowForm(false); setEditing(null) }}
          />
        </div>
      )}

      {loading ? (
        <p className="text-sm text-stone-400">Carregando…</p>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center text-stone-400">
          <p className="text-sm">Nenhum produto ainda.</p>
          <p className="mt-1 text-xs">Clique em "Novo produto" para começar.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-xs font-medium uppercase tracking-wide text-stone-400">
                <th className="px-4 py-3">Foto</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50">
                  <td className="px-4 py-3">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-stone-100" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-stone-700">{product.name}</p>
                    {product.description && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-stone-400">{product.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-stone-500">{product.category}</td>
                  <td className="px-4 py-3 text-stone-600">{formatPrice(product.price_brl)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleAvailable(product)}
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium transition ${product.available ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-stone-100 text-stone-400 hover:bg-stone-200'}`}
                    >
                      {product.available ? 'Disponível' : 'Pausado'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => handleEdit(product)}
                        title="Editar"
                        className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleting(product)}
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
          message={`Deletar "${deleting.name}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}
