import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Box from '@mui/material/Box'

/**
 * Wraps a form control with label, helper text, and error state.
 */
export function FormField({ label, helperText, error, required, children, sx }) {
  return (
    <FormControl fullWidth error={error} required={required} sx={sx}>
      {label ? <FormLabel sx={{ mb: 0.5, fontWeight: 600 }}>{label}</FormLabel> : null}
      <Box>{children}</Box>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}
