import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export function FormSection({ title, description, children, sx }) {
  return (
    <Box component="section" sx={{ mb: 3, ...sx }}>
      {title ? (
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
          {title}
        </Typography>
      ) : null}
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      ) : null}
      {children}
    </Box>
  )
}
