import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DEMO_USERS } from '@/features/users/data/demoUsers'
import { UsersTable } from '../components/UsersTable'

export function UsersListPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Users List
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Manage all users in the organization.
      </Typography>
      <UsersTable users={DEMO_USERS} />
    </Box>
  )
}
