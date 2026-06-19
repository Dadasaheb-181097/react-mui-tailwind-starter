import Stack from '@mui/material/Stack'

export function FormActions({ children, align = 'right', sx }) {
  return (
    <Stack direction="row" spacing={1} justifyContent={align === 'right' ? 'flex-end' : align} sx={{ mt: 2, ...sx }}>
      {children}
    </Stack>
  )
}
