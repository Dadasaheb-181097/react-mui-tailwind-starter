import { useFormContext } from 'react-hook-form'
import TextField from '@mui/material/TextField'

export function FormTextField({ name, label, type = 'text', ...props }) {
  const { register, formState } = useFormContext()
  const error = formState.errors[name]

  return (
    <TextField
      {...register(name)}
      {...props}
      fullWidth
      label={label}
      type={type}
      error={Boolean(error)}
      helperText={error?.message || ' '}
    />
  )
}
