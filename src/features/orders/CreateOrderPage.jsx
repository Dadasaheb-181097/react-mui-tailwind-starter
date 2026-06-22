import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { FormDatePicker, FormProvider, FormSelect, FormTextField } from '@/forms'
import { useZodForm } from '@/hooks'
import { ORDER_STATUS_OPTIONS, orderSchema } from '@/validations/order.schema'

export function CreateOrderPage() {
  const methods = useZodForm({
    schema: orderSchema,
    defaultValues: {
      customerId: '',
      warehouseId: '',
      orderDate: '',
      status: '',
      notes: '',
    },
  })

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Create Order
      </Typography>
      <FormProvider methods={methods} onSubmit={(data) => console.info(data)}>
        <Stack spacing={2} sx={{ maxWidth: 520 }}>
          <FormTextField name="customerId" label="Customer" />
          <FormTextField name="warehouseId" label="Warehouse" />
          <FormDatePicker name="orderDate" label="Order Date" />
          <FormSelect name="status" label="Status" options={ORDER_STATUS_OPTIONS} />
          <FormTextField name="notes" label="Notes" multiline minRows={3} />
          <Button type="submit" variant="contained">
            Create Order
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  )
}
