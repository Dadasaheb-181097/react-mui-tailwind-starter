import { Controller, useFormContext } from 'react-hook-form'
import Button from '@mui/material/Button'

export function FormFileUpload({ name, label, accept }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, ref } }) => (
        <Button variant="outlined" component="label">
          {label}
          <input
            ref={ref}
            hidden
            type="file"
            accept={accept}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
        </Button>
      )}
    />
  )
}
