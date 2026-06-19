import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * @param {{ size?: number, label?: string, fullScreen?: boolean }} props
 */
export function Spinner({ size = 32, label = 'Loading', fullScreen = false }) {
  return (
    <Box
      role="status"
      aria-label={label}
      sx={{
        display: 'grid',
        placeItems: 'center',
        ...(fullScreen ? { minHeight: '100vh' } : { py: 4 }),
      }}
    >
      <CircularProgress size={size} />
    </Box>
  )
}
