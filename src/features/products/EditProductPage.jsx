import { useNavigate, useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { PageLoader } from '@/components/PageLoader'
import { useProductDetailsQuery, useProductMutations, useZodForm } from '@/hooks'
import { mapProductToFormValues, productSchema } from '@/validations/product.schema'
import { ProductForm } from './ProductForm'

export function EditProductPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading, isError } = useProductDetailsQuery(productId)
  const { update } = useProductMutations()

  const methods = useZodForm({
    schema: productSchema,
    values: product ? mapProductToFormValues(product) : undefined,
  })

  if (isLoading) return <PageLoader />
  if (isError || !product) return <Typography color="error">Product not found.</Typography>

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Edit Product
      </Typography>
      <ProductForm
        methods={methods}
        onSubmit={(data) => update.mutate({ productId: product.id, payload: data }, { onSuccess: () => navigate(-1) })}
        isSubmitting={update.isPending}
        submitLabel="Update Product"
      />
    </Box>
  )
}
