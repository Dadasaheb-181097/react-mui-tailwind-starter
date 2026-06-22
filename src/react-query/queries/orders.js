import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/services/orderService'
import { queryKeys } from '../queryKeys'

export function useOrdersQuery(params) {
  return useQuery({
    queryKey: queryKeys.orders.list(params),
    queryFn: () => getOrders(params),
  })
}
