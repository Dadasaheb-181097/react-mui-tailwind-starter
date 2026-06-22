import { Controller, useFormContext } from 'react-hook-form'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

const selectMenuProps = {
  PaperProps: {
    sx: {
      mt: 0.5,
      borderRadius: '8px',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-navbar-icon-hover)',
      '& .MuiMenuItem-root': {
        fontSize: '0.9375rem',
        py: 1.25,
        px: 2,
        mx: 0.5,
        my: 0.25,
        borderRadius: '6px',
        '&:hover': { backgroundColor: 'var(--color-primary-soft)' },
        '&.Mui-selected': {
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-white)',
          fontWeight: 600,
          '&:hover': { backgroundColor: 'var(--color-primary-dark)' },
        },
      },
    },
  },
}

export function FormSelect({ name, label, options = [], ...props }) {
  const { control, formState } = useFormContext()
  const error = formState.errors[name]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          {...props}
          value={field.value ?? ''}
          inputRef={ref}
          select
          fullWidth
          label={label}
          error={Boolean(error)}
          helperText={error?.message || ' '}
          SelectProps={{ MenuProps: selectMenuProps }}
        >
          <MenuItem value="">
            <em>Select {label}</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}
