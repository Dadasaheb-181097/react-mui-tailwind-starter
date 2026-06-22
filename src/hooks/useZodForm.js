import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function useZodForm({ schema, defaultValues, values, mode = 'onBlur' }) {
  return useForm({
    resolver: zodResolver(schema),
    ...(values !== undefined ? { values } : { defaultValues }),
    mode,
    shouldFocusError: true,
  })
}
