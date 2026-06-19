import FormControlLabel from '@mui/material/FormControlLabel'
import MuiRadio from '@mui/material/Radio'

export function Radio({ label, ...props }) {
  if (label) {
    return <FormControlLabel control={<MuiRadio {...props} />} label={label} />
  }
  return <MuiRadio {...props} />
}
