import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

type ConnectionStatus = 'checking' | 'ok' | 'error'

type TableInfo = {
  name: string
  count: number | null
  error?: string
}

const TABLES = ['gallery_items', 'products', 'site_photos', 'testimonials']

export function DevPage() {
  const [connStatus, setConnStatus] = useState<ConnectionStatus>('checking')
  const [latency, setLatency] = useState<number | null>(null)
  const [tables, setTables] = useState<TableInfo[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'tables' | 'sql' | 'logs'>('overview')

  useEffect(() => {
    checkConnection()
    loadTables()
  }, [])

  async function checkConnection() {
    setConnStatus('checking')
    const t0 = performance.now()
    try {
      const { error } = await supabase.from('site_photos').select('slot').limit(1)
      setLatency(Math.round(performance.now() - t0))
      setConnStatus(error ? 'error' : 'ok')
    } catch {
      setConnStatus('error')
    }
  }

  async function loadTables() {
    const results = await Promise.all(
      TABLES.map(async name => {
        try {
          const { count, error } = await supabase.from(name).select('*', { count: 'exact', head: true })
          return { name, count: error ? null : (count ?? 0), error: error?.message }
        } catch (e: unknown) {
          return { name, count: null, error: String(e) }
        }
      })
    )
    setTables(results)
  }


  const statusColor = { checking: 'text-yellow-500', ok: 'text-emerald-600', error: 'text-red-500' }
  const statusLabel = { checking: 'verificando…', ok: 'conectado', error: 'falha na conexão' }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-stone-800">Painel dev</h1>
        <p className="text-sm text-stone-400">Visível só para você.</p>
      </div>

      {/* tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-stone-100 p-1 w-fit">
        {(['overview', 'tables', 'sql', 'logs'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${activeTab === tab ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            {tab === 'overview' ? 'Visão geral' : tab === 'tables' ? 'Tabelas' : tab === 'sql' ? 'SQL' : 'Auth logs'}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* conexão */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">Supabase</p>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${statusColor[connStatus]}`}>
                {connStatus === 'ok' ? '●' : connStatus === 'error' ? '✕' : '○'}
              </span>
              <span className="text-sm font-medium text-stone-700">{statusLabel[connStatus]}</span>
            </div>
            {latency !== null && (
              <p className="mt-1 text-xs text-stone-400">{latency}ms de latência</p>
            )}
            <button
              onClick={checkConnection}
              className="mt-3 text-xs text-rose-400 hover:text-rose-600"
            >
              testar novamente
            </button>
          </div>

          {/* ambiente */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">Ambiente</p>
            <dl className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <dt className="text-stone-400">Projeto</dt>
                <dd className="font-mono text-stone-600">jrmydbvykhmketbdxsna</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400">Região</dt>
                <dd className="font-mono text-stone-600">sa-east-1</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400">URL</dt>
                <dd className="font-mono text-stone-600 truncate max-w-[140px]" title={import.meta.env.VITE_SUPABASE_URL}>
                  {import.meta.env.VITE_SUPABASE_URL?.replace('https://', '')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400">Modo</dt>
                <dd className="font-mono text-stone-600">{import.meta.env.MODE}</dd>
              </div>
            </dl>
          </div>

          {/* contadores rápidos */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">Registros</p>
            {tables.length === 0 ? (
              <p className="text-xs text-stone-400">carregando…</p>
            ) : (
              <dl className="space-y-1.5 text-xs">
                {tables.map(t => (
                  <div key={t.name} className="flex justify-between">
                    <dt className="font-mono text-stone-400">{t.name}</dt>
                    <dd className="font-semibold text-stone-700">
                      {t.count !== null ? t.count : <span className="text-red-400">erro</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      )}

      {activeTab === 'tables' && (
        <div className="flex flex-col gap-4">
          {TABLES.map(tableName => (
            <TableViewer key={tableName} tableName={tableName} />
          ))}
        </div>
      )}

      {activeTab === 'sql' && <SqlConsole />}

      {activeTab === 'logs' && (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <p className="text-sm font-medium text-stone-700 mb-2">Auth logs</p>
          <p className="text-xs text-stone-400 leading-relaxed">
            Os logs de autenticação só são acessíveis via Management API (requer token OAuth).
            Para ver, acesse o dashboard do Supabase:
          </p>
          <a
            href="https://supabase.com/dashboard/project/jrmydbvykhmketbdxsna/logs/auth-logs"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-stone-50 px-3 py-2 text-xs font-medium text-stone-600 ring-1 ring-stone-200 hover:bg-stone-100"
          >
            Abrir logs no Supabase →
          </a>
        </div>
      )}
    </div>
  )
}

type SqlResult = {
  columns: string[]
  rows: Record<string, unknown>[]
  rowCount: number
} | null

function SqlConsole() {
  const [query, setQuery] = useState('select * from gallery_items limit 10;')
  const [result, setResult] = useState<SqlResult>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [elapsed, setElapsed] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  async function execute() {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    const t0 = performance.now()
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sql-console`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sql: query }),
        }
      )
      const json = await res.json()
      setElapsed(Math.round(performance.now() - t0))
      if (!res.ok || json.error) {
        setError(json.error ?? 'Erro desconhecido')
      } else {
        setResult(json)
      }
    } catch (e: unknown) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      execute()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 overflow-hidden">
        <div className="border-b border-stone-100 bg-stone-50 px-4 py-2 flex items-center justify-between">
          <span className="font-mono text-xs text-stone-400">SQL · Ctrl+Enter para executar</span>
          {elapsed !== null && !loading && (
            <span className="font-mono text-xs text-stone-400">{elapsed}ms</span>
          )}
        </div>
        <textarea
          ref={textareaRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={6}
          spellCheck={false}
          className="w-full resize-y bg-[#1e1e2e] px-5 py-4 font-mono text-sm text-[#cdd6f4] outline-none placeholder:text-stone-500"
          placeholder="select * from gallery_items limit 10;"
        />
        <div className="border-t border-stone-100 px-4 py-2 flex justify-end">
          <button
            onClick={execute}
            disabled={loading}
            className="rounded-lg bg-violet-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {loading ? 'Executando…' : 'Executar'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 px-5 py-4 ring-1 ring-red-200">
          <p className="font-mono text-xs text-red-600 whitespace-pre-wrap">{error}</p>
        </div>
      )}

      {result && (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 overflow-hidden">
          <div className="border-b border-stone-100 bg-stone-50 px-4 py-2">
            <span className="font-mono text-xs text-stone-400">
              {result.rowCount} {result.rowCount === 1 ? 'linha' : 'linhas'}
            </span>
          </div>
          {result.columns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-stone-50 text-left text-stone-400">
                    {result.columns.map(c => (
                      <th key={c} className="px-4 py-2 font-mono font-medium whitespace-nowrap">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => (
                    <tr key={i} className="border-t border-stone-50 hover:bg-stone-50">
                      {result.columns.map(c => (
                        <td key={c} className="px-4 py-2 font-mono text-stone-600 max-w-[240px] truncate" title={String(row[c] ?? '')}>
                          {row[c] === null
                            ? <span className="text-stone-300">null</span>
                            : String(row[c])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-5 py-3 font-mono text-xs text-stone-400">Query executada com sucesso.</p>
          )}
        </div>
      )}
    </div>
  )
}

function TableViewer({ tableName }: { tableName: string }) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    if (rows.length > 0) { setOpen(o => !o); return }
    setOpen(true)
    setLoading(true)
    setError('')
    try {
      const { data, error } = await supabase.from(tableName).select('*').limit(50)
      if (error) throw error
      setRows(data ?? [])
    } catch (e: unknown) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const cols = rows.length > 0 ? Object.keys(rows[0]) : []

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 overflow-hidden">
      <button
        onClick={load}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-stone-50"
      >
        <span className="font-mono text-sm font-medium text-stone-700">{tableName}</span>
        <span className="text-xs text-stone-400">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="border-t border-stone-100 overflow-x-auto">
          {loading && <p className="px-5 py-3 text-xs text-stone-400">carregando…</p>}
          {error && <p className="px-5 py-3 text-xs text-red-500">{error}</p>}
          {!loading && !error && rows.length === 0 && (
            <p className="px-5 py-3 text-xs text-stone-400">Nenhum registro.</p>
          )}
          {!loading && rows.length > 0 && (
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-stone-50 text-left text-stone-400">
                  {cols.map(c => (
                    <th key={c} className="px-4 py-2 font-mono font-medium whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-t border-stone-50 hover:bg-stone-50">
                    {cols.map(c => (
                      <td key={c} className="px-4 py-2 font-mono text-stone-600 max-w-[200px] truncate" title={String(row[c] ?? '')}>
                        {row[c] === null ? <span className="text-stone-300">null</span> : String(row[c])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
