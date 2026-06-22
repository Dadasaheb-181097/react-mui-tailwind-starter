export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',

  CHAT: '/chat',

  USERS: '/users',
  USERS_VIEW: '/users/view',
  USERS_EDIT: '/users/edit',
  USERS_PROFILE: '/users/profile',
  USERS_SETTINGS: '/users/settings',
  USER_DETAILS: (userId) => `/users/${userId}`,
  USER_EDIT: (userId) => `/users/${userId}/edit`,

  SETTINGS_ROLES: '/settings/roles',
}
