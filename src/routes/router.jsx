import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/layout'
import { PageLoader } from '@/components/PageLoader'
import { NotFoundPage } from '@/features/errors/NotFoundPage'
import { RouteErrorBoundary } from '@/features/errors/RouteErrorBoundary'
import { userLoader } from '@/features/users/loaders/userLoader'
import { RedirectIfAuth, RequireAuth, RequireRole, UnsavedChangesGuard } from './guards'
import { lazyPage } from './lazyPage'
import { ROLES, ROUTE_PATHS } from './paths'

export const router = createBrowserRouter([
  {
    errorElement: <RouteErrorBoundary />,
    hydrateFallbackElement: <PageLoader />,
    children: [
      {
        element: <RedirectIfAuth to={ROUTE_PATHS.root} />,
        children: [
          { path: 'login', lazy: lazyPage(() => import('@/features/auth/LoginPage'), 'LoginPage') },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { index: true, lazy: lazyPage(() => import('@/features/dashboard/DashboardPage'), 'DashboardPage') },
              { path: 'chat', lazy: lazyPage(() => import('@/features/chat/ChatPage'), 'ChatPage') },
              {
                path: 'users',
                children: [
                  { index: true, lazy: lazyPage(() => import('@/features/users/UsersListPage'), 'UsersListPage') },
                  { path: 'view', lazy: lazyPage(() => import('@/features/users/UserViewLandingPage'), 'UserViewLandingPage') },
                  { path: 'edit', lazy: lazyPage(() => import('@/features/users/UserEditLandingPage'), 'UserEditLandingPage') },
                  { path: 'profile', lazy: lazyPage(() => import('@/features/users/ProfilePage'), 'ProfilePage') },
                  { path: 'settings', lazy: lazyPage(() => import('@/features/users/UserSettingsPage'), 'UserSettingsPage') },
                  {
                    path: ':userId',
                    loader: userLoader,
                    lazy: lazyPage(() => import('@/features/users/UserViewPage'), 'UserViewPage'),
                  },
                ],
              },
              {
                path: 'users/:userId/edit',
                element: <UnsavedChangesGuard />,
                children: [
                  {
                    index: true,
                    loader: userLoader,
                    lazy: lazyPage(() => import('@/features/users/UserEditPage'), 'UserEditPage'),
                  },
                ],
              },
              {
                element: <RequireRole roles={[ROLES.ADMIN]} />,
                children: [
                  {
                    path: 'settings',
                    children: [
                      { path: 'roles', lazy: lazyPage(() => import('@/features/settings/RolesSettingsPage'), 'RolesSettingsPage') },
                    ],
                  },
                ],
              },
              { path: ROUTE_PATHS.notFound, element: <NotFoundPage /> },
            ],
          },
        ],
      },
      { path: ROUTE_PATHS.notFound, element: <NotFoundPage standalone /> },
    ],
  },
])
