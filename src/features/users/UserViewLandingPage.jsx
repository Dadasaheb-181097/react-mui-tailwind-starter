import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { ROUTE_PATHS } from '@/routes/paths'
import { DEMO_USERS } from '@/features/users/data/demoUsers'
import { UsersTable } from './components/UsersTable'

export function UserViewLandingPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        User View
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Select a user to view their profile details.
      </Typography>
      <UsersTable users={DEMO_USERS} mode="view" />
      <Button component={Link} to={ROUTE_PATHS.users.root} sx={{ mt: 2 }} variant="text">
        Back to users list
      </Button>
    </Box>
  )
}
