import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authHydrated } from '@/store/slices/authSlice'

const STORAGE_KEY = 'mui-starter-auth'

/** Syncs auth state across browser tabs via localStorage. */
export function AuthBootstrap() {
  const dispatch = useDispatch()

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY) return

      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const next = raw ? JSON.parse(raw) : null
        dispatch(authHydrated(next))
      } catch {
        dispatch(authHydrated(null))
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [dispatch])

  return null
}
