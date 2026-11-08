// Cliente da API própria (jpersonalizados.api.jaopd.dev). Substitui o supabase-js.
//
// A sessão é um cookie HttpOnly que o JS nem enxerga: `credentials: 'include'`
// faz o navegador mandar. Front e API são same-site (*.jaopd.dev), então o
// SameSite=Lax do cookie não atrapalha.

const env = (import.meta as { env?: Record<string, string | undefined> }).env ?? {}
export const API_URL = (env.VITE_API_URL ?? 'https://jpersonalizados.api.jaopd.dev').replace(/\/$/, '')

export type Usuario = { id?: string; email: string; nome?: string | null }

// --- sessão: quem quiser saber de login/logout escuta aqui ------------------

type Ouvinte = (u: Usuario | null) => void
const ouvintes = new Set<Ouvinte>()

export function aoMudarSessao(fn: Ouvinte): () => void {
  ouvintes.add(fn)
  return () => ouvintes.delete(fn)
}

export function avisarSessao(u: Usuario | null): void {
  ouvintes.forEach((fn) => fn(u))
}

// --- requisição --------------------------------------------------------------

export class ErroApi extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
  }
}

type Envelope<T> = { status: 'success'; data: T } | { status: 'error'; detail: string } | null

function lerEnvelope<T>(texto: string): Envelope<T> {
  try {
    return (texto ? JSON.parse(texto) : null) as Envelope<T>
  } catch {
    // proxy fora do ar devolve HTML: melhor erro genérico do que estourar o parse
    return null
  }
}

function desembrulhar<T>(status: number, ok: boolean, caminho: string, texto: string): T {
  const envelope = lerEnvelope<T>(texto)
  if (!ok || envelope?.status !== 'success') {
    // Sessão morreu no meio do uso (expirou, saiu em outro aparelho): volta pro login.
    // /auth/eu fica de fora porque é ele que descobre se tem sessão, e /auth/entrar
    // porque 401 ali é só senha errada.
    if (status === 401 && caminho !== '/auth/eu' && caminho !== '/auth/entrar') avisarSessao(null)
    const detalhe = envelope?.status === 'error' ? envelope.detail : `Erro ${status}`
    throw new ErroApi(detalhe, status)
  }
  return envelope.data
}

async function requisitar<T>(metodo: string, caminho: string, corpo?: unknown): Promise<T> {
  const resposta = await fetch(API_URL + caminho, {
    method: metodo,
    credentials: 'include',
    headers: corpo === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
  })
  return desembrulhar<T>(resposta.status, resposta.ok, caminho, await resposta.text())
}

export const api = {
  get: <T>(caminho: string) => requisitar<T>('GET', caminho),
  // escrita sempre manda corpo JSON (nem que vazio): a API exige application/json
  post: <T>(caminho: string, corpo: unknown = {}) => requisitar<T>('POST', caminho, corpo),
  put: <T>(caminho: string, corpo: unknown) => requisitar<T>('PUT', caminho, corpo),
  del: <T>(caminho: string) => requisitar<T>('DELETE', caminho),
}

// --- imagens -----------------------------------------------------------------

export type ImagemEnviada = { id: string; url: string; mini_url: string }

// XHR em vez de fetch porque fetch não informa progresso de upload; foto de
// celular em 4G demora, e sem barra a pessoa acha que travou.
export function enviarImagem(arquivo: File, aoProgredir?: (fracao: number) => void): Promise<ImagemEnviada> {
  const caminho = '/admin/imagens'
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', API_URL + caminho)
    xhr.withCredentials = true
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) aoProgredir?.(e.loaded / e.total)
    }
    xhr.onload = () => {
      try {
        resolve(desembrulhar<ImagemEnviada>(xhr.status, xhr.status >= 200 && xhr.status < 300, caminho, xhr.responseText))
      } catch (e) {
        reject(e)
      }
    }
    xhr.onerror = () => reject(new ErroApi('Falha de rede no envio da imagem', 0))
    const form = new FormData()
    form.append('arquivo', arquivo)
    xhr.send(form)
  })
}

// O id da imagem é o uuid do nome do arquivo; tirar da URL evita depender de a
// API mandar o id junto em cada lugar.
export function idDaImagem(url: string | null | undefined): string | null {
  const m = url?.match(/\/imagens\/([0-9a-f-]{36})(?:-mini)?\.webp/i)
  return m ? m[1] : null
}

export function mensagemErro(e: unknown, padrao = 'Erro ao salvar. Tente novamente.'): string {
  return e instanceof ErroApi && e.status !== 0 && !e.message.startsWith('Erro ') ? e.message : padrao
}

// --- auth --------------------------------------------------------------------

export async function entrar(email: string, senha: string): Promise<Usuario> {
  const u = await api.post<Usuario>('/auth/entrar', { email, senha })
  avisarSessao(u)
  return u
}

export async function sair(): Promise<void> {
  try {
    await api.post('/auth/sair')
  } finally {
    avisarSessao(null)
  }
}

export function trocarSenha(atual: string, nova: string): Promise<unknown> {
  return api.post('/auth/senha', { atual, nova })
}
