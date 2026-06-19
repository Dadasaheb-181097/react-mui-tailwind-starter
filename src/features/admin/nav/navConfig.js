import { ROUTE_PATHS } from '@/app/routes/routePaths'

/** Sidebar nav id → route path */
export const NAV_ROUTES = {
  dashboard: ROUTE_PATHS.root,
  dashboards: ROUTE_PATHS.root,
  'users-list': ROUTE_PATHS.users.root,
  'user-view': ROUTE_PATHS.users.view,
  'user-edit': ROUTE_PATHS.users.edit,
  profile: ROUTE_PATHS.users.profile,
  'settings-nav': ROUTE_PATHS.users.settings,
  roles: ROUTE_PATHS.settings.roles,
  'auth-login': ROUTE_PATHS.login,
  'auth-register': '/register',
  calendar: '/calendar',
  kanban: '/kanban',
  chat: '/chat',
  contacts: '/contacts',
  files: '/files',
  email: '/email',
  todo: '/todo',
  authentication: ROUTE_PATHS.login,
}

/** Resolve active sidebar item from current pathname */
export function getActiveNavId(pathname) {
  if (pathname === ROUTE_PATHS.settings.roles) return 'roles'
  if (pathname === ROUTE_PATHS.users.settings) return 'settings-nav'
  if (pathname === ROUTE_PATHS.users.profile) return 'profile'
  if (pathname === ROUTE_PATHS.users.edit) return 'user-edit'
  if (pathname === ROUTE_PATHS.users.view) return 'user-view'
  if (/^\/users\/[^/]+\/edit$/.test(pathname)) return 'user-edit'
  if (/^\/users\/[^/]+$/.test(pathname)) return 'user-view'
  if (pathname === ROUTE_PATHS.users.root) return 'users-list'
  if (pathname === ROUTE_PATHS.login) return 'auth-login'
  if (pathname === '/register') return 'auth-register'
  return 'dashboard'
}
