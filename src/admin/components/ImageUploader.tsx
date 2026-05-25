import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'

type Props = {
  currentUrl?: string | null
  onFile: (file: File) => void
  onClear?: () => void
}

export function ImageUploader({ currentUrl, onFile, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)

  function handleFile(file: File) {
    setPreview(URL.createObjectURL(file))
    onFile(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  function handleClear() {
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
    onClear?.()
  }

  return (
    <div className="relative">
      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="preview"
            className="h-48 w-48 rounded-xl object-cover ring-1 ring-stone-200"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow ring-1 ring-stone-200 hover:bg-stone-50"
          >
            <X size={14} className="text-stone-500" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 text-stone-400 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-400"
        >
          <Upload size={24} />
          <span className="text-center text-xs leading-tight">
            clique ou arraste<br />uma imagem
          </span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
