import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { resolveBreadcrumbs } from '@/components/navigation/breadcrumbConfig'
import { useUserDetailsQuery } from './useUsers'

const RESERVED_USER_SEGMENTS = new Set(['view', 'edit', 'profile', 'settings'])

function getUserIdFromPathname(pathname) {
  const editMatch = pathname.match(/^\/users\/([^/]+)\/edit$/)
  if (editMatch) return editMatch[1]

  const detailMatch = pathname.match(/^\/users\/([^/]+)$/)
  if (detailMatch && !RESERVED_USER_SEGMENTS.has(detailMatch[1])) {
    return detailMatch[1]
  }

  return undefined
}

export function useAppBreadcrumbs(override = null) {
  const { pathname } = useLocation()
  const userId = getUserIdFromPathname(pathname)
  const { data: user } = useUserDetailsQuery(userId)
  const userName = user?.name

  return useMemo(() => {
    if (override) return override
    return resolveBreadcrumbs(pathname, { userName })
  }, [override, pathname, userName])
}
