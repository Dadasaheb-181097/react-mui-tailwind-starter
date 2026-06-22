import { Controller, useFormContext } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

export function FormRadioGroup({ name, label, options = [] }) {
  const { control, formState } = useFormContext()
  const error = formState.errors[name]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl error={Boolean(error)}>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <RadioGroup {...field}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  )
}
