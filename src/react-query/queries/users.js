import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/apiClient'
import { API_ENDPOINTS } from '@/services/apiEndpoints'
import { DEMO_USERS } from '@/services/mocks/demoUsers'
import { queryKeys } from '../queryKeys'

const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true'

export function useUsersQuery(params) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: async () => {
      if (useMockApi) return DEMO_USERS
      const { data } = await apiClient.get(API_ENDPOINTS.USERS.LIST, { params })
      return data
    },
  })
}

export function useUserDetailsQuery(userId) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    enabled: Boolean(userId),
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required')

      if (useMockApi) {
        const user = DEMO_USERS.find((item) => item.id === userId)
        if (!user) throw new Error('User not found')
        return user
      }

      const { data } = await apiClient.get(API_ENDPOINTS.USERS.DETAILS(userId))
      return data
    },
  })
}
