import { z } from 'zod'

export const CUSTOMER_STATUSES = ['active', 'inactive']

export const customerSchema = z.object({
  name: z.string().trim().min(2, 'Name is required'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email'),
  phone: z.string().trim().min(1, 'Phone is required'),
  company: z.string().trim().optional(),
  status: z.enum(CUSTOMER_STATUSES, { message: 'Select a valid status' }),
})

export const CUSTOMER_STATUS_OPTIONS = CUSTOMER_STATUSES.map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
}))
