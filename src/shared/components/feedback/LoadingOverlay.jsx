import Box from '@mui/material/Box'
import { Spinner } from '../ui/Spinner'

export function LoadingOverlay({ loading, label, children }) {
  if (!loading) return children

  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(255,255,255,0.72)',
          display: 'grid',
          placeItems: 'center',
          zIndex: 2,
          borderRadius: 1,
        }}
      >
        <Spinner label={label} />
      </Box>
    </Box>
  )
}
