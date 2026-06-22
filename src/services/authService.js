import { apiClient } from './apiClient'
import { API_ENDPOINTS } from './apiEndpoints'

const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true'

function createMockLoginResponse({ email }) {
  return {
    token: `dev-${Math.random().toString(16).slice(2)}`,
    user: {
      email,
      name: 'John Doe',
      role: 'Product Admin',
      roles: ['admin'],
      initials: 'JD',
    },
  }
}

export async function login(credentials) {
  if (!credentials?.email || !credentials?.password) {
    throw new Error('Missing credentials')
  }

  if (useMockApi) {
    return createMockLoginResponse(credentials)
  }

  const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
  return data
}

export async function logout() {
  if (useMockApi) return null
  const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
  return data
}

export async function getProfile() {
  if (useMockApi) return null
  const { data } = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE)
  return data
}
