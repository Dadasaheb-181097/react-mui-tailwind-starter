/** Centralized route path constants — single source of truth for navigation */
export const ROUTE_PATHS = {
  root: '/',
  login: '/login',
  users: {
    root: '/users',
    view: '/users/view',
    edit: '/users/edit',
    detail: (userId) => `/users/${userId}`,
    editDetail: (userId) => `/users/${userId}/edit`,
    profile: '/users/profile',
    settings: '/users/settings',
  },
  settings: {
    roles: '/settings/roles',
  },
  notFound: '*',
}

/** Role keys used by RequireRole guard (maps to user.roles[]) */
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
}
