import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

/** Guest-only routes — redirects authenticated users away (e.g. login) */
export function RedirectIfAuth({ to = '/' }) {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to={to} replace />
  return <Outlet />
}
