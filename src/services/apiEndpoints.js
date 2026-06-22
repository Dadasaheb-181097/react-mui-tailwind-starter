export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  USERS: {
    LIST: '/users',
    CREATE: '/users',
    DETAILS: (userId) => `/users/${userId}`,
    UPDATE: (userId) => `/users/${userId}`,
    DELETE: (userId) => `/users/${userId}`,
  },

  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    DETAILS: (productId) => `/products/${productId}`,
    UPDATE: (productId) => `/products/${productId}`,
    DELETE: (productId) => `/products/${productId}`,
  },

  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAILS: (orderId) => `/orders/${orderId}`,
    UPDATE: (orderId) => `/orders/${orderId}`,
    DELETE: (orderId) => `/orders/${orderId}`,
  },

  CUSTOMERS: {
    LIST: '/customers',
    CREATE: '/customers',
    DETAILS: (customerId) => `/customers/${customerId}`,
    UPDATE: (customerId) => `/customers/${customerId}`,
    DELETE: (customerId) => `/customers/${customerId}`,
  },

  WAREHOUSES: {
    LIST: '/warehouses',
    CREATE: '/warehouses',
    DETAILS: (warehouseId) => `/warehouses/${warehouseId}`,
    UPDATE: (warehouseId) => `/warehouses/${warehouseId}`,
    DELETE: (warehouseId) => `/warehouses/${warehouseId}`,
  },
}
