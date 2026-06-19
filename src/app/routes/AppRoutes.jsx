import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { PageLoader } from './components/PageLoader'

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
