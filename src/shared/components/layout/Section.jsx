import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export function Section({ title, description, children, sx }) {
  return (
    <Box component="section" sx={{ mb: 3, ...sx }}>
      {title ? (
        <Typography variant="h6" fontWeight={700} sx={{ mb: description ? 0.5 : 1.5 }}>
          {title}
        </Typography>
      ) : null}
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {description}
        </Typography>
      ) : null}
      {children}
    </Box>
  )
}
