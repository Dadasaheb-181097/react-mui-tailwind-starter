import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

export function PageHeader({ title, subtitle, actions, sx }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: 3, ...sx }}
    >
      <Box>
        <Typography variant="h4" component="h1" fontWeight={800}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {actions ? <Box sx={{ flexShrink: 0 }}>{actions}</Box> : null}
    </Stack>
  )
}
