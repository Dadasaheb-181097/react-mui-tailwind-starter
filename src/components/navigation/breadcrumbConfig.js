import { ROUTES } from '@/constants/routes'

const HOME = { label: 'Home', to: ROUTES.HOME, icon: 'home' }

const USERS = { label: 'Users', to: ROUTES.USERS }

/**
 * @param {string} pathname
 * @param {{ userName?: string }} [context]
 * @returns {{ label: string, to?: string, icon?: string }[]}
 */
export function resolveBreadcrumbs(pathname, context = {}) {
  const { userName } = context

  if (pathname === ROUTES.HOME) {
    return [HOME, { label: 'Dashboard' }]
  }

  if (pathname === ROUTES.CHAT) {
    return [HOME, { label: 'Chat' }]
  }

  if (pathname === ROUTES.USERS) {
    return [HOME, USERS, { label: 'Users List' }]
  }

  if (pathname === ROUTES.USERS_VIEW) {
    return [HOME, USERS, { label: 'User View' }]
  }

  if (pathname === ROUTES.USERS_EDIT) {
    return [HOME, USERS, { label: 'User Edit' }]
  }

  if (pathname === ROUTES.USERS_PROFILE) {
    return [HOME, { label: 'Profile' }]
  }

  if (pathname === ROUTES.USERS_SETTINGS) {
    return [HOME, { label: 'Account' }, { label: 'Settings' }]
  }

  if (pathname === ROUTES.SETTINGS_ROLES) {
    return [HOME, { label: 'Settings' }, { label: 'Roles & Permissions' }]
  }

  const editMatch = pathname.match(/^\/users\/([^/]+)\/edit$/)
  if (editMatch) {
    const userId = editMatch[1]
    const name = userName || 'User'
    return [
      HOME,
      USERS,
      { label: name, to: ROUTES.USER_DETAILS(userId) },
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
