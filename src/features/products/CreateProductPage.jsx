import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useProductMutations, useZodForm } from '@/hooks'
import { productSchema } from '@/validations/product.schema'
import { ProductForm } from './ProductForm'

export function CreateProductPage() {
  const navigate = useNavigate()
  const { create } = useProductMutations()

  const methods = useZodForm({
    schema: productSchema,
    defaultValues: {
      name: '',
      sku: '',
      price: '',
      quantity: '',
      categoryId: '',
      status: '',
    },
  })

  const handleCreateProduct = (formValues) => {
    create.mutate(formValues, {
      onSuccess: () => {
        methods.reset()
        navigate(-1)
      },
    })
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Create Product
      </Typography>
      <ProductForm
        methods={methods}
        onSubmit={handleCreateProduct}
        isSubmitting={create.isPending}
        submitLabel="Create Product"
      />
    </Box>
  )
}
