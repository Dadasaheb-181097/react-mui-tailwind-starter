import { useMemo } from 'react'
import { useLocation, useMatches } from 'react-router-dom'
import { resolveBreadcrumbs } from './breadcrumbConfig'

export function useAppBreadcrumbs(override = null) {
  const { pathname } = useLocation()
  const matches = useMatches()

  const userName = useMemo(() => {
    for (let i = matches.length - 1; i >= 0; i -= 1) {
      const name = matches[i]?.data?.user?.name
      if (name) return name
    }
    return undefined
  }, [matches])

  return useMemo(() => {
    if (override) return override
    return resolveBreadcrumbs(pathname, { userName })
  }, [override, pathname, userName])
}
