import { useEffect, useState } from 'react'

/**
 * Simule un chargement asynchrone pour la maquette.
 * Retourne `true` tant que les données (futures) ne sont pas prêtes,
 * puis passe à `false`. À remplacer par un vrai `useQuery`/`fetch`
 * sans toucher à l'interface lors de la connexion au backend.
 */
export function useMockLoad(duration = 500) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  return loading
}