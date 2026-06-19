import { ROUTE_PATHS } from '@/app/routes/routePaths'

const HOME = { label: 'Home', to: ROUTE_PATHS.root, icon: 'home' }

const USERS = { label: 'Users', to: ROUTE_PATHS.users.root }

/**
 * @param {string} pathname
 * @param {{ userName?: string }} [context]
 * @returns {{ label: string, to?: string, icon?: string }[]}
 */
export function resolveBreadcrumbs(pathname, context = {}) {
  const { userName } = context

  if (pathname === ROUTE_PATHS.root) {
    return [HOME, { label: 'Dashboard' }]
  }

  if (pathname === ROUTE_PATHS.users.root) {
    return [HOME, USERS, { label: 'Users List' }]
  }

  if (pathname === ROUTE_PATHS.users.view) {
    return [HOME, USERS, { label: 'User View' }]
  }

  if (pathname === ROUTE_PATHS.users.edit) {
    return [HOME, USERS, { label: 'User Edit' }]
  }

  if (pathname === ROUTE_PATHS.users.profile) {
    return [HOME, { label: 'Profile' }]
  }

  if (pathname === ROUTE_PATHS.users.settings) {
    return [HOME, { label: 'Account' }, { label: 'Settings' }]
  }

  if (pathname === ROUTE_PATHS.settings.roles) {
    return [HOME, { label: 'Settings' }, { label: 'Roles & Permissions' }]
  }

  const editMatch = pathname.match(/^\/users\/([^/]+)\/edit$/)
  if (editMatch) {
    const userId = editMatch[1]
    const name = userName || 'User'
    return [
      HOME,
      USERS,
      { label: name, to: ROUTE_PATHS.users.detail(userId) },
      { label: 'Edit' },
    ]
  }

  const detailMatch = pathname.match(/^\/users\/([^/]+)$/)
  if (detailMatch) {
    const segment = detailMatch[1]
    if (!['view', 'edit', 'profile', 'settings'].includes(segment)) {
      return [HOME, USERS, { label: userName || 'User Details' }]
    }
  }

  return [HOME, { label: 'Page' }]
}
