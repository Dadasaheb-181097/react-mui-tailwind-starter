import { z } from 'zod'

export const USER_ROLES = ['User', 'Manager', 'Admin']
export const USER_STATUSES = ['Active', 'Pending', 'Inactive']

export const userSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email'),
  role: z.enum(USER_ROLES, { message: 'Select a valid role' }),
  status: z.enum(USER_STATUSES, { message: 'Select a valid status' }),
})

export function mapUserToFormValues(user = {}) {
  return {
    name: user.name ?? '',
    email: user.email ?? '',
    role: USER_ROLES.includes(user.role) ? user.role : '',
    status: USER_STATUSES.includes(user.status) ? user.status : '',
  }
}

export const USER_ROLE_OPTIONS = USER_ROLES.map((role) => ({ value: role, label: role }))
export const USER_STATUS_OPTIONS = USER_STATUSES.map((status) => ({ value: status, label: status }))
