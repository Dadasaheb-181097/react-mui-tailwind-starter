import Alert from '@mui/material/Alert'

export function InlineAlert({ severity = 'info', children, ...props }) {
  return (
    <Alert severity={severity} sx={{ mb: 2 }} {...props}>
      {children}
    </Alert>
  )
}
