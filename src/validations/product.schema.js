import { z } from 'zod'

export const PRODUCT_STATUSES = ['active', 'inactive']

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Product name is required')
    .min(3, 'Product name must be at least 3 characters'),
  sku: z.string().trim().min(1, 'SKU is required'),
  price: z.coerce.number({ error: 'Price must be a number' }).positive('Price must be greater than 0'),
  quantity: z.coerce
    .number({ error: 'Quantity must be a number' })
    .int('Quantity must be a whole number')
    .min(0, 'Quantity cannot be negative'),
  categoryId: z.string().trim().min(1, 'Category is required'),
  status: z.enum(PRODUCT_STATUSES, { message: 'Select a valid status' }),
})

export const PRODUCT_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

export function mapProductToFormValues(product) {
  return {
    name: product?.name == null ? '' : String(product.name),
    sku: product?.sku == null ? '' : String(product.sku),
    price: product?.price == null ? '' : product.price,
    quantity: product?.quantity == null ? '' : product.quantity,
    categoryId: product?.categoryId == null ? '' : String(product.categoryId),
    status: PRODUCT_STATUSES.includes(product?.status) ? product.status : '',
  }
}
