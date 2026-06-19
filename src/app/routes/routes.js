import { ROLES } from './routePaths'
import { userLoader } from './loaders/userLoader'

/** Guest-only routes */
export const authRoutes = [
  {
    path: 'login',
    lazy: async () => {
      const { LoginPage } = await import('@/features/auth/pages/LoginPage')
      return { Component: LoginPage }
    },
  },
]

/** Admin-only routes — protected by RequireRole in router */
export const adminRoutes = [
  {
    path: 'settings',
    children: [
      {
        path: 'roles',
        lazy: async () => {
          const { RolesSettingsPage } = await import('@/features/admin/pages/RolesSettingsPage')
          return { Component: RolesSettingsPage }
        },
      },
    ],
  },
]

export const adminRouteMeta = {
  requiredRoles: [ROLES.ADMIN],
}

/** Users + dashboard routes — nested under AdminLayout */
export const usersRoutes = [
  {
    index: true,
    lazy: async () => {
      const { DashboardPage } = await import('@/features/admin/pages/DashboardPage')
      return { Component: DashboardPage }
    },
  },
  {
    path: 'users',
    children: [
      {
        index: true,
        lazy: async () => {
          const { UsersListPage } = await import('@/features/users/pages/UsersListPage')
          return { Component: UsersListPage }
        },
      },
      {
        path: 'view',
        lazy: async () => {
          const { UserViewLandingPage } = await import('@/features/users/pages/UserViewLandingPage')
          return { Component: UserViewLandingPage }
        },
      },
      {
        path: 'edit',
        lazy: async () => {
          const { UserEditLandingPage } = await import('@/features/users/pages/UserEditLandingPage')
          return { Component: UserEditLandingPage }
        },
      },
      {
        path: 'profile',
        lazy: async () => {
          const { ProfilePage } = await import('@/features/users/pages/ProfilePage')
          return { Component: ProfilePage }
        },
      },
      {
        path: 'settings',
        lazy: async () => {
          const { UserSettingsPage } = await import('@/features/users/pages/UserSettingsPage')
          return { Component: UserSettingsPage }
        },
      },
      {
        path: ':userId',
        loader: userLoader,
        lazy: async () => {
          const { UserViewPage } = await import('@/features/users/pages/UserViewPage')
          return { Component: UserViewPage }
        },
      },
    ],
  },
]
