import { useEffect, useRef, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import {
  listTestimonials,
  insertTestimonial,
  updateTestimonial,
  removeTestimonial,
  testimonialInput,
} from '@/lib/testimonials.queries'
import { ConfirmDialog } from '@/admin/components/ConfirmDialog'
import { Sticky } from '@/components/ui/Sticky'
import { MiniHeart } from '@/components/decor/FloatingHearts'
import type { Testimonial, StickyColor } from '@/types/database'

const COLOR_OPTIONS: { value: StickyColor; label: string; bg: string }[] = [
  { value: 'pink', label: 'Rosa', bg: '#FBDDE0' },
  { value: 'yellow', label: 'Amarelo', bg: '#FFF3C4' },
  { value: 'mint', label: 'Verde', bg: '#D8EDDA' },
  { value: 'blue', label: 'Azul', bg: '#D6EAF4' },
]

const STICKY_BG: Record<StickyColor, string> = {
  pink: '#FFB8C5',
  yellow: '#FFE38A',
  mint: '#C9E5C8',
  blue: '#BDD9E8',
}

function RotateKnob({ value, onChange, color }: { value: number; onChange: (v: number) => void; color: StickyColor }) {
  const dragging = useRef(false)
  const startX = useRef(0)
  const startValue = useRef(0)

  return (
    <div className="flex items-center gap-3">
      <div
        onPointerDown={(e) => {
          dragging.current = true
          startX.current = e.clientX
          startValue.current = value
          e.currentTarget.setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return
          const newVal = Math.max(-5, Math.min(5, startValue.current + Math.round((e.clientX - startX.current) / 10)))
          onChange(newVal)
        }}
        onPointerUp={() => { dragging.current = false }}
        className="relative flex h-14 w-14 cursor-grab select-none items-center justify-center rounded-full bg-stone-100 ring-2 ring-stone-200 active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        <div
          className="h-8 w-6 rounded-sm shadow-sm"
          style={{ backgroundColor: STICKY_BG[color], transform: `rotate(${value}deg)` }}
        />
      </div>
      <span className="w-8 text-center text-sm font-medium tabular-nums text-stone-600">
        {value > 0 ? `+${value}°` : `${value}°`}
      </span>
    </div>
  )
}

type FormState = {
  text: string
  name: string
  occasion: string
  color: StickyColor
  rotate: number
  published: boolean
}

const emptyForm: FormState = {
  text: '',
  name: '',
  occasion: '',
  color: 'pink',
  rotate: -2,
  published: true,
}

function TestimonialForm({
  initial,
  onSaved,
  onCancel,
}: {
  initial?: Testimonial
  onSaved: () => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<FormState>(
    initial
      ? { text: initial.text, name: initial.name, occasion: initial.occasion, color: initial.color, rotate: initial.rotate, published: initial.published }
      : emptyForm
  )
  const [saving, setSaving] = useState(false)

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    if (initial) {
      await updateTestimonial(initial.id, form)
    } else {
      await insertTestimonial(form)
    }
    setSaving(false)
    onSaved()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Depoimento</span>
        <textarea
          value={form.text}
          onChange={e => set('text', e.target.value)}
          required
          rows={3}
          placeholder="O que a cliente disse..."
          className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-700 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 resize-none"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Nome</span>
          <input
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            required
            placeholder="Mariana"
            className="rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-700 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Ocasião</span>
          <input
            type="text"
            value={form.occasion}
            onChange={e => set('occasion', e.target.value)}
            placeholder="batizado · Helena"
            className="rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-700 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Cor do postit</span>
          <div className="flex gap-2">
            {COLOR_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => set('color', opt.value)}
                title={opt.label}
                className={`h-8 w-8 rounded-lg transition-all ${form.color === opt.value ? 'ring-2 ring-rose-400 ring-offset-2 scale-110' : 'opacity-60 hover:opacity-100'}`}
                style={{ backgroundColor: opt.bg }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Inclinação</span>
          <RotateKnob value={form.rotate} onChange={v => set('rotate', v)} color={form.color} />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Visível no site</span>
          <label className="flex cursor-pointer items-center gap-2 pt-1.5">
            <input
              type="checkbox"
              checked={form.published}
              onChange={e => set('published', e.target.checked)}
              className="h-4 w-4 rounded accent-rose-400"
            />
            <span className="text-sm text-stone-600">{form.published ? 'Publicado' : 'Oculto'}</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Prévia</span>
        <div className="flex justify-center py-4">
          <div className="w-56">
            <Sticky color={form.color} rotate={form.rotate} accent="tape">
              <p className="font-script text-xl leading-snug text-ink">
                <span className="select-none align-top text-2xl text-ink/40">"</span>
                {form.text || <span className="italic text-ink/40">O que a cliente disse...</span>}
                <span className="select-none align-bottom text-2xl text-ink/40">"</span>
              </p>
              <div className="mt-3 flex items-center gap-2 border-t border-ink/10 pt-2.5">
                <MiniHeart color="#FF6F8A" size={12} />
                <span className="font-serif text-sm text-ink">{form.name || <span className="italic text-ink/40">Nome</span>}</span>
                {form.occasion && <span className="text-xs text-ink/60">· {form.occasion}</span>}
              </div>
            </Sticky>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-rose-400 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-60"
        >
          {saving ? 'Salvando…' : initial ? 'Salvar alterações' : 'Adicionar depoimento'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm text-stone-500 hover:bg-stone-100"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [deleting, setDeleting] = useState<Testimonial | null>(null)

  async function load() {
    setLoading(true)
    const data = await listTestimonials()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleTogglePublished(item: Testimonial) {
    await updateTestimonial(item.id, { ...testimonialInput(item), published: !item.published })
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, published: !i.published } : i))
  }

  async function handleDelete() {
    if (!deleting) return
    await removeTestimonial(deleting.id)
    setItems(prev => prev.filter(i => i.id !== deleting.id))
    setDeleting(null)
  }

  function handleEdit(item: Testimonial) {
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

  const colorBg: Record<StickyColor, string> = {
    pink: '#FBDDE0',
    yellow: '#FFF3C4',
    mint: '#D8EDDA',
    blue: '#D6EAF4',
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">Depoimentos</h1>
          <p className="mt-1 max-w-lg text-sm text-stone-400">
            Frases de clientes que aparecem no site em formato de postit. Cada depoimento vira um bilhetinho colorido na página.
          </p>
          <p className="mt-1 text-xs text-stone-400">{items.length} depoimento{items.length !== 1 ? 's' : ''} cadastrado{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={handleNew}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-rose-400 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500"
        >
          <Plus size={16} />
          Novo depoimento
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <h2 className="mb-4 text-sm font-semibold text-stone-700">
            {editing ? 'Editar depoimento' : 'Novo depoimento'}
          </h2>
          <TestimonialForm
            initial={editing ?? undefined}
            onSaved={handleSaved}
            onCancel={() => { setShowForm(false); setEditing(null) }}
          />
        </div>
      )}

      {loading ? (
        <p className="text-sm text-stone-400">Carregando…</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-stone-200 p-12 text-center text-stone-400">
          <p className="text-sm">Nenhum depoimento ainda.</p>
          <p className="mt-1 text-xs">Clique em "Novo depoimento" para começar.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-xs font-medium uppercase tracking-wide text-stone-400">
                <th className="hidden sm:table-cell px-4 py-3">Cor</th>
                <th className="px-4 py-3">Depoimento</th>
                <th className="px-4 py-3">Quem</th>
                <th className="hidden sm:table-cell px-4 py-3">Ocasião</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50">
                  <td className="hidden sm:table-cell px-4 py-3">
                    <div
                      className="h-8 w-8 rounded-lg"
                      style={{ backgroundColor: colorBg[item.color] }}
                      title={item.color}
                    />
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="line-clamp-2 text-stone-600">{item.text}</p>
                  </td>
                  <td className="px-4 py-3 font-medium text-stone-700">{item.name}</td>
                  <td className="hidden sm:table-cell px-4 py-3 text-stone-500">{item.occasion || '—'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleTogglePublished(item)}
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium transition ${item.published ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-stone-100 text-stone-400 hover:bg-stone-200'}`}
                    >
                      {item.published ? 'Publicado' : 'Oculto'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
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
          message={`Deletar o depoimento de "${deleting.name}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}
