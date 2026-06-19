import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { PageLoader } from '@/components/PageLoader'
import { router } from './router'

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export { router } from './router'
export { ROUTE_PATHS, ROLES } from './paths'
