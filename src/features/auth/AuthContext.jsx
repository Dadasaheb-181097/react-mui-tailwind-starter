import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  authHydrated,
  authLoggedIn,
  authLoggedOut,
  selectAuthToken,
  selectAuthUser,
} from './store/authSlice'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const token = useSelector(selectAuthToken)
  const user = useSelector(selectAuthUser)

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== 'mui-starter-auth') return
      try {
        const raw = localStorage.getItem('mui-starter-auth')
        const next = raw ? JSON.parse(raw) : null
        dispatch(authHydrated(next))
      } catch {
        dispatch(authHydrated(null))
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [dispatch])

  const login = useCallback(async ({ email, password }) => {
    if (!email || !password) {
      throw new Error('Missing credentials')
    }

    const fakeToken = `dev-${Math.random().toString(16).slice(2)}`
    dispatch(
      authLoggedIn({
        token: fakeToken,
        user: {
          email,
          name: 'John Doe',
          role: 'Product Admin',
          roles: ['admin'],
          initials: 'JD',
        },
      }),
    )
    return { token: fakeToken }
  }, [dispatch])

  const logout = useCallback(() => {
    dispatch(authLoggedOut())
  }, [dispatch])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

