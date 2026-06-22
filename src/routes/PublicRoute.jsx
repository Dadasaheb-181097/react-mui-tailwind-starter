import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks'

export function PublicRoute({ redirectTo = ROUTES.HOME }) {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to={redirectTo} replace />
  return <Outlet />
}
