import { Controller, useFormContext } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export function FormCheckbox({ name, label }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, name: fieldName } }) => (
        <FormControlLabel
          control={
            <Checkbox checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} onBlur={onBlur} name={fieldName} />
          }
          label={label}
        />
      )}
    />
  )
}
