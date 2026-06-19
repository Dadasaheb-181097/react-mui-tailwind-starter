export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/v3/auth/login',
    LOGOUT: '/v3/auth/logout',
    ME: '/v3/auth/me',
  },
  USERS: {
    LIST: '/v3/users',
    DETAIL: (userId) => `/v3/users/${userId}`,
    CREATE: '/v3/users',
    UPDATE: (userId) => `/v3/users/${userId}`,
    DELETE: (userId) => `/v3/users/${userId}`,
  },
}

