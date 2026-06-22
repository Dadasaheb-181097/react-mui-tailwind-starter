import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct, deleteProduct, updateProduct } from '@/services/productService'
import { queryKeys } from '../queryKeys'

export function useProductMutations() {
  const queryClient = useQueryClient()

  const invalidateProducts = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
  }

  const create = useMutation({
    mutationFn: createProduct,
    onSuccess: invalidateProducts,
  })

  const update = useMutation({
    mutationFn: ({ productId, payload }) => updateProduct(productId, payload),
    onSuccess: (_data, { productId }) => {
      invalidateProducts()
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(productId) })
    },
  })

  const remove = useMutation({
    mutationFn: deleteProduct,
    onSuccess: invalidateProducts,
  })

  return { create, update, remove }
}
