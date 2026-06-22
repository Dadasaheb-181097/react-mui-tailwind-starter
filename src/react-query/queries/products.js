import { useQuery } from '@tanstack/react-query'
import { getProductById, getProducts } from '@/services/productService'
import { queryKeys } from '../queryKeys'

export function useProductsQuery(params) {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => getProducts(params),
  })
}

export function useProductDetailsQuery(productId) {
  return useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: () => getProductById(productId),
    enabled: Boolean(productId),
  })
}
