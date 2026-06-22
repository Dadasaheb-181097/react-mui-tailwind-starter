import { useCallback } from 'react'
import { useLoginMutation } from '@/react-query'
import {
  authLoggedOut,
  selectAuthToken,
  selectAuthUser,
  selectIsAuthenticated,
} from '../slices/authSlice'
import { useAppDispatch, useAppSelector } from '../hooks'

export function useAuth() {
  const dispatch = useAppDispatch()
  const { mutateAsync: loginRequest, isPending: isLoggingIn } = useLoginMutation()

  const token = useAppSelector(selectAuthToken)
  const user = useAppSelector(selectAuthUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const login = useCallback(
    async (credentials) => loginRequest(credentials),
    [loginRequest],
  )

  const logout = useCallback(() => {
    dispatch(authLoggedOut())
  }, [dispatch])

  return {
    token,
    user,
    isAuthenticated,
    isLoggingIn,
    login,
    logout,
  }
}
