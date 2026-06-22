export const queryKeys = {
  auth: {
    profile: ['auth', 'profile'],
  },
  users: {
    all: ['users'],
    list: (params) => ['users', 'list', params],
    detail: (userId) => ['users', 'detail', userId],
  },
  products: {
    all: ['products'],
    list: (params) => ['products', 'list', params],
    detail: (productId) => ['products', 'detail', productId],
  },
  orders: {
    all: ['orders'],
    list: (params) => ['orders', 'list', params],
    detail: (orderId) => ['orders', 'detail', orderId],
  },
}
