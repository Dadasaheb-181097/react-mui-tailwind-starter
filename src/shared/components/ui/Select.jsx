import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MuiSelect from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

/**
 * @param {{ label: string, value: string, onChange: Function, options: { value: string, label: string }[], size?: string, fullWidth?: boolean }} props
 */
export function Select({ label, value, onChange, options = [], size = 'small', fullWidth = true, ...props }) {
  const labelId = `${label}-select-label`
  return (
    <FormControl size={size} fullWidth={fullWidth}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect labelId={labelId} label={label} value={value} onChange={onChange} {...props}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}
