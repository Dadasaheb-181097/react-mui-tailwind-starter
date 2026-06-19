import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { ROUTE_PATHS } from '../routePaths'

/**
 * Role-based route guard.
 * @param {{ roles: string[], fallbackTo?: string }} props
 */
export function RequireRole({ roles, fallbackTo = ROUTE_PATHS.root }) {
  const { user } = useAuth()
  const userRoles = user?.roles ?? []
  const allowed = roles.some((role) => userRoles.includes(role))

  if (!allowed) {
    return <Navigate to={fallbackTo} replace />
  }

  return <Outlet />
}
