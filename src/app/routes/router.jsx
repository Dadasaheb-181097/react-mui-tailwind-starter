import { createBrowserRouter } from 'react-router-dom'
import { AdminLayout } from '@/features/admin/layout/AdminLayout'
import { adminRouteMeta, adminRoutes, authRoutes, usersRoutes } from './routes'
import { userLoader } from './loaders/userLoader'
import { RequireAuth } from './guards/RequireAuth'
import { RequireRole } from './guards/RequireRole'
import { RedirectIfAuth } from './guards/RedirectIfAuth'
import { UnsavedChangesGuard } from './guards/UnsavedChangesGuard'
import { RouteErrorBoundary } from './components/RouteErrorBoundary'
import { NotFoundPage } from './components/NotFoundPage'
import { ROUTE_PATHS } from './routePaths'

/**
 * Centralized route configuration.
 * Feature modules export route fragments; this file composes guards, layouts, and loaders.
 */
export const appRouteConfig = [
  {
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        element: <RedirectIfAuth to={ROUTE_PATHS.root} />,
        children: authRoutes,
      },

      {
        element: <RequireAuth />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              ...usersRoutes,

              {
                path: 'users/:userId/edit',
                element: <UnsavedChangesGuard />,
                children: [
                  {
                    index: true,
                    loader: userLoader,
                    lazy: async () => {
                      const { UserEditPage } = await import('@/features/users/pages/UserEditPage')
                      return { Component: UserEditPage }
                    },
                  },
                ],
              },

              {
                element: <RequireRole roles={adminRouteMeta.requiredRoles} />,
                children: adminRoutes,
              },

              {
                path: ROUTE_PATHS.notFound,
                element: <NotFoundPage />,
              },
            ],
          },
        ],
      },

      {
        path: ROUTE_PATHS.notFound,
        element: <NotFoundPage standalone />,
      },
    ],
  },
]

export const router = createBrowserRouter(appRouteConfig)
