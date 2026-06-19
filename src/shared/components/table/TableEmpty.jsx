import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'

export function TableEmpty({ colSpan = 1, message = 'No records found' }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" sx={{ py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
