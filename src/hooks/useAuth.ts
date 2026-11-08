import { useEffect, useState } from 'react'
import { api, aoMudarSessao, type Usuario } from '@/lib/api'

export function useAuth() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let vivo = true
    api
      .get<Usuario>('/auth/eu')
      .then((u) => vivo && setUsuario(u))
      .catch(() => vivo && setUsuario(null))
      .finally(() => vivo && setLoading(false))
    const desligar = aoMudarSessao(setUsuario)
    return () => {
      vivo = false
      desligar()
    }
  }, [])

  return { usuario, loading }
}
