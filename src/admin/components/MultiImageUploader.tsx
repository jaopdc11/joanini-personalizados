import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import type { ProductImage } from '@/types/database'

type NewItem = { file: File; preview: string }

type Props = {
  existing: ProductImage[]
  onChange: (existing: ProductImage[], newFiles: File[]) => void
}

export function MultiImageUploader({ existing, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [kept, setKept] = useState<ProductImage[]>(existing)
  const [added, setAdded] = useState<NewItem[]>([])

  function emit(nextKept: ProductImage[], nextAdded: NewItem[]) {
    onChange(nextKept, nextAdded.map(a => a.file))
  }

  function addFiles(list: FileList | File[]) {
    const imgs = Array.from(list).filter(f => f.type.startsWith('image/'))
    if (!imgs.length) return
    const next = [...added, ...imgs.map(file => ({ file, preview: URL.createObjectURL(file) }))]
    setAdded(next)
    emit(kept, next)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(e.target.files)
    if (inputRef.current) inputRef.current.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files)
  }

  function removeExisting(url: string) {
    const next = kept.filter(k => k.url !== url)
    setKept(next)
    emit(next, added)
  }

  function removeAdded(idx: number) {
    URL.revokeObjectURL(added[idx].preview)
    const next = added.filter((_, i) => i !== idx)
    setAdded(next)
    emit(kept, next)
  }

  const thumbs = [
    ...kept.map(img => ({ key: img.id ?? img.url, src: img.mini_url || img.url, onRemove: () => removeExisting(img.url) })),
    ...added.map((a, i) => ({ key: `new-${i}-${a.file.name}`, src: a.preview, onRemove: () => removeAdded(i) })),
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {thumbs.map((t, i) => (
        <div key={t.key} className="relative inline-block">
          <img
            src={t.src}
            alt="preview"
            className="h-28 w-28 rounded-xl object-cover ring-1 ring-stone-200"
          />
          {i === 0 && (
            <span className="absolute bottom-1 left-1 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white">
              capa
            </span>
          )}
          <button
            type="button"
            onClick={t.onRemove}
            className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow ring-1 ring-stone-200 hover:bg-stone-50"
          >
            <X size={14} className="text-stone-500" />
          </button>
        </div>
      ))}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 text-stone-400 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-400"
      >
        <Upload size={22} />
        <span className="text-center text-xs leading-tight">clique ou arraste<br />fotos</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
