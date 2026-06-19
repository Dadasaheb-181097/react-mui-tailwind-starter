import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  authLoggedIn,
  authLoggedOut,
  selectAuthToken,
  selectAuthUser,
  selectIsAuthenticated,
} from '../slices/authSlice'

export function useAuth() {
  const dispatch = useDispatch()
  const token = useSelector(selectAuthToken)
  const user = useSelector(selectAuthUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const login = useCallback(
    async ({ email, password }) => {
      if (!email || !password) {
        throw new Error('Missing credentials')
      }

      const fakeToken = `dev-${Math.random().toString(16).slice(2)}`
      const payload = {
        token: fakeToken,
        user: {
          email,
          name: 'John Doe',
          role: 'Product Admin',
          roles: ['admin'],
          initials: 'JD',
        },
      }

      dispatch(authLoggedIn(payload))
      return { token: fakeToken }
    },
    [dispatch],
  )

  const logout = useCallback(() => {
    dispatch(authLoggedOut())
  }, [dispatch])

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  }
}
