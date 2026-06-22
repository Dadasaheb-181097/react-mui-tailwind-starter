import { z } from 'zod'

export const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

export const orderSchema = z.object({
  customerId: z.string().trim().min(1, 'Customer is required'),
  warehouseId: z.string().trim().min(1, 'Warehouse is required'),
  orderDate: z.string().trim().min(1, 'Order date is required'),
  status: z.enum(ORDER_STATUSES, { message: 'Select a valid status' }),
  notes: z.string().trim().optional(),
})

export const ORDER_STATUS_OPTIONS = ORDER_STATUSES.map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
}))
