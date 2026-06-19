import Box from '@mui/material/Box'

export function PageContainer({ children, maxWidth = 1200, sx }) {
  return (
    <Box sx={{ width: '100%', maxWidth, mx: 'auto', ...sx }}>
      {children}
    </Box>
  )
}
