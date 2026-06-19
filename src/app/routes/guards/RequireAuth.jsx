import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { ROUTE_PATHS } from '../routePaths'

/** Protected route — redirects unauthenticated users to login */
export function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.login} replace state={{ from: location }} />
  }

  return <Outlet />
}
