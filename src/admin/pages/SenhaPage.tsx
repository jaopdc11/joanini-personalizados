import { useState } from 'react'
import { trocarSenha, mensagemErro, ErroApi } from '@/lib/api'

export function SenhaPage() {
  const [atual, setAtual] = useState('')
  const [nova, setNova] = useState('')
  const [confirma, setConfirma] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setOk(false)
    if (nova !== confirma) {
      setError('A confirmação não bate com a nova senha.')
      return
    }
    setSaving(true)
    try {
      await trocarSenha(atual, nova)
      setOk(true)
      setAtual('')
      setNova('')
      setConfirma('')
    } catch (e) {
      if (e instanceof ErroApi && e.status === 401) setError('Senha atual incorreta.')
      else setError(mensagemErro(e, 'Não deu pra trocar a senha. Tente de novo.'))
    } finally {
      setSaving(false)
    }
  }

  const input =
    'w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100'

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-stone-800">Trocar senha</h1>
        <p className="text-sm text-stone-400">Escolha uma senha nova para entrar no painel.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-stone-600">Senha atual</span>
          <input type="password" autoComplete="current-password" required value={atual} onChange={e => setAtual(e.target.value)} className={input} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-stone-600">Nova senha</span>
          <input type="password" autoComplete="new-password" required value={nova} onChange={e => setNova(e.target.value)} className={input} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-stone-600">Confirme a nova senha</span>
          <input type="password" autoComplete="new-password" required value={confirma} onChange={e => setConfirma(e.target.value)} className={input} />
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {ok && <p className="text-sm text-emerald-600">Senha trocada ✓</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-rose-400 px-5 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-50"
        >
          {saving ? 'Salvando…' : 'Trocar senha'}
        </button>
      </form>
    </div>
  )
}
