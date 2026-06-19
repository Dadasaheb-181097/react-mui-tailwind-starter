import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function EmptyState({ title = 'No data', description, action, icon }) {
  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        textAlign: 'center',
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      {icon ? <Box sx={{ mb: 1.5, color: 'text.secondary' }}>{icon}</Box> : null}
      <Typography variant="subtitle1" fontWeight={700}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: action ? 2 : 0 }}>
          {description}
        </Typography>
      ) : null}
      {action}
    </Box>
  )
}
