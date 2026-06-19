import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function InfoCard({ label, value, icon, sx }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        {icon}
        <Typography variant="caption" color="text.secondary" fontWeight={700}>
          {label}
        </Typography>
      </Box>
      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  )
}
