import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

/**
 * Generic data table shell — pass TableHead + TableBody as children.
 */
export function DataTable({ children, stickyHeader = false, size = 'small', elevation = 0, sx }) {
  return (
    <TableContainer component={Paper} variant="outlined" elevation={elevation} sx={sx}>
      <Table size={size} stickyHeader={stickyHeader}>
        {children}
      </Table>
    </TableContainer>
  )
}
