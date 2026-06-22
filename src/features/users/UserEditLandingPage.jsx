import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { PageLoader } from '@/components/PageLoader'
import { ROUTES } from '@/constants/routes'
import { useUsersQuery } from '@/hooks'
import { UsersTable } from './components/UsersTable'

export function UserEditLandingPage() {
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
        User Edit
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Select a user to edit their information.
      </Typography>
      <UsersTable users={users} mode="edit" />
      <Button component={Link} to={ROUTES.USERS} sx={{ mt: 2 }} variant="text">
        Back to users list
      </Button>
    </Box>
  )
}
