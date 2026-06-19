import Box from '@mui/material/Box'

/** Responsive grid for KPI / stat cards */
export function KpiGrid({ children, columns = { xs: 1, sm: 2, lg: 4 }, gap = 2, sx }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(${columns.xs}, 1fr)`,
          sm: `repeat(${columns.sm}, 1fr)`,
          md: columns.md ? `repeat(${columns.md}, 1fr)` : undefined,
          lg: columns.lg ? `repeat(${columns.lg}, 1fr)` : undefined,
        },
        gap,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
