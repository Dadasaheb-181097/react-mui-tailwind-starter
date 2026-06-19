import TextField from '@mui/material/TextField'

/** App-styled text input */
export function Input({ size = 'small', fullWidth = true, ...props }) {
  return <TextField size={size} fullWidth={fullWidth} {...props} />
}
