import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { ImageUploader } from '@/admin/components/ImageUploader'
import { getSitePhotos, setSitePhoto } from '@/lib/site-photos.queries'
import { enviarImagem, mensagemErro } from '@/lib/api'
import type { SitePhoto } from '@/types/database'

type Slot = {
  id: string
  label: string
  description: string
  aspect: string
}

const SLOTS: Slot[] = [
  {
    id: 'hero',
    label: 'Foto principal',
    description: 'Aparece em destaque na primeira tela do site, ao lado do texto de apresentação.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'about',
    label: 'Foto do sobre mim',
    description: 'Aparece na seção "Sobre", onde você se apresenta para os clientes.',
    aspect: 'aspect-[4/5]',
  },
]

type SlotState = {
  photo: SitePhoto | null
  file: File | null
  preview: string | null
  saving: boolean
  saved: boolean
  removing: boolean
  progress: number | null
  error: string
}

export function SitePhotosPage() {
  const [slots, setSlots] = useState<Record<string, SlotState>>(() =>
    Object.fromEntries(SLOTS.map(s => [s.id, { photo: null, file: null, preview: null, saving: false, saved: false, removing: false, progress: null, error: '' }]))
  )

  useEffect(() => {
    getSitePhotos(true).then(photos => {
      setSlots(prev => {
        const next = { ...prev }
        SLOTS.forEach(({ id }) => {
          const photo = photos[id] ?? null
          next[id] = { ...prev[id], photo, preview: photo?.url ?? null }
        })
        return next
      })
    }).catch(() => {})
  }, [])

  function handleFile(slotId: string, file: File) {
    const preview = URL.createObjectURL(file)
    setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], file, preview } }))
  }

  function handleClear(slotId: string) {
    setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], file: null, preview: null } }))
  }

  async function handleSave(slotId: string) {
    const state = slots[slotId]
    setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], saving: true, saved: false, error: '' } }))

    try {
      if (state.file) {
        setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], progress: 0 } }))
        const enviada = await enviarImagem(state.file, f =>
          setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], progress: f } })))
        await setSitePhoto(slotId, enviada.id)
        setSlots(prev => ({
          ...prev,
          [slotId]: { ...prev[slotId], file: null, photo: { url: enviada.url, mini_url: enviada.mini_url }, saved: true },
        }))
      } else if (!state.preview && state.photo?.url) {
        await setSitePhoto(slotId, null)
        setSlots(prev => ({
          ...prev,
          [slotId]: { ...prev[slotId], photo: null, saved: true },
        }))
      }
      getSitePhotos(true).catch(() => {})
    } catch (e) {
      setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], error: mensagemErro(e) } }))
    } finally {
      setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], saving: false, progress: null } }))
      setTimeout(() => setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], saved: false } })), 2000)
    }
  }

  async function handleRemove(slotId: string) {
    const state = slots[slotId]
    if (!state.photo?.url) return
    if (!confirm('Remover a foto? Esta ação não pode ser desfeita.')) return
    setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], removing: true, error: '' } }))
    try {
      await setSitePhoto(slotId, null)
      getSitePhotos(true).catch(() => {})
      setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], photo: null, preview: null, file: null, removing: false } }))
    } catch (e) {
      setSlots(prev => ({ ...prev, [slotId]: { ...prev[slotId], removing: false, error: mensagemErro(e, 'Erro ao remover. Tente novamente.') } }))
    }
  }

  function isDirty(slotId: string) {
    const s = slots[slotId]
    if (s.file) return true
    if (!s.preview && s.photo?.url) return true
    return false
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-stone-800">Fotos do site</h1>
        <p className="text-sm text-stone-400">Gerencie as fotos fixas que aparecem nas seções da página.</p>
      </div>

      <div className="flex flex-col gap-6">
        {SLOTS.map(slot => {
          const state = slots[slot.id]
          return (
            <div key={slot.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
              <div className="mb-4">
                <h2 className="font-semibold text-stone-700">{slot.label}</h2>
                <p className="text-xs text-stone-400">{slot.description}</p>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:gap-8 sm:items-start">
                {/* uploader */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-stone-400">Upload</p>
                  <ImageUploader
                    key={state.photo?.url ?? 'vazio'}
                    currentUrl={state.photo?.url}
                    onFile={f => handleFile(slot.id, f)}
                    onClear={() => handleClear(slot.id)}
                  />
                </div>

                {/* preview contextual */}
                <div className="flex flex-col gap-3 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                    Preview — como vai aparecer no site
                  </p>

                  {slot.id === 'hero' && (
                    <div className="rounded-xl overflow-hidden bg-pink-mist/20 p-4 ring-1 ring-stone-100 max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="h-3 w-20 rounded bg-stone-200 mb-2" />
                          <div className="h-2 w-32 rounded bg-stone-100 mb-1" />
                          <div className="h-2 w-24 rounded bg-stone-100" />
                        </div>
                        <div className="w-24 h-28 rounded-2xl overflow-hidden bg-cream flex-shrink-0 shadow-md">
                          {state.preview
                            ? <img src={state.preview} className="w-full h-full object-cover" alt="preview hero" />
                            : <div className="w-full h-full bg-gradient-to-br from-cream to-pink-mist/60" />
                          }
                        </div>
                      </div>
                    </div>
                  )}

                  {slot.id === 'about' && (
                    <div className="rounded-xl overflow-hidden bg-pink-mist/20 p-4 ring-1 ring-stone-100 max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-cream flex-shrink-0 shadow">
                          {state.preview
                            ? <img src={state.preview} className="w-full h-full object-cover" alt="preview about" />
                            : <div className="w-full h-full bg-gradient-to-br from-cream to-pink-mist/60" />
                          }
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-16 rounded bg-stone-200 mb-2" />
                          <div className="h-2 w-28 rounded bg-stone-100 mb-1" />
                          <div className="h-2 w-20 rounded bg-stone-100 mb-1" />
                          <div className="h-2 w-24 rounded bg-stone-100" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* botões */}
                <div className="flex flex-row gap-2 sm:flex-col sm:justify-end sm:h-full sm:pt-6">
                  <button
                    onClick={() => handleSave(slot.id)}
                    disabled={!isDirty(slot.id) || state.saving}
                    className="rounded-lg bg-rose-400 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-40 transition min-w-[100px] text-center"
                  >
                    {state.saving ? (state.progress !== null && state.progress < 1 ? `Enviando ${Math.round(state.progress * 100)}%…` : 'Salvando…') : state.saved ? 'Salvo ✓' : 'Salvar'}
                  </button>
                  {state.photo?.url && (
                    <button
                      onClick={() => handleRemove(slot.id)}
                      disabled={state.removing}
                      className="flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-40 transition"
                    >
                      <Trash2 size={14} />
                      {state.removing ? 'Removendo…' : 'Remover foto'}
                    </button>
                  )}
                </div>
              </div>
              {state.error && <p className="mt-3 text-sm text-red-500">{state.error}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
