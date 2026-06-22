import { z } from 'zod'

export const WAREHOUSE_STATUSES = ['active', 'inactive']

export const warehouseSchema = z.object({
  name: z.string().trim().min(1, 'Warehouse name is required'),
  code: z.string().trim().min(1, 'Warehouse code is required'),
  address: z.string().trim().min(1, 'Address is required'),
  city: z.string().trim().min(1, 'City is required'),
  status: z.enum(WAREHOUSE_STATUSES, { message: 'Select a valid status' }),
})

export const WAREHOUSE_STATUS_OPTIONS = WAREHOUSE_STATUSES.map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
}))
