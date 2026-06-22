import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { FormProvider, FormSelect, FormTextField } from '@/forms'
import { PRODUCT_STATUS_OPTIONS } from '@/validations/product.schema'

export function ProductForm({ methods, onSubmit, isSubmitting = false, submitLabel = 'Save Product' }) {
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 520 }}>
        <FormTextField name="name" label="Product Name" />
        <FormTextField name="sku" label="SKU" />
        <FormTextField name="price" label="Price" type="number" />
        <FormTextField name="quantity" label="Quantity" type="number" />
        <FormTextField name="categoryId" label="Category" />
        <FormSelect name="status" label="Status" options={PRODUCT_STATUS_OPTIONS} />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </Stack>
    </FormProvider>
  )
}
