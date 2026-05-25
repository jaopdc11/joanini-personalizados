import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('E-mail ou senha incorretos.')
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">

      {/* PAINEL ESQUERDO — visível só em lg+ */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-pink-mist/40 px-16 text-center">
        <p className="font-script text-7xl leading-none text-pink-deep">com carinho,</p>
        <p className="mt-3 font-serif text-3xl italic text-ink/70">feito à mão</p>
        <p className="mt-8 max-w-xs font-sans text-sm leading-relaxed text-ink-soft">
          Esse é o seu espaço pra organizar tudo o que você cria com tanto amor.
        </p>
        <div className="mt-14 grid grid-cols-2 gap-4 opacity-60">
          {(['#FBDDE0', '#FFD6BA', '#B8C5B0', '#BDD9E8'] as const).map((color, i) => (
            <div
              key={i}
              className="h-28 w-24 bg-white p-2 pb-7 shadow-md"
              style={{ transform: `rotate(${[-3, 2, -2, 3][i]}deg)` }}
            >
              <div className="h-full w-full rounded-sm" style={{ background: color }} />
            </div>
          ))}
        </div>
      </div>

      {/* PAINEL DIREITO — form + header mobile */}
      <div className="flex flex-1 flex-col bg-gradient-to-br from-warm-white via-cream to-pink-mist/20">

        {/* cabeçalho só mobile */}
        <div className="flex flex-col items-center justify-center bg-pink-mist/40 py-12 px-8 text-center lg:hidden">
          <p className="font-script text-5xl leading-none text-pink-deep">com carinho,</p>
          <p className="mt-2 font-serif text-xl italic text-ink/70">feito à mão</p>

          {/* mini polaroids horizontais */}
          <div className="mt-8 flex gap-3">
            {(['#FBDDE0', '#FFD6BA', '#B8C5B0'] as const).map((color, i) => (
              <div
                key={i}
                className="h-20 w-16 bg-white p-1.5 pb-5 shadow-md"
                style={{ transform: `rotate(${[-4, 2, -3][i]}deg)` }}
              >
                <div className="h-full w-full rounded-sm" style={{ background: color }} />
              </div>
            ))}
          </div>
        </div>

        {/* formulário */}
        <div className="flex flex-1 items-center justify-center px-8 py-12">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="font-serif text-2xl font-medium text-ink">Bom te ver</h1>
              <p className="mt-1 font-script text-lg text-pink-deep">entre pra gerenciar seus trabalhos</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  E-mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-pink-dusty/60 bg-white px-4 py-3 font-sans text-sm text-ink shadow-sm outline-none placeholder:text-ink-soft/40 focus:border-pink-deep focus:ring-4 focus:ring-pink-mist/60 transition"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  Senha
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-pink-dusty/60 bg-white px-4 py-3 font-sans text-sm text-ink shadow-sm outline-none placeholder:text-ink-soft/40 focus:border-pink-deep focus:ring-4 focus:ring-pink-mist/60 transition"
                />
              </label>

              {error && (
                <p className="rounded-lg bg-pink-mist/50 px-4 py-2 text-center font-sans text-sm text-pink-deep">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-xl bg-pink-candy py-3.5 font-serif text-base font-medium tracking-wide text-white shadow-md transition hover:bg-pink-deep hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? 'Entrando…' : 'Entrar'}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between">
              <a href="/" className="text-xs text-ink-soft/50 transition hover:text-ink-soft/80">
                ← Ver o site
              </a>
              <p className="font-script text-sm text-ink-soft/40">só você ✦</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
