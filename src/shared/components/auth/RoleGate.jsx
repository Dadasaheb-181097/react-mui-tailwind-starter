import { useAuth } from '@/features/auth/AuthContext'

/**
 * Renders children only when user has one of the required roles.
 * @param {{ roles: string[], fallback?: React.ReactNode, children: React.ReactNode }} props
 */
export function RoleGate({ roles, fallback = null, children }) {
  const { user } = useAuth()
  const userRoles = user?.roles ?? []
  const allowed = roles.some((r) => userRoles.includes(r))
  return allowed ? children : fallback
}
