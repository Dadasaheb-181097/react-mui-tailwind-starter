import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { PageLoader } from '@/components/PageLoader'
import { useUsersQuery } from '@/hooks'
import { UsersTable } from './components/UsersTable'

export function UsersListPage() {
  const { data: users = [], isLoading, isError } = useUsersQuery()

  if (isLoading) return <PageLoader />

  if (isError) {
    return (
      <Typography variant="body2" color="error">
        Failed to load users.
      </Typography>
    )
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Users List
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Manage all users in the organization.
      </Typography>
      <UsersTable users={users} />
    </Box>
  )
}
