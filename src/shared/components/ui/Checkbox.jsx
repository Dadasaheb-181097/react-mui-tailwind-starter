import FormControlLabel from '@mui/material/FormControlLabel'
import MuiCheckbox from '@mui/material/Checkbox'

export function Checkbox({ label, ...props }) {
  if (label) {
    return <FormControlLabel control={<MuiCheckbox {...props} />} label={label} />
  }
  return <MuiCheckbox {...props} />
}
