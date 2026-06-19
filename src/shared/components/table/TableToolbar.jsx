import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

/** Toolbar row above tables — search, filters, actions */
export function TableToolbar({ start, end, sx }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      justifyContent="space-between"
      spacing={1.5}
      sx={{ mb: 2, ...sx }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>{start}</Box>
      {end ? <Box sx={{ flexShrink: 0 }}>{end}</Box> : null}
    </Stack>
  )
}
