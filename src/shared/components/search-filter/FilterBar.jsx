import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

/** Horizontal filter row — place SearchBar + FilterChips + actions */
export function FilterBar({ start, end, sx }) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={1.5}
      alignItems={{ xs: 'stretch', md: 'center' }}
      justifyContent="space-between"
      sx={{ mb: 2, ...sx }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>{start}</Box>
      {end ? <Box sx={{ flexShrink: 0 }}>{end}</Box> : null}
    </Stack>
  )
}
